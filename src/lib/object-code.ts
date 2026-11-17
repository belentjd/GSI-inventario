export type ObjectCodeTone = 'pink' | 'green' | null;

export function objectCodeTone(id: string): ObjectCodeTone {
  const prefix = id.trim().charAt(0).toUpperCase();
  if (prefix === 'C') return 'pink';
  if (prefix === 'M' || prefix === 'T') return 'green';
  return null;
}
