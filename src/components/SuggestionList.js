import React, { useRef } from 'react';

const SuggestionList = ({ suggestions, focusedIndex, setFocusedIndex }) => {
  const suggestionListRef = useRef(null);

  return (
    <ul ref={suggestionListRef}>
      {suggestions.map((suggestion, index) => (
        <li
          key={suggestion.id}
          style={index === focusedIndex ? { backgroundColor: '#ccc' } : {}}
          onClick={() => setFocusedIndex(index)}
        >
          {suggestion.name}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionList;
