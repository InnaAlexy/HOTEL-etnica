import { useEffect, useState } from 'react';
import styles from './rooms.module.css';
import { RoomCard } from './components';
import { Loader } from '../../component';
import { request } from '../../utils';

export const Rooms = () => {
	const [rooms, setRooms] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		request('/rooms').then(({ data }) => {
			setRooms(data);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.conteiner}>
			{rooms.length > 0 ? (
				<div className={styles.roomsList}>
					{rooms.map(({ id, imgUrl, title, maxCapacity, price }) => (
						<RoomCard
							key={id}
							id={id}
							imgUrl={imgUrl}
							title={title}
							maxCapacity={maxCapacity}
							price={price}
						/>
					))}
				</div>
			) : (
				<div className={styles.noPostsFound}>Номера не найдены</div>
			)}
		</div>
	);
};
