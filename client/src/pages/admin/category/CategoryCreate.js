import React, { useCallback, useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AdminNav } from 'Components/nav/AdminNav';
import { CategoryForm } from 'Components/forms/CategoryForm';
import { getCategories, removeCategory } from 'Services/categoryService';

export const CategoryCreate = () => {
  const [ categories, setCategories ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const { user } = useSelector(state => state);

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
      toast.warn(`Category "${result.data.name}" deleted successfully`);
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
                <CategoryForm load={loadCategories} />
              </MDBCol>
            </MDBRow>
            <hr />
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
