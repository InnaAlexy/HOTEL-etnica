import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { appReducer, userReducer, roomReducer } from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	room: roomReducer,
});

const composeEnhanqers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhanqers(applyMiddleware(thunk)));
