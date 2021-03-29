import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Chat from '../../pages/chat';
import Calendar from '../../pages/Calendar';
import {Alert } from 'antd';

import Navigation from '../Navigation/Navigation';
import { withStyles, CssBaseline } from '@material-ui/core';
import './Layout.css';




const LayoutView = ({  classes, isSidebarOpened, toggleSidebar, ...props }) => {
  
  // const ServiceRoute = (
  //   <div>
  //   <Route exact path="/app/service" render={() => <Redirect to="/app/service/worktime" />} />
  //   <Route path="/app/service/worktime" component={ WorkTimePage } />
  //   <Route path="/app/service/breaktime" component={ BreaktimePage } />
  //   <Route path="/app/service/holiday" component={ HolidayPage } />
  //   </div> 
  // );

  return (
  <div className='root-class'> 
    <BrowserRouter>
      <React.Fragment>
      <Alert
      message="공지사항"
      description="공지사항 내용"
      type="info"
      showIcon
      />
      <div className='navi'>
          <Navigation/>
       </div>
          <div className='content'>
          <Switch>
          <Route path="/app/calendar" component={Calendar}  />
          <Route path="/" component={Calendar}  />
          <Route path="/app" component={Calendar}  />
            {/* <Route exact path="/chat" render={() => <Redirect to="/chat" />} /> */}
          </Switch>
          </div>
          <div className='chat'>
          <Chat/>
          </div>
      </React.Fragment>
    </BrowserRouter>
  </div>
  );
};



 export default LayoutView;
