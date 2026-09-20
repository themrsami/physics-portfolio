export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 border-b border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary-accent mb-2">
              Applied Experience
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Technical & Systems Engineering
            </h2>
          </div>
          <p className="text-xs text-foreground-muted uppercase tracking-wider mt-2 md:mt-0 font-medium">
            Applying computational discipline to real-world architectures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PCC Role */}
          <div className="bg-surface border border-border p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs uppercase tracking-widest font-bold text-primary">
                  Public Sector &bull; IT & Systems
                </span>
                <span className="text-xs text-foreground-muted font-medium">Jan 2026 &ndash; Present</span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">
                Punjab Charities Commission
              </h3>
              <p className="text-xs font-semibold text-foreground-muted mb-4">
                Home Department, Government of the Punjab
              </p>

              <ul className="text-xs text-foreground-muted space-y-2.5 leading-relaxed">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">&bull;</span>
                  <span>
                    Architected and deployed full-scale digital audit management platforms for provincial regulatory workflows.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">&bull;</span>
                  <span>
                    Designed automated risk evaluation algorithms, database schemas, and data pipelines on PostgreSQL.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">&bull;</span>
                  <span>
                    Integrated programmatic AI endpoints for internal regulatory guidance and automated information retrieval.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-border text-[11px] text-foreground-muted uppercase tracking-wider font-semibold">
              Focus: Relational Databases, Automated Scoring, Workflow Architecture
            </div>
          </div>

          {/* Apex Role */}
          <div className="bg-surface border border-border p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs uppercase tracking-widest font-bold text-foreground">
                  Academic Operations
                </span>
                <span className="text-xs text-foreground-muted font-medium">Mar 2023 &ndash; Aug 2025</span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">
                Apex Educational Institute
              </h3>
              <p className="text-xs font-semibold text-foreground-muted mb-4">
                Academic IT & Data Systems
              </p>

              <ul className="text-xs text-foreground-muted space-y-2.5 leading-relaxed">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">&bull;</span>
                  <span>
                    Managed institutional academic grading systems, scientific examination typesetting, and student data accuracy.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">&bull;</span>
                  <span>
                    Maintained high operational reliability, statistical assessment logs, and institutional reporting standards across a 2.5-year tenure.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">&bull;</span>
                  <span>
                    Demonstrated sustained professional responsibility and technical execution following academic studies.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-border text-[11px] text-foreground-muted uppercase tracking-wider font-semibold">
              Focus: Quantitative Record Systems, Curriculum Typesetting, Data Integrity
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
