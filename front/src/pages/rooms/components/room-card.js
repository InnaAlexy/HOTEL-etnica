import { Link } from 'react-router-dom';
import { Icon } from '../../../component';
import styles from './room-card.module.css';

export const RoomCard = ({ id, imgUrl, title, maxCapacity, price }) => {
	return (
		<div className={styles.cardConteiner}>
			<Link to={`/rooms/${id}`}>
				<div className={styles.imgConteiner}>
					<img src={imgUrl} alt={title} />
				</div>
				<div className={styles.infoBlock}>
					<div className={styles.iconsPanel}>
						<Icon id="fa-users" />
						<div>{maxCapacity}</div>

						<div className={styles.price}>{price}</div>
						<Icon id="fa-rub" />
					</div>
					<div className={styles.title}>{title}</div>
				</div>
			</Link>
		</div>
	);
};
