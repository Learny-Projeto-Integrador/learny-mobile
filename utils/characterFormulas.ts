export function getCharacterXpToNext(level: number) {
  return Math.floor(
    80 + 45 * Math.pow(level - 1, 1.4)
  );
}