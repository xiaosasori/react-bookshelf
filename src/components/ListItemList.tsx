import BookRow from './BookRow'
import { useListItems } from '@/stores/list-items'

function ListItemList({ filterListItems, noListItems, noFilteredListItems }: any) {
  const listItems = useListItems()

  const filteredListItems = listItems?.filter(filterListItems)

  if (!listItems?.length)
    return <div css={{ marginTop: '1em', fontSize: '1.2em' }}>{noListItems}</div>

  if (!filteredListItems.length) {
    return (
      <div css={{ marginTop: '1em', fontSize: '1.2em' }}>
        {noFilteredListItems}
      </div>
    )
  }

  return (
    <ul className="list-none p-0 grid gap-4 grid-rows-[repeat(auto-fill,_minmax(100px,_1fr))]">
      {filteredListItems.map((listItem: any) => (
        <li key={listItem.id} aria-label={listItem.book.title}>
          <BookRow book={listItem.book} />
        </li>
      ))}
    </ul>
  )
}

export default ListItemList
