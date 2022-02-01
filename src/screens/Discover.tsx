import Tooltip from '@reach/tooltip'
import { FaSearch, FaTimes } from 'react-icons/fa'
import type { FormEvent } from 'react'
import React from 'react'
import Input from '@/components/base/Input'
import Spinner from '@/components/base/Spinner'
import * as colors from '@/styles/colors'
import BookRow from '@/components/BookRow'
import { getBooks } from '@/api'

function Discover() {
  const [query, setQuery] = React.useState('')
  const [queried, setQueried] = React.useState<boolean>()
  const [books, setData] = React.useState([])
  const [status, setStatus] = React.useState('idle')
  const [error, setError] = React.useState(null)
  // const {books, error, isLoading, isError, isSuccess} = useBookSearch(query)
  // const refetchBookSearchQuery = useRefetchBookSearchQuery()
  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'
  // React.useEffect(() => {
  //   return () => refetchBookSearchQuery()
  // }, [refetchBookSearchQuery])

  React.useEffect(() => {
    setStatus('loading')
    getBooks(query).then((res: any) => {
      setData(res.books)
      setStatus('success')
    })
      .catch((error) => {
        setError(error)
        setStatus('error')
      })
  }, [query])

  function handleSearchClick(event: FormEvent) {
    event.preventDefault()
    setQueried(true)
    setQuery((event.target as HTMLFormElement).elements.search.value)
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearchClick}>
          <Input
            placeholder="Search books..."
            id="search"
            type="search"
            css={{ width: '100%' }}
          />
          <Tooltip label="Search Books">
            <label htmlFor="search">
              <button
                type="submit"
                css={{
                  border: '0',
                  position: 'relative',
                  marginLeft: '-35px',
                  background: 'transparent',
                }}
              >
                {isLoading
                  ? (
                    <Spinner />
                  )
                  : isError
                    ? (
                      <FaTimes aria-label="error" css={{ color: colors.danger }} />
                    )
                    : (
                      <FaSearch aria-label="search" />
                    )}
              </button>
            </label>
          </Tooltip>
        </form>
        {isError
          ? (
            <div css={{ color: colors.danger }}>
              <p>There was an error:</p>
              <pre>{error.message}</pre>
            </div>
          )
          : null}
      </div>
      <div>
        {queried
          ? null
          : (
            <div css={{ marginTop: 20, fontSize: '1.2em', textAlign: 'center' }}>
              <p>Welcome to the discover page.</p>
              <p>Here, let me load a few books for you...</p>
              {isLoading
                ? (
                  <div css={{ width: '100%', margin: 'auto' }}>
                    <Spinner />
                  </div>
                )
                : isSuccess && books.length
                  ? (
                    <p>Here you go! Find more books with the search bar above.</p>
                  )
                  : isSuccess && !books.length
                    ? (
                      <p>
                Hmmm... I couldn't find any books to suggest for you. Sorry.
                      </p>
                    )
                    : null}
            </div>
          )}
        {books.length
          ? (
            // <Profiler
            //   id="Discover Books Screen Book List"
            //   metadata={{ query, bookCount: books.length }}
            // >
            <ul className="mt-5 list-none grid gap-4 grid-rows-[repeat(auto-fill,_minmax(100px,_1fr))]">
              {books.map(book => (
                <li key={book.id} aria-label={book.title}>
                  <BookRow key={book.id} book={book} />
                </li>
              ))}
            </ul>
            // </Profiler>
          )
          : queried
            ? (
              <div css={{ marginTop: 20, fontSize: '1.2em', textAlign: 'center' }}>
                {isLoading
                  ? (
                    <div css={{ width: '100%', margin: 'auto' }}>
                      <Spinner />
                    </div>
                  )
                  : (
                    <p>
                Hmmm... I couldn&apos;t find any books with the query &quot;{query}.&quot;
                Please try another.
                    </p>
                  )}
              </div>
            )
            : null}
      </div>
    </div>
  )
}

export default Discover
