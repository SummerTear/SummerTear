import { createLogic } from 'redux-logic';
import types from 'constants/ActionTypes';
import {
  settingsAccountSuccess,
  settingsAccountMessage,
  settingsAccountFormFieldValidate,
  settingsAccountFormFieldValidateStart,
  settingsAccountFormFieldError,
  settingsAccountFormCanSubmit,
  settingsPasswordSuccess,
  settingsPasswordMessage,
  settingsPasswordFormValidate,
  settingsPasswordFormFieldMessage,
  settingsPasswordFormCanSubmit,
  setToken
} from 'actions';
import {
  isUsername,
  isEmail,
  isPassword,
  makeMessage,
  makeErrorMessage
} from 'utils';
import api from 'api';

const settingsAccountFormFieldValidateStartLogic = createLogic({
  type: types.SETTINGS_ACCOUNT_FORM_FIELD_VALIDATE_START,
  throttle: 500,
  process(obj, dispatch, done) {
    dispatch(settingsAccountFormCanSubmit(false));
    done();
  }
});

const settingsAccountFormFieldValidateLogic = createLogic({
  type: types.SETTINGS_ACCOUNT_FORM_FIELD_VALIDATE,
  debounce: 500,
  validate({ getState, action }, allow, reject) {
    const state = getState();
    const currentUsername = state.token.obj.username;
    const currentEmail = state.token.obj.email;
    switch (action.name) {
      case 'username':
        if (isUsername(action.value)) {
          if (action.value === currentUsername) {
            allow(action);
          } else {
            api['users']
              .usernameAvailable(action.value)
              .then(data => {
                if (data.valid) {
                  allow(action);
                } else {
                  reject(
                    settingsAccountFormFieldError(
                      'username',
                      makeErrorMessage(data.message)
                    )
                  );
                }
              })
              .catch(err => {
                let errMsg;
                if (err.response) {
                  errMsg = err.response.data.message || err.response.data;
                } else if (err.request) {
                  errMsg = err.request;
                } else {
                  errMsg = err.message;
                }
                reject(
                  settingsAccountFormFieldError(
                    'username',
                    makeErrorMessage(errMsg)
                  )
                );
              });
          }
        } else {
          reject(
            settingsAccountFormFieldError(
              'username',
              makeErrorMessage({
                intl: 'usernameError'
              })
            )
          );
        }
        break;
      case 'email':
        if (isEmail(action.value)) {
          if (action.value === currentEmail) {
            allow(action);
          } else {
            api['users']
              .emailAvailable(action.value)
              .then(data => {
                if (data.valid) {
                  allow(action);
                } else {
                  reject(
                    settingsAccountFormFieldError(
                      'email',
                      makeErrorMessage(data.message)
                    )
                  );
                }
              })
              .catch(err => {
                let errMsg;
                if (err.response) {
                  errMsg = err.response.data.message || err.response.data;
                } else if (err.request) {
                  errMsg = err.request;
                } else {
                  errMsg = err.message;
                }
                reject(
                  settingsAccountFormFieldError(
                    'email',
                    makeErrorMessage(errMsg)
                  )
                );
              });
          }
        } else {
          reject(
            settingsAccountFormFieldError(
              'email',
              makeErrorMessage({
                intl: 'emailError'
              })
            )
          );
        }
        break;
    }
  },
  process({ getState }, dispatch, done) {
    const state = getState();
    const currentUsername = state.token.obj.username;
    const currentEmail = state.token.obj.email;
    const username = state.settings.account.formState.username;
    const email = state.settings.account.formState.email;
    if (username.value !== currentUsername || email.value !== currentEmail) {
      if (username.valid && email.valid) {
        dispatch(settingsAccountFormCanSubmit(true));
      } else {
        dispatch(settingsAccountFormCanSubmit(false));
      }
    } else {
      dispatch(settingsAccountFormCanSubmit(false));
    }
    done();
  }
});

const settingsAccountFormChangeLogic = createLogic({
  type: types.SETTINGS_ACCOUNT_FORM_CHANGE,
  process({ action }, dispatch, done) {
    dispatch(settingsAccountFormFieldValidateStart(action.name));
    dispatch(settingsAccountFormFieldValidate(action.name, action.value));
    done();
  }
});

const settingsAccountLogic = createLogic({
  type: types.SETTINGS_ACCOUNT_REQUEST,
  process({ action }, dispatch, done) {
    const { username, email, password } = action.data;
    return api['settings']
      .updateAccount({ username, email }, password)
      .then(data => {
        dispatch(setToken(data.token));
        dispatch(settingsAccountSuccess());
        dispatch(settingsAccountMessage(makeMessage(data.message, data.type)));
      })
      .catch(err => {
        let errMsg;
        if (err.response) {
          errMsg = err.response.data.message || err.response.data;
        } else if (err.request) {
          errMsg = err.request;
        } else {
          errMsg = err.message;
        }
        dispatch(settingsAccountMessage(makeErrorMessage(errMsg)));
      })
      .then(() => done());
  }
});

const settingsPasswordLogic = createLogic({
  type: types.SETTINGS_PASSWORD_REQUEST,
  process({ action }, dispatch, done) {
    const { current, password } = action.data;
    return api['settings']
      .updatePassword(current, password)
      .then(data => {
        dispatch(setToken(data.token));
        dispatch(settingsPasswordSuccess());
        dispatch(settingsPasswordMessage(makeMessage(data.message, data.type)));
      })
      .catch(err => {
        let errMsg;
        if (err.response) {
          errMsg = err.response.data.message || err.response.data;
        } else if (err.request) {
          errMsg = err.request;
        } else {
          errMsg = err.message;
        }
        dispatch(settingsPasswordMessage(makeErrorMessage(errMsg)));
      })
      .then(() => done());
  }
});

const settingsPasswordFormChangeLogic = createLogic({
  type: types.SETTINGS_PASSWORD_FORM_CHANGE,
  process(obj, dispatch, done) {
    dispatch(settingsPasswordFormCanSubmit(false));
    dispatch(settingsPasswordFormFieldMessage('password', makeMessage('')));
    dispatch(settingsPasswordFormFieldMessage('confirm', makeMessage('')));
    dispatch(settingsPasswordFormValidate());
    done();
  }
});

const settingsPasswordFormValidateLogic = createLogic({
  type: types.SETTINGS_PASSWORD_FORM_VALIDATE,
  validate({ getState, action }, allow, reject) {
    const { password, confirm } = getState().settings.password.formState;
    if (!password.value) {
      reject(settingsPasswordFormFieldMessage('password', makeMessage('')));
    }
    if (!isPassword(password.value)) {
      reject(
        settingsPasswordFormFieldMessage(
          'password',
          makeErrorMessage({ intl: 'passwordError' })
        )
      );
    }
    if (!confirm.value) {
      reject(settingsPasswordFormFieldMessage('confirm', makeMessage('')));
    }
    if (password.value !== confirm.value) {
      reject(
        settingsPasswordFormFieldMessage(
          'confirm',
          makeErrorMessage({ intl: 'passwordConfirmError' })
        )
      );
    }
    allow(action);
  },
  process({ getState }, dispatch, done) {
    if (getState().settings.password.formState.current.value) {
      dispatch(settingsPasswordFormCanSubmit(true));
      done();
    }
  }
});

export default [
  settingsAccountFormFieldValidateStartLogic,
  settingsAccountFormFieldValidateLogic,
  settingsAccountFormChangeLogic,
  settingsAccountLogic,
  settingsPasswordFormValidateLogic,
  settingsPasswordFormChangeLogic,
  settingsPasswordLogic
];
