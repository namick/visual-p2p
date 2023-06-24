import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import Input from '@mui/joy/Input'
import IconButton from '@mui/joy/IconButton'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded'
import MenuIcon from '@mui/icons-material/Menu'
import BookRoundedIcon from '@mui/icons-material/BookRounded'
import Menu from '../components/Menu'
import Layout from '../components/Layout'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ColorSchemeToggle } from '../components/ColorSchemeToggle'
import { localPeerState, drawerOpenState, screenState } from '../state'

export function Header() {
  const setDrawerOpen = useSetRecoilState(drawerOpenState)
  const setScreen = useSetRecoilState(screenState)
  const { name } = useRecoilValue(localPeerState)

  return (
    <Layout.Header>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <IconButton
          variant="outlined"
          size="sm"
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton size="sm" variant="solid" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
          <FindInPageRoundedIcon />
        </IconButton>
        <Typography component="h1" fontWeight="xl">
          {name}
        </Typography>
      </Box>
      <Input
        size="sm"
        placeholder="Search anything…"
        startDecorator={<SearchRoundedIcon color="primary" />}
        endDecorator={
          <IconButton variant="outlined" size="sm" color="neutral">
            <Typography fontWeight="lg" fontSize="sm" textColor="text.tertiary">
              /
            </Typography>
          </IconButton>
        }
        sx={{
          flexBasis: '500px',
          display: {
            xs: 'none',
            sm: 'flex',
          },
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
        <IconButton
          size="sm"
          variant="outlined"
          color="primary"
          sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
        >
          <SearchRoundedIcon />
        </IconButton>
        <IconButton
          size="sm"
          variant="outlined"
          color="primary"
          component="a"
          onClick={() => setScreen('Peers')}
        >
          <BookRoundedIcon />
        </IconButton>
        <Menu
          id="app-selector"
          control={
            <IconButton size="sm" variant="outlined" color="primary" aria-label="Apps">
              <GridViewRoundedIcon />
            </IconButton>
          }
          menus={[
            {
              label: 'Email',
              href: '/joy-ui/getting-started/templates/email/',
            },
            {
              label: 'Team',
              href: '/joy-ui/getting-started/templates/team/',
            },
            {
              label: 'Files',
              active: true,
              href: '/joy-ui/getting-started/templates/files/',
              'aria-current': 'page',
            },
          ]}
        />
        <ColorSchemeToggle />
      </Box>
    </Layout.Header>
  )
}
