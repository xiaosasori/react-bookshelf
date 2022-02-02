import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// @ts-ignore
import { server } from './test/server/dev-server.js'
import { AppProviders } from './context'

async function prepare() {
  // if (import.meta.env.DEV) {
  //   return worker.start();
  // }
  return server.start()
}
prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById('root'),
  )
})
