import { useRef } from 'react';

import { Box } from '@mui/material';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import ShoppingItem, { ShoppingItemType, EditableShoppingItemKey } from '../shoppingItem';
import ShoppingList from '../shoppingList';
import AddShoppingItem, { AddItemInputs } from '../shoppingItem/AddItem';
import { useLocalStorage } from '../../hooks/useStorage';
import StyledBox from './styles';

export default function MyCart() {
  const [items, setItems] = useLocalStorage<ShoppingItemType[]>({
    key: 'items',
    initValue: [],
  });

  const listEndRef = useRef<HTMLDivElement>(null);

  const scrollToListEnd = () => {
    if (!listEndRef.current) return;

    listEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const addItem = async (data: AddItemInputs) => {
    await setItems((existingItems) => [
      ...existingItems,
      {
        id: Date.now().toString(),
        completed: false,
        name: data.name,
      },
    ]);

    scrollToListEnd();
  };

  const handleDelete = (id: string) => {
    setItems((existingItems) => existingItems.filter((item) => item.id !== id));
  };

  const handleEdit = <K extends EditableShoppingItemKey>(
    id: string,
    key: K,
    value: ShoppingItemType[K]
  ) => {
    setItems((existingItems) =>
      existingItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [key]: value,
            }
          : item
      )
    );
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = [...items];
    const [selectedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, selectedItem);

    setItems(reorderedItems);
  };

  return (
    <>
      <StyledBox>
        {!items.length ? (
          <div>Add an item...</div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="shopping-list">
              {({ droppableProps, innerRef: droppableRef, placeholder }) => (
                <div {...droppableProps} ref={droppableRef}>
                  <ShoppingList>
                    {items?.map(({ id, completed, name }, index) => (
                      <ShoppingItem
                        key={id}
                        id={id}
                        index={index}
                        completed={completed}
                        name={name}
                        onDelete={handleDelete}
                        editItem={handleEdit}
                      />
                    ))}
                    {placeholder}
                    <Box ref={listEndRef} />
                  </ShoppingList>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </StyledBox>
      <AddShoppingItem handleAddItem={addItem} />
    </>
  );
}
