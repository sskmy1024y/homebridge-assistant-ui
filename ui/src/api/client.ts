import { environment } from 'env'

enum HttpMethods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT'
}

interface HttpResponse<T> extends Response {
  parsedBody?: T
}

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request)

  try {
    // may error if there is no body
    response.parsedBody = await response.json()
  } catch (ex) {
    // TODO: throw parse error
  }

  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response
}

export async function get<T>(
  path: string,
  query?: string,
  host?: string
): Promise<HttpResponse<T>> {
  return await http<T>(
    new Request(`${host || environment.api.base}/${path}`, {
      headers,
      method: HttpMethods.Get,
      body: query
    })
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post<T>(
  path: string,
  body?: any,
  host?: string
): Promise<HttpResponse<T>> {
  return await http<T>(
    new Request(`${host || environment.api.base}/${path}`, {
      headers,
      method: HttpMethods.Post,
      body: JSON.stringify(body) ?? {}
    })
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function put<T>(
  path: string,
  body: any,
  host?: string
): Promise<HttpResponse<T>> {
  return await http<T>(
    new Request(`${host || environment.api.base}/${path}`, {
      headers,
      method: HttpMethods.Put,
      body: JSON.stringify(body) ?? {}
    })
  )
}
