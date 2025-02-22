import { useState } from 'react';
import { Button, Icon } from '../../../component';
import { correctStatusName } from '../../../utils';
import styles from '../user-bookings.module.css';

export const TableRow = ({ roomId, title, date, status, onBookingRemove }) => {
	const [changeContent, setChangeContent] = useState(false);
	const dayStart = date[0];
	const dayEnd = date[date.length - 1];

	return (
		<div className={styles.tableRow}>
			<div
				className={styles.titleColumn}
				onMouseOver={() => setChangeContent(!changeContent)}
				onMouseOut={() => setChangeContent(!changeContent)}
			>
				{changeContent ? `номер:${roomId}` : title}
			</div>

			<div className={styles.dateStartColumn}>{dayStart}</div>
			<div className={styles.dateEndColumn}>{dayEnd}</div>
			<div className={styles.statusColumn}>{correctStatusName(status)}</div>

			<Button onclick={onBookingRemove}>
				<Icon id="fa-trash-o" />
			</Button>
		</div>
	);
};
