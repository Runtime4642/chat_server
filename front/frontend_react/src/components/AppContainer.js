import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { getUser } from 'pages/login/LoginState';
import { changeLanguage } from 'store/modules/language';

import AppView from './App';

export default compose(
  connect(
    state => ({
      isAuthenticated: state.login.isAuthenticated,
      isLogging: state.login.isLogging,
      language: state.language.language,
      init: state.language.init
    }),
    { getUser, changeLanguage }
  ),
  lifecycle({
    componentDidMount() {
      const {isAuthenticated, isLogging, language, init, getUser, changeLanguage} = this.props;
      if(sessionStorage.getItem("language") === null) {
        sessionStorage.setItem("language", "ko");
      }

      // storage의 language와 store의 language가 다를 경우(새로 고침했을 경우)
      if(language !== sessionStorage.getItem("language") &&
          sessionStorage.getItem("language") !== null &&
          init === false) {
            changeLanguage(sessionStorage.getItem("language"));

      }

      // 새로고침했을 경우 storage에 저장된 토큰을 이용해 다시 유저 정보 요청
      if(isAuthenticated && isLogging === false) {
        getUser(sessionStorage.getItem("id_token"));
      }
    }
  })
)(AppView);