import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import store from './store/configure';
import { ConfigProvider   } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';


ReactDOM.render(
   <Provider store={store}>
  <ConfigProvider  locale={koKR}>
      <App />
   </ConfigProvider>
    </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
