import React from 'react';

const SearchBarInput = ({ keyword, handleInputChange, handleKeyDown }) => {
  return (
    <div className="search-form">
      <input
        className="search-input"
        type="text"
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="질환명을 입력해주세요."
      />
      <button className="search-button">
        <i className="bi bi-search" />
      </button>
    </div>
  );
};

export default SearchBarInput;
