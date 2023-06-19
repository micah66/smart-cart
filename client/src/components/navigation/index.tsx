import { Link } from '@tanstack/router'

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export default function Navigation({
  open,
  setOpen,
  setCurrentPage,
}: {
  open: boolean
  setOpen: (isOpen: boolean) => void
  setCurrentPage: (page: string) => void
}) {
  const handleClick = (page: string) => {
    setOpen(false)
    setCurrentPage(page)
  }

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box>
        <IconButton onClick={() => setOpen(false)}>
          <ArrowBackIcon />
        </IconButton>
        <List>
          {(
            [
              ['/', 'Home', <HomeIcon key="home" />],
              ['/about', 'About', <InfoIcon key="about" />],
              ['/my-cart', 'My Cart', <ShoppingCartIcon key="my-cart" />],
            ] as const
          ).map(([to, text, icon]) => (
            <Link key={to} to={to}>
              <ListItem onClick={() => handleClick(text)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
