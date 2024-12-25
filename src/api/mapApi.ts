import { http } from './http'

export type Point = {
  id: string
  firstlevel: string
  gulfname: string
  lon: string
  lat: string
  pointcode: string
  pointtype: string
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  remark: string
}

export type PointParams = {
  gulfname: string
  pointcode: string
  pointtype: string
  secondlevel: string
  threelevel: string
  remark: string
}

export const getPointListApi = (params: Partial<PointParams>) =>
  http.post<MyResources<Point>>('api/bigscreen/getPointList', params)
