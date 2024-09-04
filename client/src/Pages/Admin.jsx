/* eslint-disable no-nested-ternary */
import React from 'react';
import { Loader } from '@mantine/core';
import { useAdmin } from '../hooks/admin-hook';
import { countriesList } from '../../static-json';
import { parseLinks } from '../parseLinks';

function UserProfileInfo({
	email,
	year,
	languages,
	communication,
	country,
	hobbies,
	goals_dreams,
	aboutme,
	socials,
	approveProfile,
	needChangeProfile,
	destroyProfile,
	isAgreedToReceiveEmail,
}) {
	const communicationMethods = communication.map((method) => {
		if (method === 'in-person') {
			const countryName = countriesList.find((c) => c.value === country).label;
			return `${method} (based in ${countryName})`;
		}
		return method;
	});

	const [feedbackText, setFeedbackText] = React.useState('');

	return (
		<div className="mb-10 relative border border-gray-300 rounded-lg text-gray-700">
			<div className="px-4 sm:px-8 py-6">
				<div className="flex">
					<p className="text-left text-base tracking-wide">
						<strong className="font-semibold">email</strong>{' '}
						<span className="text-slate-500">{email}</span>
					</p>
				</div>
				<div className="flex mt-2">
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

				<div className="flex mt-2">
					<p className="text-left text-base tracking-wide">
						<strong className="font-semibold">isAgreedToReceiveEmail:</strong>{' '}
						<span className="text-slate-500">{isAgreedToReceiveEmail ? 'true' : 'false'}</span>
					</p>
				</div>

				<div className="flex flex-col mt-5">
					<div>
						<input
							type="text"
							className="w-full border border-gray-300 rounded-lg p-2"
							value={feedbackText}
							onChange={(e) => {
								setFeedbackText(e.target.value);
							}}
						/>
					</div>
					<div className="mt-2">
						<button
							onClick={() => approveProfile()}
							type="button"
							className="w-full text-center font-semibold  my-2 px-2 py-2 sm:py-3 text-xl sm:text-2xl text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black rounded-full hover:border-white hover:bg-slate-500"
						>
							Approve
						</button>
						<button
							onClick={() => needChangeProfile(feedbackText)}
							type="button"
							className="w-full text-center font-semibold  my-2 px-2 py-2 sm:py-3 text-xl sm:text-2xl text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black rounded-full hover:border-white hover:bg-slate-500"
						>
							Need changes
						</button>
						<button
							onClick={destroyProfile}
							type="button"
							className="w-full text-center font-semibold  my-2 px-2 py-2 sm:py-3 text-xl sm:text-2xl text-white transition-all duration-500 ease-in-out transform bg-red-600 border-2 border-red rounded-full hover:border-red hover:bg-red-400"
						>
							Delete profile
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export function Admin() {
	const {
		getUserProfiles,
		userProfiles,
		userProfilesLoaded,
		changeUserProfile,
		destroyUserProfile,
	} = useAdmin();

	React.useEffect(() => {
		getUserProfiles();
	}, []);

	const approveProfile = async ({ id }) => {
		const res = await changeUserProfile({
			id,
			isApproved: true,
			isChanged: true,
			text: '-',
		});
		if (res) {
			await getUserProfiles();
		}
	};

	const needChangeProfile = async ({ id, text }) => {
		const res = await changeUserProfile({
			id,
			isApproved: false,
			isChanged: false,
			text,
		});
		if (res) {
			await getUserProfiles();
		}
	};

	const destroyProfile = ({ id }) => {
		destroyUserProfile({ id });
	};

	const showFriendComponent =
		userProfiles.length === 0 ? (
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
						Empty
					</p>
				</div>
			</div>
		) : (
			<div className="mt-5">
				{userProfiles.map((userProfile) => (
					<div className="connection-item" key={userProfile._id}>
						<UserProfileInfo
							{...userProfile}
							approveProfile={() => approveProfile({ id: userProfile._id })}
							destroyProfile={() => destroyProfile({ id: userProfile._id })}
							needChangeProfile={(text) =>
								needChangeProfile({ id: userProfile._id, text })
							}
						/>
					</div>
				))}
			</div>
		);

	return (
		<section className="relative w-full overflow-hidden">
			<div className="container relative w-full  p-2 mx-auto px-2 lg:max-w-6xl lg:px-28 items-center justify-center md:px-6">
				<div className="flex flex-col w-full justify-center items-center">
					<div className="w-full mt-5">
						<div>
							<p className="text-xl md:text-2xl">
								Admin (count {userProfiles.length}){' '}
							</p>
						</div>
						<div className="h-full">
							<div className="h-full">
								{!userProfilesLoaded ? (
									<div className="mt-10 flex justify-center">
										<Loader color="gray" type="bars" />
									</div>
								) : (
									showFriendComponent
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
