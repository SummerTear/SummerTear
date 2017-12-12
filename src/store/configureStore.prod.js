import { createStore, applyMiddleware } from 'redux';
import { createLogicMiddleware } from 'redux-logic';

import rootReducer from '../reducers';
import rootLogic from '../logics';

const logicMiddleware = createLogicMiddleware(rootLogic);

const configureStore = () => {
  if (window.__INITIAL_STATE__) {
    return createStore(
      rootReducer,
      window.__INITIAL_STATE__,
      applyMiddleware(logicMiddleware)
    );
  }
  return createStore(rootReducer, applyMiddleware(logicMiddleware));
};
export default configureStore;
