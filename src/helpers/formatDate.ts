export const formatDate = (date: number | Date) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(
    date,
  )
