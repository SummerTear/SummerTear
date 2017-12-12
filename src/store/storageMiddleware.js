import sourceId from './sourceId';
import { setToken, setStatus } from 'actions';
import loginActionTypes from 'constants/loginActionTypes';
import tokenActionTypes from 'constants/tokenActionTypes';
import statusActionTypes from 'constants/statusActionTypes';

const storageKey = 'STORAGE-KEY';

const wrapAction = action => ({
  action,
  sourceId
});

const ALLOWED_ACTIONS_TYPES = {
  ...loginActionTypes,
  ...tokenActionTypes,
  ...statusActionTypes
};
//判断action是否要传到别的tab，（目前只传播login,logout, status以及token方面的action）
const isAllowedAction = action => action.type in ALLOWED_ACTIONS_TYPES;
//判断action是否是从别的tab传来的
const isOtherTabAction = action => action.hasOwnProperty(storageKey);

const createStorageMiddleware = () => () => next => action => {
  //当action是允许传播到其它tab的，且该action不是其它tab传来的，就通过storage传播
  if (isAllowedAction(action) && !isOtherTabAction(action)) {
    const wrappedAction = wrapAction(action);
    localStorage.setItem(storageKey, JSON.stringify(wrappedAction));
    //避免将重要数据留在localStorage里
    localStorage.removeItem(storageKey);
  }
  next(action);
};

//wrap一个middleware,让它忽略从其它tab传来的action
//比如wrap网络请求相关的middleware，这样就不用不同tab都请求
const wrapMidlewareForIgnoreAction = middleware => store => next => action => {
  if (isOtherTabAction(action)) {
    next(action);
  } else {
    middleware(store)(next)(action);
  }
};

const createOnStorage = store => event => {
  if (event.key === storageKey && event.newValue) {
    const wrappedAction = JSON.parse(event.newValue);
    if (wrappedAction.sourceId !== sourceId) {
      const action = wrappedAction.action;
      if (action.type === statusActionTypes.SYNC_STATUS) {
        const { status } = store.getState();
        store.dispatch(setStatus(status));
      } else if (action.type === tokenActionTypes.SYNC_TOKEN) {
        const { token } = store.getState();
        if (token.raw) {
          store.dispatch(setToken(token.raw));
        }
      } else {
        //标记action为其它tab传来的
        action[storageKey] = storageKey;
        //这里的action还是会经过middleware
        store.dispatch(action);
      }
    }
  }
  /*
  if (event.key === 'getToken') {
    const { token } = store.getState();
    if (token.raw) {
      store.dispatch(setToken(token.raw));
      store.dispatch(loginSuccess());
    }
  }*/
};

export {
  createStorageMiddleware,
  createOnStorage,
  wrapMidlewareForIgnoreAction
};
