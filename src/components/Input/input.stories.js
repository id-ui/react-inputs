import React, { useState } from 'react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import Input from './Input';
import { TYPES } from './constants';

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    type: {
      control: { type: 'select', options: Object.keys(TYPES) },
      description: 'input type. See docs for specific input',
      defaultValue: 'text',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
  },
  decorators: [withPropsTable],
  parameters: {
    props: {
      propTablesInclude: [Input],
    },
  },
};

export function Example(props) {
  const [value, setValue] = useState('');

  return <Input {...props} value={value} onChange={setValue} />;
}
