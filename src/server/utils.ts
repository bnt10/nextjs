interface Props {
  headers?: HeadersInit | undefined
  url: string
  data?: {}
}
export async function fetchPost({ headers, url = '', data = {} }: Props) {
  const mergedHeaders = new Headers(headers)
  mergedHeaders.set('Content-Type', 'application/json')

  const response = await fetch(`${process.env.API_URL}${url}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  })

  return response
}
