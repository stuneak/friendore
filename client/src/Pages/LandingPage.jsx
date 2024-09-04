import React, { useState, useRef, useEffect } from 'react';
import {
	Text,
	Timeline,
	TextInput,
	rem,
	MultiSelect,
	Group,
	Select,
	Collapse,
	PasswordInput,
	Divider,
} from '@mantine/core';
import {
	IconSun,
	IconBellRinging,
	IconCalendar,
	IconMoodSmile,
	IconLock,
	IconAt,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { YearPickerInput } from '@mantine/dates';

import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/auth-hook';
import {
	countriesList,
	hobbiesList,
	maxCharsForTextAreas,
	supportedLanguages,
} from '../../static-json';
import { MultiSelectCreatable } from '../components/MultiSelectCreatable';
import { CustomTextArea } from '../components/CustomTextArea';
import {
	SocialMediaInput,
	socialMediaInputValidation,
} from '../components/SocialMediaInput';
import { onboardingGoogleURL } from '../../config';

const iconCalendar = (
	<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
);

function RegisterSection({ scrollToexamplesSection, scrollToFormSection }) {
	const [activeTimeline] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();

	const isGoogle = searchParams.get('auth') === 'google';

	useEffect(() => {
		if (isGoogle) {
			scrollToFormSection();
			setSearchParams('');
		}
	}, []);

	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			year: null,
			languages: [],
			communication: [],
			country: '',
			hobbies: [],
			goals_dreams: '',
			aboutme: '',
			socials: [],

			loginMethod: isGoogle ? 'google' : 'local', // local or google
		},

		validate: {
			email: (value, obj) => {
				if (obj.loginMethod === 'google') {
					return null;
				}

				if (!value) {
					return `It's a required field`;
				}
				if (!value.includes('@')) {
					return /^\S+@\S+$/.test(value) ? null : 'Invalid email';
				}
				if (value.length > 320) {
					return 'max length is 320 characters';
				}
				return null;
			},
			password: (value, obj) => {
				if (obj.loginMethod === 'google') {
					return null;
				}

				if (!value) {
					return `It's a required field`;
				}
				if (value.length < 4) {
					return 'Password must be at least 4 characters long';
				}
				if (value.length > 20) {
					return 'max length is 20 characters';
				}
				return null;
			},
			year: (value) => {
				if (!value) {
					return `It's a required field`;
				}
				return null;
			},
			languages: (value) => {
				if (value.length < 1) {
					return 'Please select at least one language';
				}
				return null;
			},
			communication: (value) => {
				if (value.length < 1) {
					return 'Please select at least one communication method';
				}
				return null;
			},
			country: (value, obj) => {
				if (obj.communication.includes('in-person') && !value) {
					return `It's a required field`;
				}
				return null;
			},
			hobbies: (value) => {
				if (value.length < 2) {
					return 'Please select at least two hobbies';
				}
				if (value.length > 30) {
					return 'You can select up to 30 hobbies';
				}
				return null;
			},
			goals_dreams: (value) => {
				if (value.length < 150) {
					return 'Please share your goals and dreams. At least 150 characters';
				}
				if (value.length > maxCharsForTextAreas) {
					return `The maximum length is ${maxCharsForTextAreas} characters`;
				}

				return null;
			},
			aboutme: (value) => {
				if (value.length < 300) {
					return 'Please tell us a bit about who you are. At least 300 characters';
				}
				if (value.length > maxCharsForTextAreas) {
					return `The maximum length is ${maxCharsForTextAreas} characters`;
				}

				return null;
			},
			socials: socialMediaInputValidation,
		},
	});

	const auth = useAuth();

	const handleSubmit = async () => {
		const values = form.getValues();
		const isGoogleLoginMethod = values.loginMethod === 'google';

		const requiredValues = {
			email: values.email,
			password: values.password,
			year: values.year.getFullYear(),
			languages: values.languages,
			communication: values.communication,
			country: values.country,
			hobbies: values.hobbies,
			goals_dreams: values.goals_dreams,
			aboutme: values.aboutme,
			socials: values.socials
				.map((social) => social.value)
				.filter((item) => item !== ''),
		};

		if (isGoogleLoginMethod) {
			delete requiredValues.email;
			delete requiredValues.password;
		}

		if (isGoogleLoginMethod) {
			await auth.registerGoogle(requiredValues);
		} else {
			await auth.registerLocal(requiredValues);
		}
	};

	return (
		<Timeline color="gray" active={activeTimeline} bulletSize={28}>
			<Timeline.Item
				title="7 questions"
				bullet={
					<IconSun style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
				}
			>
				<Text c="dimmed" size="sm">
					We&rsquo;ve crafted a set of questions to help us find the ideal
					connections for you 🙌
				</Text>
				<Collapse in={activeTimeline === 0}>
					<div
						className="mt-4 bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-3"
						role="alert"
					>
						<p className="text-sm">
							📍 If you&rsquo;re{' '}
							<span className="underline font-semibold">
								unsure what to write
							</span>{' '}
							and <span className="underline font-semibold">need ideas</span>,{' '}
							<span
								className="underline font-semibold text-blue-500 cursor-pointer"
								onClick={scrollToexamplesSection}
							>
								{' '}
								click here for examples
							</span>
						</p>
					</div>
					<div className="pt-8">
						{form.getValues().loginMethod === 'local' && (
							<>
								<Group mb="md" justify="center">
									<a
										href={onboardingGoogleURL}
										className="flex justify-center items-center gap-3 text-center font-semibold inline-block p-1 pr-4  transition-all duration-500 ease-in-out transform bg-black border-2 border-black rounded-full hover:border-white hover:bg-slate-500"
									>
										<div className="flex items-center justify-center bg-white w-9 h-9 rounded-full">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												className="w-5 h-5"
											>
												<title>Sign in with Google</title>
												<desc>Google G Logo</desc>
												<path
													d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
													className="fill-google-logo-blue"
												/>
												<path
													d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
													className="fill-google-logo-green"
												/>
												<path
													d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
													className="fill-google-logo-yellow"
												/>
												<path
													d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
													className="fill-google-logo-red"
												/>
											</svg>
										</div>
										<span className="text-md text-white tracking-wider">
											Sign up with Google
										</span>
									</a>
								</Group>
								<Divider
									label="Or continue with email and password"
									labelPosition="center"
									my="sm"
								/>
							</>
						)}

						<form onSubmit={() => {}}>
							{form.getValues().loginMethod === 'local' && (
								<div className="flex justify-between flex-col sm:flex-row">
									<TextInput
										required
										mt="sm"
										label="Email"
										key={form.key('email')}
										type="email"
										{...form.getInputProps('email')}
										className="flex-1 sm:max-w-[250px]"
										leftSection={
											<IconAt
												style={{ width: rem(18), height: rem(18) }}
												stroke={1.5}
											/>
										}
									/>
									<PasswordInput
										leftSection={
											<IconLock
												style={{ width: rem(18), height: rem(18) }}
												stroke={1.5}
											/>
										}
										required
										mt="sm"
										label="Password"
										type="password"
										key={form.key('password')}
										{...form.getInputProps('password')}
										className="flex-1 sm:max-w-[250px]"
									/>
								</div>
							)}

							<YearPickerInput
								required
								mt="sm"
								leftSection={iconCalendar}
								leftSectionPointerEvents="none"
								label="Pick your birth year"
								minDate={new Date(1960, 1)}
								maxDate={new Date(2006, 1)}
								{...form.getInputProps('year')}
								key={form.key('year')}
								description="We use your birth year to find people of similar age"
							/>
							<MultiSelect
								required
								mt="sm"
								label="What languages do you speak?"
								data={supportedLanguages}
								key={form.key('languages')}
								{...form.getInputProps('languages')}
								description="We use this information to find people who speak the same language"
							/>

							<MultiSelect
								required
								mt="sm"
								label="How do you prefer to communicate?"
								data={['text', 'call', 'in-person']}
								key={form.key('communication')}
								{...form.getInputProps('communication')}
								onChange={(...args) => {
									if (!args[0].includes('in-person')) {
										form.setFieldValue('country', null);
									}
									form.getInputProps('communication').onChange(...args);
								}}
								description="We use this information to find people who prefer the same communication methods"
							/>
							{form
								.getInputProps('communication')
								?.value?.includes('in-person') && (
								<Select
									data={countriesList}
									searchable
									required
									mt="sm"
									label="If you prefer in-person talks, choose your country 👀"
									key={form.key('country')}
									{...form.getInputProps('country')}
								/>
							)}

							<MultiSelectCreatable
								key={form.key('hobbies')}
								label="Choose your interests and passions"
								additionalProps={form.getInputProps('hobbies')}
								defaultValue={form.getInputProps('hobbies').value}
								onChange={(val) => {
									form.getInputProps('hobbies').onChange(val);
								}}
								options={hobbiesList}
								description="We use this information to find people who share the same interests, hobbies, and passions"
							/>

							<CustomTextArea
								form={form}
								name="goals_dreams"
								label="Could you share your goals and dreams?"
								description={`Use one of the selected languages ${
									form.getInputProps('languages')?.value?.length > 0
										? `(e.g., ${form
												.getInputProps('languages')
												?.value?.join(', ')})`
										: ''
								}`}
								maxLength={maxCharsForTextAreas}
								height="100px"
							/>

							<CustomTextArea
								form={form}
								name="aboutme"
								label="Could you tell us a bit about who you are?"
								description={`Use one of the selected languages ${
									form.getInputProps('languages')?.value?.length > 0
										? `(e.g., ${form
												.getInputProps('languages')
												?.value?.join(', ')})`
										: ''
								}`}
								maxLength={maxCharsForTextAreas}
								height="150px"
							/>

							<SocialMediaInput
								form={form}
								label="Share your socials and contacts"
								description="We won't share your socials and contacts without your approval"
								name="socials"
							/>

							<Group justify="center" mt="md">
								<button
									type="button"
									onClick={form.onSubmit(handleSubmit)}
									className="min-w-[250px] text-center font-semibold inline-block my-4 px-8 py-2 sm:py-3 text-xl sm:text-2xl sm:min-w-[300px] text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black rounded-full hover:border-white hover:bg-slate-500"
								>
									Create Profile
								</button>
							</Group>
						</form>
					</div>
				</Collapse>
			</Timeline.Item>
			<Timeline.Item
				title="Thank you for signing up! 🫶"
				bullet={
					<IconBellRinging
						style={{ width: rem(18), height: rem(18) }}
						stroke={1.5}
					/>
				}
			>
				<Text c="dimmed" size="sm">
					We&rsquo;re carefully reviewing profiles to ensure a high-quality community.
					Once your profile is approved, you&rsquo;ll receive an email. We appreciate your patience!
				</Text>
			</Timeline.Item>
		</Timeline>
	);
}

function UserProfileInfo({
	year,
	languages,
	communication,
	country,
	hobbies,
	goals_dreams,
	aboutme,
	socials,
}) {
	const communicationMethods = communication.map((method) => {
		if (method === 'in-person') {
			return `${method} (based in ${country})`;
		}
		return method;
	});

	return (
		<div className="mt-12 border border-gray-300 rounded-lg text-gray-700 px-4 sm:px-8 py-8">
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
					<strong className="font-semibold">socials & contacts</strong>{' '}
					<span className="italic text-slate-500">{socials}</span>
				</p>
			</div>
		</div>
	);
}

export function LandingPage() {
	const howitworksSectionRef = useRef(null);
	const formSectionRef = useRef(null);
	const examplesSectionRef = useRef(null);

	const scrollTohowitworksSection = () => {
		if (howitworksSectionRef && howitworksSectionRef.current) {
			howitworksSectionRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	const scrollToFormSection = () => {
		if (formSectionRef && formSectionRef.current) {
			formSectionRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	const scrollToexamplesSection = () => {
		if (examplesSectionRef && examplesSectionRef.current) {
			examplesSectionRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	return (
		<>
			<section className="animate-slide-fade relative w-full overflow-hidden border-b border-b-2 border-gray-200">
				<div className="container relative w-full px-4 py-20 mx-auto">
					<div className="flex flex-col w-full text-left text-center">
						<strong className="text-xs font-semibold tracking-widest uppercase text-slate-500">
							Looking for like-minded friends?
						</strong>
						<h1 className="mt-4 font-serif text-4xl font-bold tracking-tighter text-black lg:text-5xl">
							Fill out the form below{' '}
							<span className="hidden lg:block md:block" />
							to meet{' '}
							<span className="tracking-normal custom-margin align-middle font-semibold whitespace-nowrap  p-1 rounded-full highlight text-white text-3xl highlight-gray-800 highlight-variant-1 px-4">
								new friends
							</span>{' '}
							<span className="hidden lg:block md:block" /> with similar
							interests <span className="hidden lg:block md:block" />
							<span className="tracking-normal custom-margin align-middle font-semibold whitespace-nowrap  p-1 rounded-full highlight text-white text-3xl highlight-gray-800 highlight-variant-1 px-4">
								all for free
							</span>
						</h1>
					</div>
					<div className="flex w-full mt-20 justify-center">
						<div className="rounded-lg sm:mt-0">
							<button
								type="button"
								onClick={scrollTohowitworksSection}
								className="inline-flex font-semibold  items-center px-8 py-3 text-lg text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black rounded-full hover:border-white hover:bg-slate-500"
							>
								Let&rsquo;s get started!
							</button>
						</div>
					</div>
				</div>
			</section>

			<section
				ref={howitworksSectionRef}
				className="animate-slide-fade  relative w-full overflow-hidden border-b border-b-2 border-gray-200"
			>
				<div className="container relative w-full px-4 py-20 mx-auto">
					<div className="flex flex-col w-full text-left text-center">
						<h2 className="font-serif text-4xl font-bold tracking-tighter text-black lg:text-5xl">
							How does it work?
						</h2>
						<p className="mt-4 lg:mx-auto md:mx-auto text-lg leading-snug text-slate-500 tracking-widest">
							<span className="flex justify-center">
								It&rsquo;s pretty straightforward
							</span>
							<span className="flex justify-center">
								Just three simple steps!
							</span>
						</p>
					</div>
					<div className="mt-20 select-none">
						<ol className="items-center flex-col flex md:flex-row md:justify-center md:items-start">
							<li className="relative mb-6 md:mb-0 border-t pt-4 md:pt-0 md:border-none">
								<div className="flex items-center justify-center">
									<div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full ring-0 ring-white sm:ring-8  shrink-0">
										<IconSun
											style={{ width: rem(18), height: rem(18) }}
											stroke={1.5}
										/>
									</div>
									<div className="hidden md:flex w-full bg-gray-200 h-0.5" />
								</div>
								<div className="mt-3 max-w-[300px] md:mr-8 md:max-w-[250px]">
									<p className="text-center md:text-left text-base tracking-widest  text-slate-500">
										Please provide detailed and honest answers to the questions;
										it will enhance the quality of the search 🙏
									</p>
								</div>
							</li>
							<li className="relative mb-6 md:mb-0 border-t pt-4 md:pt-0 md:border-none">
								<div className="flex items-center justify-center">
									<div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full ring-0 ring-white sm:ring-8  shrink-0">
										<IconBellRinging
											style={{ width: rem(18), height: rem(18) }}
											stroke={1.5}
										/>
									</div>
									<div className="hidden md:flex w-full bg-gray-200 h-0.5" />
								</div>
								<div className="mt-3 max-w-[300px] md:mr-8 md:max-w-[250px]">
									<p className="text-center md:text-left text-base  tracking-widest  text-slate-500">
										Our system reviews all profiles and sends you a list of
										like-minded people for mutual approval
									</p>
								</div>
							</li>
							<li className="relative mb-6 md:mb-0 border-t border-b py-4 md:py-0 md:border-none">
								<div className="flex items-center justify-center">
									<div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full ring-0 ring-white sm:ring-8  shrink-0">
										<IconMoodSmile
											style={{ width: rem(18), height: rem(18) }}
											stroke={1.5}
										/>
									</div>
									<div className="hidden md:flex w-full bg-gray-200 h-0.5" />
								</div>
								<div className="mt-3 max-w-[300px] md:mr-8 md:max-w-[250px]">
									<p className="text-center md:text-left text-base tracking-widest  text-slate-500">
										After both of you agree to connect, you&rsquo;ll be able to
										see each other&rsquo;s complete profiles.
									</p>
								</div>
							</li>
						</ol>
					</div>
					<div
						ref={formSectionRef}
						className="mt-20 md:mt-32 flex flex-col w-full text-left text-center"
					>
						<h2 className="font-serif text-4xl font-bold tracking-tighter text-black lg:text-5xl">
							Let&rsquo;s start?
						</h2>
					</div>
					<div className="mt-12 flex flex-col w-full mx-auto md:items-center md:justify-center">
						<div className="max-w-[570px]">
							<RegisterSection
								scrollToFormSection={scrollToFormSection}
								scrollToexamplesSection={scrollToexamplesSection}
							/>
						</div>
					</div>
				</div>
			</section>

			<section
				ref={examplesSectionRef}
				className="animate-slide-fade container relative w-full px-4 py-20 mx-auto"
			>
				<div className="flex flex-col w-full text-left text-center">
					<h2 className="font-serif text-4xl font-bold tracking-tighter text-black lg:text-5xl">
						Inspiring Profiles
					</h2>
					<p className="mt-4 lg:mx-auto md:mx-auto text-lg leading-snug text-slate-500 tracking-widest">
						<span className="flex justify-center">
							Here&rsquo;s a list of profiles for inspiration ☘️
						</span>
					</p>
					<div className="flex justify-center">
						<div className="max-w-[800px] min-w-[300px] select-none">
							<UserProfileInfo
								year={1989}
								languages={['English', 'Spanish', 'French']}
								communication={['text', 'call', 'in-person']}
								country="🇺🇸 the United States"
								hobbies={[
									'📚 reading',
									'🥾 hiking',
									'🎂 baking',
									'🍷 wine tasting',
									'🌱 gardening',
								]}
								goals_dreams={`I'm going to start an awesome wildlife conservation
									project and share tips on sustainable living with fun and
									educational content. Plus, I'm learning the ukulele and
									getting more involved in local environmental projects`}
								aboutme={`Hey, friend! I'm Olivia! I'm an environmental
									scientist who's all about exploring the outdoors and coming
									up with cool ways to tackle climate change. When I'm not at
									work, you'll find me hiking the amazing trails in the
									Pacific Northwest, taking care of my urban garden, or snapping
									pics of nature. I'm on the lookout for friends who share my
									passion for the environment and adventure 👻`}
								socials="facebook.com/*******; instagram.com/*****;"
							/>

							<UserProfileInfo
								year={1998}
								languages={['Portuguese', ' English']}
								communication={['text', 'call', 'in-person']}
								country="🇵🇹 Portugal"
								hobbies={[
									'📚 reading',
									'🎨 painting',
									'🎸 playing guitar',
									'🥾 hiking',
									'stargazing',
									'trying new recipes',
								]}
								goals_dreams={`I'm planning to explore the Canadian Rockies and enjoy nature. I also wish to create a home art studio to pursue my painting. Joining a book club to discuss my favorite books is another goal. Additionally I'd like to improve my guitar skills and possibly compose music. Hosting a stargazing event to share the night sky's beauty is also my dream! 😅 I'm looking forward to taking cooking classes to learn new recipes from different cultures.`}
								aboutme="Hello, I'm Alex. I work as a graphic designer. In my free time, I enjoy reading, painting, playing guitar, and hiking. I also have a passion for stargazing and cooking. If you are interested in art, music, nature, or book discussions, let us connect for some engaging activities. I'm always open to sharing a meal, hiking to scenic spots, or enjoying a good book together. ✌️"
								socials="******@gmail.com; instagram.com/*******;"
							/>
							<UserProfileInfo
								year={1995}
								languages={['Portuguese', 'German', 'Polish']}
								communication={['text', 'call']}
								country="🇧🇷 Brazil"
								hobbies={[
									'🌐 learning languages',
									'🌍 traveling',
									'reading Slavic literature',
									'listening to music',
									'exploring cultures',
								]}
								goals_dreams="I love Slavic languages and literatures, and my current goal is to master Polish to read works by authors like Witold Gombrowicz, Bruno Schulz, and Konstanty Ildefons Gałczyński. Also I dream of becoming proficient enough in Polish to engage deeply with these literary giants. I'm also eager to share my knowledge of Brazilian Portuguese and German, and to introduce others to the rich cultural aspects of Brazil and the diverse music of German-speaking countries."
								aboutme={`Hey! I'm from Brazil and currently diving into Polish because I'm passionate about Slavic literature and want to enjoy Polish books in their original form. I also speak Brazilian Portuguese and German, so if you're keen on languages, cultures, or just want to chat, I'm here to connect! On a personal note, I live with my playful dog Max, who loves to keep me company during study sessions. When I'm not immersed in languages, I'm usually working on my DIY projects or playing board games with friends :)`}
								socials="x.com/******; instagram.com/****; t.me/******;"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
