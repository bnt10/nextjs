type Func = (...args: any[]) => void
export function throttle(func: Func, delay: number): Func {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: any[]): void => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func(...args)
      }, delay)
    }
  }
}
export function debounce(func: Func, delay: number): Func {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: any[]): void => {
    clearTimeout(timeout as ReturnType<typeof setTimeout>)
    timeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
