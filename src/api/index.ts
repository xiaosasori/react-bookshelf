import axios from 'axios'
import { useQueryClient } from 'react-query'
import * as auth from '@/auth-provider'

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
  async(response) => {
    if (response.status === 401) {
      const queryClient = useQueryClient()
      queryClient.clear()
      await auth.logout()
      // refresh the page for them
      window.location.reload()
      return Promise.reject(new Error('Please re-authenticate.'))
    }
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

export function getBook(id: string) {
  return api.get(`books/${id}`)
}

export function getBootstrap() {
  return api.get('bootstrap')
}

export function addListItems(bookId: string) {
  return api.post('list-items', { bookId })
}

export function getListItems() {
  return api.get('list-items')
  // return api.get('list-items').then((data: any) => data.listItems)
}

export default api
