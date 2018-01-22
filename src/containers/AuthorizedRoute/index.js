import { h } from 'preact';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'preact-redux';

const renderFunc = ({ loggedIn, component: Component }) =>
  loggedIn ? <Component /> : <Redirect to="/login" />;

const AuthorizedRoute = () => <Route render={renderFunc} />;

const mapStateToProps = state => ({
  loggedIn: state.status.loggedIn
});

export default connect(mapStateToProps)(AuthorizedRoute);
