import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import { Tabs, rem, SegmentedControl } from '@mantine/core';
import { useNavigate, Outlet, useLocation, Navigate } from 'react-router-dom';
import {
	IconMessageCircle,
	IconUserCircle,
	IconActivityHeartbeat,
} from '@tabler/icons-react';
import { useWindowDimensions } from '../hooks/window-size';
import { useStore } from '../hooks/store-hook';
import { useAuth } from '../hooks/auth-hook';

export function Dashboard() {
	const auth = useAuth();

	const { friends, connections, getConnections, resetStore, getFriends } =
		useStore();
	const { width } = useWindowDimensions();

	const lessThan375 = width < 375;

	React.useEffect(() => {
		getConnections();
		getFriends();
		return () => {
			resetStore();
		};
	}, []);

	const Routes = [
		{
			label: 'My profile',
			value: 'profile',
			desktopText: 'My profile',
			Icon: (
				<IconUserCircle
					style={{ width: rem(18), height: rem(18) }}
					stroke={1.5}
				/>
			),
		},
	];

	const ConnectionsRoute = {
		label: (
			<>
				<span>Connections</span>
				{!lessThan375 && connections.length > 0 && (
					<span className="inline-block min-w-[42px]">
						<span className="text-sm ml-1 rounded-full box-decoration-slice bg-gradient-to-r from-gray-600 to-gray-600 text-white px-3 py-1">
							{connections.length > 9 ? '9+' : connections.length}
						</span>
					</span>
				)}
			</>
		),
		desktopText: 'Connections',
		desktopIcon: (
			<span className="inline-block min-w-[42px]">
				{connections.length > 0 && (
					<span className="rounded-full box-decoration-slice bg-gradient-to-r from-gray-600 to-gray-600 text-white px-3 py-1">
						{connections.length > 9 ? '9+' : connections.length}
					</span>
				)}
			</span>
		),
		value: 'connections',
		Icon: (
			<IconActivityHeartbeat
				style={{ width: rem(18), height: rem(18) }}
				stroke={1.5}
			/>
		),
	};

	const FriendsRoute = {
		label: (
			<>
				<span>friends</span>
				{!lessThan375 && friends.length > 0 && (
					<span className="inline-block min-w-[42px]">
						<span className="text-sm ml-1 rounded-full box-decoration-slice bg-gradient-to-r from-gray-600 to-gray-600 text-white px-3 py-1">
							{friends.length > 9 ? '9+' : friends.length}
						</span>
					</span>
				)}
			</>
		),
		desktopText: 'Friends',
		desktopIcon: (
			<span className="inline-block min-w-[42px]">
				{friends.length > 0 && (
					<span className="rounded-full box-decoration-slice bg-gradient-to-r from-gray-600 to-gray-600 text-white px-3 py-1">
						{friends.length > 9 ? '9+' : friends.length}
					</span>
				)}
			</span>
		),
		value: 'friends',
		Icon: (
			<IconMessageCircle
				style={{ width: rem(18), height: rem(18) }}
				stroke={1.5}
			/>
		),
	};

	if (auth.user.state.isApproved) {
		Routes.push(ConnectionsRoute);
		Routes.push(FriendsRoute);
	}


	const location = useLocation();
	const selectedTab = location.pathname.split('/')[2];
	const [value, setValue] = useState(selectedTab);
	const isMobile = width < 768;
	const navigate = useNavigate();

	if (location.pathname === '/dashboard') {
		return <Navigate to="/dashboard/profile" replace />;
	}

	const setSubRoute = (subRoute) => {
		setValue(subRoute);
		navigate(`/dashboard/${subRoute}`, { replace: true });
	};

	useEffect(() => {
		const newSubRoute = location.pathname.split('/')[2];

		if (newSubRoute !== value) {
			setValue(newSubRoute);
		}
	}, [location.pathname, value]);

	console.log('dashboard is rendering');

	return (
		<section className="relative w-full overflow-hidden">
			<div className="container relative w-full  pt-2 mx-auto px-2 lg:max-w-6xl lg:px-28 items-center justify-center md:px-6">
				<div className="flex flex-col w-full justify-center items-center">
					<div className={`w-full ${isMobile ? 'mt-5' : 'mt-5'}`}>
						{isMobile ? (
							<SegmentedControl
								value={value}
								fullWidth
								onChange={setSubRoute}
								data={Routes}
							/>
						) : (
							<Tabs
								orientation="vertical"
								color="gray"
								variant="outline"
								radius="md"
								value={value}
							>
								<Tabs.List>
									{Routes.map((route) => (
										<Tabs.Tab
											key={route.value}
											value={route.value}
											leftSection={route.Icon}
											rightSection={route.desktopIcon}
											onClick={() => setSubRoute(route.value)}
										>
											{route.desktopText}
										</Tabs.Tab>
									))}
								</Tabs.List>
								<div className="w-full ml-5 max-w-[700px] min-h-[90vh]">
									<Outlet />
								</div>
							</Tabs>
						)}

						{isMobile && (
							<div className="w-full mt-10 min-h-[75vh]">
								<Outlet />
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
