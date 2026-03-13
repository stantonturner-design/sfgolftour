export function parseCSV(text: string): string[][] {
  return text
    .split("\n")
    .map((row) => row.split(",").map((cell) => cell.trim()));
}
