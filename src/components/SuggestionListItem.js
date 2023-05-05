import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SuggestionListItem = ({
  suggestion,
  index,
  focusedIndex,
  setFocusedIndex,
}) => {
  const isFocused = index === focusedIndex;

  return (
    <li
      key={suggestion.id}
      style={isFocused ? { color: '#007be9', fontWeight: 'bold' } : {}}
      onClick={() => setFocusedIndex(index)}
    >
      <FaSearch />
      <span className="suggestion-item-text">{suggestion.name}</span>
    </li>
  );
};

export default SuggestionListItem;
