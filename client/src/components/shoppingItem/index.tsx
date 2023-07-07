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
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'

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
  draggable = false,
  onDelete,
  editItem,
  dragHandleProps,
}: ShoppingItemType & {
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
  draggable: boolean
  onDelete?: (id: string) => void
  editItem: <K extends EditableShoppingItemKey>(
    id: string,
    key: K,
    value: ShoppingItemType[K],
  ) => void
}) {
  return (
    <ListItem
      disableGutters
      disablePadding
      sx={{
        '&.dragging:active': {
          boxShadow: '0 0 10px 5px #ccc',
          opacity: '50%',
          transform: 'translate(5px, 5px)',
        },
      }}
    >
      {draggable && (
        <ListItemIcon {...dragHandleProps}>
          <DragIndicatorIcon />
        </ListItemIcon>
      )}
      <ListItemButton>
        <ListItemIcon>
          <Checkbox
            checked={completed}
            onChange={(event) =>
              editItem(id, 'completed', event.target.checked)
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
}
