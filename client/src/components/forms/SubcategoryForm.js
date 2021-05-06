import React, { useCallback } from 'react';
import { MDBBtn, MDBInput } from 'mdbreact';
import { SaveOutlined } from '@ant-design/icons';

import { SelectComponent } from 'Components/forms/components/SelectComponent';

export const SubcategoryForm = ({
  handleSubmit,
  setName,
  name = '',
  disable = false,
  categories = [],
  setCategory,
  category = '',
}) => {

  const handleNameChange = useCallback(e => {
    setName(e.target.value);
  }, []);

  const handleCategorySelect = useCallback(value => {
    setCategory(value);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <SelectComponent
        onSelect={handleCategorySelect}
        value={category}
        disable={disable}
        options={categories}
        placeholder="Select parent category"
      />
      <MDBInput
        label="Subcategory name"
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
        <span>Save subcategory</span>
      </MDBBtn>
    </form>
  );
};
