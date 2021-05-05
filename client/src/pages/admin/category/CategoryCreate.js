import React, { useCallback, useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import { AdminNav } from 'Components/nav/AdminNav';
import { CategoryForm } from 'Components/forms/CategoryForm';
import { createCategory, getCategories, removeCategory } from 'Services/categoryService';
import { CREATE_CATEGORY_TITLE, CREATE_CATEGORY_TITLE_LOADING } from 'App/config';

export const CategoryCreate = () => {
  const [ categories, setCategories ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ name, setName ] = useState('');

  const { user } = useSelector(state => state);

  useEffect(() => {
    setTitle(loading ? CREATE_CATEGORY_TITLE_LOADING : CREATE_CATEGORY_TITLE);
  }, [ loading ]);

  const loadCategories = useCallback(() => {
    setLoading(true);
    getCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 500) {
          toast.error(error.response.data);
        } else {
          toast.error(error.message);
        }
      })
      .finally(() => setLoading(false));
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDeleteCategory = useCallback(slug => async () => {
    if (!window.confirm('Do you really want to delete this category?')) return false;
    setLoading(true);
    try {
      const result = await removeCategory(slug, user.token);
      toast.error(`Category "${result.data.name}" deleted successfully`);
      loadCategories();
    } catch (e) {
      if (e.response && e.response.status === 500) {
        toast.error(e.response.data);
      } else {
        toast.error(e.message);
      }
    }
    setLoading(false);
  }, [ categories ]);

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createCategory({ name }, user.token);
      toast.success(`Category "${result.data.name}" created successfully`);
      setName('');
      loadCategories();
    } catch (e) {
      console.error(e);
      if (e.response && e.response.status === 500) {
        toast.error(e.response.data);
      } else {
        toast.error(e.message);
      }
    }
    setLoading(false);
    return false;
  }, [ name ]);

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol lg="2">
          <AdminNav current="admin/category" />
        </MDBCol>
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              <MDBCol lg="6">
                <h4 className={classnames({ 'text-danger': loading })}>{title}</h4>
                <CategoryForm
                  handleSubmit={handleSubmit}
                  name={name}
                  loading={loading}
                  setName={setName}
                />
              </MDBCol>
            </MDBRow>
            {loading && (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {categories.length && categories.map(category => (
              <MDBRow key={`category-${category._id}`} className="alert alert-secondary category-item">
                <MDBCol>
                  <span>{category.name}</span>
                  <button
                    type="button"
                    className="btn btn-danger btn-floating float-right"
                    onClick={handleDeleteCategory(category.slug)}
                  >
                    <i className="far fa-trash-alt" />
                  </button>
                  <Link
                    className="btn btn-primary btn-floating float-right"
                    to={`/admin/category/${category.slug}`}
                  ><i className="far fa-edit" /></Link>
                </MDBCol>
              </MDBRow>
            ))}
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
