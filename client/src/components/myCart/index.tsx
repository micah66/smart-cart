import { Fragment } from 'react'
import { Divider } from '@mui/material'

import ShoppingItem, { ShoppingItemType } from '../shoppingItem'
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

  return (
    <StyledBox>
      <ShoppingList>
        {!items.length ? (
          <div>Add an item...</div>
        ) : (
          items?.map(({ id, completed, name, quantity }) => (
            <Fragment key={id}>
              <ShoppingItem
                id={id}
                completed={completed}
                name={name}
                quantity={quantity}
                onDelete={handleDelete}
                editItem={(selectedId, key, value) => {
                  setItems((existingItems) =>
                    existingItems.map((item) => {
                      if (item.id === selectedId) {
                        return {
                          ...item,
                          [key]: value,
                        }
                      }

                      return item
                    }),
                  )
                }}
              />
              <Divider />
            </Fragment>
          ))
        )}
      </ShoppingList>
      <AddShoppingItem handleAddItem={addItem} />
    </StyledBox>
  )
}
