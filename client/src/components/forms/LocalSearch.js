import React, { useCallback } from 'react';
import { MDBInput } from 'mdbreact';

export const LocalSearch = ({
  keyword = '',
  setKeyword,
  label = 'Search category by name',
}) => {
  const handleKeywordChange = useCallback(e => {
    setKeyword(e.target.value);
  }, [ setKeyword ]);

  return (
    <MDBInput
      label={label}
      type="search"
      value={keyword}
      onChange={handleKeywordChange}
      autoFocus
      size="sm"
      icon="search"
    />
  );
};
