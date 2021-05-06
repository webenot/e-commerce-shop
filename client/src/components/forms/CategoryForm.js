import React, { useCallback } from 'react';
import { MDBBtn, MDBInput } from 'mdbreact';
import { SaveOutlined } from '@ant-design/icons';

export const CategoryForm = ({
  handleSubmit,
  name = '',
  disable = false,
  setName,
}) => {

  const handleNameChange = useCallback(e => {
    setName(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        label="Category name"
        type="text"
        value={name}
        onChange={handleNameChange}
        autoFocus
        required
        disabled={disable}
      />
      <MDBBtn
        disabled={name.length < 2 || disable}
        color="primary"
        className="btn-rounded"
        type="submit"
      >
        <SaveOutlined />
        <span>Save category</span>
      </MDBBtn>
    </form>
  );
};
