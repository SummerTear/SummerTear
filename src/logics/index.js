import loginLogic from './login';
import registerLogic from './register';
import settingsLogic from './settings';
import tokenLogic from './token';

export default [
  ...loginLogic,
  ...registerLogic,
  ...settingsLogic,
  ...tokenLogic
];
