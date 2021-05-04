import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import classnames from 'classnames';
import { MDBBtn, MDBInput } from 'mdbreact';
import { SaveOutlined } from '@ant-design/icons';

import { createCategory, updateCategory } from 'Services/categoryService';
import { CATEGORY_TITLE, CATEGORY_TITLE_LOADING } from 'App/config';

export const CategoryForm = ({
  category = null,
  action = 'create',
}) => {
  const [ loading, setLoading ] = useState(false);
  const [ title, setTitle ] = useState(CATEGORY_TITLE);
  const [ name, setName ] = useState('');
  const { user } = useSelector(state => state);

  useEffect(() => {
    setTitle(loading ? CATEGORY_TITLE_LOADING : CATEGORY_TITLE);
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
        case 'create':
          await createCategory({ name }, user.token);
          toast.success('Category created successfully');
          setName('');
          break;
        case 'update':
          if (!category) {
            toast.error('No category selected');
            break;
          }
          result = await updateCategory(category.slug, { name }, user.token);
          console.log({ result });
      }
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
    setLoading(false);
    return false;
  }, [ name ]);

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
