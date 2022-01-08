import React, { useCallback, useEffect, useState } from 'react';
import { omit } from 'lodash';
import textInputStory from 'components/TextInput/textInput.stories';
import SearchInput from './SearchInput';

export default {
  title: 'SearchInput',
  component: SearchInput,
  argTypes: {
    searchTimeout: {
      control: 'number',
      description: 'time interval during which onChange called only once',
      defaultValue: 300,
      table: {
        defaultValue: { summary: 300 },
      },
    },
    showSearchIcon: {
      control: 'boolean',
      description: 'whether show search icon or not',
      defaultValue: true,
      table: {
        defaultValue: { summary: true },
      },
    },
    searchIconPlacement: {
      control: { type: 'select', options: ['right', 'left'] },
      description: 'placement of search icon',
      defaultValue: 'left',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    ...omit(textInputStory.argTypes, ['type']),
  },
};

export function Playground({
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
    <SearchInput
      {...props}
      value={value}
      onChange={handleChange}
      onClear={undefined}
    />
  );
}

Playground.args = {};
