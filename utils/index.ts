export function getTime() {
  const pad0 = (num: number) => num.toString().padStart(2, '0')
  const time = new Date()
  return `${pad0(time.getHours())}:${pad0(time.getMinutes())}:${pad0(time.getSeconds())}`
}

export function randNum(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from)) + from
}

export function randArr(from: number, to: number, length: number): number[] {
  return Array.from(
    {
      length,
    },
    (/** */) => randNum(from, to),
  )
}
