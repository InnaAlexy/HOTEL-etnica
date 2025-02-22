import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	appReducer,
	userReducer,
	// usersReducer,
	roomReducer,
	// roomsReducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	// users: usersReducer,
	// rooms: roomsReducer,
	room: roomReducer,
});

const composeEnhanqers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhanqers(applyMiddleware(thunk)));
