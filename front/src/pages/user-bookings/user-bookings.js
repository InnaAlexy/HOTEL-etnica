import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { useEffect, useState } from 'react';
import styles from './user-bookings.module.css';
import { TableRow } from './components';
import { Error, Loader } from '../../component';
import { checkAccess, request } from '../../utils';
import { ERROR, ROLE } from '../../constants';

export const UserBookings = () => {
	const [userBookings, setUserBookings] = useState([]);
	const [error, setError] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [shouldUpdateList, setShouldUpdateList] = useState(false);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		setIsLoading(true);
		if (!checkAccess([ROLE.ADMIN, ROLE.GEST], userRole)) {
			setError(ERROR.ACCESS_ERROR);
			setIsLoading(false);

			return;
		}
		request('/bookings/my').then(({ error, data }) => {
			if (error) {
				setError(error);
				setIsLoading(false);
				return;
			}
			if (data.length < 1) {
				setErrorMessage('У вас еще нет бронирований!');
				setIsLoading(false);
				return;
			}
			setUserBookings(data);
			setIsLoading(false);
		});
	}, [shouldUpdateList, userRole]);

	const onBookingRemove = (id) => {
		request(`/bookings/${id}`, 'DELETE').then(({ error }) => {
			if (error) {
				setError(error);

				return;
			}
			setShouldUpdateList(!shouldUpdateList);
		});
	};

	if (isLoading) {
		return <Loader />;
	}

	return error ? (
		<Error error={error} />
	) : (
		<div className={styles.conteiner}>
			<h2>Мои бронирования</h2>
			<div className={styles.tableConteiner}>
				{errorMessage ? (
					<div>{errorMessage} </div>
				) : (
					<>
						<div className={styles.titleRow}>
							<div className={styles.titleColumn}>Номер</div>
							<div className={styles.dateStartColumn}>Заезд</div>
							<div className={styles.dateEndColumn}>Выезд</div>
							<div className={styles.statusColumn}>Статус бронирования</div>
						</div>
						{userBookings.map(({ id, room, date, status }) => (
							<TableRow
								id={id}
								key={id}
								roomId={room.id}
								title={room.title}
								date={date}
								status={status}
								onBookingRemove={() => onBookingRemove(id)}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
};
