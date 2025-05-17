export function getNextPlayerIndex(
  playerIndices: string[],
  currentPlayerIndex: string
): string | null {
  if (playerIndices.length === 0) return null;

  const currentIndex = playerIndices.indexOf(currentPlayerIndex);
  if (currentIndex === -1) return null;

  const nextIndex = (currentIndex + 1) % playerIndices.length;
  return playerIndices[nextIndex];
}
