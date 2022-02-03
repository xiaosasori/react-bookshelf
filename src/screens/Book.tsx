import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import type { ChangeEvent } from 'react'
import React from 'react'
import debounceFn from 'debounce-fn'
import Tooltip from '@reach/tooltip'
import { FaRegCalendarAlt } from 'react-icons/fa'
import * as mq from '@/styles/media-queries'
import * as colors from '@/styles/colors'
import { getBook, getListItems, updateListItems } from '@/api'
import bookPlaceholderSvg from '@/assets/book-placeholder.svg'
import StatusButtons from '@/components/StatusButtons'
import type { ListItem } from '@/types'
import Rating from '@/components/Rating'
import { formatDate } from '@/helpers'

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

function Book() {
  const { bookId } = useParams()
  const { data: book } = useQuery(['book', bookId!],
    () => getBook(bookId!).then((data: any) => data.book),
    { initialData: loadingBook },
  )

  const { data: listItems } = useQuery('list-items', () => getListItems().then((data: any) => data.listItems))
  const listItem = listItems?.find((li: ListItem) => li.bookId === book.id) ?? null

  const { title, author, coverImageUrl, publisher, synopsis } = book

  return (
    <div>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gridGap: '2em',
          marginBottom: '1em',
          [mq.small]: {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <img
          src={coverImageUrl}
          alt={`${title} book cover`}
          css={{ width: '100%', maxWidth: '14rem' }}
        />
        <div>
          <div css={{ display: 'flex', position: 'relative' }}>
            <div css={{ flex: 1, justifyContent: 'space-between' }}>
              <h1>{title}</h1>
              <div>
                <i>{author}</i>
                <span css={{ marginRight: 6, marginLeft: 6 }}>|</span>
                <i>{publisher}</i>
              </div>
            </div>
            <div
              css={{
                right: 0,
                color: colors.gray80,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                minHeight: 100,
              }}
            >
              {book.loadingBook ? null : <StatusButtons book={book} />}
            </div>
          </div>
          <div css={{ marginTop: 10, minHeight: 46 }}>
            {listItem?.finishDate ? <Rating listItem={listItem} /> : null}
            {listItem ? <ListItemTimeframe listItem={listItem} /> : null}
          </div>
          <br />
          <p css={{ whiteSpace: 'break-spaces', display: 'block' }}>
            {synopsis}
          </p>
        </div>
      </div>
      {!book.loadingBook && listItem
        ? (
          <NotesTextarea listItem={listItem} />
        )
        : null}
    </div>
  )
}

function ListItemTimeframe({ listItem }: any) {
  const timeframeLabel = listItem.finishDate
    ? 'Start and finish date'
    : 'Start date'

  return (
    <Tooltip label={timeframeLabel}>
      <div aria-label={timeframeLabel} css={{ marginTop: 6 }}>
        <FaRegCalendarAlt css={{ marginTop: -2, marginRight: 5 }} />
        <span>
          {formatDate(listItem.startDate)}{' '}
          {listItem.finishDate ? `— ${formatDate(listItem.finishDate)}` : null}
        </span>
      </div>
    </Tooltip>
  )
}

function NotesTextarea({ listItem }: any) {
  const queryCache = useQueryClient()
  const { mutateAsync: mutate } = useMutation(
    (updates: any) => updateListItems(updates.id, updates),
    { onSettled: () => queryCache.invalidateQueries('list-items') },
  )

  const debouncedMutate = React.useMemo(() => debounceFn(mutate, { wait: 300 }), [
    mutate,
  ])

  function handleNotesChange(e: ChangeEvent<HTMLTextAreaElement>) {
    debouncedMutate({ id: listItem.id, notes: e.target.value })
  }

  return (
    <React.Fragment>
      <div>
        <label
          htmlFor="notes"
          css={{
            display: 'inline-block',
            marginRight: 10,
            marginTop: '0',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          Notes
        </label>
      </div>
      <textarea
        id="notes"
        defaultValue={listItem.notes}
        onChange={handleNotesChange}
        css={{
          width: '100%',
          minHeight: 300,
          border: '1px solid #f1f1f4',
          background: '#f1f2f7',
          padding: '8px 12px',
        }}
      />
    </React.Fragment>
  )
}

export default Book
