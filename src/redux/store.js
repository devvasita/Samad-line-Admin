import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
/* eslint no-underscore-dangle: 0 */
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
// let devtools = (x) => x;

// if (
//   process &&
//   process.env.NODE_ENV !== 'production' &&
//   process.browser &&
//   window.__REDUX_DEVTOOLS_EXTENSION__
// ) {
//   devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
// }

// eslint-disable-next-line import/prefer-default-export
export function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
