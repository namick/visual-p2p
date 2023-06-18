import CssBaseline from '@mui/joy/CssBaseline'
import { useRecoilState, useRecoilValue } from 'recoil'
import { drawerOpenState, screenState } from './state'
import Layout from './components/Layout'
import Navigation from './components/Navigation'
import { Peers } from './screens/Peers'
import { Chat } from './screens/Chat'
import { Header } from './components/Header'

export function App(): JSX.Element {
  const screen = useRecoilValue(screenState)
  const [drawerOpen, setDrawerOpen] = useRecoilState(drawerOpenState)

  return (
    <>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
          },
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Header />
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        {screen === 'Peers' && <Peers />}
        {screen === 'Chat' && <Chat />}
      </Layout.Root>
    </>
  )
}

export default App
