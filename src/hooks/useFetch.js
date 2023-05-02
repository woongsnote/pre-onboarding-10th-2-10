import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../apis/apiClient';

const useFetch = (keyword) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = useCallback(async () => {
    try {
      if (keyword) {
        const response = await apiClient.getKeyword(keyword);
        setSuggestions(response.data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [keyword]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  return [suggestions];
};

export default useFetch;
