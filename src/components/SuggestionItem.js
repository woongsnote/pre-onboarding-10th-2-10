const SuggestionItem = ({
  suggestion,
  index,
  focusedIndex,
  setFocusedIndex,
}) => {
  const isFocused = index === focusedIndex;
  return (
    <li
      key={suggestion.id}
      className={`suggestion-item ${isFocused && 'suggestion--focused'}`}
      onClick={() => setFocusedIndex(index)}
    >
      <i className="bi bi-search" />
      <div onClick={() => setFocusedIndex(index)}>{suggestion.name}</div>
    </li>
  );
};

export default SuggestionItem;
