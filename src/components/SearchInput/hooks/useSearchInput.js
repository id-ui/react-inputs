import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

export default ({
  value: providedValue,
  onChange,
  searchTimeout,
  onlyValue,
}) => {
  const [value, setValue] = useState(providedValue || '');

  useEffect(() => {
    setValue(providedValue || '');
  }, [providedValue]);

  const onChangeDebounced = useMemo(() => debounce(onChange, searchTimeout), [
    onChange,
    searchTimeout,
  ]);

  const handleChange = (e) => {
    const newValue = onlyValue ? e : e.target.value;
    setValue(newValue);
    onChangeDebounced(e);
  };

  return {
    value,
    onChange: handleChange,
  };
};
