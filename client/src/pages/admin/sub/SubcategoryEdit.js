import React, { useState, useEffect, useCallback } from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { toast } from 'react-toastify';

import { AdminNav } from 'Components/nav/AdminNav';
import { loadCategories } from 'Services/categoryService';
import { getSub, updateSub } from 'Services/subcategoryService';
import { EDIT_SUBCATEGORY_TITLE, EDIT_SUBCATEGORY_TITLE_LOADING } from 'App/config';
import { SubcategoryForm } from 'Components/forms/SubcategoryForm';

export const SubcategoryEdit = ({
  match,
  history,
}) => {
  const [ categories, setCategories ] = useState([]);
  const [ subcategory, setSubcategory ] = useState(null);
  const [ loadingCategories, setLoadingCategories ] = useState(false);
  const [ saving, setSaving ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ name, setName ] = useState('');
  const [ parent, setParent ] = useState('');
  const [ title, setTitle ] = useState('');

  const { user } = useSelector(state => state);

  useEffect(() => {
    if (subcategory) {
      setName(subcategory.name);
    }
  }, [ subcategory ]);

  useEffect(() => {
    setTitle(saving ? EDIT_SUBCATEGORY_TITLE_LOADING : EDIT_SUBCATEGORY_TITLE);
  }, [ saving ]);

  useEffect(() => {
    loadCategories(setLoadingCategories, setCategories);
  }, []);

  useEffect(() => {
    if (subcategory) {
      setParent(subcategory.parent._id);
    }
  }, [ subcategory ]);

  useEffect(() => {
    const { params } = match;
    setLoading(true);
    getSub(params.slug)
      .then(response => {
        setSubcategory(response.data);
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
      if (subcategory) {
        const result = await updateSub(
          subcategory.slug,
          {
            name,
            parent,
          },
          user.token,
        );
        toast.success(`Subcategory "${result.data.name}" updated successfully`);
        history.push('/admin/sub');
      }
    } catch (e) {
      console.error(e);
      if (e.response && e.response.status === 500) {
        toast.error(e.response.data);
      } else {
        toast.error(e.message);
      }
      setName(subcategory ? subcategory.name : '');
      setSaving(false);
    }
    return false;
  }, [ name, subcategory, parent ]);

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol lg="2">
          <AdminNav current="admin/sub" />
        </MDBCol>
        <MDBCol lg="6">
          <h4 className={classnames({ 'text-danger': saving })}>{title}</h4>
          <SubcategoryForm
            handleSubmit={handleSubmit}
            name={name}
            disable={saving || loadingCategories || !parent || loading}
            setName={setName}
            categories={categories}
            setCategory={setParent}
            category={parent}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
