"use client";

interface CustomSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  helperText?: string;
  onChange: (val: number) => void;
}

export default function CustomSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  helperText,
  onChange,
}: CustomSliderProps) {
  const percentage = Math.min(
    100,
    Math.max(0, ((value - min) / (max - min)) * 100)
  );

  return (
    <div className="space-y-2">
      {/* Label and Value Header */}
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-semibold uppercase tracking-wider text-foreground">
          {label}
        </span>
        <span className="font-mono font-bold text-sm text-primary px-2 py-0.5 bg-surface border border-border">
          {value} {unit}
        </span>
      </div>

      {/* Bold Heightened Filled Progress Slider */}
      <div className="relative h-4 bg-track border border-border flex items-center overflow-hidden">
        {/* Filled Progress Bar */}
        <div
          className="h-full bg-primary transition-[width] duration-75 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          {/* Subtle tactile right edge marker */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/40" />
        </div>

        {/* Hidden Interactive Native Range Input Overlay */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
        />
      </div>

      {/* Min / Max & Helper Text */}
      <div className="flex items-center justify-between text-[11px] text-foreground-muted">
        <span>
          {min} {unit}
        </span>
        {helperText && (
          <span className="text-center italic">{helperText}</span>
        )}
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  );
}
