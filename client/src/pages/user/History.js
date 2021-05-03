import React from 'react';
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';

import { UserNav } from 'Components/nav/UserNav';

export const History = () => (
  <MDBContainer fluid>
    <MDBRow>
      <MDBCol lg="2">
        <UserNav />
      </MDBCol>

      <MDBCol>
        user page
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
