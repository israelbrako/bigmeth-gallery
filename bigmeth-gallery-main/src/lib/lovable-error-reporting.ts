// Generic error reporting stub — logs to console in dev.
export function reportLovableError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.error("[error boundary]", error, context);
}
