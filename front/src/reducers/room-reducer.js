import { ACTION_TYPE } from '../actions';

const initialRoomState = {
	id: '',
	title: '',
	imgUrl: '',
	content: '',
	maxCapacity: '',
	price: '',
};

export const roomReducer = (state = initialRoomState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ROOM_DATA:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
