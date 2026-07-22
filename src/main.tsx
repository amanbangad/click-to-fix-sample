import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (import.meta.env.DEV) {
  if (import.meta.hot) {
    import.meta.hot.on('vite:afterUpdate', () => {
      window.dispatchEvent(new CustomEvent('c2f:hmr'))
    })
  }
}
