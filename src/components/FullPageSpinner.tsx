
import { FaSpinner } from 'react-icons/fa'

function FullPageSpinner() {
  return (
    <div
      className="grid h-screen text-3xl place-items-center"
    >
      <FaSpinner className="animate-spin" aria-label="loading" />
    </div>
  )
}

export default FullPageSpinner
