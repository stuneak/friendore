import React, { useEffect } from 'react';
import {
	useLocation,
	Navigate,
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';

import { useAuth, AuthProvider } from './hooks/auth-hook';
import { StoreProvider } from './hooks/store-hook';
import { SocketProvider } from './hooks/socket-hook';
import { AdminProvider } from './hooks/admin-hook';

import { AppWrapper } from './Pages/AppWrapper';
import { LandingPage } from './Pages/LandingPage';
import { MyProfile } from './Pages/MyProfile';
import { Connections } from './Pages/Connections';
import { Friends } from './Pages/Friends';
import { Dashboard } from './Pages/Dashboard';
import { Admin } from './Pages/Admin';
import { Privacy } from './Pages/Privacy';
import { Terms } from './Pages/Terms';
import {Unsubscribe} from './Pages/Unsubscribe';

import { cleanAllNotifications } from './notification-debounce';

function AutoRedirectRoute({ children }) {
	const location = useLocation();
	const auth = useAuth();

	useEffect(() => {
		auth.getProfile();
	}, [location.pathname]);

	if (!auth.loaded) {
		return null;
	}

	if (auth.isAuth) {
		return (
			<Navigate to="/dashboard/profile" state={{ from: location }} replace />
		);
	}

	return children;
}

function ProtectedRoute({ children }) {
	const location = useLocation();
	const auth = useAuth();

	useEffect(() => {
		auth.getProfile();
		cleanAllNotifications();
	}, [location.pathname]);

	if (!auth.loaded) {
		return null;
	}

	if (!auth.isAuth) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	if (auth.user.isAdmin) {
		return <Navigate to="/admin" state={{ from: location }} replace />;
	}

	return children;
}

function ProtectedAdminRoute({ children }) {
	const location = useLocation();
	const auth = useAuth();

	useEffect(() => {
		auth.getProfile();
		cleanAllNotifications();
	}, [location.pathname]);

	if (!auth.loaded) {
		return null;
	}

	if (!auth.isAuth) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	if (!auth.user.isAdmin) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return children;
}

const guide = createBrowserRouter([
	{
		path: '*',
		element: <Navigate to="/" replace />,
	},
	{
		path: '/',
		element: (
			<AuthProvider>
				<StoreProvider>
					<AppWrapper />
				</StoreProvider>
			</AuthProvider>
		),
		children: [
			{
				index: true,
				path: '/',
				element: (
					<AutoRedirectRoute>
						<LandingPage />
					</AutoRedirectRoute>
				),
			},
			{
				path: 'dashboard',
				element: (
					<ProtectedRoute>
						<SocketProvider>
							<Dashboard />
						</SocketProvider>
					</ProtectedRoute>
				),
				children: [
					{
						path: 'profile',
						element: <MyProfile />,
					},
					{
						path: 'connections',
						element: <Connections />,
					},
					{
						path: 'friends',
						element: <Friends />,
					},
				],
			},
			{
				path: 'admin',
				element: (
					<ProtectedAdminRoute>
						<AdminProvider>
							<SocketProvider>
								<Admin />
							</SocketProvider>
						</AdminProvider>
					</ProtectedAdminRoute>
				),
			},
		],
	},
	{
		path: '/privacy',
		element: <Privacy />,
	},
	{
		path: '/terms',
		element: <Terms />,
	},
	{
		path: '/unsubscribe',
		element: <Unsubscribe />,
	}
]);

function Route() {

	return <RouterProvider router={guide} />;
}

export default Route;
