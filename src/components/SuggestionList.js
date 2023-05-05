import React, { useRef } from 'react';

const SuggestionList = ({
  keyword,
  suggestions,
  focusedIndex,
  setFocusedIndex,
}) => {
  const suggestionListRef = useRef(null);

  return (
    <ul className="suggestion-list" ref={suggestionListRef}>
      <small>추천 검색어</small>
      {keyword && suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <li
            key={index}
            className={`suggestion-item ${
              index === focusedIndex && `suggestion--focused`
            }`}
          >
            <i className="bi bi-search" />
            <div onClick={() => setFocusedIndex(index)}>{suggestion.name}</div>
          </li>
        ))
      ) : (
        <div className="suggestion_no-result">검색어 없음</div>
      )}
    </ul>
  );
};

export default SuggestionList;
