import React, { useState, useEffect, useCallback } from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import { AdminNav } from 'Components/nav/AdminNav';
import { CategoryForm } from 'Components/forms/CategoryForm';
import { getCategory, updateCategory } from 'Services/categoryService';
import { EDIT_CATEGORY_TITLE, EDIT_CATEGORY_TITLE_LOADING } from 'App/config';

export const CategoryEdit = ({
  match,
  history,
}) => {
  const [ category, setCategory ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ saving, setSaving ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ name, setName ] = useState('');

  const { user } = useSelector(state => state);

  useEffect(() => {
    setTitle(loading ? EDIT_CATEGORY_TITLE_LOADING : EDIT_CATEGORY_TITLE);
  }, [ loading ]);

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [ category ]);

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

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    setSaving(true);
    try {
      if (category) {
        const result = await updateCategory(category.slug, { name }, user.token);
        toast.success(`Category "${result.data.name}" updated successfully`);
        history.push('/admin/category');
      }
    } catch (e) {
      console.error(e);
      if (e.response && e.response.status === 500) {
        toast.error(e.response.data);
      } else {
        toast.error(e.message);
      }
      setName(category ? category.name : '');
      setSaving(false);
    }
    return false;
  }, [ name, category ]);

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
                  <>
                    <h4 className={classnames({ 'text-danger': saving })}>{title}</h4>
                    <CategoryForm
                      handleSubmit={handleSubmit}
                      name={name}
                      disable={saving}
                      setName={setName}
                    />
                  </>
                )}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
