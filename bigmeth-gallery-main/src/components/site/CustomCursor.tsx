import { useEffect, useState } from "react";

/** Desktop-only editorial cursor. Shows VIEW over artwork, ENTER over actions. */
export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      const target = (event.target as HTMLElement)?.closest?.("[data-cursor]");
      setLabel(target ? ((target as HTMLElement).dataset['cursor'] ?? null) : null);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[100] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      style={{ left: pos.x, top: pos.y }}
    >
      <div
        className="flex items-center justify-center rounded-full border border-accent bg-accent/10 backdrop-blur-[1px] transition-[width,height,opacity] duration-300"
        style={{
          width: label ? 74 : 8,
          height: label ? 74 : 8,
          opacity: label ? 1 : 0.55,
        }}
      >
        {label && (
          <span className="text-[10px] tracking-[0.28em] text-accent uppercase">{label}</span>
        )}
      </div>
    </div>
  );
}
