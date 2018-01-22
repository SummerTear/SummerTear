import { h } from 'preact';
import { Switch, Route } from 'react-router-dom';
import MainHeader from 'containers/MainHeader';
import AuthorizedRoute from 'containers/AuthorizedRoute';
import styles from './style';

import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import ConfirmPage from 'pages/confirm';
import NotFoundPage from 'pages/not-found';
import ErizabesuPage from 'pages/erizabesu';
import SettingsLayout from 'layouts/settings';

const MainLayout = () => {
  return (
    <div id="app">
      <MainHeader />
      <main class={styles.content}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/confirm/:data?" component={ConfirmPage} />
          <AuthorizedRoute path="/settings" component={SettingsLayout} />
          <ErizabesuPage
            path="/opensource/erizabesu"
            component={ErizabesuPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </div>
  );
};

export default MainLayout;
