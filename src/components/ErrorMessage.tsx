import * as colors from '@/styles/colors'

const errorMessageVariants = {
  stacked: { display: 'block' },
  inline: { display: 'inline-block' },
}

interface Props {
  variant?: 'stacked' | 'inline'
  error: Error
  [key: string]: any
}

function ErrorMessage({ error, variant = 'stacked', ...props }: Props) {
  return (
    <div
      role="alert"
      css={[{ color: colors.danger }, errorMessageVariants[variant]]}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        css={[
          { whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 },
          errorMessageVariants[variant],
        ]}
      >
        {error.message}
      </pre>
    </div>
  )
}

export default ErrorMessage
