/* eslint-disable no-nested-ternary */
import React, { useRef } from 'react';
import { Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../hooks/store-hook';
import { countriesList } from '../../static-json';
import { useCountdown } from '../hooks/countdown-hook';
import { parseLinks } from '../parseLinks';

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
	socials,
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
						{parseLinks(socials).map((link) => link)}
					</p>
				</div>
			</div>
		</div>
	);
}

export function Friends() {
	const { getFriends, friends, friendsLoaded, setFriendsRefs } = useStore();
	const navigate = useNavigate();

	const friendsRefs = useRef({});

	React.useEffect(() => {
		getFriends();
	}, []);

	React.useEffect(() => {
		setFriendsRefs(friendsRefs.current);
	});

	const showFriendComponent =
		friends.length === 0 ? (
			<div className="mt-10">
				<div className="flex flex-col items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 64 80" // Updated viewBox for 24x24
						width="100" // Set width
						height="100" // Set height
						xmlSpace="preserve"
					>
						<g>
							<g>
								<path d="M56,33v-2c0-1.6-0.8-3.1-2-4c0,0,0,0,0,0v-5c0-10.5-8.5-19-19-19h-6c-10.5,0-19,8.5-19,19v5c0,0,0,0,0,0c-1.2,0.9-2,2.3-2,4v2c0,1.6,0.8,3.1,2,4c0,0,0,0,0,0v3.5c0,2.8-0.7,5.5-1.9,8c-0.2,0.3-0.1,0.7,0,1C8.3,49.8,8.7,50,9,50h5.9c-2.4,2.7-3.9,6.2-3.9,10c0,0.6,0.4,1,1,1h40c0.6,0,1-0.4,1-1c0-3.8-1.5-7.3-3.9-10H55c0.3,0,0.7-0.2,0.9-0.5c0.2-0.3,0.2-0.7,0-1c-1.2-2.5-1.9-5.3-1.9-8V37c0,0,0,0,0,0C55.2,36.1,56,34.6,56,33z M38,45H26h-3c-3.9,0-7-3.1-7-7v-1V27v-2c3.3-0.1,12.9-0.6,16-4.3c3.1,3.7,12.7,4.3,16,4.3v2v10v1c0,3.9-3.1,7-7,7H38z M37.9,47c-0.6,2.3-3,4-5.9,4s-5.3-1.7-5.9-4H37.9z M10,31c0-1.7,1.3-3,3-3h1v8h-1c-1.7,0-3-1.3-3-3V31z M54,33c0,1.7-1.3,3-3,3h-1v-8h1c1.7,0,3,1.3,3,3V33z" />
								<path d="M27,27c-0.6,0-1,0.4-1,1c0,1.1-0.9,2-2,2s-2-0.9-2-2c0-0.6-0.4-1-1-1s-1,0.4-1,1c0,2.2,1.8,4,4,4s4-1.8,4-4C28,27.4,27.6,27,27,27z" />
								<path d="M43,27c-0.6,0-1,0.4-1,1c0,1.1-0.9,2-2,2s-2-0.9-2-2c0-0.6-0.4-1-1-1s-1,0.4-1,1c0,2.2,1.8,4,4,4s4-1.8,4-4C44,27.4,43.6,27,43,27z" />
								<path d="M32,37c-1.8,0-3.3,1.1-3.9,2.6c-0.2,0.5,0.1,1.1,0.6,1.3c0.5,0.2,1.1-0.1,1.3-0.6c0.3-0.8,1.1-1.4,2.1-1.4s1.8,0.5,2.1,1.4c0.2,0.4,0.5,0.6,0.9,0.6c0.1,0,0.2,0,0.4-0.1c0.5-0.2,0.8-0.8,0.6-1.3C35.3,38.1,33.8,37,32,37z" />
								<path d="M24.9,36.2l-0.6-0.8l0.6-0.8c0.3-0.4,0.3-1.1-0.2-1.4c-0.4-0.3-1.1-0.3-1.4,0.2l-1.1,1.4c-0.3,0.4-0.3,0.9,0,1.3l0.6,0.8l-0.6,0.8c-0.3,0.4-0.3,0.9,0,1.2l0.6,0.8l-0.6,0.8c-0.3,0.4-0.3,1.1,0.2,1.4c0.2,0.1,0.4,0.2,0.6,0.2c0.3,0,0.6-0.1,0.8-0.4l1.1-1.4c0.3-0.4,0.3-0.9,0-1.2l-0.6-0.8l0.6-0.8C25.2,37.1,25.2,36.5,24.9,36.2z" />
								<path d="M41.8,37.6l-0.6-0.8l0.6-0.8c0.3-0.4,0.3-0.9,0-1.3l-1.1-1.4c-0.3-0.4-1-0.5-1.4-0.2c-0.4,0.3-0.5,1-0.2,1.4l0.6,0.8l-0.6,0.8c-0.3,0.4-0.3,0.9,0,1.3l0.6,0.8L39.1,39c-0.3,0.4-0.3,0.9,0,1.2l1.1,1.4c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.4-0.1,0.6-0.2c0.4-0.3,0.5-1,0.2-1.4l-0.6-0.8l0.6-0.8C42.1,38.5,42.1,37.9,41.8,37.6z" />
							</g>
						</g>
					</svg>
					<p className="text-lg font-semibold text-gray-800 text-center">
						No new friends to show for now 😞
					</p>
					<span className="max-w-[400px] text-base text-gray-600 text-center block">
						Don&rsquo;t let it get you down! Connect with people on the{' '}
						<span
							onClick={() => navigate('/dashboard/connections')}
							className="cursor-pointer font-medium text-blue-600 underline hover:no-underline font-semibold"
						>
							connections
						</span>{' '}
						page, wait a bit and check back later!
					</span>
				</div>
			</div>
		) : (
			<div className="mt-5">
				{friends.map((friendItem) => (
					<div
						className="connection-item"
						key={friendItem._id}
						ref={(r) => (friendsRefs.current[friendItem._id] = r)}
					>
						<UserProfileInfo
							{...friendItem.userProfile}
							expiration_date={friendItem.friends_expiration_date}
							score={friendItem.score}
						/>
					</div>
				))}
			</div>
		);

	return (
		<>
			<div>
				<p className="text-xl md:text-2xl">Friends </p>
				<p className="inline-block max-w-[660px] mt-5 bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-4 text-sm md:text-md">
					📍 These people have agreed to connect with you by sharing their
					profiles, including socials and contacts.{' '}
					<span className="underline font-semibold">
						Take the next step and send them a message to start a conversation!
					</span>{' '}
					🙌
				</p>
			</div>
			<div className="max-w-[660px] h-full">
				<div className="h-full">
					{!friendsLoaded ? (
						<div className="mt-10 flex justify-center">
							<Loader color="gray" type="bars" />
						</div>
					) : (
						showFriendComponent
					)}
				</div>
			</div>
		</>
	);
}
