import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { TextInput } from 'components/TextInput';
import { colors } from 'theme';
import Icon from '@idui/react-icon';
import { useSearchInput } from './hooks';

function SearchInput(
  { showSearchIcon, searchIconPlacement, leftAddon, rightAddon, ...props },
  ref
) {
  const searchInputProps = useSearchInput(props);

  const searchIcon = showSearchIcon && (
    <Icon
      name="search"
      color={colors.default.border}
      hoverColor={colors.focused.border}
      size="1.6rem"
    />
  );

  return (
    <TextInput
      {...props}
      {...searchInputProps}
      ref={ref}
      onlyValue={false}
      type="text"
      rightAddon={rightAddon || (searchIconPlacement === 'right' && searchIcon)}
      leftAddon={leftAddon || (searchIconPlacement === 'left' && searchIcon)}
    />
  );
}

const SearchInputWithRef = React.forwardRef(SearchInput);

SearchInputWithRef.propTypes = {
  ..._.omit(TextInput.propTypes, ['type']),
  searchTimeout: PropTypes.number,
  showSearchIcon: PropTypes.bool,
  searchIconPlacement: PropTypes.oneOf(['right', 'left']),
};

SearchInputWithRef.defaultProps = {
  ..._.omit(TextInput.defaultProps, ['type']),
  searchTimeout: 300,
  showSearchIcon: true,
  searchIconPlacement: 'left',
};

export default SearchInputWithRef;
