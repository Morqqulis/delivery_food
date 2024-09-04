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

export function daysSince(dateString: string): number {
   const now = new Date()
   const past = new Date(dateString)
   const diffInMs = now.getTime() - past.getTime()
   const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
   return diffInDays
}

export function hoursSince(dateString: string): number {
   const now = new Date()
   const past = new Date(dateString)
   const diffInMs = now.getTime() - past.getTime()
   const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
   return diffInHours
}
