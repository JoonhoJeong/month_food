import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      {/* <Menu.Item key="favorite">
        <Link to="/favorite">Favorite</Link>
      </Menu.Item> */}
    </Menu>
  );
}

export default LeftMenu;
