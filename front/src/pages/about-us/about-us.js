import { Link } from 'react-router-dom';
import { Button, Icon } from '../../component';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import styles from './about-us.module.css';

export const AboutUs = () => {
	const role = useSelector(selectUserRole);

	return (
		<div className={styles.conteiner}>
			<div className={styles.leftContent}>
				<div className={styles.titleLeft}>
					<h3>Что такое эко-отель?</h3>
					<Icon id="fa-tree" />
				</div>
				<div className={styles.text}>
					Эко-отель — это не просто место для отдыха, а целая философия,
					основанная на гармонии с природой и бережном отношении к окружающей
					среде.
				</div>
			</div>
			<div className={styles.rightContent}>
				<div className={styles.titleRight}>
					<h3>Где мы находимся?</h3>
					<Icon id="fa-map-marker" />
				</div>
				<div className={styles.text}>
					Алтай — это одно из самых живописных мест в России, где можно
					насладиться неповторимыми пейзажами, познакомиться с уникальной
					культурой и традициями региона. Здесь каждый найдёт что-то особенное
					для себя.
				</div>
			</div>
			<div className={styles.leftContent}>
				<div className={styles.titleLeft}>
					<h3>Почему стоит выбрать нас?</h3>
					<Icon id="fa-heart-o" />
				</div>
				<div className={styles.text}>
					Отдых в нвшем отеле подходит тем, кто хочет отдохнуть от городской
					суеты и насладиться природой. Чистый воздух, уникальная культура и
					гостеприимные люди создают неповторимую атмосферу, которая запомнится
					надолго.
				</div>
			</div>
			<div className={styles.rightContent}>
				<div className={styles.titleRight}>
					<h3>Мы pets-frendly</h3>
					<Icon id="fa-paw" />
				</div>
				<div className={styles.text}>
					Многие отели стараются ограничить пребывание гостей с питомцами, но
					есть и такие, где рады пушистым друзьям. Наш отель — один из них: мы
					всегда рады гостям вместе с их хвостиками!
				</div>
			</div>
			<div className={styles.centerButton}>
				<Link to={role === ROLE.VIEWER ? '/login' : '/rooms'}>
					<Button>
						К выбору номеров
						<Icon id="fa-arrow-right" />
					</Button>
				</Link>
			</div>
		</div>
	);
};
