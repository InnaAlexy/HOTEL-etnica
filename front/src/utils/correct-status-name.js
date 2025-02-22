export const correctStatusName = (status) => {
	switch (status) {
		case '0': {
			return 'Ожидает подтверждения';
		}
		case '1': {
			return 'Подтверждено';
		}
		case '2': {
			return 'Отменено';
		}
		default:
			return status;
	}
};
