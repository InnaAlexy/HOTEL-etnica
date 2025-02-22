import { useSelector } from 'react-redux';
import { Logo } from '../../component/header/logo/logo';
import { firstCharToUpperCase } from '../../utils';
import styles from './main.module.css';
import { selectUserLogin } from '../../selectors';
import { Button } from '../../component';
import { Link } from 'react-router-dom';

export const Main = () => {
	const userLogin = useSelector(selectUserLogin);
	const curUserName = firstCharToUpperCase(userLogin);

	return (
		<div className={styles.conteiner}>
			<div className={styles.welcomeMessage}>
				{userLogin ? `${curUserName}, добро пожаловать в` : 'Добро пожаловать в'}
			</div>
			<div>
				<Logo />
			</div>
			<div>
				<div className={styles.buttonArea}>
					<div>
						<Link to="/aboutUs">
							<Button>Информация о нас</Button>
						</Link>
					</div>
					<div>
						<Link to="/rooms">
							<Button>Список номеров</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
