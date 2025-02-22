import { Route, Routes } from 'react-router-dom';
import { Error, Footer, Header } from './component';
import {
	AboutUs,
	Authorization,
	Bookings,
	Main,
	Registration,
	Room,
	UserBookings,
	Rooms,
} from './pages';
import styles from './App.module.css';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';

//подготовка окружения

function App() {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}
		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(setUser(currentUserData));
	}, [dispatch]);

	return (
		<div className={styles.substrate}>
			<div className={styles.appColomn}>
				<Header />
				<div className={styles.content}>
					<Routes>
						<Route path="/" element={<Main />}></Route>
						<Route path="/aboutUs" element={<AboutUs />}></Route>
						<Route path="/login" element={<Authorization />}></Route>
						<Route path="/register" element={<Registration />}></Route>
						<Route path="/bookings" element={<Bookings />}></Route>
						<Route path="/rooms" element={<Rooms />}></Route>
						<Route path="/rooms/:roomId" element={<Room />}></Route>
						<Route path="/myBooking" element={<UserBookings />}></Route>
						<Route path="*" element={<Error />}></Route>
					</Routes>
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default App;
