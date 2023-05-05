import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../apis/apiClient';
import { debounce } from '../utils/debounce';

const useKeywordSuggestion = (keyword) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = useCallback(
    debounce(async (name) => {
      try {
        const response = await apiClient.getKeyword(name);
        setSuggestions(response.data);
      } catch (error) {
        console.error(error);
      }
    }, 200),
    []
  );

  useEffect(() => {
    if (!keyword) {
      setSuggestions([]);
      return;
    }
    fetchSuggestions(keyword);
  }, [keyword]);

  useEffect(() => {
    fetchSuggestions(keyword);
  }, [keyword]);

  return [suggestions];
};

export default useKeywordSuggestion;
