import React from 'react';
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';

import { AdminNav } from 'Components/nav/AdminNav';

export const AdminDashboard = () => (
  <MDBContainer fluid>
    <MDBRow>
      <MDBCol lg="2">
        <AdminNav current="admin/dashboard" />
      </MDBCol>
      <MDBCol>
        admin dashboard
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
