import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import store from './store'
import theme from './theme'
import App from './App.jsx'
import './index.css'

// Filter noisy non-boolean attribute warnings for `item` while we trace source
const _origConsoleError = console.error.bind(console)
console.error = (...args) => {
  try {
    const msg = String(args[0] || '')
    if (msg.includes('non-boolean attribute') && msg.includes('item')) {
      console.debug('Filtered non-boolean `item` warning', new Error().stack)
      return
    }
  } catch (e) {
    // fall through
  }
  _origConsoleError(...args)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
