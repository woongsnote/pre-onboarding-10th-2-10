import React from 'react';

const SearchBarInput = ({ keyword, handleInputChange, handleKeyDown }) => {
  return (
    <input
      type="text"
      value={keyword}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="search"
    />
  );
};

export default SearchBarInput;
