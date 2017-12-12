export function makeMessage(message, type) {
  const obj = Object.create(null);
  obj.type = type ? type : 'info';
  if (!message) {
    obj.value = '';
  } else if (typeof message === 'string') {
    obj.value = message;
  } else {
    obj.intl = message.intl;
  }
  return obj;
}

export function messageType(message) {
  return message.type;
}

export function messageValue(message, intl) {
  if (message.intl) {
    return intl.formatMessage({ id: message.intl });
  }
  return message.value;
}

export function makeErrorMessage(message) {
  return makeMessage(message, 'error');
}
