import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import List from '@mui/joy/List'
import ListSubheader from '@mui/joy/ListSubheader'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import ListItemContent from '@mui/joy/ListItemContent'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { selectedCoreState, selectedPeerState } from '../../state'
import { useRecoilValue } from 'recoil'

interface Props {
  name: string
}
export function PeerListItem({ name }: Props) {
  const bgcolors = ['primary.300', 'danger.400', 'warning.500', 'success.400']
  const peer = useRecoilValue(selectedPeerState(name))

  return (
    <ListItem nested sx={{ mt: 2 }}>
      <ListSubheader>
        {name}
        <IconButton
          size="sm"
          variant="plain"
          color="primary"
          sx={{ '--IconButton-size': '24px', ml: 'auto' }}
        >
          <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </ListSubheader>
      <List size="sm" sx={{ '--ListItemDecorator-size': '32px' }}>
        {peer?.cores.map((core, i) => (
          <PeerCoreItem
            name={name}
            coreKey={core.key}
            bgcolor={bgcolors[i % bgcolors.length]}
            key={i}
          />
        ))}
      </List>
    </ListItem>
  )
}

interface PeerCoreItemProps {
  name: string
  coreKey: string
  bgcolor: string
}

function PeerCoreItem({ name, coreKey, bgcolor }: PeerCoreItemProps) {
  const core = useRecoilValue(selectedCoreState({ name, coreKey }))

  if (!core) return null

  return (
    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <Box
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '99px',
              bgcolor,
            }}
          />
        </ListItemDecorator>
        <ListItemContent>{core.name}</ListItemContent>
      </ListItemButton>
    </ListItem>
  )
}
