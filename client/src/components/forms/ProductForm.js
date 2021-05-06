import React, { useCallback, useEffect, useState } from 'react';
import { MDBBtn, MDBInput } from 'mdbreact';

import { loadCategories } from 'Services/categoryService';
import { loadSubcategories } from 'Services/subcategoryService';
import { SelectComponent } from 'Components/forms/components/SelectComponent';
import { shippingOptions, colorOptions, brandsOptions } from 'App/config';
import { SaveOutlined } from '@ant-design/icons';

export const ProductForm = ({
  handleSubmit,
  disable,
  values,
  setValues,
}) => {
  const [ categories, setCategories ] = useState([]);
  const [ subcategories, setSubcategories ] = useState([]);
  const [ loadingCategories, setLoadingCategories ] = useState(false);
  const [ loadingSubs, setLoadingSubs ] = useState(false);

  useEffect(() => {
    loadCategories(setLoadingCategories, setCategories);
  }, []);

  useEffect(() => {
    if (values.category) {
      loadSubcategories(setLoadingSubs, setSubcategories);
    }
  }, [ values.category ]);

  const handleChange = useCallback(e => {
    setValues(Object.assign({}, values, { [e.target.name]: e.target.value }));
  });

  const handleSelect = useCallback(name => value => {
    setValues(Object.assign({}, values, { [name]: value }));
  });

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        label="Product title"
        type="text"
        value={values.title}
        name="title"
        onChange={handleChange}
        autoFocus
        required
        disabled={disable}
      />
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          rows="5"
          required
          disabled={disable}
          value={values.description}
          onChange={handleChange}
          name="description"
          placeholder="Description"
        />
      </div>
      <MDBInput
        label="Price"
        type="number"
        value={values.price}
        onChange={handleChange}
        required
        name="price"
        disabled={disable}
      />
      <SelectComponent
        onSelect={handleSelect('shipping')}
        value={values.shipping}
        disable={disable}
        options={shippingOptions}
        placeholder="Please select"
        label="Shipping"
        showSearch={false}
      />
      <MDBInput
        label="Quantity"
        type="number"
        value={values.quantity}
        onChange={handleChange}
        required
        name="quantity"
        disabled={disable}
      />
      <SelectComponent
        onSelect={handleSelect('color')}
        value={values.color}
        disable={disable}
        options={colorOptions}
        placeholder="Please select"
        label="Color"
        showSearch={false}
      />
      <SelectComponent
        onSelect={handleSelect('brand')}
        value={values.brand}
        disable={disable}
        options={brandsOptions}
        placeholder="Please select"
        label="Brand"
      />
      <SelectComponent
        onSelect={handleSelect('category')}
        value={values.category}
        disable={disable || loadingCategories}
        options={categories}
        placeholder="Please select"
        label="Select category"
      />
      <SelectComponent
        onSelect={handleSelect('subs')}
        value={values.subs}
        disable={disable || loadingSubs}
        options={subcategories}
        placeholder="Please select"
        label="Select subcategory"
        mode="tags"
        allowClear={true}
        emptyOption={false}
        defaultValue={[]}
      />
      <MDBBtn
        disabled={disable}
        color="primary"
        className="btn-rounded"
        type="submit"
      >
        <SaveOutlined />
        <span>Save product</span>
      </MDBBtn>
    </form>
  );
};
