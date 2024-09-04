import React from 'react';
import { createRoot } from 'react-dom/client';
import { Notifications } from '@mantine/notifications';
import { createTheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { AmplitudeContextProvider } from './src/hooks/amplitude-hook';
import Route from './src/Route.jsx';
import './src/app.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

const theme = createTheme({
	primaryColor: 'primaryCustomColor',
	colors: {
		// it's replaced for the yearcalender buttons
		primaryCustomColor: [
			'#f3f3fe',
			'#e4e6ed',
			'#c8cad3',
			'#a9adb9',
			'#9093a4',
			'#808496',
			'#767c91',
			'#656a7e',
			'#585e72',
			'#4a5167',
		],
	},
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<MantineProvider theme={theme}>
		<Notifications position="bottom-right" />
		<ModalsProvider>
			<AmplitudeContextProvider>
				<Route />
			</AmplitudeContextProvider>
		</ModalsProvider>
	</MantineProvider>
);
