// Reads platform-resolved image URLs from content/asset-manifest.json.
// In prompt-only mode the platform's gen:unsplash step fills images[slot]
// with a direct CDN URL. Until then the slot is empty and callers should
// fall through to resolveImage()'s gradient placeholder.
import manifest from "@/content/asset-manifest.json";

export function getAsset(slot: string): string {
  const images = (manifest as { images?: Record<string, string> }).images ?? {};
  return images[slot] ?? "";
}
