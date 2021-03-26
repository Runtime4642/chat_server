import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import 'antd/dist/antd.css';
import { Menu} from 'antd';
import { NavLink } from 'react-router-dom';


import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

class Navigation extends Component {

    constructor(props, context) {
        super(props);

       this.state = {
        collapsed: false
      }
    }
//style={{display:"none"}}
    render() {
        return (
              
          <div style={{ width: '100%' ,height:'100%'}}>
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
          >
            <Menu.Item key="1"  >
            <NavLink  to={"/app/a"}>
              <PieChartOutlined />
              <span>개발중</span>
              </NavLink>
            </Menu.Item>
            
            <Menu.Item key="2">
            <NavLink  to={"/app/calendar"}>
              <ContainerOutlined />
              <span>
                일정
              </span>
              </NavLink>
            </Menu.Item>
          </Menu>
         
        </div>
        );
    }
}
export default Navigation;