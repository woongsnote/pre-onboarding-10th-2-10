const useKeyboardNavigation = (
  suggestions,
  focusedIndex,
  setFocusedIndex,
  setKeyword
) => {
  const handleKeyDown = (e) => {
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
    if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      setKeyword(suggestions[focusedIndex].name);
    }
  };

  return handleKeyDown;
};

export default useKeyboardNavigation;
