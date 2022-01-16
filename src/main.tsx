import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// @ts-ignore
import { server } from './test/server/dev-server.js'

async function prepare() {
  // if (import.meta.env.DEV) {
  //   return worker.start();
  // }
  return server.start()
}
prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  )
})
