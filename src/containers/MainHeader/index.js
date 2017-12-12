import { h, Component } from 'preact';
import styles from './style';
import { connect } from 'preact-redux';
import Topbar from 'components/Topbar';

class MainHeader extends Component {
  render({ loggedIn, token }) {
    return (
      <header class={styles.header}>
        <Topbar loggedIn={loggedIn} token={token} />
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.status.loggedIn,
    token: state.token
  };
}

export default connect(mapStateToProps)(MainHeader);
