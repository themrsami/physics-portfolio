export default function ResearchSection() {
  return (
    <section id="research" className="py-20 border-b border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary-accent mb-2">
              Academic Investigations
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Research & Scientific Publications
            </h2>
          </div>
          <p className="text-xs text-foreground-muted uppercase tracking-wider mt-2 md:mt-0 font-medium">
            Magnetic Nanomaterials &bull; Ferrite Synthesis &bull; Structural Analysis
          </p>
        </div>

        <div className="space-y-6">
          {/* Publication 1: Preprint */}
          <div className="bg-surface border border-border p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs uppercase tracking-widest font-bold text-primary">
                Preprint &bull; Preprints.org
              </span>
              <span className="text-xs text-foreground-muted font-medium">Published 2025</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-snug">
              Sol-Gel Auto-Combustion Synthesis of Magnetic Nanomaterials as an Efficient Route for Advanced Functional Materials
            </h3>

            <p className="text-sm text-foreground-muted leading-relaxed mb-4">
              A comprehensive review synthesizing reaction thermodynamics, fuel selection (citric acid, glycine, urea), phase formation kinetics, and magnetic property modulation in spinel and hexagonal ferrite nanoparticles.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <a
                href="https://doi.org/10.20944/preprints202512.1270.v1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                DOI: 10.20944/preprints202512.1270.v1 &rarr;
              </a>
              <span className="text-border-strong">&bull;</span>
              <span className="text-foreground-muted">Author: Usama Nazir</span>
            </div>
          </div>

          {/* Publication 2: Working Manuscript */}
          <div className="bg-surface border border-border p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs uppercase tracking-widest font-bold text-primary-accent">
                Working Manuscript &bull; Under Revision
              </span>
              <span className="text-xs text-foreground-muted font-medium">2025 &ndash; 2026</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-snug">
              Rare Earth Element Doped M-Type Hexaferrites as Advanced Magnetic Materials for Modern Applications
            </h3>

            <p className="text-sm text-foreground-muted leading-relaxed mb-4">
              Investigating the substitution of trivalent rare-earth ions into the hexagonal iron sub-lattices to tune magnetocrystalline anisotropy, coercivity, saturation magnetization, and microwave absorption characteristics.
            </p>

            <div className="text-xs font-semibold text-foreground-muted">
              Status: Previously reviewed with Discover Applied Sciences (Springer); manuscript under preparation for resubmission.
            </div>
          </div>

          {/* Undergraduate Thesis */}
          <div className="bg-surface-muted border border-border p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs uppercase tracking-widest font-bold text-foreground">
                Undergraduate Thesis & Laboratory Research &bull; Grade A
              </span>
              <span className="text-xs text-foreground-muted font-medium">COMSATS Lahore &bull; 2022 &ndash; 2023</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-snug">
              Study of Rare Earth Doped Hard Ferrites for Memory Devices Applications
            </h3>

            <p className="text-sm text-foreground-muted leading-relaxed mb-4">
              Experimental synthesis of strontium ferrite nanoparticles using sol-gel auto-combustion. Handled calcination temperature profiles (800&deg;C to 1100&deg;C), X-ray diffraction (XRD) peak indexing, Williamson-Hall microstrain estimation, and Vibrating Sample Magnetometry (VSM) analysis for high-density magnetic recording media.
            </p>

            <div className="text-xs text-foreground-muted font-semibold">
              Advisor: Dr. Amna Mir (Associate Professor, Department of Physics)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
