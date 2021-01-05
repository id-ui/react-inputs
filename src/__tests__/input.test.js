import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Input from 'components/Input';

describe('Input', () => {
  it('renders input with correct type', async () => {
    const { container } = render(
      <div>
        <label htmlFor="id">label</label>
        <Input id="id" type="text" />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
