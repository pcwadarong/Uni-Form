const DISABLED_MODES = new Set(["previewing", "editing"]);

export default function isModeDisabled(mode: string): boolean {
  return DISABLED_MODES.has(mode);
}
