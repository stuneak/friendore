import React from 'react';
import { Textarea, InputError, InputDescription } from '@mantine/core';

export function CustomTextArea({
	form,
	name,
	label,
	description,
	maxLength,
	height,
	...restProps
}) {
	return (
		<div>
			<Textarea
				resize="vertical"
				mt="sm"
				required
				label={label}
				key={form.key(name)}
				description={description}
				{...(() => {
					const { error, ...rest } = form.getInputProps(name);

					const obj = {
						styles: { input: { height: height || '200px' } },
						...rest,
					};

					if (error) {
						obj.styles.input.borderColor = 'red';
					}
					return obj;
				})()}
				{...restProps}
			/>
			<div className="margin-top-text-fields">
				{form.getInputProps(name).error && (
					<InputError>{form.getInputProps(name).error}</InputError>
				)}
				{!form.getInputProps(name).error && (
					<div className="margin-top-text-fields-desc">
						<InputDescription>
							{form.getInputProps(name)?.value?.length || 0}/{maxLength}
						</InputDescription>
					</div>
				)}
			</div>
		</div>
	);
}
