import { createReducer } from 'utils';
import types from 'constants/ActionTypes';

const initialState = {
  account: {
    formState: {
      username: { value: '', message: '', valid: false },
      email: { value: '', message: '', valid: false }
    },
    message: '',
    sending: false,
    canSubmit: false
  },
  password: {
    formState: {
      current: { value: '', message: '' },
      password: { value: '', message: '' },
      confirm: { value: '', message: '' }
    },
    message: '',
    sending: false,
    canSubmit: false
  }
};

export default createReducer(initialState, {
  [types.SETTINGS_ACCOUNT_REQUEST](state) {
    return { ...state, account: { ...state.account, sending: true } };
  },
  [types.SETTINGS_ACCOUNT_FORM_CHANGE](state, action) {
    return {
      ...state,
      account: {
        ...state.account,
        formState: {
          ...state.account.formState,
          [action.name]: {
            ...state.account.formState[action.name],
            value: action.value
          }
        },
        message: ''
      }
    };
  },
  [types.SETTINGS_ACCOUNT_SUCCESS](state) {
    return {
      ...state,
      account: { ...state.account, sending: false, canSubmit: false }
    };
  },
  [types.SETTINGS_ACCOUNT_MESSAGE](state, action) {
    return {
      ...state,
      account: { ...state.account, message: action.message, sending: false }
    };
  },
  [types.SETTINGS_ACCOUNT_FORM_CANSUBMT](state, action) {
    return {
      ...state,
      account: { ...state.account, canSubmit: action.canSubmit }
    };
  },
  [types.SETTINGS_ACCOUNT_FORM_FIELD_ERROR](state, action) {
    return {
      ...state,
      account: {
        ...state.account,
        formState: {
          ...state.account.formState,
          [action.name]: {
            ...state.account.formState[action.name],
            message: action.error,
            valid: false
          }
        }
      }
    };
  },
  [types.SETTINGS_ACCOUNT_FORM_FIELD_VALIDATE_START](state, action) {
    return {
      ...state,
      account: {
        ...state.account,
        formState: {
          ...state.account.formState,
          [action.name]: {
            ...state.account.formState[action.name],
            message: { intl: 'validating' },
            valid: false
          }
        }
      }
    };
  },
  [types.SETTINGS_ACCOUNT_FORM_FIELD_VALIDATE](state, action) {
    return {
      ...state,
      account: {
        ...state.account,
        formState: {
          ...state.account.formState,
          [action.name]: {
            ...state.account.formState[action.name],
            message: '',
            valid: true
          }
        }
      }
    };
  },
  [types.SETTINGS_ACCOUNT_FORM_INIT](state, action) {
    let formState = {};
    for (let name in action.data) {
      if (action.data.hasOwnProperty(name)) {
        formState[name] = {
          value: action.data[name],
          message: '',
          valid: true
        };
      }
    }
    return {
      ...state,
      account: {
        formState,
        message: '',
        sending: false,
        canSubmit: false
      }
    };
  },
  [types.SETTINGS_PASSWORD_REQUEST](state) {
    return { ...state, password: { ...state.password, sending: true } };
  },
  [types.SETTINGS_PASSWORD_FORM_INIT](state) {
    return {
      ...state,
      password: {
        formState: {
          current: { value: '', message: '' },
          password: { value: '', message: '' },
          confirm: { value: '', message: '' }
        },
        message: '',
        sending: false,
        canSubmit: false
      }
    };
  },
  [types.SETTINGS_PASSWORD_FORM_CHANGE](state, action) {
    return {
      ...state,
      password: {
        ...state.password,
        formState: {
          ...state.password.formState,
          [action.name]: {
            ...state.password.formState[action.name],
            value: action.value
          }
        },
        message: ''
      }
    };
  },
  [types.SETTINGS_PASSWORD_SUCCESS](state) {
    return { ...state, password: { ...state.password, sending: false } };
  },
  [types.SETTINGS_PASSWORD_MESSAGE](state, action) {
    return {
      ...state,
      password: { ...state.password, message: action.message, sending: false }
    };
  },
  [types.SETTINGS_PASSWORD_FORM_FIELD_MESSAGE](state, action) {
    return {
      ...state,
      password: {
        ...state.password,
        formState: {
          ...state.password.formState,
          [action.name]: {
            ...state.password.formState[action.name],
            message: action.message
          }
        }
      }
    };
  },
  [types.SETTINGS_PASSWORD_FORM_CANSUBMT](state, action) {
    return {
      ...state,
      password: { ...state.password, canSubmit: action.canSubmit }
    };
  }
});
