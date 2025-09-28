export const asNumber = (
  v: string | number | undefined
): number | undefined => {
  if (v === undefined || v === "") return undefined;
  return Number(v);
};

export const rangeValid = (min?: number, max?: number) => {
  if (min === undefined || max === undefined) return true;
  return Number(min) <= Number(max);
};

export default { asNumber, rangeValid };
