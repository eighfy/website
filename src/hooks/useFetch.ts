import axios, { AxiosHeaders, AxiosResponse } from "axios"
import { SERVER_URL } from "../constants"

export interface RequestOptions {
  query?: Record<string, any>
  method?: "GET" | "POST" | "DELETE" | "PUT"
  headers?: any
  body?: any
}

interface RequestAction {
  endpoint: string
  onSuccess?: (res: AxiosResponse<any, any>) => void
  onError?: (reason: any) => void
}

interface RequestFunction {
  (action?: RequestAction, options?: RequestOptions): AxiosResponse
  promisify: (
    action?: Pick<RequestAction, "endpoint">,
    options?: RequestOptions
  ) => Promise<any>
}

export default function useFetch(): RequestFunction
export default function useFetch(serverUrl: string): RequestFunction
export default function useFetch(serverUrl: string = SERVER_URL) {
  const request = (
    action: RequestAction = { endpoint: "" },
    options: RequestOptions = {}
  ) => {
    const uri = `${serverUrl}${action.endpoint || ""}?${new URLSearchParams(
      options.query || {}
    )}`

    axios(uri, {
      method: options.method || "GET",
      headers: options.headers || { "Access-Control-Allow-Origin": true },
      data: options.body,
    })
      .then(action.onSuccess || (() => {}))
      .catch(action.onError || (() => {}))
  }

  request.promisify = (
    action: RequestAction = { endpoint: "" },
    options: RequestOptions = {}
  ) => {
    return new Promise((res, rej) => {
      request(
        {
          ...action,
          onSuccess: (resp) => res(resp),
          onError: (reason) => rej(reason),
        },
        options
      )
    })
  }

  return request
}
