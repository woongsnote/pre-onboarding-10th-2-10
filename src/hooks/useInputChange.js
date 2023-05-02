import { useState } from 'react';

const useInputChange = () => {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  return [keyword, handleInputChange, setKeyword];
};

export default useInputChange;
