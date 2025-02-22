import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BookingBlock, RoomInfo } from './components';
import { selectRoom, selectUserRole } from '../../selectors';
import { loadRoomAsync } from '../../actions';
import { useEffect, useState } from 'react';
import { Button, Error, Loader } from '../../component';
import { ROLE } from '../../constants';
import styles from './room.module.css';

export const Room = () => {
	const dispatch = useDispatch();
	const room = useSelector(selectRoom);
	const roleId = useSelector(selectUserRole);
	const params = useParams();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const isViewer = roleId === ROLE.VIEWER;

	useEffect(() => {
		setIsLoading(true);
		dispatch(loadRoomAsync(params.roomId)).then((roomData) => {
			setError(roomData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.roomId]);

	if (isLoading) {
		return <Loader />;
	}

	return error ? (
		<Error error={error} />
	) : (
		<>
			<RoomInfo room={room} />
			{isViewer ? (
				<div className={styles.loginButton}>
					<Button onclick={() => navigate('/login')}>
						Войдете чтобы забронировать
					</Button>
				</div>
			) : (
				<BookingBlock actualRoomId={room.id} />
			)}
		</>
	);
};
