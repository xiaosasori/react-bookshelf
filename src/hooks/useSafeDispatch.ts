import * as React from 'react'

export function useSafeDispatch(dispatch: Function) {
  const mounted = React.useRef(false)
  React.useLayoutEffect(() => {
    mounted.current = true
    return () => { mounted.current = false }
  }, [])

  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : undefined),
    [dispatch],
  )
}
