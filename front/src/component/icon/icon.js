import styles from './icon.module.css';

export const Icon = ({ id, onClick }) => {
	return (
		<div className={styles.icon} onClick={onClick}>
			<i className={`fa ${id}`} aria-hidden="true"></i>
		</div>
	);
};
