import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { profileUnsubscribeURL } from '../../config';

export function Unsubscribe() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const unsubscribe = async () => {
		try {
			const queryValue = searchParams.get('hash');

			if (!queryValue) {
				navigate(`/`, { replace: true });
				return;
			}
			const decodedValue = decodeURIComponent(queryValue);
			const jsonedValues = JSON.stringify({ hash: decodedValue });

			await fetch(profileUnsubscribeURL, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: jsonedValues,
			});
		} catch (e) {
			console.log(`register local values: e:${e}`);
		}
	};

	React.useEffect(() => {
		unsubscribe();
	}, []);

	return (
		<>
			<section className="border-b">
				<div className="flex flex-row items-center justify-center w-full p-2 mx-auto px-2 sm:px-6 lg:max-w-6xl lg:px-28 items-center justify-center md:px-6">
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
				</div>
			</section>
			<section className="animate-slide-fade relative w-full overflow-hidden min-h-[65vh] flex flex-col justify-center items-center p-5 px-2 sm:px-6 lg:px-28 md:px-6">
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
				</div>
				<h1 className="max-w-[450px] flex text-xl md:text-2xl font-semibold text-gray-900 text-center">
					You have been successfully unsubscribed from our emails.
				</h1>
				<p className="mt-2 max-w-[450px] flex text-base md:text-lg font-normal text-gray-700 text-center">
					We are sorry to see you go. If you change your mind, you can always
					resubscribe from your profile settings.
				</p>
			</section>
			<Footer />
		</>
	);
}
