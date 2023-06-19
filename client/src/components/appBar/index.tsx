import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

export default function SmartCartAppBar({
  handleOpenMenu,
  currentPage,
}: {
  handleOpenMenu: (e: React.MouseEvent<HTMLElement>) => void
  currentPage: string
}) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={handleOpenMenu}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {currentPage}
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Smart Cart
        </Typography>
        <Avatar />
      </Toolbar>
    </AppBar>
  )
}
