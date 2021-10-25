import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import './Sections/Navbar.css';
import Icon from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

function NavBar(props) {
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav
      className="menu"
      style={{ position: 'fixed', zIndex: 5, width: '100%' }}
    >
      <div className="menu__logo">
        <a href="/">{props.month}월의 레시피</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
          // onClick={() => {
          //   if (props.month === 12) {
          //     props.setMonth(1);
          //   } else {
          //     props.setMonth(props.month + 1);
          //   }
          //   history.push('/');
          // }}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="이달의 레시피"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;
