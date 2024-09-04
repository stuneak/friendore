import React from 'react';
import {
	TextInput,
	rem,
	MultiSelect,
	Select,
	Group,
	Alert,
	Text,
	Checkbox,
	// Pill,
} from '@mantine/core';
import { IconCalendar, IconAt, IconInfoCircle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { YearPickerInput } from '@mantine/dates';

import { useNavigate } from 'react-router-dom';
import { modals } from '@mantine/modals';
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
	reminderForSaving,
	cleanAllNotifications,
} from '../notification-debounce';
import {
	SocialMediaInput,
	socialMediaInputValidation,
} from '../components/SocialMediaInput';
import { useWindowDimensions } from '../hooks/window-size';

const iconCalendar = (
	<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
);

const iconAlert = <IconInfoCircle />;

export function MyProfile() {
	const auth = useAuth();
	const { user } = auth;
	const navigate = useNavigate();
	const { width } = useWindowDimensions();

	const form = useForm({
		initialValues: {
			email: user.email,
			year: new Date(user.year, 1, 1),
			languages: user.languages,
			communication: user.communication,
			country: user.country,
			hobbies: user.hobbies,
			goals_dreams: user.goals_dreams,
			aboutme: user.aboutme,
			socials: [
				...user.socials.map((value) => ({
					value,
					key: `${Math.random()}`,
				})),
				{ value: '', key: `${Math.random()}` },
			],
			isAgreedToReceiveEmail: user.isAgreedToReceiveEmail,
		},

		validate: {
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
		onValuesChange: () => {
			cleanAllNotifications();
			reminderForSaving.run();
		},
	});

	const updateProfile = async (values) => {
		auth.updateProfile(values);
	};

	const handleSubmit = async () => {
		const values = form.getValues();
		const requiredValues = {
			languages: values.languages,
			communication: values.communication,
			country: values.country,
			hobbies: values.hobbies,
			goals_dreams: values.goals_dreams,
			aboutme: values.aboutme,
			socials: values.socials
				.map((social) => social.value)
				.filter((item) => item !== ''),
			isAgreedToReceiveEmail: values.isAgreedToReceiveEmail,
		};

		updateProfile(requiredValues);
	};

	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: 'Delete your profile',
			children: (
				<Text size="sm">Are you sure you want to delete your profile?</Text>
			),
			labels: { confirm: 'Delete profile', cancel: "No don't delete it" },
			confirmProps: { color: 'red' },
			onCancel: () => {},
			onConfirm: () => {
				auth.deleteMyProfile({ id: user.id });
			},
		});

	const isUnderReview = !user.state.isApproved && user.state.isChanged;
	const isProfiledRejected =
		!user.state.isApproved && !user.state.isChanged && user.state.text;

	const lessThan530 = width < 530;

	return (
		<>
			<div>
				<p className="text-xl md:text-2xl">My profile </p>
				<p className="inline-block max-w-[660px] mt-5 bg-gray-100 border-t border-b border-gray-500 text-gray-650 px-4 py-4 text-sm md:text-md">
					📍 Fill out your profile with{' '}
					<span className="underline font-semibold">detailed</span> and{' '}
					<span className="underline font-semibold">honest information</span> to
					help us find the best{' '}
					<span
						onClick={() => navigate('/dashboard/connections')}
						className="cursor-pointer font-medium text-blue-600 underline hover:no-underline"
					>
						connections
					</span>
					. <span className="hidden lg:block" />
					<span className="underline font-semibold">
						We don&rsquo;t share your socials and contacts with others until you
						choose to share them.
					</span>
				</p>

				{isUnderReview && (
					<div className="max-w-[660px] mt-5">
						<Alert
							variant="light"
							color="yellow"
							radius="xs"
							title="Review pending"
							icon={iconAlert}
							classNames={{
								icon: 'my-custom-alert-icon',
							}}
						>
							Your profile is currently under review. This won&rsquo;t take
							long, so please be patient. We&rsquo;ll notify you as soon as
							it&rsquo;s approved. Thank you for your understanding!
						</Alert>
					</div>
				)}

				{isProfiledRejected && (
					<div className="max-w-[660px] mt-5">
						<Alert
							variant="light"
							color="red"
							radius="xs"
							title="Changes required"
							icon={iconAlert}
							classNames={{
								icon: 'my-custom-alert-icon',
							}}
						>
							<p>
								We reviewed your profile and noticed that some updates are
								needed. To help us proceed,{' '}
								<span className="underline font-semibold">
									please provide more detailed responses to the questions and
									click on &quot;Save changes&quot; after making your updates.
									{user.state.text
										? ` What can be improved: ${user.state.text}`
										: ''}
								</span>
							</p>
						</Alert>
					</div>
				)}
			</div>

			<form onSubmit={() => {}} className="mt-5 max-w-[650px]">
				<TextInput
					disabled
					label="My email"
					key={form.key('email')}
					type="email"
					{...form.getInputProps('email')}
					leftSection={
						<IconAt style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
					}
				/>

				<YearPickerInput
					disabled
					mt="sm"
					leftSection={iconCalendar}
					leftSectionPointerEvents="none"
					label="I was born in"
					minDate={new Date(1960, 1)}
					maxDate={new Date(2006, 1)}
					key={form.key('year')}
					{...form.getInputProps('year')}
				/>
				<MultiSelect
					required
					mt="sm"
					label="I can speak"
					data={supportedLanguages}
					key={form.key('languages')}
					{...form.getInputProps('languages')}
				/>

				<MultiSelect
					required
					mt="sm"
					label="I prefer to communicate via"
					data={['text', 'call', 'in-person']}
					key={form.key('communication')}
					{...form.getInputProps('communication')}
					onChange={(...args) => {
						if (!args[0].includes('in-person')) {
							form.setFieldValue('country', null);
						}
						form.getInputProps('communication').onChange(...args);
					}}
				/>
				{form.getInputProps('communication')?.value?.includes('in-person') && (
					<Select
						data={countriesList}
						searchable
						required
						mt="sm"
						label="I live in"
						key={form.key('country')}
						{...form.getInputProps('country')}
					/>
				)}

				<MultiSelectCreatable
					key={form.key('hobbies')}
					label="My interests and passions"
					additionalProps={form.getInputProps('hobbies')}
					defaultValue={form.getInputProps('hobbies').value}
					onChange={(val) => {
						form.getInputProps('hobbies').onChange(val);
					}}
					options={hobbiesList}
				/>

				<CustomTextArea
					form={form}
					name="goals_dreams"
					label="My goals and dreams"
					maxLength={maxCharsForTextAreas}
					height="100px"
				/>

				<CustomTextArea
					form={form}
					name="aboutme"
					label="About me"
					maxLength={maxCharsForTextAreas}
					height="150px"
				/>

				<SocialMediaInput
					form={form}
					label="My socials and contacts"
					name="socials"
				/>

				<Checkbox
					mt="xl"
					label="I agree to get emails from Friendore about connections and friends that are expiring"
					{...form.getInputProps('isAgreedToReceiveEmail', {
						type: 'checkbox',
					})}
				/>

				<Group
					justify="center"
					gap={lessThan530 ? '0' : 'xs'}
					className="mb-20 mt-10"
				>
					<button
						type="button"
						onClick={form.onSubmit(handleSubmit)}
						className="min-[530px]:max-w-[250px] min-[1024px]:max-w-[300px] w-full text-center font-semibold inline-block my-4 py-3 text-xl sm:text-2xl text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black rounded-full hover:border-white hover:bg-slate-500"
					>
						Save changes
					</button>
					<button
						onClick={openDeleteModal}
						type="button"
						className="min-[530px]:max-w-[250px] min-[1024px]:max-w-[300px] w-full text-center font-semibold  my-2 py-3  text-xl sm:text-2xl text-white transition-all duration-500 ease-in-out transform bg-red-600 border-2 border-red rounded-full hover:border-red hover:bg-red-400"
					>
						Delete profile
					</button>
				</Group>
			</form>
		</>
	);
}
