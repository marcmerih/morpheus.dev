/**
 * Formats a human-readable “Last updated …” line for the overview header.
 * Values within the last minute show as “Last updated now” per product copy.
 */
export function formatLastUpdatedLabel(
  updatedAt: Date,
  now: Date = new Date(),
): string {
  const diffMs = now.getTime() - updatedAt.getTime();
  if (diffMs < 60_000) {
    return "Last updated now";
  }
  const sec = Math.floor(diffMs / 1000);
  if (sec < 120) {
    return `Last updated ${sec} seconds ago`;
  }
  const min = Math.floor(sec / 60);
  if (min < 60) {
    return `Last updated ${min} minute${min === 1 ? "" : "s"} ago`;
  }
  const hrs = Math.floor(min / 60);
  if (hrs < 24) {
    return `Last updated ${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  }
  const days = Math.floor(hrs / 24);
  return `Last updated ${days} day${days === 1 ? "" : "s"} ago`;
}
