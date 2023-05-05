import React, { useEffect, useRef } from 'react';
import SuggestionListItem from './SuggestionListItem';

const SuggestionList = ({ suggestions, focusedIndex, setFocusedIndex }) => {
  const suggestionListRef = useRef(null);
  const MAX_SUGGESTION = 7;
  const startIndex = Math.max(0, focusedIndex - MAX_SUGGESTION + 1);

  const renderSuggestion = suggestions.slice(
    startIndex,
    startIndex + MAX_SUGGESTION
  );

  useEffect(() => {
    setFocusedIndex(-2);
  }, [suggestions, setFocusedIndex, MAX_SUGGESTION]);

  return (
    <ul ref={suggestionListRef}>
      <small>추천 검색어</small>
      {suggestions.length <= MAX_SUGGESTION
        ? suggestions.map((suggestion, index) => (
            <SuggestionListItem
              key={index}
              suggestion={suggestion}
              index={index}
              focusedIndex={focusedIndex}
              setFocusedIndex={setFocusedIndex}
            />
          ))
        : renderSuggestion.map((suggestion, index) => (
            <SuggestionListItem
              key={index}
              suggestion={suggestion}
              index={startIndex + index}
              focusedIndex={focusedIndex}
              setFocusedIndex={setFocusedIndex}
            />
          ))}
    </ul>
  );
};

export default SuggestionList;
