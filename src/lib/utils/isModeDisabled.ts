export default function isModeDisabled(mode: string): boolean {
  return mode === "previewing" || mode === "editing";
}
