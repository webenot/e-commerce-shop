import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { AdminNav } from 'Components/nav/AdminNav';

export const SubcategoryCreate = () => (
  <MDBContainer fluid>
    <MDBRow>
      <MDBCol lg="2">
        <AdminNav current="admin/category" />
      </MDBCol>
      <MDBCol>
        Subcategory page
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
