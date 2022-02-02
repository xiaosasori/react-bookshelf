
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet, Link as RouterLink, useMatch } from 'react-router-dom'
import * as mq from '@/styles/media-queries'
import * as colors from '@/styles/colors'
import ErrorMessage from '@/components/ErrorMessage'

function Layout() {
  return (
    <div
      css={{
        margin: '0 auto',
        padding: '4em 2em',
        maxWidth: '840px',
        width: '100%',
        display: 'grid',
        gridGap: '1em',
        gridTemplateColumns: '1fr 3fr',
        [mq.small]: {
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'auto',
          width: '100%',
        },
      }}
    >
      <div css={{ position: 'relative' }}>
        <Nav />
      </div>
      <main css={{ width: '100%' }}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  )
}

function ErrorFallback({ error }: any) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

function NavLink(props: any) {
  const match = useMatch(props.to)
  return (
    <RouterLink
      css={[
        {
          'display': 'block',
          'padding': '8px 15px 8px 10px',
          'margin': '5px 0',
          'width': '100%',
          'height': '100%',
          'color': colors.text,
          'borderRadius': '2px',
          'borderLeft': '5px solid transparent',
          ':hover,:focus': {
            color: colors.indigo,
            textDecoration: 'none',
            background: colors.gray10,
          },
        },
        match
          ? {
            'borderLeft': `5px solid ${colors.indigo}`,
            'background': colors.gray10,
            ':hover,:focus': {
              background: colors.gray10,
            },
          }
          : null,
      ]}
      {...props}
    />
  )
}

function Nav() {
  return (
    <nav
      css={{
        position: 'sticky',
        top: '4px',
        padding: '1em 1.5em',
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
        [mq.small]: {
          position: 'static',
          top: 'auto',
        },
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
        }}
      >
        <li>
          <NavLink to="/list">Reading List</NavLink>
        </li>
        <li>
          <NavLink to="/finished">Finished Books</NavLink>
        </li>
        <li>
          <NavLink to="/discover">Discover</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Layout
