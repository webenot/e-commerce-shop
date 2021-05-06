import React, { useCallback } from 'react';
import { MDBBtn, MDBInput } from 'mdbreact';
import { SaveOutlined } from '@ant-design/icons';
import { Select } from 'antd';

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
      <div className="mb-3">
        <label>Select parent category</label>
        <Select
          showSearch
          placeholder="Select parent category"
          optionFilterProp="children"
          onSelect={handleCategorySelect}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          className="block"
          value={category}
          required
        >
          {categories && categories.length && categories.map(c => (
            <Select.Option
              key={`cat-option-${c._id}`}
              value={c._id}
            >{c.name}</Select.Option>
          ))}
        </Select>
      </div>
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
