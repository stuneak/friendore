import React from 'react';
import { useForm } from '@mantine/form';
import {
	TextInput,
	PasswordInput,
	Group,
	Button,
	Divider,
	Stack,
	rem,
} from '@mantine/core';
import { IconAt, IconLock } from '@tabler/icons-react';
import { loginGoogleURL } from '../config';

function GoogleIcon(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid"
			viewBox="0 0 256 262"
			style={{ width: '0.9rem', height: '0.9rem' }}
			{...props}
		>
			<path
				fill="#4285F4"
				d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
			/>
			<path
				fill="#34A853"
				d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
			/>
			<path
				fill="#FBBC05"
				d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
			/>
			<path
				fill="#EB4335"
				d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
			/>
		</svg>
	);
}

export function GoogleButton(props) {
	return <Button leftSection={<GoogleIcon />} variant="default" {...props} />;
}

export function AuthenticationForm({ logInLocal }) {
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},

		validate: {
			email: (value) => {
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
			password: (value) => {
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
		},
	});

	const handleSubmit = () => {
		const values = form.getValues();

		logInLocal(values);
	};

	return (
		<>
			<Group mb="md" justify="center">
				<a
					href={loginGoogleURL}
					type="button"
					className="flex justify-center items-center gap-3 text-center font-semibold inline-block p-1 pr-4  transition-all duration-500 ease-in-out transform bg-black border-2 border-black rounded-full hover:border-white hover:bg-slate-500"
				>
					<div className="flex items-center justify-center bg-white w-9 h-9 rounded-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							className="w-5 h-5"
						>
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
					<span className="text-lg text-white tracking-wider">
						Log in with Google
					</span>
				</a>
			</Group>

			<Divider
				label="Or continue with email and password"
				labelPosition="center"
				my="lg"
			/>

			<form onSubmit={() => {}}>
				<Stack>
					<TextInput
						leftSection={
							<IconAt
								style={{ width: rem(18), height: rem(18) }}
								stroke={1.5}
							/>
						}
						required
						label="Email"
						placeholder="example@mail.com"
						radius="md"
						key={form.key('email')}
						{...form.getInputProps('email')}
					/>

					<PasswordInput
						leftSection={
							<IconLock
								style={{ width: rem(18), height: rem(18) }}
								stroke={1.5}
							/>
						}
						required
						label="Password"
						placeholder="your password"
						radius="md"
						key={form.key('password')}
						{...form.getInputProps('password')}
					/>
				</Stack>

				<Group justify="center" mt="xl">
					<button
						type="submit"
						onClick={form.onSubmit(handleSubmit)}
						className="min-w-[170px] text-center font-semibold inline-block px-6 py-2 text-lg text-white transition-all duration-500 ease-in-out transform bg-black border-2 border-black rounded-full hover:border-white hover:bg-slate-500"
					>
						Log in
					</button>
				</Group>
			</form>
		</>
	);
}
