import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/geist-mono/400.css'
import '@fontsource/hanken-grotesk/800.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
