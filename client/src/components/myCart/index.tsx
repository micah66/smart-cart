import { Divider } from '@mui/material'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'

import ShoppingItem, {
  ShoppingItemType,
  EditableShoppingItemKey,
} from '../shoppingItem'
import ShoppingList from '../shoppingList'
import AddShoppingItem, { AddItemInputs } from '../shoppingItem/AddItem'
import { useLocalStorage } from '../../hooks/useStorage'
import StyledBox from './styles'

export default function MyCart() {
  const [items, setItems] = useLocalStorage<ShoppingItemType[]>({
    key: 'items',
    initValue: [],
  })

  const addItem = (data: AddItemInputs) => {
    setItems((existingItems) => [
      {
        id: Date.now().toString(),
        completed: false,
        name: data.name,
        quantity: data.quantity,
      },
      ...existingItems,
    ])
  }

  const handleDelete = (id: string) => {
    setItems((existingItems) => existingItems.filter((item) => item.id !== id))
  }

  const handleEdit = <K extends EditableShoppingItemKey>(
    id: string,
    key: K,
    value: ShoppingItemType[K],
  ) => {
    setItems((existingItems) =>
      existingItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [key]: value,
            }
          : item,
      ),
    )
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const reorderedItems = [...items]
    const [selectedItem] = reorderedItems.splice(result.source.index, 1)
    reorderedItems.splice(result.destination.index, 0, selectedItem)

    setItems(reorderedItems)
  }

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
                    {items?.map(({ id, completed, name, quantity }, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {({
                          dragHandleProps,
                          draggableProps,
                          innerRef: draggableRef,
                        }) => (
                          <div ref={draggableRef} {...draggableProps}>
                            <ShoppingItem
                              dragHandleProps={dragHandleProps}
                              id={id}
                              completed={completed}
                              name={name}
                              quantity={quantity}
                              draggable
                              onDelete={handleDelete}
                              editItem={handleEdit}
                            />
                            <Divider />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {placeholder}
                  </ShoppingList>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </StyledBox>
      <AddShoppingItem handleAddItem={addItem} />
    </>
  )
}
