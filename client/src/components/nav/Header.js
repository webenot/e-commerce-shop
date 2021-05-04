import React, { useState, useCallback } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { LOGOUT } from 'Reducers/userReducer';
import { auth } from 'App/firebase';
import { toast } from 'react-toastify';

const {
  SubMenu,
  Item,
} = Menu;

export const Header = () => {
  const [ current, setCurrent ] = useState('home');
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(state => state);

  const handleClick = useCallback(e => {
    setCurrent(e.key);
  }, []);

  const handleLogout = useCallback(() => {
    auth.signOut()
      .catch(error => {
        console.error(error);
        toast.error(error.message);
      });
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
        {user && (
          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title={user ? (user.name ? user.name : (user.email ? user.email.split('@')[0] : 'Username')) : 'Username'}
            className="float-right"
          >
            {user && user.role === 'admin' && (
              <>
                <Item key="dashboard">
                  <Link to="/admin/dashboard">Dashboard</Link>
                </Item>
              </>
            )}
            {user && user.role === 'subscriber' && (
              <>
                <Item key="dashboard">
                  <Link to="/user/history">Dashboard</Link>
                </Item>
              </>
            )}
            <Item key="password">
              <Link to="/user/password">Password</Link>
            </Item>
            <Item key="wishlist">
              <Link to="/user/wishlist">Wishlist</Link>
            </Item>
            <Item icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Item>
          </SubMenu>
        )}
        {!user && (
          <Item key="register" icon={<UserAddOutlined />} className="float-right">
            <Link to="/register">Register</Link>
          </Item>
        )}
        {!user && (
          <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
          </Item>
        )}
      </Menu>
    </header>
  );
};
