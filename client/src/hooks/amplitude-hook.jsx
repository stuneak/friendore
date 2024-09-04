import React, { useEffect, createContext, useContext } from 'react';
import { createInstance } from '@amplitude/analytics-browser';
import { v4 } from 'uuid';

const { AMPLITUDE_API_KEY } = process.env;
const amplitudeInstance = createInstance();
export const AmplitudeContext = createContext({});

export const useAmplitudeContext = () => {
	const context = useContext(AmplitudeContext);
	if (context === undefined)
		throw new Error(
			'useAmplitudeContext must be used within a AmplitudeContextProvider'
		);
	return context;
};

// Function to get or create a unique device ID
function getOrCreateDeviceId() {
	let deviceId = localStorage.getItem('device_id');
	if (!deviceId) {
		deviceId = v4();
		localStorage.setItem('device_id', deviceId);
	}
	return deviceId;
}

export function AmplitudeContextProvider({ children }) {
	useEffect(() => {
		amplitudeInstance.init(AMPLITUDE_API_KEY, undefined, {
			autocapture: {
				sessions: false,
				pageViews: false,
				attribution: false,
				fileDownloads: false,
				formInteractions: false
			},
		});

		const deviceId = getOrCreateDeviceId();
		amplitudeInstance.setDeviceId(deviceId);
	}, []);

	const setUserId = (user) => {
		amplitudeInstance.setUserId(user.email);
	};

	const logEvent = (eventName, eventProperties) => {
		amplitudeInstance.logEvent(eventName, eventProperties);
		amplitudeInstance.flush();
	};

	const resetUser = () => {
		amplitudeInstance.reset();
	};

	const value = { logEvent, setUserId, resetUser };

	return (
		<AmplitudeContext.Provider value={value}>
			{children}
		</AmplitudeContext.Provider>
	);
}
