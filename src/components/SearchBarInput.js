import React from 'react';

const SearchBarInput = ({ keyword, handleInputChange, handleKeyDown }) => {
  return (
    <input
      className="search-input"
      type="text"
      value={keyword}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="질환명을 입력해주세요."
    />
  );
};

export default SearchBarInput;
