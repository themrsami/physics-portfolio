export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary-accent mb-2">
            Academic Inquiries & Research Supervision
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-4">
            Connect & Inquire
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed mb-8">
            Currently preparing for graduate applications (CSC, ANSO, and University Fellowships) in Materials Science, Condensed Matter Physics, and Computational Nanomaterials. Open to discussions regarding research proposals and academic supervision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <a
            href="mailto:usamanazir13@gmail.com"
            className="p-4 bg-surface border border-border hover:border-primary transition-colors block"
          >
            <span className="text-[11px] uppercase tracking-wider text-foreground-muted block mb-1 font-semibold">
              Email
            </span>
            <span className="text-xs font-bold text-foreground break-all">
              usamanazir13@gmail.com
            </span>
          </a>

          <a
            href="https://orcid.org/0009-0004-0379-5061"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-surface border border-border hover:border-primary transition-colors block"
          >
            <span className="text-[11px] uppercase tracking-wider text-foreground-muted block mb-1 font-semibold">
              ORCID
            </span>
            <span className="text-xs font-bold text-foreground">
              0009-0004-0379-5061 &rarr;
            </span>
          </a>

          <a
            href="https://github.com/themrsami"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-surface border border-border hover:border-primary transition-colors block"
          >
            <span className="text-[11px] uppercase tracking-wider text-foreground-muted block mb-1 font-semibold">
              GitHub
            </span>
            <span className="text-xs font-bold text-foreground">
              github.com/themrsami &rarr;
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/usamanazir13/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-surface border border-border hover:border-primary transition-colors block"
          >
            <span className="text-[11px] uppercase tracking-wider text-foreground-muted block mb-1 font-semibold">
              LinkedIn
            </span>
            <span className="text-xs font-bold text-foreground">
              linkedin.com/in/usamanazir13 &rarr;
            </span>
          </a>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-foreground-muted">
          <span>&copy; {new Date().getFullYear()} Usama Nazir. All rights reserved.</span>
          <span className="mt-2 sm:mt-0 font-medium">
            Department of Physics, COMSATS University Islamabad, Lahore Campus
          </span>
        </div>
      </div>
    </section>
  );
}
