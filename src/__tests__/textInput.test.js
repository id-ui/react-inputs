import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { TextInput } from 'components/TextInput';
import { NumberInput } from '../components/NumberInput';

describe('TextInput', () => {
  it('accessible', async () => {
    const { container } = render(
      <div>
        <label htmlFor="id">label</label>
        <TextInput id="id" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('calls onChange with value if onlyValue === true', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <TextInput onChange={handleChange} data-testid="input" />
    );

    const value = 'value';
    user.type(getByTestId('input'), value);

    expect(handleChange).toHaveBeenCalledTimes(value.length);
    expect(handleChange.mock.calls).toEqual(
      [...value].map((letter, index) => [value.substring(0, index + 1)])
    );
  });

  it('calls onChange with event if onlyValue === false', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <TextInput
        onChange={handleChange}
        onlyValue={false}
        data-testid="input"
      />
    );

    const value = 'v';
    user.type(getByTestId('input'), value);

    expect(handleChange).toHaveBeenCalledTimes(value.length);

    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('mask', async () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <TextInput
        onChange={handleChange}
        data-testid="input"
        mask="+7 (999)-999-99-99"
        maskPlaceholder="+7 (___)-___-__-__"
      />
    );

    const input = getByTestId('input');
    user.type(input, '8991991919');

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('+7 (899)-199-19-19');
    });
  });

  it('clears value and sets focus to input', async () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <TextInput onChange={handleChange} value="value" data-testid="input" />
    );

    const input = getByTestId('input');
    const clearButton =
      input.nextElementSibling.firstElementChild.firstElementChild;

    user.click(clearButton);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('');
    expect(document.activeElement).toEqual(input);
  });

  it('clears value and sets focus to input if onlyValue === false', async () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <TextInput
        onChange={handleChange}
        value="value"
        data-testid="input"
        onlyValue={false}
      />
    );

    const input = getByTestId('input');
    const clearButton =
      input.nextElementSibling.firstElementChild.firstElementChild;

    user.click(clearButton);

    // expect(handleChange).toHaveBeenCalledTimes(1)
    // expect(handleChange).toHaveBeenCalledWith(
    //     expect.any(Object)
    // );
    expect(input.value).toEqual('');
    expect(document.activeElement).toEqual(input);
  });

  it('calls onClear and does not call onChange if onClear specified', async () => {
    const handleChange = jest.fn();
    const handleClear = jest.fn();
    const { getByTestId } = render(
      <TextInput
        onChange={handleChange}
        onClear={handleClear}
        value="value"
        data-testid="input"
        hasError
      />
    );

    const input = getByTestId('input');
    const clearButton =
      input.nextElementSibling.firstElementChild.firstElementChild;

    user.click(clearButton);

    expect(handleChange).toHaveBeenCalledTimes(0);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange if disabled', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <TextInput onChange={handleChange} data-testid="input" disabled />
    );

    const value = 'value';
    user.type(getByTestId('input'), value);

    expect(handleChange).toHaveBeenCalledTimes(0);
  });

  it('handles restrictions', async () => {
    const handleChange = jest.fn();
    const maxLength = 10;

    const { getByTestId } = render(
      <TextInput
        onChange={handleChange}
        maxlength={maxLength}
        data-testid="input"
      />
    );

    const input = getByTestId('input');
    fireEvent.change(input, {
      target: {
        value: '1'.repeat(maxLength + 10),
      },
    });

    expect(handleChange).toHaveBeenCalledWith('1'.repeat(maxLength));

    handleChange.mockClear();

    fireEvent.change(input, {
      target: {
        value: '1'.repeat(maxLength - 2),
      },
    });

    expect(handleChange).toHaveBeenCalledWith('1'.repeat(maxLength - 2));
  });
});
