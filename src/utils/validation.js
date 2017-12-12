import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

const isUsername = username => /^[a-zA-Z0-9_-]{3,15}$/.test(username);

const isPassword = password => password.length >= 6 && password.length <= 20;

export { isEmail, isMobilePhone, isUsername, isPassword };
