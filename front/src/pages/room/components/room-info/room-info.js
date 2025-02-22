import { Icon } from '../../../../component';
import styles from './room-info.module.css';

export const RoomInfo = ({ room }) => {
	const { title, imgUrl, content, maxCapacity } = room;

	return (
		<div className={styles.conteiner}>
			<div className={styles.title}>{title}</div>
			<div>
				<div className={styles.imageConteiner}>
					<img src={imgUrl} alt={title} />
				</div>
				<div className={styles.iconsPanel}>
					<Icon id="fa-shower" />
					<Icon id="fa-thermometer-full" />
					<Icon id="fa-snowflake-o" />
					<Icon id="fa-users" />
					{`max:${maxCapacity}`}
				</div>

				<div>{content}</div>
				<br />
				<div>
					Хотите отдохнуть в нашем отеле? Проверьте, есть ли свободный номер на
					нужные вам даты!
				</div>
			</div>
		</div>
	);
};
