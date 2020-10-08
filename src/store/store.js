import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './general/reducer';
import {initThunk} from './general/thunks';

const rootReducer = combineReducers({
    user: userReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => store.getState())

store.dispatch(initThunk())

export default store;