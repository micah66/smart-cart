import { Autocomplete, Button, ListItem, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledForm = styled('form')(() => ({
  display: 'flex',
  justifyContent: 'stretch',
}));

export const StyledShoppingItemsAutocompleteList = styled(Autocomplete)({
  width: '100%',
  '.MuiInputBase-root': {
    backgroundColor: '#fff',
    borderRadius: '10px',
  },
}) as typeof Autocomplete;

export const StyledAddButton = styled(Button)(() => ({
  backgroundColor: '#fefefe',
  color: 'black',
  borderRadius: '10px',
}));

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop: string) => !['isDragging'].includes(prop),
})<{ isDragging: boolean }>(({ isDragging }) => ({
  borderRadius: '4px',
  display: 'flex',
  width: 'inherit',
  height: '40px',
  alignItems: 'center',
  boxShadow: '#000 0px 0px 30px -8px',
  '& > *': {
    paddingLeft: '4px',
  },

  '& *, & input': {
    color: 'rgba(225, 255, 255, 0.75)',
  },

  '&:nth-of-type(odd)': {
    backgroundColor: `rgba(255, 255, 255, ${isDragging ? '0.5' : '0.15'})`,
  },

  '&:nth-of-type(even)': {
    backgroundColor: `rgba(255, 255, 255, ${isDragging ? '0.5' : '0.25'})`,
  },

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
}));
