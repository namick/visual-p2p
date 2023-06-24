import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { StyledEngineProvider } from '@mui/joy/styles'
import { CssVarsProvider } from '@mui/joy/styles'
import './assets/index.css'
import { MessageChannelProvider } from './hooks/useMessageChannels'
import filesTheme from './theme'
import App from './App'
import { RecoilSync } from 'recoil-sync'

function RecoilSyncWithDataChannel({ children }: { children: React.ReactNode }) {
  const [dataChannelPort, setDataChannelPort] = React.useState<MessagePort>()

  React.useEffect(() => {
    window.onmessage = (event: MessageEvent) => {
      if (event.source === window && event.data === 'message-channel-ports') {
        const dataChannelPort = event.ports[2]

        setDataChannelPort(dataChannelPort)
      }
    }
  }, [])

  return (
    <RecoilSync
      storeKey="dataChannel"
      listen={({ updateItem }) => {
        if (!dataChannelPort) return

        dataChannelPort.onmessage = ({ data: { key, value } }: MessageEvent) => {
          updateItem(key, value)
        }
      }}
    >
      {children}
    </RecoilSync>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilSyncWithDataChannel>
        <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
          <StyledEngineProvider injectFirst>
            <MessageChannelProvider>
              <App />
            </MessageChannelProvider>
          </StyledEngineProvider>
        </CssVarsProvider>
      </RecoilSyncWithDataChannel>
    </RecoilRoot>
  </React.StrictMode>
)
