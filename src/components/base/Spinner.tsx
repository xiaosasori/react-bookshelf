import { FaSpinner } from 'react-icons/fa'

function Spinner(props: any) {
  return <FaSpinner {...props} aria-label="loading" className="animate-spin" />
}

export default Spinner
