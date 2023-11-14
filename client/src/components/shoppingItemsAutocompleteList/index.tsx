import { TextField, createFilterOptions } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

import { useLocalStorage } from '../../hooks/useStorage';
import { StyledShoppingItemsAutocompleteList } from '../shoppingItem/styles';

export type OptionType = {
  inputValue?: string;
  title: string;
};

export default function ShoppingItemsAutocompleteList({ name }: { name: string }) {
  const { control } = useFormContext();
  const [options, setOptions] = useLocalStorage<OptionType[]>({
    key: name,
    initValue: [],
  });
  const filter = createFilterOptions<OptionType>();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { ref, value, onBlur, onChange } }) => (
        <StyledShoppingItemsAutocompleteList<OptionType, false, false, true>
          ref={ref}
          value={value || { title: '' }}
          onBlur={onBlur}
          options={options}
          onChange={(_, newValue) => {
            const newOption: OptionType = { title: '' };
            if (typeof newValue === 'string') {
              newOption.title = newValue;
            } else if (newValue?.inputValue) {
              newOption.title = newValue.inputValue;
            } else if (newValue?.title) {
              newOption.title = newValue.title;
            }

            if (
              newOption.title &&
              !options.some((option) => option.title === newOption.title)
            ) {
              setOptions(() => [...options, newOption]);
            }

            onChange(newOption.title);
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(optionProps, option) => <li {...optionProps}>{option.title}</li>}
          renderInput={(params) => <TextField {...params} label="Add an item" />}
          filterOptions={(items, params) => {
            const filtered = filter(items, params);

            const { inputValue } = params;
            const isExisting = items.some(
              (option) => inputValue.toLowerCase() === option.title.toLowerCase()
            );
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                title: `Add "${inputValue}"`,
              });
            }

            return filtered;
          }}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.inputValue ?? option.title
          }
        />
      )}
    />
  );
}
