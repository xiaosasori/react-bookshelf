import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL as string,
})

let token: string

api.interceptors.request.use(
  (config) => {
    config.headers!.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    if (response?.data)
      return response.data

    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export function setToken(t: string) {
  token = t
}

export function getBooks(query: string) {
  return api.get('books', {
    params: {
      query: encodeURIComponent(query),
    },
  })
}

export function getBootstrap() {
  return api.get('bootstrap')
}

export default api
