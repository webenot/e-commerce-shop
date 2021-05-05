import React, { useState, useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { toast } from 'react-toastify';

import { AdminNav } from 'Components/nav/AdminNav';
import { CategoryForm } from 'Components/forms/CategoryForm';
import { getCategory } from 'Services/categoryService';

export const CategoryEdit = ({ match }) => {
  const [ category, setCategory ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const { params } = match;
    setLoading(true);
    getCategory(params.slug)
      .then(response => {
        setCategory(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 500) {
          toast.error(error.response.data);
        } else {
          toast.error(error.message);
        }
      })
      .finally(() => setLoading(false));
  }, [ match ]);

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol lg="2">
          <AdminNav />
        </MDBCol>
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              <MDBCol lg="6">
                {loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <CategoryForm action="edit" category={category} />
                )}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
