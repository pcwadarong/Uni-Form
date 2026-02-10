const DISABLED_MODES = new Set(["previewing", "editing"]);

/**
 * 모드가 비활성화되어야 하는지 확인
 * @param mode - 확인할 모드 문자열
 * @returns 비활성화 여부
 */
export default function isModeDisabled(mode: string): boolean {
  return DISABLED_MODES.has(mode);
}
