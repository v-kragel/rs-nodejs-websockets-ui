export function getRandomPlayerIndex(indices: string[]): string | null {
  if (indices.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * indices.length);
  return indices[randomIndex];
}
