import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
/* eslint no-underscore-dangle: 0 */
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// eslint-disable-next-line import/prefer-default-export
const configureStore = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);
sagaMiddleware.run(sagas);

export default configureStore;
