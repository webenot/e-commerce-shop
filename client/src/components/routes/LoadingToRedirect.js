import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const LoadingToRedirect = ({ path = '/' }) => {
  const [ count, setCount ] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) {
      history.push(path);
    }

    return () => clearInterval(interval);

  }, [ count ]);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} second{count === 1 ? '' : 's'}</p>
    </div>
  );
};
