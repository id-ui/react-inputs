import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { TagInput } from 'components/TagInput';

describe('TagInput', () => {
  it('accessible', async () => {
    const { container } = render(
      <div>
        <label htmlFor="id">label</label>
        <TagInput id="id" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('calls onChange with array of values', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <TagInput onChange={handleChange} data-testid="input" />
    );

    const value = 'value';

    const input = getByTestId('input');

    // onChange won't be called if no value
    fireEvent.keyDown(input, {
      keyCode: 13,
    });

    user.type(input, value);

    // only for coverage
    fireEvent.keyDown(input, {
      keyCode: 37,
    });

    fireEvent.keyDown(input, {
      keyCode: 13,
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith([value]);
  });

  it('clears value on clearValue icon click', async () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <TagInput onChange={handleChange} value={['value']} data-testid="input" />
    );

    const input = getByTestId('input');
    const clearButton =
      input.previousElementSibling.firstElementChild.firstElementChild;

    user.click(clearButton);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('removes tag on clearTag icon click', async () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <TagInput
        onChange={handleChange}
        value={['tag1', 'tag2']}
        data-testid="input"
      />
    );

    const tag = getByText('tag2');
    const clearButton = tag.lastElementChild;

    user.click(clearButton);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(['tag1']);
  });

  it('removes last tag on Backspace key down if no value', async () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <TagInput
        onChange={handleChange}
        value={['tag1', 'tag2']}
        data-testid="input"
      />
    );

    const input = getByTestId('input');
    fireEvent.keyDown(input, {
      keyCode: 8,
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(['tag1']);
  });
});
