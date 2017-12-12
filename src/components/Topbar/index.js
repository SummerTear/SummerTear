import { h, Component } from 'preact';
import { FormattedMessage, injectIntl } from 'preact-intl';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './style';
import MdSearch from 'preact-icons/lib/md/search';
import MdPersonOutline from 'preact-icons/lib/md/person-outline';
import MdPerson from 'preact-icons/lib/md/person';
import MdPowerSettingsNew from 'preact-icons/lib/md/power-settings-new';
import MdSettings from 'preact-icons/lib/md/settings';

class Topbar extends Component {
  componentWillMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }
  handleAvaterClick = e => {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
    this.setState({ open: !this.state.open });
  };
  handleOutsideClick = () => {
    if (this.state.open) {
      this.setState({ open: false });
    }
  };
  render({ loggedIn, token, intl }, { open = false }) {
    const logInOrRegister = (
      <div class={styles.logInOrRegisterWrap}>
        <Link to="/login" class={styles.logInOrRegisterText}>
          <FormattedMessage id="app.loginOrRegister" />
        </Link>
        <Link to="/login" class={styles.logInOrRegisterIcon}>
          <MdPersonOutline size={30} />
        </Link>
      </div>
    );

    const avatar = (
      <div class={styles.avatar}>
        <button onClick={this.handleAvaterClick}>
          <img src="/static/img/avatar.png" class={styles.avatarImage} />
        </button>
        <div
          class={cx({
            [styles.avatarMenu]: true,
            [styles.open]: open
          })}
        >
          <ul>
            <li>
              <Link to={`/${token.obj.username}`}>
                <MdPerson class={styles.avatarIcon} size={18} />
                <FormattedMessage id="app.profile" />
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <MdSettings class={styles.avatarIcon} size={18} />
                <FormattedMessage id="app.settings" />
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <MdPowerSettingsNew class={styles.avatarIcon} size={18} />
                <FormattedMessage id="app.logout" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );

    const search = (
      <div class={styles.search}>
        <form
          action="//search.summertear.com/all"
          class={styles.searchForm}
          target="_blank"
        >
          <input
            class={styles.searchInput}
            autocomplete="off"
            placeholder={intl.formatMessage({ id: 'app.search' })}
          />
          <button class={styles.searchSubmit} type="submit">
            <MdSearch size={30} />
          </button>
        </form>
      </div>
    );

    return (
      <div class={styles.wrap}>
        <div class={styles.inner}>
          <div class={styles.logo}>
            <Link to="/">
              <h1 class={styles.logoText}>SummerTear</h1>
            </Link>
          </div>
          {search}
          {loggedIn ? avatar : logInOrRegister}
        </div>
      </div>
    );
  }
}

export default injectIntl(Topbar);
