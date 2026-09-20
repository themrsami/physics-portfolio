"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface PhysicsObject {
  mesh: THREE.Object3D;
  basePos: THREE.Vector3;
  velocity: THREE.Vector3;
  baseRot: THREE.Euler;
  rotSpeed: { x: number; y: number; z: number };
  repelFactor: number;
}

export default function Physics3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 36);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Dynamic Theme Colors ---
    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return {
        primary: isDark ? 0x60a5fa : 0x1e3a5f,
        accent: isDark ? 0xf59e0b : 0x8b4513,
        cyan: isDark ? 0x38bdf8 : 0x0284c7,
        emerald: isDark ? 0x34d399 : 0x059669,
        opacity: isDark ? 0.38 : 0.24,
        nodeColor: isDark ? 0x93c5fd : 0x1e3a5f,
      };
    };

    let colors = getThemeColors();

    // Shared Line Materials
    const materials: THREE.LineBasicMaterial[] = [];
    const createLineMaterial = (colorHex: number, opacity: number) => {
      const mat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: opacity,
      });
      materials.push(mat);
      return mat;
    };

    const wireMatPrimary = createLineMaterial(colors.primary, colors.opacity);
    const wireMatAccent = createLineMaterial(colors.accent, colors.opacity * 0.95);
    const wireMatCyan = createLineMaterial(colors.cyan, colors.opacity * 0.85);
    const wireMatEmerald = createLineMaterial(colors.emerald, colors.opacity * 0.8);

    // Node Material for vertices
    const nodeGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: colors.nodeColor,
      transparent: true,
      opacity: colors.opacity * 1.3,
    });

    const physicsObjects: PhysicsObject[] = [];

    // Helper: Register Physics Object
    const registerPhysicsObj = (
      obj: THREE.Object3D,
      pos: THREE.Vector3,
      repelFactor: number,
      rotSpeed: { x: number; y: number; z: number }
    ) => {
      obj.position.copy(pos);
      scene.add(obj);
      physicsObjects.push({
        mesh: obj,
        basePos: pos.clone(),
        velocity: new THREE.Vector3(0, 0, 0),
        baseRot: obj.rotation.clone(),
        rotSpeed,
        repelFactor,
      });
    };

    // Helper: Create Lattice Polyhedron with Vertex Nodes
    const createLatticePolyhedron = (
      geometry: THREE.BufferGeometry,
      mat: THREE.LineBasicMaterial,
      scale: number,
      pos: THREE.Vector3,
      repelStrength: number,
      rotSpeed: { x: number; y: number; z: number }
    ) => {
      const group = new THREE.Group();
      const wireframeGeo = new THREE.WireframeGeometry(geometry);
      const wireMesh = new THREE.LineSegments(wireframeGeo, mat);
      group.add(wireMesh);

      const posAttr = geometry.attributes.position;
      if (posAttr) {
        for (let i = 0; i < posAttr.count; i += 3) {
          const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
          nodeMesh.position.set(
            posAttr.getX(i),
            posAttr.getY(i),
            posAttr.getZ(i)
          );
          group.add(nodeMesh);
        }
      }

      group.scale.set(scale, scale, scale);
      registerPhysicsObj(group, pos, repelStrength, rotSpeed);
      return group;
    };

    // Helper: Create Magnetic Toroidal Induction Core (Torus)
    const createToroidCore = (pos: THREE.Vector3, scale: number, mat: THREE.LineBasicMaterial) => {
      const group = new THREE.Group();
      const torusGeo = new THREE.TorusGeometry(1.6, 0.45, 8, 20);
      const wireframe = new THREE.WireframeGeometry(torusGeo);
      const lineMesh = new THREE.LineSegments(wireframe, mat);
      group.add(lineMesh);
      group.scale.set(scale, scale, scale);
      registerPhysicsObj(group, pos, 1.4, { x: 0.003, y: 0.004, z: 0.001 });
    };

    // Helper: Create Bragg Diffraction Lattice Planes
    const createBraggPlanes = (pos: THREE.Vector3, scale: number, mat: THREE.LineBasicMaterial) => {
      const group = new THREE.Group();
      const planeGeo = new THREE.PlaneGeometry(2.4, 2.4, 2, 2);
      const wire = new THREE.WireframeGeometry(planeGeo);

      // Stack of 3 parallel planes (d-spacing)
      for (let i = -1; i <= 1; i++) {
        const pLine = new THREE.LineSegments(wire, mat);
        pLine.position.z = i * 0.7;
        group.add(pLine);
      }

      // Normal vector arrow through center
      const normalPoints = [new THREE.Vector3(0, 0, -1.5), new THREE.Vector3(0, 0, 1.5)];
      const normalGeo = new THREE.BufferGeometry().setFromPoints(normalPoints);
      const normalLine = new THREE.Line(normalGeo, wireMatAccent);
      group.add(normalLine);

      group.scale.set(scale, scale, scale);
      group.rotation.x = 0.6;
      group.rotation.y = 0.5;
      registerPhysicsObj(group, pos, 1.3, { x: 0.002, y: -0.003, z: 0.002 });
    };

    // Helper: Create Dipole Spin Vector (Directional Needle)
    const createDipoleNeedle = (pos: THREE.Vector3, scale = 1.0) => {
      const group = new THREE.Group();
      const needlePoints = [new THREE.Vector3(0, -0.75, 0), new THREE.Vector3(0, 0.75, 0)];
      const needleGeo = new THREE.BufferGeometry().setFromPoints(needlePoints);
      const needleLine = new THREE.Line(needleGeo, wireMatPrimary);
      group.add(needleLine);

      const tipGeo = new THREE.ConeGeometry(0.14, 0.38, 5);
      const tipNorth = new THREE.Mesh(tipGeo, nodeMat);
      tipNorth.position.set(0, 0.75, 0);
      group.add(tipNorth);

      const tipSouth = new THREE.Mesh(tipGeo, nodeMat);
      tipSouth.position.set(0, -0.75, 0);
      tipSouth.rotation.z = Math.PI;
      group.add(tipSouth);

      group.scale.set(scale, scale, scale);
      registerPhysicsObj(group, pos, 2.0, { x: 0.001, y: 0.002, z: 0.001 });
    };

    // --- POPULATE WIDE VIEWPORT (FAR-LEFT, CENTER, AND FAR-RIGHT) ---
    const hexPrismGeo = new THREE.CylinderGeometry(1.5, 1.5, 2.6, 6);
    const octaGeo = new THREE.OctahedronGeometry(1.4, 0);
    const tetraGeo = new THREE.TetrahedronGeometry(1.3, 0);

    // 1. Far-Left Margin (x: -22 to -15)
    createLatticePolyhedron(hexPrismGeo, wireMatPrimary, 1.0, new THREE.Vector3(-20, 6, -3), 1.4, { x: 0.003, y: 0.005, z: 0.001 });
    createToroidCore(new THREE.Vector3(-18, -6, -2), 0.9, wireMatCyan);
    createLatticePolyhedron(octaGeo, wireMatAccent, 0.9, new THREE.Vector3(-21, -1, -4), 1.5, { x: -0.003, y: 0.004, z: 0.002 });
    createDipoleNeedle(new THREE.Vector3(-16, 11, -3), 1.1);
    createDipoleNeedle(new THREE.Vector3(-19, -11, -4), 1.0);
    createDipoleNeedle(new THREE.Vector3(-15, 1, -2), 0.9);

    // 2. Left-Center Zone (x: -14 to -7)
    createBraggPlanes(new THREE.Vector3(-11, 7, -3), 0.85, wireMatPrimary);
    createLatticePolyhedron(tetraGeo, wireMatSecondary(colors.cyan), 0.95, new THREE.Vector3(-8, -8, -3), 1.2, { x: 0.004, y: 0.002, z: -0.003 });
    createDipoleNeedle(new THREE.Vector3(-12, -2, -3), 1.0);
    createDipoleNeedle(new THREE.Vector3(-7, 3, -4), 0.85);

    // 3. Center Deep-Field Background (x: -5 to +5, pushed back in Z for zero clutter)
    createLatticePolyhedron(hexPrismGeo, wireMatPrimary, 0.75, new THREE.Vector3(0, 10, -7), 0.9, { x: 0.002, y: 0.003, z: 0.001 });
    createToroidCore(new THREE.Vector3(-2, -10, -6), 0.75, wireMatPrimary);
    createLatticePolyhedron(octaGeo, wireMatAccent, 0.7, new THREE.Vector3(3, -9, -6), 1.0, { x: -0.002, y: 0.003, z: -0.002 });

    // 4. Right-Center Zone (x: +7 to +14)
    createLatticePolyhedron(hexPrismGeo, wireMatPrimary, 1.1, new THREE.Vector3(10, 6, -2), 1.5, { x: 0.003, y: 0.004, z: 0.001 });
    createBraggPlanes(new THREE.Vector3(12, -7, -3), 0.9, wireMatPrimary);
    createLatticePolyhedron(tetraGeo, wireMatEmerald, 0.9, new THREE.Vector3(8, -2, -4), 1.2, { x: -0.003, y: -0.002, z: 0.004 });
    createDipoleNeedle(new THREE.Vector3(11, 11, -3), 1.0);
    createDipoleNeedle(new THREE.Vector3(7, 2, -3), 0.85);

    // 5. Far-Right Margin (x: +15 to +22)
    createToroidCore(new THREE.Vector3(19, 4, -2), 1.0, wireMatCyan);
    createLatticePolyhedron(octaGeo, wireMatAccent, 1.0, new THREE.Vector3(21, -4, -3), 1.6, { x: -0.004, y: 0.003, z: 0.002 });
    createLatticePolyhedron(hexPrismGeo, wireMatPrimary, 0.9, new THREE.Vector3(18, -10, -4), 1.3, { x: 0.002, y: 0.005, z: -0.001 });
    createDipoleNeedle(new THREE.Vector3(16, 0, -2), 1.1);
    createDipoleNeedle(new THREE.Vector3(20, 10, -4), 1.0);
    createDipoleNeedle(new THREE.Vector3(17, -5, -3), 0.9);

    function wireMatSecondary(color: number) {
      return createLineMaterial(color, colors.opacity * 0.85);
    }

    // --- Interactive Mouse Repulsion Physics ---
    const mouse = new THREE.Vector2(-9999, -9999);
    const mouse3D = new THREE.Vector3(-9999, -9999, 0);
    const planeZ0 = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(planeZ0, mouse3D);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- MutationObserver for Live Theme Toggles ---
    const observer = new MutationObserver(() => {
      const updated = getThemeColors();
      materials.forEach((mat) => {
        mat.color.setHex(updated.primary);
        mat.opacity = updated.opacity;
      });
      wireMatAccent.color.setHex(updated.accent);
      wireMatCyan.color.setHex(updated.cyan);
      wireMatEmerald.color.setHex(updated.emerald);
      nodeMat.color.setHex(updated.nodeColor);
      nodeMat.opacity = updated.opacity * 1.3;
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // --- Animation Loop with Spring Repulsion ---
    let animationFrameId: number;
    const springConstant = 0.038;
    const damping = 0.87;
    const repulsionRadius = 7.5; // Wider interactive influence zone

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (document.hidden) return;

      for (let i = 0; i < physicsObjects.length; i++) {
        const item = physicsObjects[i];

        // 1. Natural slow rotation
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;

        // 2. Repulsion from Mouse Probe
        const diff = new THREE.Vector3().subVectors(item.mesh.position, mouse3D);
        const dist2D = Math.sqrt(diff.x * diff.x + diff.y * diff.y);

        if (dist2D < repulsionRadius && dist2D > 0.05) {
          const forceMag =
            (1 - dist2D / repulsionRadius) * 0.55 * item.repelFactor;
          const repelForce = new THREE.Vector3(
            (diff.x / dist2D) * forceMag,
            (diff.y / dist2D) * forceMag,
            (diff.z / (dist2D + 1)) * (forceMag * 0.4)
          );
          item.velocity.add(repelForce);

          // Magnetic torque rotation
          item.mesh.rotation.z += (diff.x / dist2D) * 0.02;
          item.mesh.rotation.x += (diff.y / dist2D) * 0.02;
        }

        // 3. Damped Spring Return (Hooke's Law)
        const displacement = new THREE.Vector3().subVectors(
          item.basePos,
          item.mesh.position
        );
        const springForce = displacement.multiplyScalar(springConstant);

        item.velocity.add(springForce);
        item.velocity.multiplyScalar(damping);
        item.mesh.position.add(item.velocity);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      hexPrismGeo.dispose();
      octaGeo.dispose();
      tetraGeo.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      materials.forEach((m) => m.dispose());
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
