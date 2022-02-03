import { useQuery } from 'react-query'
import bookPlaceholderSvg from '@/assets/book-placeholder.svg'
import { getBook, getBooks } from '@/api'
import type { Book } from '@/types'

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}))

const bookQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

function useBookSearch(query = '') {
  const result = useQuery<Book[], Error>(
    ['bookSearch', { query }],
    () => getBooks(query).then((data: any) => data.books),
    bookQueryConfig,
  )

  return { ...result, books: result.data ?? loadingBooks }
}

function useBook(bookId: string) {
  const { data } = useQuery(['book', bookId],
    () => getBook(bookId).then((data: any) => data.book),
    { initialData: loadingBook },
  )

  return data
}

export { useBookSearch, useBook }
