import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import { ListItemText } from '@mui/material'
import { ADMIN_MENUS } from '@vgl/constants'
import ListItem from '@mui/material/ListItem'
import { useNavigate } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton'

type Anchor = 'top'

interface toggleDrawerProps {
  state: {
    top: boolean
  }
  toggleDrawer: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

const MobileHeader = (props: toggleDrawerProps) => {
  const { state, toggleDrawer } = props
  const navigate = useNavigate()

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      sx={{ width: 'auto' }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {ADMIN_MENUS.map(({ path, title }) => (
          <ListItem key={title} disablePadding>
            <ListItemButton onClick={() => navigate(path)}>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
  return (
    <div>
      <Drawer
        anchor={'top'}
        open={state['top']}
        onClose={toggleDrawer('top', false)}
      >
        {list('top')}
      </Drawer>
    </div>
  )
}

export default MobileHeader
