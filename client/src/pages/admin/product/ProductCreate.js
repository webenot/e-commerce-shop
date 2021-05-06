import React, { useState, useEffect, useCallback } from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AdminBase } from 'Pages/admin/AdminBase';
import { CREATE_PRODUCT_TITLE, CREATE_PRODUCT_TITLE_LOADING, initialProductState } from 'App/config';
import { ProductForm } from 'Components/forms/ProductForm';
import { createProduct } from 'Services/productService';

export const ProductCreate = ({ history }) => {
  const [ pageTitle, setPageTitle ] = useState('');
  const [ saving, setSaving ] = useState(false);
  const [ values, setValues ] = useState(initialProductState);

  const { user } = useSelector(state => state);

  useEffect(() => {
    setPageTitle(saving ? CREATE_PRODUCT_TITLE_LOADING : CREATE_PRODUCT_TITLE);
  }, [ saving ]);

  useEffect(() => {
    console.log({ values });
  }, [ values ]);

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await createProduct(values, user.token);
      toast.error(`Product "${result.data.name}" created successfully`);
      history.push('/admin/products');
    } catch (e) {
      if (e.response && e.response.status === 500) {
        toast.error(e.response.data);
      } else {
        toast.error(e.message);
      }
    }
    return false;
  }, []);

  return (
    <AdminBase>
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol>
            <h4 className={classnames({ 'text-danger': saving })}>{pageTitle}</h4>
            <hr />
            <ProductForm
              handleSubmit={handleSubmit}
              disable={saving}
              values={values}
              setValues={setValues}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </AdminBase>
  );
};
