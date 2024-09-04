import 'regenerator-runtime/runtime';
import React, { useEffect } from 'react';
import { Modal } from '@mantine/core';

import { Outlet, useSearchParams, useLocation } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useAuth } from '../hooks/auth-hook';
import { AuthenticationForm } from '../AuthenticationForm';
import { Footer } from '../components/Footer';
import { useAmplitudeContext } from '../hooks/amplitude-hook';

export function AppWrapper() {
	const [opened, { open, close }] = useDisclosure(false);

	const auth = useAuth();

	const [searchParams, setSearchParams] = useSearchParams();

	const location = useLocation();
	const amplitude = useAmplitudeContext();

	useEffect(() => {
		if (auth.user) {
			amplitude.setUserId(auth.user);
		}
	}, [auth.user]);


	useEffect(() => {
		amplitude.logEvent('Page visited', { location: location.pathname });
	}, [location.pathname]);
	

	useEffect(() => {
		console.log('search error', { error: searchParams.get('error') });
		const isLocalUserExist =
			searchParams.get('error') ===
			'google-register-callback:account_local_exists';

		const isGoogleEmailBusy =
			searchParams.get('error') === 'google:account_local_exists';

		const AccountNotFound =
			searchParams.get('error') === 'google:account_not_found';

		const AccountDeleted = searchParams.get('error') === 'login:user_deleted';

		if (AccountDeleted) {
			notifications.show({
				withCloseButton: true,
				color: 'red',
				autoClose: 10000,
				message: `It seems account with this email has been deleted 😔`,
			});
			setSearchParams('');
		}

		if (AccountNotFound) {
			notifications.show({
				withCloseButton: true,
				color: 'red',
				autoClose: 10000,
				message: `It seems you don't have an account with this email. Please register an account with this email.`,
			});
			setSearchParams('');
		}

		if (isGoogleEmailBusy) {
			notifications.show({
				withCloseButton: true,
				color: 'red',
				autoClose: 10000,
				message: `It seems you've already registered an account with this email and password. Please log in using your email and password.`,
			});
			open();
			setSearchParams('');
		}

		if (isLocalUserExist) {
			notifications.show({
				withCloseButton: true,
				color: 'red',
				autoClose: 10000,
				message:
					'It looks like you already have an account with this email. Please log in with your email and password.',
			});
			open();
			setSearchParams('');
		}
	}, [searchParams.get('error')]);

	const logOutWrapper = () => {
		auth.logOut();
		amplitude.resetUser();
	}

	return (
		<div>
			<Modal opened={opened} onClose={close} radius={15} centered>
				<AuthenticationForm
					logInLocal={(values) => {
						auth.logInLocal(values, () => {
							close();
						});
					}}
				/>
			</Modal>
			<section className="border-b">
				<div className="flex flex-row items-center justify-between w-full p-2 mx-auto px-2 sm:px-6 lg:max-w-6xl lg:px-28 md:px-6">
					<div className="h-10 focus:outline-none focus:shadow-outline">
						<span className="text-sm tracking-tighter text-black transition duration-500 ease-in-out transform hover:text-slate-500 text-opacity-80 tracking-relaxed">
							<a href="/" className="inline-flex items-center">
								<svg
									className="w-10 h-10"
									xmlns="http://www.w3.org/2000/svg"
									version="1.1"
									id="Layer_1"
									x="0px"
									y="0px"
									viewBox="0 0 229 229"
									fill="currentColor"
								>
									<g
										transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
										fill="#000000"
										stroke="none"
									>
										<path d="M465 1686 c-85 -32 -126 -111 -110 -214 21 -144 241 -190 327 -68 31 42 37 148 12 201 -35 74 -143 112 -229 81z m125 -52 c49 -20 70 -56 70 -119 0 -66 -21 -100 -74 -120 -79 -30 -153 0 -176 71 -23 69 5 144 63 169 42 19 68 18 117 -1z" />
										<path d="M925 1681 c-72 -33 -105 -86 -105 -167 0 -58 20 -103 59 -137 110 -92 283 -30 298 106 11 96 -23 163 -102 198 -51 24 -99 24 -150 0z m129 -45 c18 -7 43 -26 55 -42 31 -40 26 -131 -9 -169 -54 -58 -153 -55 -204 6 -35 41 -37 123 -4 164 39 50 102 66 162 41z" />
										<path d="M1397 1686 c-79 -29 -107 -75 -107 -174 0 -55 5 -76 23 -102 69 -104 244 -101 308 4 26 43 26 159 0 202 -41 67 -145 99 -224 70z m102 -42 c18 -4 45 -20 62 -36 26 -26 29 -36 29 -93 0 -57 -3 -66 -30 -93 -54 -54 -155 -51 -200 5 -15 19 -20 41 -20 87 0 70 16 101 64 122 36 15 51 17 95 8z" />
										<path d="M353 1315 c-31 -22 -236 -384 -236 -417 0 -40 29 -68 70 -68 35 0 59 19 111 85 l23 30 -6 -45 c-15 -110 -55 -495 -55 -525 0 -44 31 -70 81 -69 67 2 83 26 119 181 18 74 33 133 35 131 1 -2 8 -50 14 -108 18 -164 20 -170 55 -191 36 -23 88 -20 118 8 18 16 19 28 12 262 -6 228 -2 318 22 514 l6 47 44 0 44 0 0 -152 c0 -98 -9 -243 -26 -401 -25 -235 -26 -248 -9 -267 25 -27 67 -34 109 -16 43 18 46 24 81 199 16 75 31 137 35 137 4 0 19 -62 35 -137 35 -175 38 -181 81 -199 45 -19 89 -10 110 21 14 22 14 45 -10 262 -17 154 -26 295 -26 396 l0 157 44 0 44 0 6 -42 c22 -165 28 -303 21 -523 -6 -230 -6 -241 13 -258 30 -28 82 -31 118 -8 35 21 37 27 55 191 6 58 13 106 14 108 2 2 17 -57 35 -131 36 -155 52 -179 119 -181 50 -1 81 25 81 68 0 29 -42 432 -56 528 -5 43 -5 43 13 21 10 -11 31 -37 46 -57 23 -30 34 -36 66 -36 46 0 71 24 71 68 0 39 -201 395 -236 418 -26 18 -52 15 -127 -11 -41 -15 -53 -16 -90 -4 -67 20 -301 23 -369 4 -47 -13 -63 -13 -100 -3 -60 17 -330 16 -385 -1 -37 -12 -49 -11 -90 4 -72 25 -105 28 -130 10z m81 -49 c58 -24 108 -28 161 -11 82 25 116 20 155 -20 l34 -35 -52 0 c-33 0 -54 -5 -57 -12 -2 -7 -12 -92 -21 -188 -13 -137 -15 -226 -10 -407 6 -216 5 -232 -11 -235 -31 -7 -53 3 -58 26 -2 11 -11 86 -20 166 -9 80 -22 151 -27 158 -13 15 -54 16 -63 1 -4 -5 -24 -83 -45 -172 -41 -175 -58 -204 -99 -178 -13 8 -12 38 8 218 12 114 32 270 43 345 30 207 17 216 -90 63 -69 -99 -99 -124 -116 -97 -5 8 180 348 206 380 13 15 21 15 62 -2z m1200 -8 c49 -76 204 -363 200 -370 -17 -27 -47 -1 -116 97 -108 154 -121 144 -89 -68 11 -78 31 -234 42 -345 19 -174 20 -205 8 -213 -41 -26 -57 3 -102 186 -40 163 -43 170 -68 173 -14 2 -31 -3 -36 -10 -6 -7 -19 -78 -28 -158 -9 -80 -18 -155 -20 -167 -5 -22 -27 -32 -58 -25 -17 4 -17 19 -11 236 5 181 3 269 -10 406 -9 96 -19 181 -21 188 -3 7 -24 12 -57 12 l-52 0 34 35 c39 40 73 45 155 20 53 -17 104 -13 159 11 43 18 53 17 70 -8z m-692 -4 c43 -15 57 -15 96 -4 98 26 197 23 151 -6 -6 -3 -20 -25 -30 -48 -28 -63 -26 -310 6 -601 21 -183 23 -230 13 -236 -12 -8 -46 -3 -57 7 -3 2 -22 86 -43 186 -21 100 -43 188 -49 195 -7 7 -19 13 -29 13 -10 0 -22 -6 -29 -13 -6 -7 -28 -95 -49 -195 -21 -100 -40 -184 -43 -186 -11 -10 -45 -15 -57 -7 -11 6 -9 50 12 235 18 153 26 281 26 392 0 175 -8 214 -52 261 l-21 23 52 0 c29 0 75 -7 103 -16z" />
									</g>
								</svg>
								<span className="select-none text-base font-bold leading-snug tracking-wide">
									Friendore
								</span>
							</a>
						</span>
					</div>
					{!auth.loaded ? (
						<button
							type="button"
							className="invisible inline-flex items-center px-6 py-2 text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black rounded-full   hover:border-white hover:bg-slate-500"
						>
							invisible
						</button>
					) : (
						<button
							type="button"
							onClick={auth.isAuth ? logOutWrapper : open}
							className="inline-flex font-semibold items-center px-6 py-2 text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black rounded-full  hover:border-white hover:bg-slate-500"
						>
							{auth.isAuth ? 'Log out' : 'Log in'}
						</button>
					)}
				</div>
			</section>
			<Outlet />
			{auth.loaded && <Footer />}
		</div>
	);
}
