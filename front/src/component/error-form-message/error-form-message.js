import styles from './error-form-message.module.css';

export const ErrorFormMessage = ({ children }) => {
	return <div className={styles.errorMessage}>{children} </div>;
};
