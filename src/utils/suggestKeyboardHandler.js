const suggestKeyboardHandler = (
  suggestions,
  focusedIndex,
  setFocusedIndex,
  setKeyword
) => {
  const handleKeyDown = (e) => {
    if (!suggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      setFocusedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }

    if (e.key === 'Enter' && focusedIndex !== undefined && focusedIndex >= 0) {
      e.preventDefault();

      setKeyword(suggestions[focusedIndex].name);
    }
  };

  return handleKeyDown;
};

export default suggestKeyboardHandler;
