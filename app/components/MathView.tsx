"use client";

import { useMemo } from "react";
import katex from "katex";

interface MathViewProps {
  math: string;
  display?: boolean;
  className?: string;
}

export default function MathView({
  math,
  display = false,
  className = "",
}: MathViewProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
      });
    } catch {
      return math;
    }
  }, [math, display]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
