import React, { useEffect } from 'react';
import {
	TextInput,
	rem,
	InputError,
} from '@mantine/core';

import {

	IconSocial,
} from '@tabler/icons-react';

export const socialMediaInputValidation = {
	key: (key, obj) => {
		const findIndex = obj.socials.findIndex(
			(social) => social.key === key
		);
		const findValue = obj.socials.find((social) => social.key === key);
		const lastIndex = obj.socials[obj.socials.length - 2];
		
		if (findValue.value.length > 100) {
			return 'it should be less than 100 characters';
		}

		if (findIndex === 0 && findValue.value.length < 1) {
			return 'Please share your socials & contacts';
		}

		if (lastIndex.key === key && obj.socials.length >= 10) {
			return 'You can add up to 10 socials & contacts';
		}

		return null;
	},
}

export function SocialMediaInput({
	form,
	name,
	label,
	description,
}) {
    useEffect(() => {
		let socialValues = form
			.getValues()
			[name].map((social) => ({ value: social.value, key: social.key }));
		let changed = false;

		console.log('social media links are working fine');

		// initial value
		if (socialValues.length === 0) {
			changed = true;
			socialValues = [{ value: '', key: `${Math.random()}` }, ...socialValues];
		}

		// last value should always be empty
		if (socialValues[socialValues.length - 1]?.value.length > 0) {
			changed = true;
			socialValues = [...socialValues, { value: '', key: `${Math.random()}` }];
		}

		// delete all intermediate empty values
		for (let i = 0; i < socialValues.length; i++) {
			if (
				socialValues[i]?.value === '' &&
				i !== 0 &&
				i !== socialValues.length - 1
			) {
				changed = true;
				socialValues.splice(i, 1);
			}
		}

		// delete first empty value if there's more than one
		if (socialValues[0]?.value === '' && socialValues.length > 1) {
			changed = true;
			socialValues.splice(0, 1);
		}

		if (changed) {
			form.setFieldValue(name, socialValues);
		}
	}, [
		form
			.getValues()
			[name].map((social) => social.value)
			.join(', '),
	]);

	const onChangeSocials = (value, index) => {
		const socials = form
			.getInputProps(name)
			?.value.map((social) => ({ value: social.value, key: social.key }));
		socials.forEach((_, i) => {
			form.clearFieldError(`${name}.${i}.key`);
		});

		socials[index].value = value;
		form.getInputProps(name).onChange(socials);
	};
    
	return (
		<div>
			{form.getInputProps(name)?.value.map((social, index) => (
				<TextInput
					{...(() => {
						const obj = {
							label,
							description
						};

						if (index === 0) {
							return obj;
						}

						return {};
					})()}
					mt="sm"
					key={form.key(`${name}.${index}.key`)}
					{...form.getInputProps(`${name}.${index}.value`)}
					error={form.getInputProps(`${name}.${index}.key`).error}
					onChange={(event) => {
						onChangeSocials(event.currentTarget.value, index);
					}}
					leftSection={
						<IconSocial
							style={{ width: rem(18), height: rem(18) }}
							stroke={1.5}
						/>
					}
				/>
			))}

			<div className="margin-top-text-fields">
				{form.getInputProps(name).error && (
					<InputError>{form.getInputProps(name).error}</InputError>
				)}
			</div>
		</div>
	);
}
