import { useState } from 'react'
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';

export default function CustomAutoComplete({ options, searchValue, setSearchValue }) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: options,
    getOptionLabel: (option) => option.label,
    searchValue,
    onChange: (event, newValue) => setSearchValue(newValue),
  });

  return (
    <div style={{ marginBottom: 16 }}>
      <Label {...getInputLabelProps()}>Pick a movie</Label>
      <Root {...getRootProps()} className={focused ? 'Mui-focused' : ''}>
        <Input {...getInputProps()} />
      </Root>
      {groupedOptions.length > 0 && (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <Option key={index}>{option.label}</Option>
          ))}
        </Listbox>
      )}
    </div>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Label = styled('label')`
  display: block;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Root = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${grey[300]};
  background: ${grey[900]};
  border: 1px solid ${grey[700]};
  box-shadow: 0px 2px 4px ${'rgba(0,0,0, 0.5)'
    };
  display: flex;
  gap: 5px;
  padding-right: 5px;
  overflow: hidden;
  width: 320px;

  &.Mui-focused {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${blue[600]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const Input = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${grey[300]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  flex: 1 0 auto;
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  max-height: 300px;
  z-index: 1;
  position: absolute;
  background: ${grey[900]};
  border: 1px solid ${grey[700]};
  color: ${grey[300]};
  box-shadow: 0px 2px 3px ${'rgba(0,0,0, 0.50)'
    };
  `,
);

const Option = styled('li')(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
  }

  &[aria-selected=true] {
    background-color: ${blue[900]};
    color: ${blue[100]};
  }

  &.Mui-focused,
  &.Mui-focusVisible {
    background-color: ${grey[800]};
    color: ${grey[300]};
  }

  &.Mui-focusVisible {
    box-shadow: 0 0 0 3px ${blue[500]};
  }

  &[aria-selected=true].Mui-focused,
  &[aria-selected=true].Mui-focusVisible {
    background-color: ${blue[900]};
    color: ${blue[100]};
  }
  `,
);