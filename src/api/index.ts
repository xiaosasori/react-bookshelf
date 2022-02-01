import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL as string,
})

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

export function getBooks(query: string) {
  return api.get('books', {
    params: {
      query: encodeURIComponent(query),
    },
  })
}

export default api
