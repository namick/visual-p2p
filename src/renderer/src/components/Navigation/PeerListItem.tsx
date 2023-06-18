import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import List from '@mui/joy/List'
import ListSubheader from '@mui/joy/ListSubheader'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import ListItemContent from '@mui/joy/ListItemContent'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

interface Props {
  peer: {
    name: string
  }
}
export function PeerListItem({ peer }: Props) {
  return (
    <ListItem nested sx={{ mt: 2 }}>
      <ListSubheader>
        {peer.name}
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
        aria-labelledby="nav-list-tags"
        size="sm"
        sx={{
          '--ListItemDecorator-size': '32px',
        }}
      >
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '99px',
                  bgcolor: 'primary.300',
                }}
              />
            </ListItemDecorator>
            <ListItemContent>Personal</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '99px',
                  bgcolor: 'danger.400',
                }}
              />
            </ListItemDecorator>
            <ListItemContent>Work</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '99px',
                  bgcolor: 'warning.500',
                }}
              />
            </ListItemDecorator>
            <ListItemContent>Travels</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '99px',
                  bgcolor: 'success.400',
                }}
              />
            </ListItemDecorator>
            <ListItemContent>Concert tickets</ListItemContent>
          </ListItemButton>
        </ListItem>
      </List>
    </ListItem>
  )
}
