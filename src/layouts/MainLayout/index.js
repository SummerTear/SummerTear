import { h } from 'preact';
import { Switch, Route } from 'react-router-dom';
import MainHeader from 'containers/MainHeader';
import AuthorizedRoute from 'containers/AuthorizedRoute';
import styles from './style';

import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import ConfirmPage from 'pages/ConfirmPage';
import NotFoundPage from 'pages/NotFoundPage';
import ErizabesuPage from 'pages/ErizabesuPage';
import SettingsLayout from 'layouts/SettingsLayout';

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
