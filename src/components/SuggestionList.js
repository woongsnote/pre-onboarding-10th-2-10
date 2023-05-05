import { useEffect, useRef } from 'react';
import SuggestionItem from './SuggestionItem';

const SuggestionList = ({ suggestions, focusedIndex, setFocusedIndex }) => {
  const suggestionListRef = useRef(null);
  const MAX_SUGGESTIONS = 7;
  const startIndex = Math.max(0, focusedIndex - MAX_SUGGESTIONS + 1);

  const renderedSuggestions = suggestions.slice(
    startIndex,
    startIndex + MAX_SUGGESTIONS
  );

  useEffect(() => {
    setFocusedIndex(-2);
  }, [suggestions, setFocusedIndex, MAX_SUGGESTIONS]);

  return (
    <ul className="suggestion-list" ref={suggestionListRef}>
      <small>추천 검색어</small>
      {suggestions.length <= MAX_SUGGESTIONS
        ? suggestions.map((suggestion, index) => (
            <SuggestionItem
              suggestion={suggestion}
              index={index}
              focusedIndex={focusedIndex}
              setFocusedIndex={setFocusedIndex}
            />
          ))
        : renderedSuggestions.map((suggestion, index) => (
            <SuggestionItem
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
