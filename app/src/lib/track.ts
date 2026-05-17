// Lightweight analytics helper. Safe to call before GA loads.
// Events are dropped silently if gtag is not present.

export type TrackProps = Record<string, string | number | boolean | undefined>;

export function track(event: string, props: TrackProps = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void })
    .gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", event, props);
  } catch {
    // no-op
  }
}
