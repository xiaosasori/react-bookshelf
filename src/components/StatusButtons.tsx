import * as React from 'react'
import {
  FaBook,
  FaCheckCircle,
  FaMinusCircle,
  FaPlusCircle,
  FaTimesCircle,
} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
// import {
//   useListItem,
//   useUpdateListItem,
//   useRemoveListItem,
//   useCreateListItem,
// } from 'utils/list-items'
import styled from '@emotion/styled'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import * as colors from '@/styles/colors'
import { useAsync } from '@/hooks'
import Spinner from '@/components/base/Spinner'
import { addListItems, getListItems } from '@/api'
import type { ListItem } from '@/types'

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colors.base,
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer',
})

function TooltipButton({ label, highlight, onClick, icon, ...rest }: any) {
  const { isLoading, isError, error, run } = useAsync()

  function handleClick() {
    run(onClick())
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          'backgroundColor': 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
                ? colors.danger
                : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({ book }: any) {
  const { data: listItems } = useQuery('list-items', () => getListItems().then(data => data.listItems))
  const queryCache = useQueryClient()
  const listItem = listItems?.find((li: ListItem) => li.bookId === book.id) ?? null

  // 💰 for all the mutations below, if you want to get the list-items cache
  // updated after this query finishes the use the `onSettled` config option
  // to queryCache.invalidateQueries('list-items')
  // otherwise we go to other book and click "add to list", the StatusButtons won't update

  const { mutateAsync: create } = useMutation(
    ({ bookId }: any) => addListItems(bookId),
    { onSettled: () => queryCache.invalidateQueries('list-items') },
  )

  // 🐨 call useMutation here and assign the mutate function to "update"
  // the mutate function should call the list-items/:listItemId endpoint with a PUT
  //   and the updates as data. The mutate function will be called with the updates
  //   you can pass as data.

  // 🐨 call useMutation here and assign the mutate function to "remove"
  // the mutate function should call the list-items/:listItemId endpoint with a DELETE

  // 🐨 call useMutation here and assign the mutate function to "create"
  // the mutate function should call the list-items endpoint with a POST
  // and the bookId the listItem is being created for.

  return (
    <React.Fragment>
      {listItem
        ? (
          listItem.finishDate
            ? (
              <TooltipButton
                label="Unmark as read"
                highlight={colors.yellow}
                // 🐨 add an onClick here that calls update with the data we want to update
                // 💰 to mark a list item as unread, set the finishDate to null
                // {id: listItem.id, finishDate: null}
                icon={<FaBook />} onClick={undefined} />
            )
            : (
              <TooltipButton
                label="Mark as read"
                highlight={colors.green}
                // 🐨 add an onClick here that calls update with the data we want to update
                // 💰 to mark a list item as read, set the finishDate
                // {id: listItem.id, finishDate: Date.now()}
                icon={<FaCheckCircle />} onClick={undefined} />
            )
        )
        : null}
      {listItem
        ? (
          <TooltipButton
            label="Remove from list"
            highlight={colors.danger}
            // 🐨 add an onClick here that calls remove
            icon={<FaMinusCircle />}
          />
        )
        : (
          <TooltipButton
            label="Add to list"
            highlight={colors.indigo}
            onClick={() => create({ bookId: book.id })}
            icon={<FaPlusCircle />}
          />
        )}
    </React.Fragment>
  )
}

export default StatusButtons
