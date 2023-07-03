import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function ShoppingItem({
  id,
  completed,
  name,
  quantity,
  onDelete,
  toggleItem,
}: {
  id: string
  completed: boolean
  name: string
  quantity: number
  onDelete?: (id: string) => void
  toggleItem?: (id: string) => void
}) {
  return (
    <ListItem disableGutters disablePadding>
      {toggleItem && (
        <ListItemButton>
          <ListItemIcon>
            <Checkbox checked={completed} onChange={() => toggleItem(id)} />
          </ListItemIcon>
        </ListItemButton>
      )}
      <ListItemText
        primary={<TextField variant="standard" defaultValue={name} />}
      />
      <TextField
        type="number"
        variant="standard"
        inputProps={{ min: 1 }}
        defaultValue={quantity}
      />
      {onDelete && (
        <IconButton onClick={() => onDelete(id)}>
          <CloseIcon />
        </IconButton>
      )}
    </ListItem>
  )
}

ShoppingItem.defaultProps = {
  onDelete: undefined,
  toggleItem: undefined,
}
