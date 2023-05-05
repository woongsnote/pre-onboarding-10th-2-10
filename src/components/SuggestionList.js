import React, { useRef } from 'react';
import SuggestionListItem from './SuggestionListItem';

const SuggestionList = ({ suggestions, focusedIndex, setFocusedIndex }) => {
  const suggestionListRef = useRef(null);

  return (
    <ul ref={suggestionListRef}>
      <small>추천 검색어</small>
      {suggestions.map((suggestion, index) => (
        <SuggestionListItem
          key={suggestion.id}
          suggestion={suggestion}
          index={index}
          focusedIndex={focusedIndex}
          setFocusedIndex={setFocusedIndex}
        />
      ))}
    </ul>
  );
};

export default SuggestionList;
