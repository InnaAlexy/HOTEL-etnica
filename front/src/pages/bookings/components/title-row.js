import styles from '../bookings.module.css';

export const TitleRow = () => {
	return (
		<div className={styles.titleRow}>
			<div className={styles.loginColumn}>Имя гостя</div>
			<div className={styles.titleColumn}>Название/Номер</div>
			<div className={styles.dateStartColumn}>Заезд</div>
			<div className={styles.dateEndColumn}>Выезд</div>
			<div className={styles.statusColumn}>Статус бронирования</div>
		</div>
	);
};
