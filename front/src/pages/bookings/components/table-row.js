import { useState } from 'react';
import { Button, Icon } from '../../../component';
import styles from '../bookings.module.css';
import { request } from '../../../utils';
import { STATUSES } from '../../../constants';

export const TableRow = ({
	id,
	title,
	roomId,
	maxCapacity,
	userLogin,
	date,
	status,
	onBookingRemove,
}) => {
	const [actualStatus, setActualStatus] = useState(status);
	const [selectedStatus, setSelectedStatus] = useState(status);
	const [titleContent, setTitleContent] = useState(false);
	const dayStart = date[0];
	const dayEnd = date[date.length - 1];

	const onStatusChange = ({ target }) => {
		setSelectedStatus(target.value);
	};

	const onStatusSave = (idOfBooking, newIdOfStatus) => {
		request(`/bookings/${idOfBooking}`, 'PATCH', { status: newIdOfStatus }).then(
			({ error, data }) => {
				if (!error) {
					setActualStatus(newIdOfStatus);
				}

				return;
			},
		);
	};

	const isSaveButtonDisabled = selectedStatus === actualStatus;

	return (
		<div className={styles.tableRow}>
			<div className={styles.loginColumn}>{userLogin}</div>
			<div
				className={styles.titleColumn}
				onMouseOver={() => setTitleContent(!titleContent)}
				onMouseOut={() => setTitleContent(!titleContent)}
			>
				{titleContent ? `Максимум ${maxCapacity} чел.` : title}
			</div>
			<div className={styles.dateStartColumn}>{dayStart}</div>
			<div className={styles.dateEndColumn}>{dayEnd}</div>
			<div className={styles.statusColumn}>
				<select value={selectedStatus} onChange={onStatusChange}>
					{STATUSES.map(({ id: statusId, name }) => (
						<option key={statusId} value={statusId}>
							{name}
						</option>
					))}
				</select>
			</div>
			<div className={styles.iconRow}>
				{isSaveButtonDisabled ? (
					<div className={styles.disable}>
						<Icon id="fa-check" />
					</div>
				) : (
					<Button onclick={() => onStatusSave(id, selectedStatus)}>
						<Icon id="fa-check" />
					</Button>
				)}
				<Button onclick={onBookingRemove}>
					<Icon id="fa-trash-o" />
				</Button>
			</div>
		</div>
	);
};
