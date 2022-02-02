import Link from '@/components/base/Link'

function NotFound() {
  return (
    <div
      css={{
        height: '100%',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        Sorry... nothing here.
        <Link to="/list">Go home</Link>
      </div>
    </div>
  )
}

export default NotFound
