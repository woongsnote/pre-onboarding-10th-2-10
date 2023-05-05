import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SuggestionListItem = ({
  suggestion,
  index,
  focusedIndex,
  setFocusedIndex,
}) => {
  return (
    <li
      key={suggestion.id}
      style={
        index === focusedIndex ? { color: '#007be9', fontWeight: 'bold' } : {}
      }
      onClick={() => setFocusedIndex(index)}
    >
      <FaSearch />
      <span className="suggestion-item-text">{suggestion.name}</span>
    </li>
  );
};

export default SuggestionListItem;
