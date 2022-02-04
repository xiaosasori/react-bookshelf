import { useQuery, useQueryClient } from 'react-query'
import React from 'react'
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
  const queryClient = useQueryClient()
  const result = useQuery<Book[], Error>(
    ['bookSearch', { query }],
    () => getBooks(query).then((data: any) => data.books),
    {
      ...bookQueryConfig,
      onSuccess(books) {
        for (const book of books) {
          queryClient.setQueryData(
            ['book', book.id],
            book,
          )
        }
      },
    },
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

function useRefetchBookSearchQuery() {
  const queryClient = useQueryClient()
  return React.useCallback(
    async() => {
      queryClient.removeQueries('bookSearch')
      await queryClient.prefetchQuery(
        ['bookSearch', { query: '' }],
        () => getBooks('').then((data: any) => data.books),
        bookQueryConfig,
      )
    },
    [queryClient],
  )
}

export { useBookSearch, useBook, useRefetchBookSearchQuery }
