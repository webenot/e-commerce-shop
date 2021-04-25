import React, { useState, useCallback } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const {
  SubMenu,
  Item,
} = Menu;

export const Header = () => {
  const [ current, setCurrent ] = useState('home');

  const handleClick = useCallback(e => {
    setCurrent(e.key);
  });

  return (
    <header>
      <Menu onClick={handleClick} selectedKeys={[ current ]} mode="horizontal">
        <Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Item>
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
        </SubMenu>
      </Menu>
    </header>
  );
};
