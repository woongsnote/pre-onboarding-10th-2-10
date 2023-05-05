import React, { useState } from 'react';
import useKeywordSuggestion from '../hooks/useKeywordSuggestion';
import useInputChange from '../hooks/useInputChange';
import useKeyboard from '../hooks/useKeyboard';
import SearchBarInput from '../components/SearchBarInput';
import SuggestionList from '../components/SuggestionList';
import SerachBarContainer from '../components/SerachBarContainer';
import SearchBarIcon from '../components/SearchBarIcon';
import PageTitle from '../components/PageTitle';
import { PAGE_TITLE, NO_DATA } from '../constants';
import EmptyList from '../components/EmptyList';

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
      <PageTitle title={PAGE_TITLE} />
      <SerachBarContainer>
        <SearchBarIcon />
        <SearchBarInput
          keyword={keyword}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
        />
        <button>검색</button>
      </SerachBarContainer>

      {keyword && suggestions.length > 0 ? (
        <SuggestionList
          suggestions={suggestions}
          focusedIndex={focusedIndex}
          setFocusedIndex={setFocusedIndex}
        />
      ) : (
        <EmptyList keyword={keyword} title={NO_DATA} />
      )}
    </>
  );
};

export default SearchBar;
