export function buildUrlWithParams(
  base: string,
  params: Record<string, string | undefined>
) {
  const filteredParams = Object.entries(params).filter(
    ([, value]) => value !== undefined
  )
  if (filteredParams.length === 0) return base

  const paramString = filteredParams
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return `${base}?${paramString}`
}
