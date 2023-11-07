// src/store.js
import { createStore, combineReducers } from 'redux';
import appReducer from './reducers';
import sentenceReducer from './sentenceReducer'

const rootReducer = combineReducers({
    appReducer,
    sentenceReducer,
});

const store = createStore(rootReducer);

export default store;