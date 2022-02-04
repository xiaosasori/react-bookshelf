import * as React from 'react'
import {
  FaBook,
  FaCheckCircle,
  FaMinusCircle,
  FaPlusCircle,
  FaTimesCircle,
} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import styled from '@emotion/styled'
import * as colors from '@/styles/colors'
import { useAsync } from '@/hooks'
import Spinner from '@/components/base/Spinner'
import { useCreateListItem, useListItem, useRemoveListItem, useUpdateListItem } from '@/stores/list-items'

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
  const { isLoading, isError, error, run, reset } = useAsync()

  function handleClick() {
    if (isError)
      reset()
    else
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
  const listItem = useListItem(book.id)

  // 💰 for all the mutations below, if you want to get the list-items cache
  // updated after this query finishes the use the `onSettled` config option
  // to queryCache.invalidateQueries('list-items')
  // otherwise we go to other book and click "add to list", the StatusButtons won't update

  const { mutateAsync: create } = useCreateListItem()

  const { mutateAsync: remove } = useRemoveListItem()

  const { mutateAsync: update } = useUpdateListItem()

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
