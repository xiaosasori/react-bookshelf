import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import { loadDevTools } from './dev-tools/load'
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
  loadDevTools(() => {
    ReactDOM.render(
      <React.StrictMode>
        <AppProviders>
          <App />
        </AppProviders>
      </React.StrictMode>,
      document.getElementById('root'),
    )
  })
})
