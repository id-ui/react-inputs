import { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

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

  const onChangeDebounced = useMemo(() => _.debounce(onChange, searchTimeout), [
    onChange,
    searchTimeout,
  ]);

  const handleChange = useCallback(
    (e) => {
      const newValue = onlyValue ? e : e.target.value;
      setValue(newValue);
      onChangeDebounced(e);
    },
    [onChangeDebounced, onlyValue]
  );

  return {
    value,
    onChange: handleChange,
  };
};
