import React, { useCallback, useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import { AdminNav } from 'Components/nav/AdminNav';
import { CategoryForm } from 'Components/forms/CategoryForm';
import { LocalSearch } from 'Components/forms/LocalSearch';
import { createCategory, removeCategory, loadCategories } from 'Services/categoryService';
import { CREATE_CATEGORY_TITLE, CREATE_CATEGORY_TITLE_LOADING } from 'App/config';

export const CategoryCreate = () => {
  const [ categories, setCategories ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ saving, setSaving ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ name, setName ] = useState('');
  const [ keyword, setKeyword ] = useState('');

  const { user } = useSelector(state => state);

  useEffect(() => {
    setTitle(saving ? CREATE_CATEGORY_TITLE_LOADING : CREATE_CATEGORY_TITLE);
  }, [ saving ]);

  useEffect(() => {
    loadCategories(setLoading, setCategories);
  }, []);

  const handleDeleteCategory = useCallback(slug => async () => {
    if (!window.confirm('Do you really want to delete this category with all subcategories?')) return false;
    setLoading(true);
    try {
      const result = await removeCategory(slug, user.token);
      toast.error(`Category "${result.data.name}" deleted successfully`);
      loadCategories(setLoading, setCategories);
    } catch (e) {
      if (e.response && e.response.status === 500) {
        toast.error(e.response.data);
      } else {
        toast.error(e.message);
      }
    }
    setLoading(false);
  }, []);

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await createCategory({ name }, user.token);
      toast.success(`Category "${result.data.name}" created successfully`);
      setName('');
      loadCategories(setLoading, setCategories);
    } catch (e) {
      console.error(e);
      if (e.response && e.response.status === 500) {
        toast.error(e.response.data);
      } else {
        toast.error(e.message);
      }
    }
    setSaving(false);
    return false;
  }, [ name ]);

  const searchFilter = useCallback(keyword => category =>
    category.name.toLowerCase().includes(keyword.toLowerCase()), [ keyword ]);

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
                <h4 className={classnames({ 'text-danger': saving })}>{title}</h4>
                <CategoryForm
                  handleSubmit={handleSubmit}
                  name={name}
                  disable={saving}
                  setName={setName}
                />
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol lg="6">
                <LocalSearch
                  keyword={keyword}
                  setKeyword={setKeyword}
                />
              </MDBCol>
            </MDBRow>
            {loading && (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {categories && categories.length ? categories.filter(searchFilter(keyword)).map(category => (
              <MDBRow
                key={`category-${category._id}`}
                className="alert alert-secondary category-item"
              >
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
            )) : ''}
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
