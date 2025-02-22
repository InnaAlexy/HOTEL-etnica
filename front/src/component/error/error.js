import { Link } from 'react-router-dom';
import styles from './error.module.css';
import { ERROR } from '../../constants';

export const Error = ({ error }) => {
	return (
		<div className={styles.conteiner}>
			<h1>Ошибка</h1>
			<div className={styles.errorMessage}>
				<div>{error ? error : ERROR.PAGE_NOT_FOUND}, </div>
				<div>
					вернитесь назад или перейдите <Link to="/">на главную</Link>!
				</div>
			</div>
		</div>
	);
};
