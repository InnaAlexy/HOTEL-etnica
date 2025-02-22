import { useEffect, useState } from 'react';
import { Button, Loader } from '../../../../component';
import styles from './booking-block.module.css';
import { Confirm, Error } from './components';
import { actualDateToday, dateAfterDate, request } from '../../../../utils';

export const BookingBlock = ({ actualRoomId }) => {
	const [startDay, setStartDay] = useState('');
	const [endDay, setEndDay] = useState('');
	const [isDateBusy, setIsDateBusy] = useState(false);
	const [toutched, setToutched] = useState(false);
	const [alreadyBusyDates, setAlreadyBusyDates] = useState([]);
	const [desiredDates, setDesiredDates] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		request(`/rooms/${actualRoomId}/booking`).then((data) =>
			setAlreadyBusyDates(data.dates),
		);
	}, [actualRoomId]);

	const onStartDayChange = ({ target }) => {
		setStartDay(target.value);
	};
	const onEndDayChange = ({ target }) => {
		setEndDay(target.value);
	};

	const onClose = () => {
		setToutched(false);
	};

	const onBookingCheck = (startDay, endDay, busyDates) => {
		setIsLoading(true);
		const dateStart = Date.parse(startDay);
		const dateEnd = Date.parse(endDay);

		let daysArr = [];

		for (let i = dateStart; i <= dateEnd; i = i + 24 * 60 * 60 * 1000) {
			daysArr.push(new Date(i).toISOString().slice(0, 10));
		}

		const checkingRes = daysArr.map((date) => busyDates.includes(date));

		setIsDateBusy(checkingRes.includes(true));
		setToutched(true);
		setDesiredDates(daysArr);
		setIsLoading(false);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<div>
				<div className={styles.bookingForm}>
					<div className={styles.inputConteiner}>
						<div>
							Дата заезда:{' '}
							<input
								type="date"
								name="startDay"
								min={actualDateToday()}
								max={endDay}
								onChange={onStartDayChange}
							/>
						</div>
						<div>
							Дата выезда:{' '}
							<input
								type="date"
								name="endDay"
								min={
									startDay
										? dateAfterDate(startDay)
										: dateAfterDate(actualDateToday())
								}
								onChange={onEndDayChange}
							/>
						</div>
					</div>
					{startDay && endDay ? (
						<Button
							onclick={() =>
								onBookingCheck(startDay, endDay, alreadyBusyDates)
							}
						>
							Проверить доступность дат
						</Button>
					) : (
						<div className={styles.buttonPlace}>
							Выберите желаемые даты бронирования.
						</div>
					)}
				</div>
				{toutched && isDateBusy ? (
					<Error onClose={onClose} />
				) : toutched && !isDateBusy ? (
					<Confirm onClose={onClose} date={desiredDates} />
				) : (
					<div></div>
				)}
			</div>
		</>
	);
};
