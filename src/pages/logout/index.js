import { Component } from 'preact';
import { route } from 'utils';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { logoutSuccess } from 'actions';

class LogoutPage extends Component {
  componentWillMount() {
    this.props.logoutSuccess();
    route('/');
  }
  render() {
    return null;
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutSuccess }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
