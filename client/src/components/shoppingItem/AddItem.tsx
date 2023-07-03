import { useForm, SubmitHandler } from 'react-hook-form'
import StyledForm from './styles'

export type AddItemInputs = {
  name: string
  quantity: number
}

export default function AddShoppingItem({
  handleAddItem,
}: {
  handleAddItem: (data: AddItemInputs) => void
}) {
  const { register, handleSubmit, reset } = useForm<AddItemInputs>()
  const onSubmit: SubmitHandler<AddItemInputs> = (data) => {
    handleAddItem(data)
    reset()
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Add a new item"
        {...register('name', { required: true })}
      />
      <input
        type="number"
        defaultValue={1}
        min={1}
        {...register('quantity', { required: true, min: 1 })}
      />
      <input type="submit" value="Add Item" />
    </StyledForm>
  )
}
