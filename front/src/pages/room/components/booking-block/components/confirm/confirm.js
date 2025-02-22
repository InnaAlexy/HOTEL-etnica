import { useSelector } from 'react-redux';
import { Button, Icon } from '../../../../../../component';
import styles from './confirm.module.css';
import { selectRoomId } from '../../../../../../selectors';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { request } from '../../../../../../utils';

export const Confirm = ({ onClose, date }) => {
	const roomId = useSelector(selectRoomId);
	const [serverError, setServerError] = useState('');
	const [successBooking, setSuccessBooking] = useState(false);

	const onNewBookingAdd = (roomId, date) => {
		request(`/rooms/${roomId}/booking`, 'POST', { date }).then(({ error, data }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			setSuccessBooking(true);
		});
	};

	if (successBooking) {
		return <Navigate to="/myBooking" />;
	}

	return (
		<div className={styles.confirmConteiner}>
			<div className={styles.confirm}>
				<div className={styles.closeButton}>
					<Icon id="fa-window-close-o" onClick={onClose} />
				</div>
				{serverError ? (
					<div>{serverError}</div>
				) : (
					<>
						<div className={styles.confirmMessage}>
							Выбранные вами даты свободны, желаете забронировать?
						</div>
						<Button onclick={() => onNewBookingAdd(roomId, date)}>
							Подтвердить
						</Button>
					</>
				)}
			</div>
		</div>
	);
};
