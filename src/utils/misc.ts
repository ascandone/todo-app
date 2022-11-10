export function pluralizeWord(cardinality: number, word: string) {
  if (cardinality === 1) {
    return word;
  }
  return `${word}s`;
}
