import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-16 pb-14 border-b border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-bold text-primary-accent mb-4">
            <span className="w-2 h-2 bg-primary inline-block"></span>
            <span>Materials Physics &bull; Scientific Computing</span>
          </div>

          {/* Shortened Bold Heading with Secondary Playfair Accent */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12] mb-5">
            Functional Magnetic Nanomaterials & Scientific Computing.
          </h1>

          {/* Shortened Subtext */}
          <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mb-7 max-w-2xl font-normal">
            Physics researcher from COMSATS University Islamabad. Investigating rare-earth doped magnetic ferrites through wet-chemical synthesis, X-ray characterization, and Python data modeling.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-12">
            <Link
              href="#tools"
              className="px-5 py-2.5 bg-primary text-white text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-opacity"
            >
              Launch Interactive Lab Tools
            </Link>
            <Link
              href="#research"
              className="px-5 py-2.5 border border-border-strong text-foreground text-xs uppercase tracking-wider font-bold hover:bg-surface-muted transition-colors"
            >
              Publications & Papers
            </Link>
          </div>
        </div>

        {/* Enhanced Metric Cards (No CGPA, No BS mention) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border">
          <div className="bg-surface p-4 border border-border">
            <span className="block text-xs uppercase tracking-wider text-foreground-muted mb-1 font-semibold">
              Research Focus
            </span>
            <span className="font-serif italic text-lg font-bold text-foreground">
              Magnetic Ferrites
            </span>
            <span className="block text-[11px] text-foreground-muted mt-0.5">
              Hexagonal & Spinel Systems
            </span>
          </div>

          <div className="bg-surface p-4 border border-border">
            <span className="block text-xs uppercase tracking-wider text-foreground-muted mb-1 font-semibold">
              Scientific Output
            </span>
            <span className="font-serif italic text-lg font-bold text-foreground">
              1 Preprint + 1 MS
            </span>
            <span className="block text-[11px] text-foreground-muted mt-0.5">
              Preprints.org & Springer
            </span>
          </div>

          <div className="bg-surface p-4 border border-border">
            <span className="block text-xs uppercase tracking-wider text-foreground-muted mb-1 font-semibold">
              Synthesis & XRD
            </span>
            <span className="font-serif italic text-lg font-bold text-foreground">
              Sol-Gel Combustion
            </span>
            <span className="block text-[11px] text-foreground-muted mt-0.5">
              XRD, VSM, FTIR Analysis
            </span>
          </div>

          <div className="bg-surface p-4 border border-border">
            <span className="block text-xs uppercase tracking-wider text-foreground-muted mb-1 font-semibold">
              Computational Tools
            </span>
            <span className="font-serif italic text-lg font-bold text-foreground">
              Python & Modeling
            </span>
            <span className="block text-[11px] text-foreground-muted mt-0.5">
              Full-Stack Data Systems
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
