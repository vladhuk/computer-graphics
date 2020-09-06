// eslint-disable-next-line import/prefer-default-export
export function isValidValue(
  value: number,
  { min }: { min?: number }
): boolean {
  return Number.isNaN(value) || typeof min !== 'number' || value >= min;
}
