import { h } from 'preact';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'preact-redux';

const AuthorizedRoute = ({ component: Component, loggedIn }) => (
  <Route
    render={props => (loggedIn ? <Component /> : <Redirect to="/login" />)}
  />
);

function mapStateToProps(state) {
  return {
    loggedIn: state.status.loggedIn
  };
}

export default connect(mapStateToProps)(AuthorizedRoute);
