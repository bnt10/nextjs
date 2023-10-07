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

export function buildUrlWithPathParams(
  base: string,
  params: Record<string, string | undefined>
) {
  if (!params) {
    return { url: base, error: new Error('No Parms') }
  }
  let url = base
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      url = url.replace(`:${key}`, value)
    }
  }
  return { url, error: null }
}
