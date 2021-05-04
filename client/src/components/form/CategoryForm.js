import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import classnames from 'classnames';
import { MDBBtn, MDBInput } from 'mdbreact';
import { SaveOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { createCategory, updateCategory } from 'Services/categoryService';
import {
  CREATE_CATEGORY_TITLE,
  CREATE_CATEGORY_TITLE_LOADING,
  EDIT_CATEGORY_TITLE,
  EDIT_CATEGORY_TITLE_LOADING,
} from 'App/config';

export const CategoryForm = ({
  category = null,
  action = 'create',
  load = null,
}) => {
  const [ loading, setLoading ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ name, setName ] = useState('');

  const { user } = useSelector(state => state);
  const history = useHistory();

  useEffect(() => {
    switch (action) {
      case 'edit':
        setTitle(loading ? EDIT_CATEGORY_TITLE_LOADING : EDIT_CATEGORY_TITLE);
        break;
      default:
        setTitle(loading ? CREATE_CATEGORY_TITLE_LOADING : CREATE_CATEGORY_TITLE);
    }
  }, [ loading ]);

  useEffect(() => {
    setName(category ? category.name : '');
  }, [ category ]);

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = null;
      switch (action) {
        case 'edit':
          if (category) {
            result = await updateCategory(category.slug, { name }, user.token);
            toast.success(`Category "${result.data.name}" updated successfully`);
            history.push('/admin/category');
          }
          break;
        default:
          result = await createCategory({ name }, user.token);
          toast.success(`Category "${result.data.name}" created successfully`);
          setName('');
          if (load) {
            load();
          }
          setLoading(false);
      }
    } catch (e) {
      console.error(e);
      if (e.response && e.response.status === 500) {
        toast.error(e.response.data);
      } else {
        toast.error(e.message);
      }
      setName(category ? category.name : '');
      setLoading(false);
    }
    return false;
  }, [ name, load, action, category ]);

  const handleNameChange = useCallback(e => {
    setName(e.target.value);
  }, []);

  return (
    <>
      <h4 className={classnames({ 'text-danger': loading })}>{title}</h4>
      <form onSubmit={handleSubmit}>
        <MDBInput
          label="Category name"
          type="text"
          value={name}
          onChange={handleNameChange}
          autoFocus
          required
        />
        <MDBBtn
          disabled={name.length < 2 || loading}
          color="primary"
          className="btn-rounded"
          type="submit"
        >
          <SaveOutlined />
          <span>Save category</span>
        </MDBBtn>
      </form>
    </>
  );
};
