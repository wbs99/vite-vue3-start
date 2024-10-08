import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { getJwt, removeJwt } from '../utils/storage'

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
  }

  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'get' })
  }

  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }

  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }

  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'delete' })
  }
}

export const http = new Http(import.meta.env.VITE_APP_BASEURL)

// set header and start loading
http.instance.interceptors.request.use((config) => {
  const jwt = getJwt()
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`
  }
  if (config._buttonLoading !== undefined) {
    config._buttonLoading.value = true
  }
  return config
})

// cancel loading
http.instance.interceptors.response.use(
  (response) => {
    if (response.config._buttonLoading !== undefined) {
      response.config._buttonLoading.value = false
    }
    return response
  },
  (error: AxiosError) => {
    if (error.response?.config._buttonLoading !== undefined) {
      const configClone = { ...error.response.config }
      configClone._buttonLoading!.value = false
      error.response.config = configClone
    }
    throw error
  })

// errors
http.instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response
      const fn = table[status]
      fn?.()
    }
    throw error
  }
)

const table: Record<string, undefined | (() => void)> = {
  401: () => {
    window.alert('登录状态过期，请重新登录')
    removeJwt()
  },
  402: () => {
    window.alert('请付费后观看')
  },
  403: () => {
    window.alert('没有权限')
  },
  408: () => {
    window.alert('请求超时')
  },
  429: () => {
    window.alert('请求过于频繁')
  },
  500: () => {
    window.alert('服务器错误')
  }
}
