import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';

import { AdminNav } from 'Components/nav/AdminNav';
import { CategoryForm } from 'Components/form/CategoryForm';

export const CategoryCreate = () => (
  <MDBContainer fluid>
    <MDBRow>
      <MDBCol lg="2">
        <AdminNav current="admin/category" />
      </MDBCol>
      <MDBCol lg="6">
        <CategoryForm />
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
