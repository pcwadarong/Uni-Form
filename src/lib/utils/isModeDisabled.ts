const DISABLED_MODES = new Set(["previewing", "editing"]);

export function isModeDisabled(mode: string): boolean {
  return DISABLED_MODES.has(mode);
}
