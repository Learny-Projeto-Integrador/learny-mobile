export function getCharacterXpToNext(level: number) {
  return Math.floor(
    80 + 45 * Math.pow(level - 1, 1.4)
  );
}

export function getCharacterProgressLevel(points: number, level: number) {
  const percentage = (points / getCharacterXpToNext(level)) * 100;
  return Math.min(100, Number(percentage.toFixed(0)));
}