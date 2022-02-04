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

function useUpdateListItem(options?: any) {
  const queryCache = useQueryClient()

  return useMutation(
    (updates: any) => updateListItems(updates.id, updates),
    {
      onSettled: () => queryCache.invalidateQueries('list-items'),
      ...options,
    },
  )
}

function useRemoveListItem(options?: any) {
  const queryCache = useQueryClient()

  return useMutation(
    (bookId: string) => removeListItems(bookId),
    {
      onSettled: () => queryCache.invalidateQueries('list-items'),
      ...options,
    },
  )
}

function useCreateListItem(options?: any) {
  const queryCache = useQueryClient()

  return useMutation(
    ({ bookId }: any) => addListItems(bookId),
    {
      onSettled: () => queryCache.invalidateQueries('list-items'),
      ...options,
    },
  )
}

export { useListItems, useListItem, useUpdateListItem, useCreateListItem, useRemoveListItem }
