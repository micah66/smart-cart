import { List } from '@mui/material';

export default function ShoppingList({ children }: { children: React.ReactNode[] }) {
  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginInline: '10px',
      }}
    >
      {children}
    </List>
  );
}
