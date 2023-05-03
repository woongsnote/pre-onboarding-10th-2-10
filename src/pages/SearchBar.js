import React, { useState } from 'react';
import useKeywordSuggestion from '../hooks/useKeywordSuggestion';
import useInputChange from '../hooks/useInputChange';
import useKeyboard from '../hooks/useKeyboard';
import SearchBarInput from '../components/SearchBarInput';
import SuggestionList from '../components/SuggestionList';

const SearchBar = () => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [keyword, handleInputChange, setKeyword] = useInputChange();
  const [suggestions] = useKeywordSuggestion(keyword);

  const handleKeyDown = useKeyboard(
    suggestions,
    focusedIndex,
    setFocusedIndex,
    setKeyword
  );

  return (
    <>
      <SearchBarInput
        keyword={keyword}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />

      {keyword && suggestions.length > 0 ? (
        <SuggestionList
          suggestions={suggestions}
          focusedIndex={focusedIndex}
          setFocusedIndex={setFocusedIndex}
        />
      ) : (
        <div>검색어 없음</div>
      )}
    </>
  );
};

export default SearchBar;
