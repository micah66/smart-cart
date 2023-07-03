import { List } from '@mui/material'

export default function ShoppingList({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) {
  return <List sx={{ overflow: 'auto', flexGrow: 1 }}>{children}</List>
}
