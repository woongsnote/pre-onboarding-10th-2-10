import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../apis/apiClient';
import { debounce } from '../utils/debounce';

const useKeywordSuggestion = (keyword) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = useCallback(
    debounce(async (name) => {
      try {
        if (name) {
          const response = await apiClient.getKeyword(name);
          setSuggestions(response.data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error(error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchSuggestions(keyword);
  }, [keyword]);

  return [suggestions];
};

export default useKeywordSuggestion;
