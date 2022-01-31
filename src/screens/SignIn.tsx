import Logo from '@/components/Logo'
import Button from '@/components/Button'
import { Modal, ModalContents, ModalOpenButton } from '@/components/Modal'
import LoginForm from '@/components/LoginForm'

function SignIn() {
  // const {login, register} = useAuth()
  function login(values: any) {
    console.log('login', values)
    return new Promise(resolve => setTimeout(resolve, 200))
  }
  function register() {
    console.log('register')
    return new Promise(resolve => setTimeout(resolve, 200))
  }
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div className="flex gap-3">
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={login}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

export default SignIn
