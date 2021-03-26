import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import Layout from './Layout/LayoutView';

//const theme = createMuiTheme({...themes.default, ...overrides});

const PrivateRoute = ({ isAuthenticated, component, ...rest }) => {
  return (
    <Route
    render={props => ( React.createElement(component, props) )}
    //   {...rest} render={props => (
    //     isAuthenticated ? (
    //     React.createElement(component, props)
    //   ) : (
    //     <Redirect
    //       to={{
    //         pathname: '/login',
    //         state: { from: props.location },
    //       }}
    //     />
    //   )
    // )}

    />
  );
};

// const PublicRoute = ({ isAuthenticated, component, ...rest }) => {
//   return (
//     <Route
//       {...rest} render={props => (
//         isAuthenticated ? (
//         <Redirect
//           to={{
//             pathname: '/',
//           }}
//         />
//       ) : (
//         React.createElement(component, props)
//       )
//     )}
//     />
//   );
// };

const App = ({isAuthenticated}) => (
  //<MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Layout} />
        {/* <Route exact path="/app" render={() => <Redirect to="/app/commute/list" />} /> */}
        {/* <PrivateRoute isAuthenticated={isAuthenticated} path="/app" component={Layout} /> */}
       {/* <PublicRoute isAuthenticated={isAuthenticated} path="/login" component={Login} />
       <Route component={Error}/>*/}
      </Switch>
    </BrowserRouter>
  //</MuiThemeProvider>
);

export default App;