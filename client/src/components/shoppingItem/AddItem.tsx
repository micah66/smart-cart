import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { StyledForm, StyledAddButton } from './styles';
import ShoppingItemsAutocompleteList from '../shoppingItemsAutocompleteList';

export type AddItemInputs = {
  name: string;
};

export default function AddShoppingItem({
  handleAddItem,
}: {
  handleAddItem: (data: AddItemInputs) => void;
}) {
  const methods = useForm<AddItemInputs>();

  const onSubmit: SubmitHandler<AddItemInputs> = (data) => {
    handleAddItem(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <ShoppingItemsAutocompleteList name="name" />
        <StyledAddButton type="submit" disableRipple>
          Add
        </StyledAddButton>
      </StyledForm>
    </FormProvider>
  );
}
