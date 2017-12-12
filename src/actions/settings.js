import types from 'constants/ActionTypes';
//account form actions
export function settingsAccountRequest(data) {
  return { type: types.SETTINGS_ACCOUNT_REQUEST, data };
}
export function settingsAccountSuccess() {
  return { type: types.SETTINGS_ACCOUNT_SUCCESS };
}
export function settingsAccountMessage(message) {
  return { type: types.SETTINGS_ACCOUNT_MESSAGE, message };
}
export function settingsAccountFormChange(name, value) {
  return { type: types.SETTINGS_ACCOUNT_FORM_CHANGE, name, value };
}
export function settingsAccountFormCanSubmit(canSubmit) {
  return { type: types.SETTINGS_ACCOUNT_FORM_CANSUBMT, canSubmit };
}
export function settingsAccountFormFieldValidate(name, value) {
  return { type: types.SETTINGS_ACCOUNT_FORM_FIELD_VALIDATE, name, value };
}
export function settingsAccountFormFieldValidateStart(name) {
  return { type: types.SETTINGS_ACCOUNT_FORM_FIELD_VALIDATE_START, name };
}
export function settingsAccountFormFieldError(name, error) {
  return { type: types.SETTINGS_ACCOUNT_FORM_FIELD_ERROR, name, error };
}
export function settingsAccountFormInit(data) {
  return { type: types.SETTINGS_ACCOUNT_FORM_INIT, data };
}

// password form actions
export function settingsPasswordRequest(data) {
  return { type: types.SETTINGS_PASSWORD_REQUEST, data };
}
export function settingsPasswordSuccess() {
  return { type: types.SETTINGS_PASSWORD_SUCCESS };
}
export function settingsPasswordMessage(message) {
  return { type: types.SETTINGS_PASSWORD_MESSAGE, message };
}
export function settingsPasswordFormChange(name, value) {
  return { type: types.SETTINGS_PASSWORD_FORM_CHANGE, name, value };
}
export function settingsPasswordFormValidate() {
  return { type: types.SETTINGS_PASSWORD_FORM_VALIDATE };
}
export function settingsPasswordFormFieldMessage(name, message) {
  return { type: types.SETTINGS_PASSWORD_FORM_FIELD_MESSAGE, name, message };
}
export function settingsPasswordFormCanSubmit(canSubmit) {
  return { type: types.SETTINGS_PASSWORD_FORM_CANSUBMT, canSubmit };
}
export function settingsPasswordFormInit() {
  return { type: types.SETTINGS_PASSWORD_FORM_INIT };
}
