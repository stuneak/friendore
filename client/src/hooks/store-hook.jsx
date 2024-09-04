import React, { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import {
	connectionURL,
	friendURL
} from '../../config';
import { animateHeight } from '../animate-height';

export const StoreContext = React.createContext(null);

export function StoreProvider({ children }) {
	const [connections, setConnections] = useState([]);
	const [connectionsLoaded, setConnectionsLoaded] = useState(false);
	const [connectionsRefs, setConnectionsRefs] = useState({});

	const [friends, setFriends] = useState([]);
	const [friendsLoaded, setFriendsLoaded] = useState(false);
	const [friendsRefs, setFriendsRefs] = useState({});

	const resetStore = () => {
		setConnectionsLoaded(false);
		setConnections([]);

		setFriendsLoaded(false);
		setFriends([]);
	};

	const deleteConnection = ({ match_id }) => {
		const item = connectionsRefs[match_id];

		if (item) {
			animateHeight(item, item.scrollHeight, 0, 100);
		}

		delete connectionsRefs[match_id];

		setTimeout(() => {
			setConnections((prevConnections) => {
				const updatedConnections = prevConnections.filter(
					(connection) => connection._id !== match_id
				);
				return updatedConnections;
			});
		}, 2000);
	};

	const deleteFriend = ({ match_id }) => {
		const item = friendsRefs[match_id];

		if (item) {
			animateHeight(item, item.scrollHeight, 0, 100);
		}

		delete friendsRefs[match_id];

		setTimeout(() => {
			setFriends((prevFriends) => {
				const updatedFriends = prevFriends.filter(
					(friendItem) => friendItem._id !== match_id
				);
				return updatedFriends;
			});
		}, 2000);
	};

	const getConnections = async () => {
		try {
			setConnectionsLoaded(false);

			const response = await fetch(connectionURL, {
				method: 'GET',
			});

			if (response.status === 200) {
				const data = await response.json();
				setConnections(data.matches);
			} else {
				setConnections([]);
			}
		} catch (e) {
			console.log(`getConnections e:${e}`);
		} finally {
			setConnectionsLoaded(true);
		}
	};

	const approveConnection = async ({ match_id }) => {
		try {
			const response = await fetch(connectionURL, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ match_id }),
			});

			if (response.status === 200) {
				deleteConnection({ match_id });

				notifications.show({
					withCloseButton: true,
					message:
						'The connection has been approved 🎉! Wait until the other person does the same to see the full profile in the “Friends” section.',
					autoClose: 10000,
				});
				return true;
			}
			return false;
		} catch (e) {
			console.log(`approveConnection match_id:${match_id}, e:${e}`);
			return false;
		}
	};

	const getFriends = async () => {
		try {
			setFriendsLoaded(false);

			const response = await fetch(friendURL, {
				method: 'GET',
			});

			if (response.status === 200) {
				const data = await response.json();
				setFriends(data.friends);
			} else {
				setFriends([]);
			}
		} catch (e) {
			console.log(`getFriends e:${e}`);
		} finally {
			setFriendsLoaded(true);
		}
	};

	useEffect(() => {
		connections.forEach((connection) => {
			const TARGET_DATE = new Date(connection.expiration_date);
			const now = new Date();
			const timeDifference = TARGET_DATE - now;
			setTimeout(() => {
				deleteConnection({ match_id: connection._id });
			}, timeDifference);
		});
	}, [connections]);

	useEffect(() => {
		friends.forEach((friendItem) => {
			const TARGET_DATE = new Date(friendItem.friends_expiration_date);

			const now = new Date();
			const timeDifference = TARGET_DATE - now;

			setTimeout(() => {
				deleteFriend({ match_id: friendItem._id });
			}, timeDifference);
		});
	}, [friends]);

	const value = {
		resetStore,

		// connections
		getConnections,
		connections,
		connectionsLoaded,
		approveConnection,
		deleteConnection,
		setConnectionsRefs,

		// friends
		getFriends,
		friends,
		friendsLoaded,
		setFriendsRefs,
	};

	return (
		<StoreContext.Provider value={value}>{children}</StoreContext.Provider>
	);
}

export function useStore() {
	return React.useContext(StoreContext);
}
