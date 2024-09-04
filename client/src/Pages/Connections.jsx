import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { useStore } from '../hooks/store-hook';
import { countriesList } from '../../static-json';
import { useCountdown } from '../hooks/countdown-hook';
import lookingForGif from './lookingFor.gif';

function UserProfileInfo({
	expiration_date,
	year,
	languages,
	communication,
	country,
	hobbies,
	goals_dreams,
	aboutme,
	score,
	onConnect,
}) {
	const { formattedText, isEnd } = useCountdown(expiration_date);

	const communicationMethods = communication.map((method) => {
		if (method === 'in-person') {
			const countryName = countriesList.find((c) => c.value === country).label;
			return `${method} (based in ${countryName})`;
		}
		return method;
	});

	return (
		<div
			className={`mb-10 relative border border-gray-300 rounded-lg text-gray-700 ${
				isEnd && 'opacity-80 rom-gray-100 to-gray-100 disabled select-none'
			}`}
		>
			<div className="select-none px-4 py-2 sm:px-8 w-full min-h-[40px] bg-gray-100 rounded-t-lg flex items-center justify-around flex-row custom-user-profile-header">
				{isEnd ? (
					<p className="text-left text-base tracking-wide py-1">
						<span className="mt-2 mr-2 rounded-full box-decoration-slice bg-gradient-to-r from-red-400 to-red-400 text-white px-2 py-1">
							Expired
						</span>
					</p>
				) : (
					<p className="text-left text-base tracking-wide py-1">
						Expires in{' '}
						<span className="mt-2 mr-2 rounded-full box-decoration-slice bg-gradient-to-r from-gray-600 to-gray-600 text-white px-2 py-1">
							{formattedText}
						</span>
					</p>
				)}
				<p className="text-left text-base tracking-wide py-1">
					Compatibility level{' '}
					<span className="mt-2 mr-2 rounded-full box-decoration-slice bg-gradient-to-r from-gray-600 to-gray-600 text-white px-2 py-1">
						{score}%
					</span>
				</p>
			</div>

			<div className="px-4 sm:px-8 py-6">
				<div className="flex">
					<p className="text-left text-base tracking-wide">
						<strong className="font-semibold">I am:</strong>{' '}
						<span className="text-slate-500">
							∼{new Date().getFullYear() - year} years old ({year})
						</span>
					</p>
				</div>
				<div className="flex mt-2">
					<p className="text-left text-base tracking-wide">
						<strong className="font-semibold">able to speak:</strong>{' '}
						<span className="text-slate-500">{languages.join(', ')}</span>
					</p>
				</div>
				<div className="flex mt-2">
					<p className="text-left text-base tracking-wide">
						<strong className="font-semibold">prefer to chat via:</strong>{' '}
						<span className="text-slate-500">
							{communicationMethods.join(', ')}
						</span>
					</p>
				</div>
				<div className="flex mt-2">
					<p className="text-left text-base tracking-wide">
						<strong className="font-semibold">hobbies & passions:</strong>{' '}
						<span className="text-slate-500">
							{hobbies.map((hobby) => (
								<span key={hobby}>
									<span className="whitespace-nowrap">• {hobby}</span>
									<span> </span>
								</span>
							))}
						</span>
					</p>
				</div>
				<div className="flex mt-2">
					<p className="text-left text-base tracking-wide">
						<strong className="font-semibold">goals & dreams:</strong>{' '}
						<span className="text-slate-500">{goals_dreams}</span>
					</p>
				</div>
				<div className="flex mt-2">
					<p className="text-left text-base tracking-wide">
						<strong className="font-semibold">about me:</strong>{' '}
						<span className="text-slate-500">{aboutme}</span>
					</p>
				</div>
				<div className="flex mt-2">
					<p className="text-left text-base tracking-wide">
						<strong className="font-semibold">socials & contacts:</strong>{' '}
						<span className="italic text-slate-500">hidden</span>
					</p>
				</div>
			</div>
			<button
				type="button"
				disabled={isEnd}
				onClick={onConnect}
				className={`text-xl font-semibold w-full px-6 py-4 text-lg text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black rounded-b-lg lg:mb-0 hover:border-white hover:bg-slate-500 ${
					isEnd &&
					'border-0 text-gray-400 bg-gray-200 border-gray-300 cursor-not-allowed disabled:pointer-events-none'
				}`}
			>
				Connect and share my contacts
			</button>
		</div>
	);
}

export function Connections() {
	const navigate = useNavigate();
	const {
		connectionsLoaded,
		connections,
		getConnections,
		approveConnection,
		setConnectionsRefs,
	} = useStore();

	const connectionsRef = useRef({});

	React.useEffect(() => {
		getConnections();
	}, []);

	React.useEffect(() => {
		setConnectionsRefs(connectionsRef.current);
	});

	const showConnectionsComponent =
		connections.length === 0 ? (
			<div className="mt-10">
				<div className="flex flex-col items-center justify-center">
					<img src={lookingForGif} alt="looking for?" className='looking-for-gif'/>
					<p className="mt-5 text-lg font-semibold text-gray-800 text-center">
						Looking for best connections for you!  🌟
					</p>
					<span className="max-w-[400px] text-base text-gray-600 text-center block">
						We&rsquo;re currently reviewing other profiles to find the best connection for you. Please check back soon, and keep an eye on your email — we&rsquo;ll notify you as soon as we discover someone special just for you!
					</span>
				</div>
			</div>
		) : (
			<div className="mt-5">
				{connections.map((connection) => (
					<div
						className="connection-item"
						key={connection._id}
						ref={(r) => (connectionsRef.current[connection._id] = r)}
					>
						<UserProfileInfo
							{...connection.userProfile}
							expiration_date={connection.expiration_date}
							score={connection.score}
							onConnect={() => approveConnection({ match_id: connection._id })}
						/>
					</div>
				))}
			</div>
		);

	return (
		<>
			<div>
				<p className="text-xl md:text-2xl">Connections </p>
				<p className="inline-block max-w-[660px] mt-5 bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-4 text-sm md:text-md">
					📍 Like someone&rsquo;s profile and want to connect? Just click{' '}
					<span className="underline font-semibold">
						&quot;Connect and share my contacts&quot;.
					</span>{' '}
					<span className="underline font-semibold whitespace-nowrap">
						Please note:
					</span>{' '}
					you and the other person must agree to share contact information
					before you see each others in the{' '}
					<span
						onClick={() => navigate('/dashboard/friends')}
						className="cursor-pointer font-medium text-blue-600 underline hover:no-underline"
					>
						&quot;Friends&quot;
					</span>{' '}
					section.
				</p>
			</div>
			<div className="max-w-[660px] h-full">
				<div className="h-full">
					{!connectionsLoaded ? (
						<div className="mt-10 flex justify-center">
							<Loader color="gray" type="bars" />
						</div>
					) : (
						<div className="mt-5">{showConnectionsComponent}</div>
					)}
				</div>
			</div>
		</>
	);
}
