import IconButton from '@mui/joy/IconButton'
import List from '@mui/joy/List'
import ListSubheader from '@mui/joy/ListSubheader'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import ListItemContent from '@mui/joy/ListItemContent'
import { remotePeersState, screenState } from '../../state'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { PeerListItem } from './PeerListItem'

export default function Navigation() {
  const setScreen = useSetRecoilState(screenState)
  const remotePeers = useRecoilValue(remotePeersState)

  return (
    <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '4px' }}>
      <ListItem nested>
        <ListSubheader>
          Browse
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ '--IconButton-size': '24px', ml: 'auto' }}
          >
            <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            '& .JoyListItemButton-root': { p: '8px' },
          }}
        >
          <ListItem>
            <ListItemButton onClick={() => setScreen('Chat')} variant="soft" color="primary">
              <ListItemDecorator sx={{ color: 'inherit' }}>
                <FolderOpenIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Chat</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => setScreen('Peers')}>
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <ShareOutlinedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Peers</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>

      {remotePeers.map((peer, i) => (
        <PeerListItem name={peer.name} key={i} />
      ))}
    </List>
  )
}
