import { List } from '@mui/material'

export default function ShoppingList({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) {
  return <List sx={{ width: '80%', margin: 'auto' }}>{children}</List>
}
