import { useMutation, useQuery, useQueryClient } from 'react-query'
import { addListItems, getListItems, removeListItems, updateListItems } from '@/api'
import type { ListItem } from '@/types'

function useListItems(): ListItem[] {
  const { data: listItems } = useQuery('list-items', () => getListItems().then((data: any) => data.listItems))

  return listItems ?? []
}

function useListItem(bookId: string) {
  const listItems = useListItems()

  return listItems.find((li: ListItem) => li.bookId === bookId) ?? null
}

function useUpdateListItem() {
  const queryCache = useQueryClient()

  return useMutation(
    (updates: any) => updateListItems(updates.id, updates),
    { onSettled: () => queryCache.invalidateQueries('list-items') },
  )
}

function useRemoveListItem() {
  const queryCache = useQueryClient()

  return useMutation(
    (bookId: string) => removeListItems(bookId),
    { onSettled: () => queryCache.invalidateQueries('list-items') },
  )
}

function useCreateListItem() {
  const queryCache = useQueryClient()

  return useMutation(
    ({ bookId }: any) => addListItems(bookId),
    { onSettled: () => queryCache.invalidateQueries('list-items') },
  )
}

export { useListItems, useListItem, useUpdateListItem, useCreateListItem, useRemoveListItem }
