import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { NumberInput } from 'components/NumberInput';

describe('NumberInput', () => {
  it('accessible', async () => {
    const { container } = render(
      <div>
        <label htmlFor="id">label</label>
        <NumberInput id="id" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('calls onChange with number', async () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <NumberInput onChange={handleChange} data-testid="input" />
    );

    const value = '1000000';

    const input = getByTestId('input');
    fireEvent.change(input, {
      target: {
        value,
      },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(parseInt(value, 10));
  });

  it('handles restrictions', async () => {
    const handleChange = jest.fn();
    const max = 100;
    const min = 50;
    const { getByTestId } = render(
      <NumberInput
        onChange={handleChange}
        max={max}
        min={min}
        data-testid="input"
      />
    );

    const input = getByTestId('input');
    fireEvent.change(input, {
      target: {
        value: max + 10,
      },
    });

    expect(handleChange).toHaveBeenCalledWith(max);

    handleChange.mockClear();

    fireEvent.change(input, {
      target: {
        value: min - 10,
      },
    });

    expect(handleChange).toHaveBeenCalledWith(min);

    handleChange.mockClear();

    const average = (max + min) / 2;

    fireEvent.change(input, {
      target: {
        value: average,
      },
    });

    expect(handleChange).toHaveBeenCalledWith(average);
  });

  it('calls onChange with correct value if user removes symbols', async () => {
    const handleChange = jest.fn();
    const value = '1000';
    const { getByTestId, rerender } = render(
      <NumberInput onChange={handleChange} value={value} data-testid="input" />
    );

    const input = getByTestId('input');
    input.setSelectionRange(2, 2);

    fireEvent.keyDown(input, {
      key: 'Backspace',
      which: 8,
      keyCode: 8,
    });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('');
    });

    handleChange.mockClear();

    input.setSelectionRange(2, 5);
    fireEvent.keyDown(input, {
      key: 'Backspace',
      which: 8,
      keyCode: 8,
    });
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(1);
    });

    handleChange.mockClear();

    input.setSelectionRange(4, 4);
    fireEvent.keyDown(input, {
      key: 'Backspace',
      which: 8,
      keyCode: 8,
    });
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(0);
    });

    handleChange.mockClear();

    input.setSelectionRange(1, 1);
    fireEvent.keyDown(input, {
      key: 'Erase',
      which: 46,
      keyCode: 46,
    });
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(100);
    });

    handleChange.mockClear();

    rerender(
      <NumberInput
        onChange={handleChange}
        value={value}
        data-testid="input"
        thousandsSeparator="    "
      />
    );

    input.setSelectionRange(5, 5);

    fireEvent.keyDown(input, {
      key: 'Backspace',
      which: 8,
      keyCode: 8,
    });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('');
    });

    handleChange.mockClear();

    rerender(
      <NumberInput
        onChange={handleChange}
        value={value}
        data-testid="input"
        thousandsSeparator="    "
        onlyValue={false}
      />
    );

    input.setSelectionRange(5, 5);

    fireEvent.keyDown(input, {
      key: 'Backspace',
      which: 8,
      keyCode: 8,
    });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
    });

    handleChange.mockClear();

    rerender(
      <NumberInput
        onChange={handleChange}
        value={value}
        data-testid="input"
        thousandsSeparator=""
      />
    );

    input.setSelectionRange(1, 1);

    fireEvent.keyDown(input, {
      key: 'Backspace',
      which: 8,
      keyCode: 8,
    });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(0);
    });
  });

  it('jumps over separator on arrow key down', async () => {
    const handleChange = jest.fn();
    const value = '1000';
    const { getByTestId } = render(
      <NumberInput
        onChange={handleChange}
        value={value}
        data-testid="input"
        thousandsSeparator={'  '}
      />
    );

    const input = getByTestId('input');
    input.setSelectionRange(3, 3);

    // only for coverage
    fireEvent.keyDown(input, {
      key: 'ArrowUp',
      which: 38,
      keyCode: 38,
    });

    fireEvent.keyDown(input, {
      key: 'ArrowLeft',
      which: 37,
      keyCode: 37,
    });

    await waitFor(() => {
      expect(input.selectionStart).toEqual(0);
    });

    fireEvent.keyDown(input, {
      key: 'ArrowLeft',
      which: 37,
      keyCode: 37,
    });

    await waitFor(() => {
      expect(input.selectionStart).toEqual(0);
    });

    input.setSelectionRange(1, 1);

    fireEvent.keyDown(input, {
      key: 'ArrowRight',
      which: 39,
      keyCode: 39,
    });

    await waitFor(() => {
      expect(input.selectionStart).toEqual(4);
    });
  });

  it('displays formatted number', () => {
    const { getByTestId } = render(
      <NumberInput value="1000000" data-testid="input" />
    );

    const input = getByTestId('input');
    expect(input.value).toEqual('1 000 000');
  });

  it('displays formatted number number with point', () => {
    const { getByTestId, rerender } = render(
      <NumberInput value="1000000.05" data-testid="input" />
    );

    const input = getByTestId('input');
    expect(input.value).toEqual('1 000 000.05');

    rerender(
      <NumberInput
        value="1000000.0015345"
        data-testid="input"
        countOfDigitsAfterPoint={3}
        thousandsSeparator=","
      />
    );

    expect(input.value).toEqual('1,000,000.002');
  });

  it('calls onChange with event if onlyValue === false', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <NumberInput
        onChange={handleChange}
        onlyValue={false}
        data-testid="input"
      />
    );

    const value = '1';
    user.type(getByTestId('input'), value);

    expect(handleChange).toHaveBeenCalledTimes(value.length);

    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
