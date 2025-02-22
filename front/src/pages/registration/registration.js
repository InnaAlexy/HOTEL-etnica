import styles from './registration.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button, ErrorFormMessage, Icon, Loader } from '../../component';
import { setUser } from '../../actions';
import { Navigate } from 'react-router-dom';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { useFormReset } from '../../hooks';
import { regFormSchema } from './reg-form-schema';
import { request } from '../../utils';

export const Registration = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValue: {
			login: '',
			password: '',
			passCheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useFormReset(reset);

	const onSubmit = ({ login, password }) => {
		setIsLoading(true);
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
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

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passCheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.VIEWER) {
		return <Navigate to="/" />;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.conteiner}>
			<h2> Регистрация </h2>
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
				<input
					type="password"
					placeholder="Повторите пароль..."
					{...register('passCheck', { onChange: () => setServerError(null) })}
				/>
				<Button disabled={!!formError} type="submit">
					{!formError ? 'Готово' : <Icon id="fa-lock" />}
				</Button>
				{errorMessage && <ErrorFormMessage> {errorMessage} </ErrorFormMessage>}
			</form>
		</div>
	);
};
