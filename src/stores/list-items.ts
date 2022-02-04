import type { QueryClient } from 'react-query'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { addListItems, getListItems, removeListItems, updateListItems } from '@/api'
import type { ListItem } from '@/types'

function useListItems(): ListItem[] {
  const queryClient = useQueryClient()
  const { data: listItems } = useQuery(
    'list-items',
    () => getListItems().then((data: any) => data.listItems),
    {
      onSuccess(listItems) {
        for (const listItem of listItems) {
          queryClient.setQueryData(
            ['book', listItem.book.bookId],
            listItem.book,
          )
        }
      },
    },
  )

  return listItems ?? []
}

function useListItem(bookId: string) {
  const listItems = useListItems()

  return listItems.find((li: ListItem) => li.bookId === bookId) ?? null
}

const defaultMutationOptions = (queryClient: QueryClient) => {
  return {
    onSettled: () => queryClient.invalidateQueries('list-items'),
    onError(_error: unknown, _variables: any, recover: unknown) {
      if (typeof recover === 'function') recover()
    },
  }
}

function useUpdateListItem(options?: any) {
  const queryClient = useQueryClient()

  return useMutation(
    (updates: any) => updateListItems(updates.id, updates),
    {
      onMutate(newItem) {
        const previousItems = queryClient.getQueryData('list-items')
        queryClient.setQueryData<ListItem[] | undefined>('list-items', (old) => {
          return old?.map(item => item.id === newItem.id ? { ...item, ...newItem } : item)
        })

        return () => queryClient.setQueryData('list-items', previousItems)
      },
      ...defaultMutationOptions(queryClient),
      ...options,
    },
  )
}

function useRemoveListItem(options?: any) {
  const queryClient = useQueryClient()

  return useMutation(
    (bookId: string) => removeListItems(bookId),
    {
      onMutate(removedItemId) {
        const previousItems = queryClient.getQueryData('list-items')
        queryClient.setQueryData<ListItem[] | undefined>('list-items', (old) => {
          return old?.filter(item => item.id !== removedItemId)
        })

        return () => queryClient.setQueryData('list-items', previousItems)
      },
      ...defaultMutationOptions(queryClient),
      ...options,
    },
  )
}

function useCreateListItem(options?: any) {
  const queryClient = useQueryClient()

  return useMutation(
    ({ bookId }: any) => addListItems(bookId),
    {
      ...defaultMutationOptions(queryClient),
      ...options,
    },
  )
}

export { useListItems, useListItem, useUpdateListItem, useCreateListItem, useRemoveListItem }
