import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { Router } from 'react-router-dom';
import history from './history';
import { addLocaleData, IntlProvider } from 'preact-intl';
import Cookies from 'js-cookie';

import store from 'store';
import 'styles';

if (process.env.NODE_ENV === 'development') {
  // enable preact devtools
  require('preact/devtools');
}

import ZH from 'bundle-loader?lazy!react-intl/locale-data/zh.js';
import EN from 'bundle-loader?lazy!react-intl/locale-data/en.js';
import cnMessage from 'bundle-loader?lazy!../public/static/translations/cn.json';
import twMessage from 'bundle-loader?lazy!../public/static/translations/tw.json';
import enMessage from 'bundle-loader?lazy!../public/static/translations/en.json';

//支持的语言(有些浏览器使用小写，比如UC)
const languages = ['en', 'en-US', 'zh-CN', 'zh-TW'];
const defaultLanguage = 'en';
function formatLocale(lang) {
  if (lang) {
    if (lang.indexOf('-') !== -1) {
      const langArray = lang.split('-');
      return `${langArray[0].toLowerCase()}-${langArray[1].toUpperCase()}`;
    }
    return lang.toLowerCase();
  }
  return lang;
}
function getLanguage() {
  let lang = Cookies.get('lang');
  if (lang) {
    return lang;
  }
  lang = navigator.language || navigator.browserLanguage || 'en';
  lang = formatLocale(lang);
  if (languages.indexOf(lang) === -1) {
    lang = defaultLanguage;
  }
  Cookies.set('lang', lang, { expires: 365 * 2 }); // 过期时间2年
  return lang;
}
const locale = getLanguage();
const locales = {
  en: { data: EN, messages: enMessage },
  'en-US': { data: EN, messages: enMessage },
  'zh-CN': { data: ZH, messages: cnMessage },
  'zh-TW': { data: ZH, messages: twMessage }
};

locales[locale].data(localeData => {
  addLocaleData(localeData);
  locales[locale].messages(localeMessages => {
    //render app
    let root = document.body.lastElementChild;
    const renderApp = () => {
      let App = require('containers/App').default;
      root = render(
        <Provider store={store}>
          <IntlProvider locale={locale} messages={localeMessages}>
            <Router history={history}>
              <App />
            </Router>
          </IntlProvider>
        </Provider>,
        document.body,
        root
      );
    };
    renderApp();
    /**
     * 热更新(必须用webpack.DefinePlugin处理）
     */
    if (process.env.NODE_ENV === 'development') {
      if (module.hot) {
        // 组建热替换，reducer的热替换在store里
        module.hot.accept('containers/App', () => {
          renderApp();
        });
      }
    }
  });
});
