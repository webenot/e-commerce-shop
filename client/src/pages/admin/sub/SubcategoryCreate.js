import React, { useState, useEffect, useCallback } from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AdminNav } from 'Components/nav/AdminNav';
import { loadCategories } from 'Services/categoryService';
import { loadSubcategories, createSub, removeSub } from 'Services/subcategoryService';
import { LocalSearch } from 'Components/forms/LocalSearch';
import { CREATE_SUBCATEGORY_TITLE, CREATE_SUBCATEGORY_TITLE_LOADING } from 'App/config';
import { SubcategoryForm } from 'Components/forms/SubcategoryForm';

export const SubcategoryCreate = () => {
  const [ categories, setCategories ] = useState([]);
  const [ subcategories, setSubcategories ] = useState([]);
  const [ loadingCategories, setLoadingCategories ] = useState(false);
  const [ saving, setSaving ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ name, setName ] = useState('');
  const [ parent, setParent ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ keyword, setKeyword ] = useState('');

  const { user } = useSelector(state => state);

  useEffect(() => {
    setTitle(saving ? CREATE_SUBCATEGORY_TITLE_LOADING : CREATE_SUBCATEGORY_TITLE);
  }, [ saving ]);

  useEffect(() => {
    loadCategories(setLoadingCategories, setCategories);
    loadSubcategories(setLoading, setSubcategories);
  }, []);

  const searchFilter = useCallback(keyword => sub =>
    sub.name.toLowerCase().includes(keyword.toLowerCase()), [ keyword ]);

  const handleDeleteSubcategory = useCallback(slug => async () => {
    if (!window.confirm('Do you really want to delete this category?')) return false;
    setLoading(true);
    try {
      const result = await removeSub(slug, user.token);
      toast.error(`Subcategory "${result.data.name}" deleted successfully`);
      loadSubcategories(setLoading, setSubcategories);
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
      const result = await createSub({
        name,
        parent,
      }, user.token);
      toast.success(`Subcategory "${result.data.name}" created successfully`);
      setName('');
      setParent('');
      loadSubcategories(setLoading, setSubcategories);
    } catch (e) {
      console.error(e);
      if (e.response && (e.response.status === 500 || e.response.status === 404)) {
        toast.error(e.response.data);
      } else {
        toast.error(e.message);
      }
    }
    setSaving(false);
    return false;
  }, [ name, parent ]);

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol lg="2">
          <AdminNav current="admin/sub" />
        </MDBCol>
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              <MDBCol lg="6">
                <h4 className={classnames({ 'text-danger': saving })}>{title}</h4>
                <SubcategoryForm
                  handleSubmit={handleSubmit}
                  name={name}
                  disable={saving || loadingCategories || loading}
                  setName={setName}
                  categories={categories}
                  setCategory={setParent}
                  category={parent}
                />
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol lg="6">
                <LocalSearch
                  keyword={keyword}
                  setKeyword={setKeyword}
                  label="Search subcategory by name"
                />
              </MDBCol>
            </MDBRow>
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (subcategories && subcategories.length ? subcategories.filter(searchFilter(keyword)).map(sub => (
              <MDBRow
                key={`sub-${sub._id}`}
                className="alert alert-secondary category-item"
              >
                <MDBCol>
                  <span>{sub.name} ({sub.parent.name})</span>
                  <button
                    type="button"
                    className="btn btn-danger btn-floating float-right"
                    onClick={handleDeleteSubcategory(sub.slug)}
                  >
                    <i className="far fa-trash-alt" />
                  </button>
                  <Link
                    className="btn btn-primary btn-floating float-right"
                    to={`/admin/sub/${sub.slug}`}
                  ><i className="far fa-edit" /></Link>
                </MDBCol>
              </MDBRow>
            )) : '')}
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
