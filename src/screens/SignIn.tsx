import Logo from '@/components/Logo'
import Button from '@/components/Button'

function SignIn() {
  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div className="flex gap-3">
        <Button variant="primary">Login</Button>
        <Button variant="secondary">Register</Button>
      </div>
    </div>
  )
}

export default SignIn
