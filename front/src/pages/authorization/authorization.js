import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styles from './authorization.module.css';
import { Button, ErrorFormMessage, Icon, Loader } from '../../component';
import { setUser } from '../../actions';
import { Link, Navigate } from 'react-router-dom';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { authFormSchema } from './auth-form-schema';
import { useFormReset } from '../../hooks';
import { request } from '../../utils';

export const Authorization = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValue: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useFormReset(reset);

	const onSubmit = ({ login, password }) => {
		setIsLoading(true);
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				setIsLoading(false);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
			setIsLoading(false);
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.VIEWER) {
		return <Navigate to="/" />;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.conteiner}>
			<h2> Авторизация </h2>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.authoForm}>
				<input
					type="text"
					placeholder="Логин..."
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<input
					type="password"
					placeholder="Пароль..."
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<Button disabled={!!formError} type="submit">
					{!formError ? 'Войти' : <Icon id="fa-lock" />}
				</Button>
				<Link to="/register">У меня еще нет аккаунта...</Link>
				{errorMessage && <ErrorFormMessage> {errorMessage} </ErrorFormMessage>}
			</form>
		</div>
	);
};
