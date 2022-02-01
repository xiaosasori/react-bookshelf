import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import type { FormEvent } from 'react'
import React from 'react'
import Spinner from './base/Spinner'
import ErrorMessage from './ErrorMessage'
import Input from './base/Input'
import { useAsync } from '@/hooks'

interface Props {
  onSubmit: (values: any) => void
  submitButton: EmotionJSX.Element
}
function LoginForm({ onSubmit, submitButton }: Props) {
  const { isLoading, isError, error, run } = useAsync()
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    // @ts-ignore
    const { username, password } = (event.target as HTMLFormElement).elements

    run(
      onSubmit({
        username: username.value,
        password: password.value,
      }),
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-stretch space-y-4">
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <Input id="password" />
      </div>
      <div>
        {React.cloneElement(
          submitButton,
          { type: 'submit' },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          !isLoading ? <Spinner /> : null,
        )}
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  )
}

export default LoginForm
