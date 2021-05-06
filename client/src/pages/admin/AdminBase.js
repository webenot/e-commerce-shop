import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';

import { AdminNav } from 'Components/nav/AdminNav';

export const AdminBase = ({ children }) => (
  <MDBContainer fluid className="pt-3">
    <MDBRow>
      <MDBCol lg="2">
        <AdminNav current="admin/dashboard" />
      </MDBCol>
      <MDBCol>
        {children}
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
