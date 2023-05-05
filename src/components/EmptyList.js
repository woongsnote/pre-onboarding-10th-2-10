import React from 'react';

const EmptyList = ({ title, keyword }) => {
  return (
    <>
      {keyword !== '' && (
        <div className="empty-list">
          <small>추천 검색어</small>
          <span>{title}</span>
        </div>
      )}
    </>
  );
};

export default EmptyList;
