import { Fragment } from 'react'
import { Divider } from '@mui/material'

import ShoppingItem from '../shoppingItem'
import ShoppingList from '../shoppingList'
import AddShoppingItem, { AddItemInputs } from '../shoppingItem/AddItem'
import { useLocalStorage } from '../../hooks/useStorage'

type ShoppingItemType = {
  id: string
  completed: boolean
  name: string
  quantity: number
}

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

  const toggleItem = (id: string) => {
    setItems((existingItems) =>
      existingItems.map((item) => ({
        ...item,
        completed: item.id === id ? !item.completed : item.completed,
      })),
    )
  }

  return (
    <>
      <AddShoppingItem handleAddItem={addItem} />
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
                toggleItem={toggleItem}
              />
              <Divider />
            </Fragment>
          ))
        )}
      </ShoppingList>
    </>
  )
}
