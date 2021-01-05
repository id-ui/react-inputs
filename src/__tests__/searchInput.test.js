import React from 'react';
import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { SearchInput } from 'components/SearchInput';

describe('SearchInput', () => {
  it('accessible', async () => {
    const { container } = render(
      <div>
        <label htmlFor="id">label</label>
        <SearchInput id="id" showSearchIcon={false} />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('calls onChange one time in searchTimeout ms', async () => {
    const searchTimeout = 300;
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <SearchInput
        onChange={handleChange}
        data-testid="input"
        searchTimeout={searchTimeout}
      />
    );

    const value = 'value';
    user.type(getByTestId('input'), value);

    await waitFor(
      () => {
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(value);
      },
      { timeout: searchTimeout + 100 }
    );
  });
});
