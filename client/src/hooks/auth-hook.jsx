import React, { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useSearchParams } from 'react-router-dom';
import {
	registerLocalURL,
	registerGoogleURL,
	profileURL,
	loginLocalURL,
	logoutURL,
} from '../../config';
import {
	cleanAllNotifications,
} from '../notification-debounce';

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = React.useState(null);
	// eslint-disable-next-line no-unused-vars
	const [_searchParams, setSearchParams] = useSearchParams();

	const [isAuth, setIsAuth] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const resetUser = () => {
		setUser(null);
		setIsAuth(false);
	};

	const getProfile = async () => {
		try {
			const response = await fetch(profileURL, {
				method: 'GET',
			});

			if (response.status === 200) {
				const data = await response.json();
				setUser(data);
				setIsAuth(true);
			} else {
				setIsAuth(false);
				setUser(null);
			}
		} catch (e) {
			resetUser();
			console.log(`getProfile e:${e}`);
		} finally {
			setLoaded(true);
		}
	};

	const logInLocal = async ({ email, password }, onSuccess) => {
		try {
			const response = await fetch(loginLocalURL, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.status === 401) {
				const data = await response.json();
				if (
					data.code === 'incorrect_username' ||
					data.code === 'incorrect_password'
				) {
					notifications.cleanQueue();
					notifications.clean();
					notifications.show({
						withCloseButton: true,
						autoClose: 10000,
						color: 'red',
						message: `You have entered an invalid username or password.`,
					});
				}

				if (data.code === 'google_account') {
					notifications.cleanQueue();
					notifications.clean();
					notifications.show({
						withCloseButton: true,
						autoClose: 10000,
						color: 'red',
						message: `You have already registered with Google. Please log in with Google.`,
					});
				}
			}
			if (response.status === 200) {
				const data = await response.json();
				notifications.clean();
				onSuccess?.();
				setUser(data.user);
				setIsAuth(true);
			}
			if (response.status === 500) {
				const data = await response.json();
				if (data.queryErrorHandle) {
					setSearchParams((params) => {
						params.set('error', data.code);
						return params;
					});
				}
			}
		} catch (e) {
			resetUser();
			console.log(`logInLocal email:${email}, e:${e}`);
		} finally {
			setLoaded(true);
		}
	};

	const logOut = async () => {
		try {
			await fetch(logoutURL, {
				credentials: 'include',
				method: 'POST',
			});

			resetUser();
		} catch (e) {
			resetUser();
			console.log(`logOut e:${e}`);
		} finally {
			setLoaded(true);
		}
	};

	const registerLocal = async (values) => {
		try {
			const jsonedValues = JSON.stringify(values);
			const response = await fetch(registerLocalURL, {
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: jsonedValues,
			});

			if (response.status === 409) {
				const data = await response.json();

				if (data.code === 'user_already_exist') {
					notifications.cleanQueue();
					notifications.clean();
					notifications.show({
						withCloseButton: true,
						color: 'red',
						autoClose: 10000,
						message:
							'It looks like this email is already registered. Please try logging in or use a different email address.',
					});
				}

				resetUser();
			} else if (response.status === 200) {
				const data = await response.json();

				setUser(data.user);
				setIsAuth(true);
			}
		} catch (e) {
			resetUser();
			console.log(`register local values:${values?.email} e:${e}`);
		} finally {
			setLoaded(true);
		}
	};

	const registerGoogle = async (values) => {
		try {
			const jsonedValues = JSON.stringify(values);
			const response = await fetch(registerGoogleURL, {
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: jsonedValues,
			});

			if (response.status === 200) {
				const data = await response.json();

				setUser(data.user);
				setIsAuth(true);
			}
		} catch (e) {
			resetUser();
			console.log(`register google values e:${e}`);
		} finally {
			setLoaded(true);
		}
	};

	const updateProfile = async (values) => {
		try {
			const jsonedValues = JSON.stringify(values);
			const response = await fetch(profileURL, {
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: jsonedValues,
			});


			if (response.status === 200) {
				const data = await response.json();
				setUser(data);
				
				cleanAllNotifications();
				notifications.show({
					withCloseButton: true,
					message: 'Your profile has been successfully updated!',
				});	
			}
			
		} catch {
			// handle catch
		}
	};

	const deleteMyProfile = async () => {
		try {
			const response = await fetch(profileURL, {
				method: 'DELETE',
			});

			if (response.status === 200) {
				getProfile();
				return true;
			}
			console.log(
				`deleteMyProfile response.status:${response.status}`
			);
			return true;
		} catch (e) {
			resetUser();
			console.log(`admin:deleteMyProfile e:${e}`);
			return false;
		}
	};

	const value = {
		user,
		getProfile,
		logInLocal,
		logOut,
		registerLocal,
		registerGoogle,
		isAuth,
		loaded,
		updateProfile,
		deleteMyProfile
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return React.useContext(AuthContext);
}
