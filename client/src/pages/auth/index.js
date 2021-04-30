import React, { useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const AuthBaseTemplate = ({ children, title }) => {
  const { user } = useSelector(state => state);
  const history = useHistory();

  useEffect(() => {
    if (user && user.token) {
      if (user.role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('/user/history');
      }
    }
  }, [ user ]);
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol lg="6" className="offset-lg-3 p-5">
          <h4>{title}</h4>
          {children}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
