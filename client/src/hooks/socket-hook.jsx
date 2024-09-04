import React, { useEffect, useRef } from 'react';
import { notifications } from '@mantine/notifications';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth-hook';
import { websocketURL } from '../../config';

export const SocketContext = React.createContext(null);

export function SocketProvider({ children }) {
	const socket = useRef();
	const auth = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		socket.current = io(websocketURL, {
			reconnection: true,
			reconnectionDelay: 5000,
			reconnectionDelayMax: 10000,
			query: `userId=${auth.user._id}`,
		});

		socket.current?.on('connnection', () => {
			console.info('socket: sucessfully connected');
		});

		socket.current?.on('notification', (data) => {
			console.log('socket: notification', data);
			if (data.code === 'new_connection') {
				notifications.hide(data.code);
				notifications.show({
					id: data.code,
					withCloseButton: true,
					title: 'New Connection',
					message:
						'You have a new connection! 👀 Please refresh your connections page.',
					autoClose: 10000,
				});
			}
			if (data.code === 'new_friend') {
				notifications.hide(data.code);
				notifications.show({
					id: data.code,
					withCloseButton: true,
					title: 'New Friend',
					message:
						'You have a new friend! 👀 Please refresh your friends page.',
					autoClose: 10000,
				});
			}
			if (data.code === 'profile:destroyed') {
				auth.getProfile().then(() => {
					navigate(`/`, { replace: true });
					setTimeout(() => {
						notifications.show({
							id: data.code,
							withCloseButton: true,
							autoClose: 10000,
							message: `Your account has been deleted successfully 🙂`,
						});
					}, 2000);
				});
			}

			if (data.code === 'profile:approved') {
				setTimeout(() => {
					notifications.show({
						id: data.code,
						withCloseButton: true,
						autoClose: 10000,
						message: `Your profile has been approved! 🎉`,
					});
				}, 1000);

				auth.getProfile();
			}
			if (data.code === 'profile:needChanges') {
				notifications.show({
					id: data.code,
					withCloseButton: true,
					autoClose: 10000,
					color: 'red',
					message: `Unfortunately, your profile didn't pass the review. Please make the necessary changes and submit it again.`,
				});

				auth.getProfile();
			}

			if (data.code === "admin:updates"){
				notifications.hide(data.code);
				notifications.show({
					id: data.code,
					withCloseButton: true,
					autoClose: 10000000,
					message: `Update the app to see the latest changes!`,
				});
			}
		});

		return () => {
			socket.current?.disconnect();
		};
	}, [auth.user._id]);

	return (
		<SocketContext.Provider value="socket-provider">
			{children}
		</SocketContext.Provider>
	);
}

export function useSocket() {
	return React.useContext(SocketContext);
}
