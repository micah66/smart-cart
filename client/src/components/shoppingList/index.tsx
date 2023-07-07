import { List } from '@mui/material'

export default function ShoppingList({
  children,
}: {
  children: React.ReactNode[]
}) {
  return <List sx={{ overflow: 'auto', flexGrow: 1 }}>{children}</List>
}
