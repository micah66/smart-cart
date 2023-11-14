import {
  Checkbox,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Draggable } from 'react-beautiful-dnd';

import { StyledListItem } from './styles';

export type ShoppingItemType = {
  id: string;
  completed: boolean;
  name: string;
};

export type DraggableItem = {
  disableDrag?: boolean;
  index?: number;
};

export type EditableShoppingItemKey = keyof Omit<ShoppingItemType, 'id'>;

export default function ShoppingItem({
  id,
  completed,
  name,
  disableDrag,
  onDelete,
  editItem,
  index,
}: ShoppingItemType &
  DraggableItem & {
    onDelete?: (id: string) => void;
    editItem: <K extends EditableShoppingItemKey>(
      id: string,
      key: K,
      value: ShoppingItemType[K]
    ) => void;
  }) {
  return (
    <Draggable key={id} draggableId={id} index={index as number}>
      {({ dragHandleProps, draggableProps, innerRef }, snapshot) => (
        <StyledListItem
          disableGutters
          disablePadding
          sx={{}}
          isDragging={snapshot.isDragging}
          ref={innerRef}
          {...draggableProps}
        >
          {!disableDrag && (
            <ListItemIcon sx={{ justifyContent: 'center' }} {...dragHandleProps}>
              <DragIndicatorIcon />
            </ListItemIcon>
          )}
          <ListItemButton disableGutters disableRipple>
            <ListItemIcon>
              <Checkbox
                checked={completed}
                onChange={(event) => editItem(id, 'completed', event.target.checked)}
              />
            </ListItemIcon>
          </ListItemButton>
          <ListItemText
            primary={
              <TextField
                InputProps={{ disableUnderline: true }}
                variant="standard"
                defaultValue={name}
                onBlur={(event) => editItem(id, 'name', event.target.value)}
              />
            }
          />
          {onDelete && (
            <IconButton onClick={() => onDelete(id)}>
              <CloseIcon />
            </IconButton>
          )}
        </StyledListItem>
      )}
    </Draggable>
  );
}

ShoppingItem.defaultProps = {
  index: -1,
  disableDrag: false,
  onDelete: undefined,
};
