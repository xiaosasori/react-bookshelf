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
import { addListItems, getListItems, removeListItems, updateListItems } from '@/api'
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

  const { mutateAsync: remove } = useMutation(
    (bookId: string) => removeListItems(bookId),
    { onSettled: () => queryCache.invalidateQueries('list-items') },
  )

  const { mutateAsync: update } = useMutation(
    (updates: any) => updateListItems(updates.id, updates),
    { onSettled: () => queryCache.invalidateQueries('list-items') },
  )

  return (
    <React.Fragment>
      {listItem
        ? (
          listItem.finishDate
            ? (
              <TooltipButton
                label="Unmark as read"
                highlight={colors.yellow}
                // 💰 to mark a list item as unread, set the finishDate to null
                onClick={() => update({ id: listItem.id, finishDate: null })}
                icon={<FaBook />}
              />
            )
            : (
              <TooltipButton
                label="Mark as read"
                highlight={colors.green}
                // 💰 to mark a list item as read, set the finishDate
                onClick={() => update({ id: listItem.id, finishDate: Date.now() })}
                icon={<FaCheckCircle />}
              />
            )
        )
        : null}
      {listItem
        ? (
          <TooltipButton
            label="Remove from list"
            highlight={colors.danger}
            onClick={() => remove(listItem.id)}
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
