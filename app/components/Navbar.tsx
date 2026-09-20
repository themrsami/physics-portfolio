"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 border border-border bg-surface flex items-center justify-center font-bold text-xs text-primary group-hover:border-primary transition-colors">
            UN
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-foreground">
              Usama Nazir
            </span>
            <span className="text-[10px] uppercase tracking-widest text-foreground-muted font-medium">
              Materials Physics &bull; Computing
            </span>
          </div>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-wider font-semibold text-foreground-muted">
          <Link
            href="#research"
            className="hover:text-primary transition-colors"
          >
            Research
          </Link>
          <Link
            href="#tools"
            className="hover:text-primary transition-colors"
          >
            Lab Suite
          </Link>
          <Link
            href="#experience"
            className="hover:text-primary transition-colors"
          >
            Systems
          </Link>
          <Link
            href="#contact"
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 border border-primary text-xs uppercase tracking-wider font-bold text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            Connect
          </a>
        </div>
      </div>
    </header>
  );
}
