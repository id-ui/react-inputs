# Input React Component

[![NPM](https://img.shields.io/npm/v/@idui/react-inputs.svg)](https://www.npmjs.com/package/@idui/react-inputs/)
[![Size](https://img.shields.io/bundlephobia/min/@idui/react-inputs)](https://www.npmjs.com/package/@idui/react-inputs)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Coverage Status](https://coveralls.io/repos/github/id-ui/react-inputs/badge.svg?branch=main)](https://coveralls.io/github/id-ui/react-inputs?branch=main)
[![LICENSE](https://img.shields.io/github/license/id-ui/react-inputs)](https://github.com/id-ui/react-inputs/blob/main/LICENSE)

## Install

```bash
npm install --save @idui/react-inputs
```

```bash
yarn add @idui/react-inputs
```


### TextInput

- [Docs](https://id-ui.github.io/react-inputs/?path=/docs/textinput--playground)
- [Playground](https://id-ui.github.io/react-inputs/?path=/story/textinput--playground)

```jsx
import React from 'react'
import { TextInput } from '@idui/react-inputs'

function Example() {
    const [value, setValue] = useState('');

    return (
        <TextInput
            value={value}
            onChange={setValue}
            type="text"
            
            onlyValue // call onChange with value, true by default
            isClearable // whether show clear icon or not, true by default
            onClear={undefined} // clear icon click handler, if not specified onChange with empty value called instead
            rightAddon={<SomeIcon />}
            leftAddon={<AnotherIcon />}
            disabled={false}
            hasError={false}
            
            mask="+7 (999) 999-99-99" // See react-input-mask, undefined by default
        />
    );
}
```

### NumberInput

- [Docs](https://id-ui.github.io/react-inputs/?path=/docs/numberinput--playground)
- [Playground](https://id-ui.github.io/react-inputs/?path=/story/numberinput--playground)

```jsx
import React from 'react'
import { NumberInput } from '@idui/react-inputs'

function Example() {
    const [value, setValue] = useState('');

    return (
        <NumberInput
            value={value}
            onChange={setValue}
            type="text"
            onlyValue // call onChange with value, true by default
            thousandsSeparator=" " // separator inserted between thousands, space by default
            countOfDigitsAfterPoint={2} // count of digits in integral part of float value, undefined by default
            // ... TextInput props
        />
    );
}
```

### useNumberInput hook

```jsx
import React from 'react'
import { useNumberInput } from '@idui/react-inputs'

function Example({ value: providedValue, onChange  }) {
    const {value, ...handlers} = useNumberInput({
        onChange,
        countOfDigitsAfterPoint: undefined,
        thousandsSeparator: ", ",
        onlyValue: true,
        value: providedValue,
    });

    return (
        <input
            value={value}
            {...handlers}
        />
    );
}
```

### SearchInput

- [Docs](https://id-ui.github.io/react-inputs/?path=/docs/searchinput--playground)
- [Playground](https://id-ui.github.io/react-inputs/?path=/story/searchinput--playground)

```jsx
import React from 'react'
import { SearchInput } from '@idui/react-inputs'

function Example() {
    const [value, setValue] = useState('');

    return (
        <SearchInput
            value={value}
            onChange={setValue}
            type="text"
            onlyValue // call onChange with value, true by default
            searchTimeout={300} // time interval during which onChange called only once, 300 by default
            showSearchIcon // whether show search icon or not, true by default
            searchIconPlacement="left" // show search icon 
            // ... TextInput props
        />
    );
}
```

### useSearchInput hook

```jsx
import React from 'react'
import { useNumberInput } from '@idui/react-inputs'

function Example({ value: providedValue, onSearch  }) {
    const {value, ...handlers} = useSearchInput({
        onChange: onSearch,
        searchTimeout: 300,
        onlyValue: true,
        value: providedValue,
    });

    return (
        <input
            value={value}
            {...handlers}
        />
    );
}
```

### TagInput

- [Docs](https://id-ui.github.io/react-inputs/?path=/docs/taginput--playground)
- [Playground](https://id-ui.github.io/react-inputs/?path=/story/taginput--playground)

```jsx
import React from 'react'
import { TagInput } from '@idui/react-inputs'

function Example() {
    const [value, setValue] = useState(["tag1"]);

    return (
        <TagInput
            value={value}
            onChange={setValue}
            type="text"
            onlyValue // call onChange with value, true by default
            searchTimeout={300} // time interval during which onChange called only once, 300 by default
            showSearchIcon // whether show search icon or not, true by default
            searchIconPlacement="left" // show search icon 
            // ... TextInput props
        />
    );
}
```

### Input

- [Docs](https://id-ui.github.io/react-inputs/?path=/docs/input--example)
- [Playground](https://id-ui.github.io/react-inputs/?path=/story/input--example)

```jsx
import React from 'react'
import Input from '@idui/react-inputs'

function Example(props) {
    const [value, setValue] = useState('');

    return (
        <Input
            value={value}
            onChange={setValue}
            // type="number" => NumberInput
            // type="search" => SearchInput
            // type="tag" // TagInput
            // any other type => TextInput
            
            // ... props for typed input
        />
    );
}
```

### Styling

```jsx
import React from 'react';
import styled from 'styled-components';
import { TextInput } from '@idui/react-inputs'; // or any other type of Input

const customColors = {
  default: {
    border: '#B3B3B3',
    color: '#313131',
    placeholder: '#B3B3B3',
    tag: '#14B9E4',
  },
  disabled: {
    border: '#f1eded',
    color: '#f1eded',
    tag: '#B3B3B3',
  },
  error: {
    border: '#C02908',
    color: '#C02908',
    background: '#FDDCDC',
    tag: '#C02908',
  },
  focused: {
    border: '#14B9E4',
    tag: '#11AFD9',
  },
};

const StyledTextInput = styled(TextInput)`
  min-height: 50px;
  padding: 12px 10px;
  border-radius: 15px;
  width: 500px;
  font-size: 16px;
`;

export function StylingExample({
  onChange,
  value: providedValue,
  onlyValue,
  ...props
}) {
  const [value, setValue] = useState(providedValue);

  useEffect(() => {
    setValue(providedValue);
  }, [providedValue]);

  const handleChange = useCallback(
    (e) => {
      setValue(onlyValue ? e : e.target.value);
      onChange(e);
    },
    [onChange, onlyValue]
  );

  return (
    <StyledTextInput
      {...props}
      value={value}
      onChange={handleChange}
      onClear={undefined}
      colors={customColors}
    />
  );
}
```

## License

MIT © [kaprisa57@gmail.com](https://github.com/id-ui)