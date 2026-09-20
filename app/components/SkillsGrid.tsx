"use client";

interface ToolModule {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  summary: string;
  chips: string[];
}

export default function SkillsGrid() {
  const modules: ToolModule[] = [
    {
      id: "01",
      tag: "Wet-Lab Synthesis",
      title: "Sol-Gel & Sintering",
      subtitle: "Thermodynamics & Kinetics",
      summary:
        "Combustion synthesis and calcination kinetics for single-phase hexagonal and spinel ferrite nanostructures.",
      chips: [
        "Sol-Gel Auto-Combustion",
        "800°C–1100°C Sintering",
        "Chemical Co-Precipitation",
        "Fuel-to-Oxidant (Φ) Tuning",
      ],
    },
    {
      id: "02",
      tag: "Structural & Magnetic",
      title: "Diffraction & Magnetometry",
      subtitle: "Materials Characterization",
      summary:
        "Crystallite sizing, microstrain evaluation, and magnetic hysteresis loop parameter extraction.",
      chips: [
        "Powder XRD Analysis",
        "VSM Magnetometry",
        "FTIR (Cation Bands)",
        "UV-Vis (Tauc Bandgap)",
      ],
    },
    {
      id: "03",
      tag: "Computational Physics",
      title: "Scientific Python & Modeling",
      subtitle: "Data Fitting & Refinement",
      summary:
        "Non-linear experimental curve fitting, baseline deconvolution, and Rietveld structural refinement.",
      chips: [
        "Python (NumPy / SciPy)",
        "OriginLab Analytics",
        "FullProf Rietveld",
        "LaTeX Documentation",
      ],
    },
    {
      id: "04",
      tag: "Systems Architecture",
      title: "Databases & Full-Stack",
      subtitle: "Applied Software Engineering",
      summary:
        "Production relational database modeling, automated data pipelines, and responsive web platforms.",
      chips: [
        "PostgreSQL & Schemas",
        "Next.js & TypeScript",
        "Workflow Automation",
        "REST APIs & Storage",
      ],
    },
  ];

  return (
    <section className="py-16 border-b border-border">
      <div className="max-w-5xl mx-auto px-6">
        {/* Shortened Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-border">
          <div>
            <div className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.2em] font-bold text-primary-accent mb-1.5">
              <span className="w-2 h-2 bg-primary inline-block"></span>
              <span>Capabilities Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Technical & Scientific Toolkit
            </h2>
          </div>
          <span className="text-xs text-foreground-muted font-medium mt-2 sm:mt-0">
            Synthesis &bull; Characterization &bull; Computing
          </span>
        </div>

        {/* Compact, Clean 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="bg-surface p-6 border border-border hover:border-border-strong transition-colors duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header Row: Index & Tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-foreground-muted">
                    [{mod.id}]
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">
                    {mod.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-1.5">
                  {mod.title}
                </h3>

                {/* 1-Sentence Summary */}
                <p className="text-xs text-foreground-muted leading-relaxed mb-5">
                  {mod.summary}
                </p>
              </div>

              {/* Compact Architectural Keyword Chips */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                {mod.chips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-background border border-border text-foreground hover:border-primary transition-colors"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
