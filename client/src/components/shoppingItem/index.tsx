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

export type ShoppingItemType = {
  id: string
  completed: boolean
  name: string
  quantity: number
}

export type EditableShoppingItemKey = keyof Omit<ShoppingItemType, 'id'>

export default function ShoppingItem({
  id,
  completed,
  name,
  quantity,
  onDelete,
  editItem,
}: ShoppingItemType & {
  onDelete?: (id: string) => void
  editItem: <K extends EditableShoppingItemKey>(
    id: string,
    key: K,
    value: ShoppingItemType[K],
  ) => void
}) {
  return (
    <ListItem disableGutters disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <Checkbox
            checked={completed}
            onChange={(event) =>
              editItem(id, 'completed', event.target.value === 'on')
            }
          />
        </ListItemIcon>
      </ListItemButton>
      <ListItemText
        primary={
          <TextField
            variant="standard"
            defaultValue={name}
            onBlur={(event) => editItem(id, 'name', event.target.value)}
          />
        }
      />
      <TextField
        type="number"
        variant="standard"
        inputProps={{ min: 1 }}
        defaultValue={quantity}
        onBlur={(event) => editItem(id, 'quantity', Number(event.target.value))}
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
