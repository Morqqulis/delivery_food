export function createToken(str: string): string {
   const getRandomChars = (length: number) =>
      Array.from({ length }, () => ((Math.random() * 36) | 0).toString(36)).join('')
   return str
      .split('')
      .map((char) => char + getRandomChars(24))
      .join('')
}

export function processToken(str: string) {
   return str
      .split('')
      .filter((_, i) => i % 25 === 0)
      .join('')
}
