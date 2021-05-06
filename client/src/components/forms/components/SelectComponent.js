import React, { useCallback } from 'react';
import { Select } from 'antd';

export const SelectComponent = ({
  onSelect,
  label = '',
  value = '',
  disable = false,
  options = [],
  placeholder,
  listHeight = 150,
  mode = '',
  allowClear = false,
  showSearch = true,
  emptyOption = true,
  defaultValue = null,
}) => {
  const handleSelect = useCallback(value => onSelect(value));
  return (
    <div className="mb-2 mt-4">
      {label && (<label>{label}</label>)}
      <Select
        mode={mode}
        showSearch={showSearch}
        allowClear={allowClear}
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={handleSelect}
        filterOption={(input, option) =>
          option.children === placeholder ||
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        className="block"
        value={value}
        required
        disabled={disable}
        listHeight={listHeight}
        defaultValue={defaultValue}
      >
        {emptyOption && (
          <Select.Option value=""
          >{placeholder}</Select.Option>
        )}
        {options && options.length && options.map(option => (
          <Select.Option
            key={`option-${option._id}`}
            value={option._id}
          >{option.name}</Select.Option>
        ))}
      </Select>
    </div>
  );
};
