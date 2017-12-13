import { createStore, applyMiddleware, compose } from 'redux';
import { createLogicMiddleware } from 'redux-logic';

import rootReducer from 'reducers';
import rootLogic from 'logics';

const logicMiddleware = createLogicMiddleware(rootLogic);

let composeEnhancers;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    shouldHotReload: false
  });
} else {
  composeEnhancers = compose;
}

const configureStore = initState => {
  const store = createStore(
    rootReducer,
    initState,
    composeEnhancers(applyMiddleware(logicMiddleware))
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      console.log('Updated reducers');
      const nextRootReducer = require('reducers').default;
      store.replaceReducer(nextRootReducer);
    });
    module.hot.accept('logics', () => {
      console.log('Updated logics');
      let nextRootLogic = require('logics').default;
      logicMiddleware.replaceLogic(nextRootLogic);
    });
  }
  return store;
};
export default configureStore;
