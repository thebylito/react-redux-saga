import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import reducers from './ducks';

const sagaMiddleware = createSagaMiddleware({});

const middlewares = [sagaMiddleware];

export default function configureStore() {
  const store = createStore(
    reducers(),
    compose(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);
  return { store };
}
