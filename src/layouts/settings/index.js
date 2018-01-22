import { h } from 'preact';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'preact-intl';
import styles from './style';

import AccountPage from 'pages/settings/account';
import PasswordPage from 'pages/settings/password';

const SettingsLayout = () => (
  <div class="settings">
    <nav class={styles.nav}>
      <ul>
        <li>
          <NavLink activeClassName={styles.active} to="/settings/account">
            <FormattedMessage id="app.settings.account" />
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} to="/settings/password">
            <FormattedMessage id="app.settings.password" />
          </NavLink>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route path="/settings/account" component={AccountPage} />
      <Route path="/settings/password" component={PasswordPage} />
      <Redirect to="/settings/account" />
    </Switch>
  </div>
);

export default SettingsLayout;
