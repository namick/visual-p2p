import AspectRatio from '@mui/joy/AspectRatio'
import Avatar from '@mui/joy/Avatar'
import AvatarGroup from '@mui/joy/AvatarGroup'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import IconButton from '@mui/joy/IconButton'
import Divider from '@mui/joy/Divider'
import Sheet from '@mui/joy/Sheet'
import Button from '@mui/joy/Button'
import CloseIcon from '@mui/icons-material/Close'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useRecoilValue } from 'recoil'
import { currentCoreState } from '@renderer/state'

export function SideColumn() {
  const core = useRecoilValue(currentCoreState)

  return (
    <Sheet
      sx={{
        display: { xs: 'none', sm: 'initial' },
        borderLeft: '1px solid',
        borderColor: 'neutral.outlinedBorder',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ flex: 1 }}>Core</Typography>
        <IconButton variant="outlined" color="neutral" size="sm">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex' }}>
        <Button
          variant="soft"
          sx={{
            borderRadius: 0,
            borderBottom: '2px solid',
            borderColor: 'primary.solidBg',
            flex: 1,
            py: '1rem',
          }}
        >
          Details
        </Button>
        <Button variant="plain" color="neutral" sx={{ borderRadius: 0, flex: 1, py: '1rem' }}>
          Activity
        </Button>
      </Box>
      <AspectRatio ratio="21/9">
        <img alt="apple-core" src="/src/assets/apple-core.jpeg" />
      </AspectRatio>
      <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography level="body2" mr={1}>
          Shared with
        </Typography>
        <AvatarGroup size="sm" sx={{ '--Avatar-size': '24px' }}>
          <Avatar src="https://i.pravatar.cc/24?img=6" srcSet="https://i.pravatar.cc/48?img=6 2x" />
          <Avatar src="https://i.pravatar.cc/24?img=7" srcSet="https://i.pravatar.cc/48?img=7 2x" />
          <Avatar src="https://i.pravatar.cc/24?img=8" srcSet="https://i.pravatar.cc/48?img=8 2x" />
          <Avatar src="https://i.pravatar.cc/24?img=9" srcSet="https://i.pravatar.cc/48?img=9 2x" />
        </AvatarGroup>
      </Box>
      <Divider />
      <Box
        sx={{
          gap: 2,
          p: 2,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          '& > *:nth-child(odd)': { color: 'text.secondary' },
        }}
      >
        <Typography level="body2">Name</Typography>
        <Typography level="body2" textColor="text.primary">
          {core?.name}
        </Typography>

        <Typography level="body2">Owner</Typography>
        <Typography level="body2" textColor="text.primary">
          {core?.peer}
        </Typography>

        <Typography level="body2">Size</Typography>
        <Typography level="body2" textColor="text.primary">
          3,6 MB (3,258,385 bytes)
        </Typography>

        <Typography level="body2">Storage used</Typography>
        <Typography level="body2" textColor="text.primary">
          3,6 MB (3,258,385 bytes)
        </Typography>

        <Typography level="body2">Writeable</Typography>
        <Typography level="body2" textColor="text.primary">
          {core?.writeable ? 'Yes' : 'No'}
        </Typography>

        <Typography level="body2">Value encoding</Typography>
        <Typography level="body2" textColor="text.primary">
          {core?.valueEncoding}
        </Typography>

        <Typography level="body2">Key</Typography>
        <Typography level="body2" textColor="text.primary" noWrap>
          {core?.key}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ py: 2, px: 1 }}>
        <Button variant="plain" size="sm" endDecorator={<EditOutlinedIcon />}>
          Add a description
        </Button>
      </Box>
    </Sheet>
  )
}
