import React, { useState } from 'react';
import { notifications } from '@mantine/notifications';
import {useSearchParams} from 'react-router-dom';
import {
	admin_userProfiles
} from '../../config';

export const AdminContext = React.createContext(null);

export function AdminProvider({ children }) {
	const [userProfiles, setUserProfiles] = useState([]);
	const [userProfilesLoaded, setUserProfilesLoaded] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [_searchParams, setSearchParams] = useSearchParams();

	const resetUser = () => {
		setUserProfiles([]);
		setUserProfilesLoaded(false);
	};

	const getUserProfiles = async () => {
		try {
			setUserProfilesLoaded(false);
			const response = await fetch(admin_userProfiles, {
				method: 'GET',
			});

			if (response.status === 200) {
				const data = await response.json();
				setUserProfiles(data.userProfiles);
			}
		} catch (e) {
			resetUser();
			console.log(`admin:getUserProfiles e:${e}`);
		} finally {
			setUserProfilesLoaded(true);
		}
	};

	const changeUserProfile = async ({ id, isApproved, isChanged, text }) => {
		try {
			const response = await fetch(admin_userProfiles, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user_id: id, isApproved, isChanged, text }),
			});

			if (response.status === 200) {
				getUserProfiles();
				return true;
			} if (response.status !== 200) {
				const data = await response.json();
				notifications.show({
					title: data.code,
					message: data.message,
					color: 'red',
				});
				console.log(`admin:changeUserProfile data:${data}`);
				return false;
			}
			return false;
		} catch (e) {
			resetUser();
			console.log(`admin:changeUserProfile e:${e}`);
			return false;
		}
	};

	const destroyUserProfile = async ({ id }) => {
		try {
			const response = await fetch(admin_userProfiles, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user_id: id }),
			});

			if (response.status === 200) {
				getUserProfiles();
				return true;
			}
			console.log(
				`admin:destroyUserProfile response.status:${response.status}`
			);
			return true;
		} catch (e) {
			resetUser();
			console.log(`admin:destroyUserProfile e:${e}`);
			return false;
		}
	};

	const value = {
		userProfiles,
		userProfilesLoaded,
		getUserProfiles,
		changeUserProfile,
		destroyUserProfile
	};

	return (
		<AdminContext.Provider value={value}>{children}</AdminContext.Provider>
	);
}

export function useAdmin() {
	return React.useContext(AdminContext);
}
