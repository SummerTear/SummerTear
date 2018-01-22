import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { Route, Switch } from 'react-router-dom';
import {
  initSuccess,
  setToken,
  loginSuccess,
  syncToken,
  syncStatus
} from 'actions';
import Loading from 'components/Loading';

//layouts
import MainLayout from 'layouts/main';
//pages
import LogoutPage from 'pages/logout';

class App extends Component {
  componentDidMount() {
    this.props.initSuccess();

    if (typeof window !== 'undefined') {
      //从localStorage里取出token放入store里
      const token = localStorage.getItem('token');
      if (token) {
        this.props.setToken(token);
        this.props.loginSuccess();
      }
    }
  }

  render({ status }) {
    if (!status.init) {
      return <Loading />;
    }
    return (
      <Switch>
        <Route path="/logout" component={LogoutPage} />
        <Route component={MainLayout} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.status,
    token: state.token,
    state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { initSuccess, setToken, loginSuccess, syncToken, syncStatus },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(App);
