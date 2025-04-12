import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {allReducers, allSagas} from './redux';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(allReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(allSagas);

export default store;
