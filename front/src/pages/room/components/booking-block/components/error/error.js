import { Icon } from '../../../../../../component';
import styles from './error.module.css';

export const Error = ({ onClose }) => {
	return (
		<div className={styles.errorConteiner}>
			<div className={styles.error}>
				<div className={styles.closeButton}>
					<Icon id="fa-window-close-o" onClick={onClose} />
				</div>
				<div className={styles.errorMessage}>
					К сожалению выбранные вами даты заняты, выберете другие даты или
					свяжитесь с нами!
				</div>
			</div>
		</div>
	);
};
