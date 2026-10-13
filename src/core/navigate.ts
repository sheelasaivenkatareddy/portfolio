/**
 * Section navigation that works in both layouts. On desktop every section is on one long
 * page, so we just scroll. In the mobile app shell only the active tab is mounted, so the
 * shell registers a handler that switches tabs first and then scrolls.
 */
type Handler = (sectionId: string) => void;

let handler: Handler | null = null;

export function setSectionNavigator(next: Handler | null) {
  handler = next;
}

export function goToSection(sectionId: string) {
  if (handler) {
    handler(sectionId);
    return;
  }
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
}
