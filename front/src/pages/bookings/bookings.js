import { useEffect, useState } from 'react';
import { TableRow, TitleRow } from './components';
import { Error, Loader } from '../../component';
import { ERROR, ROLE } from '../../constants';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { checkAccess, request } from '../../utils';
import styles from './bookings.module.css';

export const Bookings = () => {
	const [bookings, setBookings] = useState([]);
	const [error, setError] = useState('');
	const [shouldUpdateList, setShouldUpdateList] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		setIsLoading(true);

		if (!checkAccess([ROLE.ADMIN], userRole)) {
			setError(ERROR.ACCESS_ERROR);
			setIsLoading(false);

			return;
		}

		request('/bookings').then((bookingsRes) => {
			if (bookingsRes.error) {
				setError(bookingsRes.error);
				setIsLoading(false);

				return;
			}

			setBookings(bookingsRes.data);
			setIsLoading(false);
		});
	}, [shouldUpdateList, userRole]);

	const onBookingRemove = (idOfBooking) => {
		request(`/bookings/${idOfBooking}`, 'DELETE').then(({ error }) => {
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
			<h2>Список бронирований</h2>
			<div className={styles.tableConteiner}>
				<TitleRow />
				{bookings.map(({ id, room, author, date, status }) => (
					<TableRow
						key={id}
						id={id}
						roomId={room.id}
						title={room.title}
						userLogin={author.login}
						date={date}
						status={status}
						onBookingRemove={() => onBookingRemove(id)}
					/>
				))}
			</div>
		</div>
	);
};
