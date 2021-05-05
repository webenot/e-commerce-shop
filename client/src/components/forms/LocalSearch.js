import React, { useCallback } from 'react';
import { MDBInput } from 'mdbreact';

export const LocalSearch = ({
  keyword = '',
  setKeyword,
}) => {
  const handleKeywordChange = useCallback(e => {
    setKeyword(e.target.value);
  }, [ setKeyword ]);

  return (
    <MDBInput
      label="Search category by name"
      type="search"
      value={keyword}
      onChange={handleKeywordChange}
      autoFocus
    />
  );
};
