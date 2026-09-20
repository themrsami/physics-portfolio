"use client";

import { useState, useMemo } from "react";
import CustomSlider from "./CustomSlider";
import MathView from "./MathView";

export default function InteractiveLab() {
  const [activeTab, setActiveTab] = useState<"xrd" | "vsm" | "solgel">("xrd");

  // --- 1. XRD State ---
  const [wavelength, setWavelength] = useState<number>(0.15406); // Cu-Ka in nm
  const [twoTheta, setTwoTheta] = useState<number>(35.6); // degrees
  const [fwhmDeg, setFwhmDeg] = useState<number>(0.28); // degrees
  const [kFactor, setKFactor] = useState<number>(0.9);

  // XRD Calculations
  const xrdResults = useMemo(() => {
    const thetaRad = ((twoTheta / 2) * Math.PI) / 180;
    const betaRad = (fwhmDeg * Math.PI) / 180;
    const cosTheta = Math.cos(thetaRad);
    const tanTheta = Math.tan(thetaRad);

    const d_nm = (kFactor * wavelength) / (betaRad * cosTheta);
    const d_angstrom = d_nm * 10;
    const dislocation = (1 / (d_nm * d_nm)) * 1000;
    const strain = betaRad / (4 * tanTheta);

    return {
      sizeNm: d_nm.toFixed(2),
      sizeAngstrom: d_angstrom.toFixed(2),
      dislocation: dislocation.toFixed(3),
      strain: strain.toExponential(3),
    };
  }, [wavelength, twoTheta, fwhmDeg, kFactor]);

  // --- 2. VSM State ---
  const [ms, setMs] = useState<number>(55); // emu/g
  const [hc, setHc] = useState<number>(2000); // Oe
  const [sqRatio, setSqRatio] = useState<number>(0.52); // Mr / Ms

  const mr = useMemo(() => (ms * sqRatio).toFixed(1), [ms, sqRatio]);

  // Generate SVG curve points for hysteresis loop
  const vsmPoints = useMemo(() => {
    const width = 360;
    const height = 220;
    const cx = width / 2;
    const cy = height / 2;
    const maxH = 5000;
    const maxM = 100;

    const scaleX = (width * 0.42) / maxH;
    const scaleY = (height * 0.42) / maxM;

    const upperPoints: string[] = [];
    const lowerPoints: string[] = [];

    for (let hVal = -maxH; hVal <= maxH; hVal += 200) {
      const mUpper = ms * Math.tanh((hVal + hc * 0.9) / (hc * 0.85 + 400));
      const xU = cx + hVal * scaleX;
      const yU = cy - mUpper * scaleY;
      upperPoints.push(`${xU.toFixed(1)},${yU.toFixed(1)}`);

      const mLower = ms * Math.tanh((hVal - hc * 0.9) / (hc * 0.85 + 400));
      const xL = cx + hVal * scaleX;
      const yL = cy - mLower * scaleY;
      lowerPoints.push(`${xL.toFixed(1)},${yL.toFixed(1)}`);
    }

    return {
      upper: upperPoints.join(" "),
      lower: lowerPoints.join(" "),
      cx,
      cy,
      width,
      height,
    };
  }, [ms, hc]);

  // --- 3. Sol-Gel Combustion State ---
  const [ferriteType, setFerriteType] = useState<"sr_hexa" | "ni_spinel" | "co_spinel">("sr_hexa");
  const [fuelType, setFuelType] = useState<"citric" | "glycine" | "urea">("citric");
  const [phiRatio, setPhiRatio] = useState<number>(1.0);

  const solgelCalculation = useMemo(() => {
    let oxidizerValency = 190;
    if (ferriteType === "ni_spinel" || ferriteType === "co_spinel") {
      oxidizerValency = 40;
    }

    let fuelValency = 18;
    if (fuelType === "glycine") fuelValency = 9;
    if (fuelType === "urea") fuelValency = 6;

    const stoichiometricMoles = oxidizerValency / fuelValency;
    const actualMoles = stoichiometricMoles * phiRatio;

    let regime = "Stoichiometric (Phi = 1.0)";
    let regimeDesc =
      "Maximum combustion velocity, high adiabatic temperature (~1450 deg C), single-phase ferrite formation without organic carbon residues.";
    if (phiRatio < 0.95) {
      regime = "Fuel-Lean (Phi < 1.0)";
      regimeDesc =
        "Excess oxidizer, incomplete combustion temperature, potential residual metal nitrates requiring higher post-calcination temperature.";
    } else if (phiRatio > 1.05) {
      regime = "Fuel-Rich (Phi > 1.0)";
      regimeDesc =
        "Excess organic fuel, prolonged smoldering, higher carbon residue necessitating oxidative air-sintering above 900 deg C.";
    }

    return {
      stoichMoles: stoichiometricMoles.toFixed(2),
      actualMoles: actualMoles.toFixed(2),
      regime,
      regimeDesc,
    };
  }, [ferriteType, fuelType, phiRatio]);

  return (
    <section id="tools" className="py-20 border-b border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary-accent mb-2">
              Scientific Software &bull; Interactive Lab Tools
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Materials Physics Computational Suite
            </h2>
          </div>
          <p className="text-xs text-foreground-muted uppercase tracking-wider mt-2 md:mt-0 font-medium">
            Real-time calculations for laboratory synthesis & characterization
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border border-border mb-8 bg-surface-muted p-1 gap-1">
          <button
            onClick={() => setActiveTab("xrd")}
            className={`flex-1 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer ${
              activeTab === "xrd"
                ? "bg-surface text-foreground shadow-xs border border-border"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            1. XRD Crystallite Size & Microstrain
          </button>
          <button
            onClick={() => setActiveTab("vsm")}
            className={`flex-1 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer ${
              activeTab === "vsm"
                ? "bg-surface text-foreground shadow-xs border border-border"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            2. VSM Hysteresis Simulator
          </button>
          <button
            onClick={() => setActiveTab("solgel")}
            className={`flex-1 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer ${
              activeTab === "solgel"
                ? "bg-surface text-foreground shadow-xs border border-border"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            3. Sol-Gel Combustion Ratio
          </button>
        </div>

        {/* Tab 1: XRD Calculator */}
        {activeTab === "xrd" && (
          <div className="bg-surface border border-border p-6 sm:p-8">
            <div className="max-w-2xl mb-5">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Scherrer Crystallite Size & Microstrain Calculator
              </h3>
              <p className="text-xs text-foreground-muted">
                Calculates mean coherent domain size (D) and lattice microstrain from powder X-ray diffraction peak broadening.
              </p>
            </div>

            {/* Theoretical Foundation Block with KaTeX Math */}
            <div className="p-4 sm:p-5 mb-6 bg-surface-muted border border-border grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-8 space-y-2 text-xs leading-relaxed">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-primary-accent">
                  <span className="w-1.5 h-1.5 bg-primary-accent inline-block"></span>
                  <span>Physical Principle &bull; Crystallite Broadening</span>
                </div>
                <p className="text-foreground">
                  X-ray diffraction peak broadening occurs when <span className="bg-primary/10 text-primary px-1.5 py-0.5 font-bold border border-primary/20">coherent crystalline scattering domains</span> shrink into the nanoscale regime (&lt;100 nm). In magnetic ferrites, crystallite diameter dictates whether nanoparticles exhibit <span className="font-semibold text-foreground underline decoration-primary-accent underline-offset-2">single-domain ferromagnetic</span> or <span className="font-semibold text-foreground underline decoration-primary underline-offset-2">superparamagnetic</span> behavior.
                </p>
                <p className="text-foreground-muted">
                  <strong>Formulation:</strong> Governed by the classical <span className="font-bold text-foreground">Scherrer equation</span>, where <span className="font-mono font-semibold text-foreground">K</span> is the shape factor (0.90 for spherical crystallites), <span className="font-mono font-semibold text-foreground">&lambda;</span> is incident wavelength, and <span className="font-mono font-semibold text-foreground">&beta;</span> is the <span className="font-bold text-primary">FWHM peak broadening</span> (in radians).
                </p>
              </div>

              {/* KaTeX Math Equations Box */}
              <div className="lg:col-span-4 bg-surface p-4 border border-border flex flex-col items-center justify-center text-center space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted block">
                  Governing Equations
                </span>
                <div className="text-base text-foreground font-semibold py-1">
                  <MathView math="D = \frac{K \lambda}{\beta \cos \theta}" display={true} />
                </div>
                <div className="text-sm text-foreground-muted pt-1 border-t border-border w-full">
                  <MathView math="\varepsilon = \frac{\beta}{4 \tan \theta}" display={true} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inputs using Custom Heightened Sliders */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-foreground mb-2">
                    X-ray Radiation Target (&lambda;)
                  </label>
                  <select
                    value={wavelength}
                    onChange={(e) => setWavelength(parseFloat(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm bg-background border border-border text-foreground font-medium focus:outline-none focus:border-primary"
                  >
                    <option value={0.15406}>Cu-K&alpha; (0.15406 nm / 1.5406 &Aring;)</option>
                    <option value={0.1789}>Co-K&alpha; (0.17890 nm / 1.7890 &Aring;)</option>
                    <option value={0.07107}>Mo-K&alpha; (0.07107 nm / 0.7107 &Aring;)</option>
                  </select>
                </div>

                <CustomSlider
                  label="Diffraction Peak Position (2θ)"
                  value={twoTheta}
                  min={10}
                  max={80}
                  step={0.1}
                  unit="°"
                  helperText="Characteristic (311) ferrite peak: ~35.6°"
                  onChange={setTwoTheta}
                />

                <CustomSlider
                  label="Full Width at Half Maximum (FWHM, β)"
                  value={fwhmDeg}
                  min={0.1}
                  max={1.5}
                  step={0.01}
                  unit="°"
                  helperText="Broader peaks indicate smaller crystallites"
                  onChange={setFwhmDeg}
                />

                <CustomSlider
                  label="Crystallite Shape Factor (K)"
                  value={kFactor}
                  min={0.8}
                  max={1.2}
                  step={0.05}
                  unit=""
                  helperText="0.90 for spherical isotropic nanoparticles"
                  onChange={setKFactor}
                />
              </div>

              {/* Outputs */}
              <div className="bg-surface-muted border border-border p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-primary-accent block mb-4">
                    Computed Crystallographic Metrics
                  </span>

                  <div className="space-y-4">
                    <div className="border-b border-border pb-3">
                      <span className="text-xs text-foreground-muted uppercase tracking-wider block font-medium">
                        Crystallite Size (D)
                      </span>
                      <div className="flex items-baseline space-x-2 mt-1">
                        <span className="font-serif text-3xl font-bold text-foreground">
                          {xrdResults.sizeNm}
                        </span>
                        <span className="text-sm font-bold text-foreground-muted">nm</span>
                        <span className="text-xs text-foreground-muted">
                          ({xrdResults.sizeAngstrom} &Aring;)
                        </span>
                      </div>
                    </div>

                    <div className="border-b border-border pb-3">
                      <span className="text-xs text-foreground-muted uppercase tracking-wider block font-medium">
                        Dislocation Density (&delta;)
                      </span>
                      <span className="font-mono text-base font-bold text-foreground">
                        {xrdResults.dislocation} &times; 10<sup>15</sup> lines/m<sup>2</sup>
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-foreground-muted uppercase tracking-wider block font-medium">
                        Lattice Microstrain (&epsilon;)
                      </span>
                      <span className="font-mono text-base font-bold text-foreground">
                        {xrdResults.strain}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border text-xs text-foreground-muted leading-relaxed">
                  <strong>Structural Status:</strong> Nanocrystalline domain within the single-domain threshold for magnetic recording ferrites.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: VSM Simulator */}
        {activeTab === "vsm" && (
          <div className="bg-surface border border-border p-6 sm:p-8">
            <div className="max-w-2xl mb-5">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Magnetic Hysteresis (M-H) Loop Simulator
              </h3>
              <p className="text-xs text-foreground-muted">
                Simulates magnetization behavior in response to external field (VSM loop) for hard vs soft ferrites.
              </p>
            </div>

            {/* Theoretical Foundation Block with KaTeX Math */}
            <div className="p-4 sm:p-5 mb-6 bg-surface-muted border border-border grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-8 space-y-2 text-xs leading-relaxed">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-primary">
                  <span className="w-1.5 h-1.5 bg-primary inline-block"></span>
                  <span>Physical Principle &bull; Magnetization Dynamics</span>
                </div>
                <p className="text-foreground">
                  <span className="bg-primary/10 text-primary px-1.5 py-0.5 font-bold border border-primary/20">Vibrating Sample Magnetometry (VSM)</span> measures the induced magnetic moment of a sample vibrating in a uniform magnetic field. The resulting hysteresis loop characterizes <span className="font-semibold text-foreground underline decoration-primary-accent underline-offset-2">magnetic hardness</span>, <span className="font-semibold text-foreground">domain wall pinning</span>, and <span className="font-semibold text-foreground underline decoration-primary underline-offset-2">anisotropy energy</span> in ferrite systems.
                </p>
                <p className="text-foreground-muted">
                  <strong>Formulation:</strong> Modeled via modified <span className="font-bold text-foreground">hyperbolic tangent branches</span>. Here, <span className="font-mono font-semibold text-foreground">M_s</span> reflects <span className="font-bold text-primary">saturation dipole alignment</span>, <span className="font-mono font-semibold text-foreground">H_c</span> measures <span className="font-bold text-primary-accent">coercive field resistance</span>, and <span className="font-mono font-semibold text-foreground">M_r</span> quantifies <span className="font-bold text-foreground">remanent stored flux</span>.
                </p>
              </div>

              {/* KaTeX Math Equations Box */}
              <div className="lg:col-span-4 bg-surface p-4 border border-border flex flex-col items-center justify-center text-center space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted block">
                  Governing Equations
                </span>
                <div className="text-base text-foreground font-semibold py-1">
                  <MathView math="M(H) = M_s \tanh\left(\frac{H \pm H_c}{H_k}\right)" display={true} />
                </div>
                <div className="text-sm text-foreground-muted pt-1 border-t border-border w-full">
                  <MathView math="S = \frac{M_r}{M_s}" display={true} />
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => {
                  setMs(62);
                  setHc(2600);
                  setSqRatio(0.55);
                }}
                className="px-3 py-1.5 border border-border text-xs uppercase tracking-wider font-semibold text-foreground hover:bg-surface-muted transition-colors cursor-pointer"
              >
                Preset: Hard Strontium Hexaferrite
              </button>
              <button
                onClick={() => {
                  setMs(45);
                  setHc(180);
                  setSqRatio(0.18);
                }}
                className="px-3 py-1.5 border border-border text-xs uppercase tracking-wider font-semibold text-foreground hover:bg-surface-muted transition-colors cursor-pointer"
              >
                Preset: Soft Nickel-Zinc Spinel
              </button>
              <button
                onClick={() => {
                  setMs(30);
                  setHc(20);
                  setSqRatio(0.04);
                }}
                className="px-3 py-1.5 border border-border text-xs uppercase tracking-wider font-semibold text-foreground hover:bg-surface-muted transition-colors cursor-pointer"
              >
                Preset: Superparamagnetic
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Dynamic SVG Plot */}
              <div className="bg-surface-muted border border-border p-4 flex flex-col items-center justify-center">
                <svg
                  viewBox={`0 0 ${vsmPoints.width} ${vsmPoints.height}`}
                  className="w-full max-w-[340px] h-auto overflow-visible"
                >
                  {/* Grid Lines */}
                  <line
                    x1="20"
                    y1={vsmPoints.cy}
                    x2={vsmPoints.width - 20}
                    y2={vsmPoints.cy}
                    stroke="var(--border-strong)"
                    strokeWidth="1.2"
                  />
                  <line
                    x1={vsmPoints.cx}
                    y1="15"
                    x2={vsmPoints.cx}
                    y2={vsmPoints.height - 15}
                    stroke="var(--border-strong)"
                    strokeWidth="1.2"
                  />

                  {/* Axis Labels */}
                  <text
                    x={vsmPoints.width - 15}
                    y={vsmPoints.cy - 6}
                    fontSize="9"
                    fill="var(--foreground-muted)"
                    textAnchor="end"
                    fontFamily="monospace"
                  >
                    +H (Oe)
                  </text>
                  <text
                    x="20"
                    y={vsmPoints.cy - 6}
                    fontSize="9"
                    fill="var(--foreground-muted)"
                    textAnchor="start"
                    fontFamily="monospace"
                  >
                    -H (Oe)
                  </text>
                  <text
                    x={vsmPoints.cx + 8}
                    y="22"
                    fontSize="9"
                    fill="var(--foreground-muted)"
                    fontFamily="monospace"
                  >
                    +M (emu/g)
                  </text>

                  {/* Hysteresis Curves */}
                  <polyline
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                    points={vsmPoints.upper}
                  />
                  <polyline
                    fill="none"
                    stroke="var(--primary-accent)"
                    strokeWidth="2.5"
                    points={vsmPoints.lower}
                  />
                </svg>

                <div className="flex items-center space-x-6 text-[11px] text-foreground-muted mt-3">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-3 h-0.5 bg-primary inline-block"></span>
                    <span>Decreasing Field</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <span className="w-3 h-0.5 bg-primary-accent inline-block"></span>
                    <span>Increasing Field</span>
                  </span>
                </div>
              </div>

              {/* Sliders using CustomSlider */}
              <div className="space-y-4">
                <CustomSlider
                  label="Saturation Magnetization (Ms)"
                  value={ms}
                  min={10}
                  max={100}
                  step={1}
                  unit="emu/g"
                  onChange={setMs}
                />

                <CustomSlider
                  label="Coercive Field (Hc)"
                  value={hc}
                  min={20}
                  max={4500}
                  step={20}
                  unit="Oe"
                  onChange={setHc}
                />

                <CustomSlider
                  label="Squareness Ratio (Mr / Ms)"
                  value={sqRatio}
                  min={0.05}
                  max={0.75}
                  step={0.01}
                  unit=""
                  onChange={setSqRatio}
                />

                <div className="p-3.5 bg-surface-muted border border-border space-y-1 mt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground-muted">Remanence (M<sub>r</sub>):</span>
                    <span className="font-mono font-bold text-foreground">{mr} emu/g</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground-muted">Magnetic Classification:</span>
                    <span className="font-bold text-primary">
                      {hc >= 1000 ? "Hard Magnetic Hexaferrite" : "Soft Magnetic Spinel"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Sol-Gel Combustion Calculator */}
        {activeTab === "solgel" && (
          <div className="bg-surface border border-border p-6 sm:p-8">
            <div className="max-w-2xl mb-5">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Sol-Gel Auto-Combustion Fuel Stoichiometry (&Phi;)
              </h3>
              <p className="text-xs text-foreground-muted">
                Propellant chemistry calculation determining fuel-to-oxidant molar ratios for single-phase ferrite formation.
              </p>
            </div>

            {/* Theoretical Foundation Block with KaTeX Math */}
            <div className="p-4 sm:p-5 mb-6 bg-surface-muted border border-border grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-8 space-y-2 text-xs leading-relaxed">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-primary-accent">
                  <span className="w-1.5 h-1.5 bg-primary-accent inline-block"></span>
                  <span>Physical Principle &bull; Propellant Thermochemistry</span>
                </div>
                <p className="text-foreground">
                  <span className="bg-primary/10 text-primary px-1.5 py-0.5 font-bold border border-primary/20">Sol-gel auto-combustion</span> harnesses a rapid, self-sustaining exothermic redox wave between metal nitrate oxidizers and organic fuels. At low initiation temperature (~200&deg;C), instantaneous combustion yields <span className="font-semibold text-foreground underline decoration-primary-accent underline-offset-2">phase-pure nanocrystalline ferrites</span> without requiring protracted high-temperature calcination cycles.
                </p>
                <p className="text-foreground-muted">
                  <strong>Formulation:</strong> Calculated via Jain&apos;s <span className="font-bold text-foreground">propellant chemistry principle</span>: the equivalence ratio <span className="font-mono font-semibold text-foreground">&Phi;</span> balances reducing valencies (<span className="font-semibold text-primary">organic fuel donors</span>) against oxidizing valencies (<span className="font-semibold text-primary-accent">metal nitrate acceptors</span>). At <span className="font-bold text-foreground">&Phi; = 1.0</span>, adiabatic flame temperature peaks (~1450&deg;C), eliminating carbon impurities.
                </p>
              </div>

              {/* KaTeX Math Equations Box */}
              <div className="lg:col-span-4 bg-surface p-4 border border-border flex flex-col items-center justify-center text-center space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted block">
                  Governing Equations
                </span>
                <div className="text-base text-foreground font-semibold py-1">
                  <MathView math="\Phi_e = \frac{\sum (\text{Reducing Valencies})}{\sum (\text{Oxidizing Valencies})}" display={true} />
                </div>
                <div className="text-sm text-foreground-muted pt-1 border-t border-border w-full">
                  <MathView math="n_{\text{fuel}} = \Phi \times \frac{|\sum \text{Val}_{\text{oxidizers}}|}{\text{Val}_{\text{fuel}}}" display={true} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-foreground mb-2">
                    Target Ferrite System
                  </label>
                  <select
                    value={ferriteType}
                    onChange={(e) => setFerriteType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm bg-background border border-border text-foreground font-medium focus:outline-none focus:border-primary"
                  >
                    <option value="sr_hexa">Strontium Hexaferrite (SrFe12O19)</option>
                    <option value="ni_spinel">Nickel Spinel Ferrite (NiFe2O4)</option>
                    <option value="co_spinel">Cobalt Spinel Ferrite (CoFe2O4)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-foreground mb-2">
                    Organic Fuel Complexing Agent
                  </label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm bg-background border border-border text-foreground font-medium focus:outline-none focus:border-primary"
                  >
                    <option value="citric">Citric Acid (C6H8O7, Valency +18)</option>
                    <option value="glycine">Glycine (C2H5NO2, Valency +9)</option>
                    <option value="urea">Urea (CH4N2O, Valency +6)</option>
                  </select>
                </div>

                <CustomSlider
                  label="Equivalence Ratio (Φ)"
                  value={phiRatio}
                  min={0.6}
                  max={1.6}
                  step={0.05}
                  unit=""
                  helperText="1.0 = Stoichiometric balanced combustion"
                  onChange={setPhiRatio}
                />
              </div>

              {/* Calculations Box */}
              <div className="bg-surface-muted border border-border p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-primary-accent block mb-4">
                    Stoichiometric Output
                  </span>

                  <div className="space-y-4">
                    <div className="border-b border-border pb-3">
                      <span className="text-xs text-foreground-muted uppercase tracking-wider block font-medium">
                        Required Fuel Moles (Per Mole of Ferrite)
                      </span>
                      <div className="flex items-baseline space-x-2 mt-1">
                        <span className="font-serif text-3xl font-bold text-foreground">
                          {solgelCalculation.actualMoles}
                        </span>
                        <span className="text-sm font-bold text-foreground-muted">moles</span>
                        <span className="text-xs text-foreground-muted">
                          (Ideal: {solgelCalculation.stoichMoles} mol)
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-foreground-muted uppercase tracking-wider block mb-1 font-medium">
                        Combustion Regime
                      </span>
                      <span className="font-bold text-sm text-primary block">
                        {solgelCalculation.regime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border text-xs text-foreground-muted leading-relaxed">
                  <strong>Combustion behavior:</strong> {solgelCalculation.regimeDesc}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
