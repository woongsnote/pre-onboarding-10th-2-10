import React from 'react';
import { PLACEHOLDER_TEXT } from '../constants';

const SearchBarInput = ({ keyword, handleInputChange, handleKeyDown }) => {
  return (
    <input
      type="search"
      value={keyword}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder={PLACEHOLDER_TEXT}
    />
  );
};

export default SearchBarInput;
