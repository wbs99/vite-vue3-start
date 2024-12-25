type JSONValue =
  | null
  | boolean
  | string
  | number
  | JSONValue[]
  | Record<string, JSONValue>

type Resource<T> = {
  resource: T
}

type Resources<T> = {
  resources: T[]
  code: number
  msg: string
  total: number
}

type Pager = {
  currentPage: number
  perPage: number
}

type MyResource<T> = {
  code: number
  msg: string
  data: T
}
type MyResources<T> = {
  code: number
  msg: string
  data: T[]
}
