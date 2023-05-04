import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../apis/apiClient';

const useKeywordSuggestion = (keyword) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = useCallback(async (name) => {
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
  }, []);

  useEffect(() => {
    fetchSuggestions(keyword);
  }, [keyword]);

  return [suggestions];
};

export default useKeywordSuggestion;
