import { http } from '../utils/http'

export const getJwtApi = (buttonLoading: Ref<boolean>) => http.post<{ jwt: string }>(
  '/session',
  { email: '1134954328@qq.com', code: 123456 },
  { _buttonLoading: buttonLoading }
)

export const fetchMeApi = () => http.get<Resource<User>>('/me')

export const fetchCourseListApi = (data: Pager) => http.get<ListResponse<Course>>('/courses', data)
