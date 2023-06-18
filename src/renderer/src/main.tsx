import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { StyledEngineProvider } from '@mui/joy/styles'
import { CssVarsProvider } from '@mui/joy/styles'
import './assets/index.css'
import { MessageChannelProvider } from './hooks/useMessageChannels'
import filesTheme from './theme'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
        <StyledEngineProvider injectFirst>
          <MessageChannelProvider>
            <App />
          </MessageChannelProvider>
        </StyledEngineProvider>
      </CssVarsProvider>
    </RecoilRoot>
  </React.StrictMode>
)
