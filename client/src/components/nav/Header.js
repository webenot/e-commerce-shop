import React, { useState, useCallback } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { LOGOUT } from 'Reducers/userReducer';

const {
  SubMenu,
  Item,
} = Menu;

export const Header = () => {
  const [ current, setCurrent ] = useState('home');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = useCallback(e => {
    setCurrent(e.key);
  }, []);

  const handleLogout = useCallback(() => {
    firebase.auth().signOut();
    history.push('/login');
    dispatch({
      type: LOGOUT,
      payload: null,
    });
  }, []);

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
          <Item icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Item>
        </SubMenu>
      </Menu>
    </header>
  );
};
