export const useSpringConfig = {
  to: async (next: any) => {
    while (1) await next({ radians: 2 * Math.PI })
  },
  from: { radians: 0 },
  config: { duration: 3500 },
  reset: true
}

export const interp = (i: any) => (r: any) =>
  `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`
