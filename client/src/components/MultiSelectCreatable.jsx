import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import {
	Group,
	CheckIcon,
	Combobox,
	Pill,
	PillsInput,
	useCombobox,
	rem
} from '@mantine/core';
import {
	IconPlus
} from '@tabler/icons-react';

export function MultiSelectCreatable({
	defaultValue,
	onChange,
	additionalProps,
	label,
	options,
	description,
}) {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
		onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
	});

	const [search, setSearch] = useState('');
	const [value, setValue] = useState(defaultValue);
	const [data, setData] = useState(options);

	useEffect(() => {
		onChange(value);
	}, [value]);

	const exactOptionMatch = data.some((item) => item === search);

	const handleValueSelect = (val) => {
		setSearch('');

		if (val === '$create') {
			setData((current) => [...current, search]);
			setValue((current) => [...current, search]);
		} else {
			setValue((current) =>
				current.includes(val)
					? current.filter((v) => v !== val)
					: [...current, val]
			);
		}
	};

	const handleValueRemove = (val) => {
		setValue((current) => current.filter((v) => v !== val));
		setData((current) => current.filter((v) => v !== val));
	};

	const values = value.map((item) => (
		<Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
			{item}
		</Pill>
	));

	const readyOptions = data
		.filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
		.map((item) => (
			<Combobox.Option value={item} key={item} active={value.includes(item)}>
				<Group gap="sm">
					{value.includes(item) ? <CheckIcon size={12} /> : null}
					<span>{item}</span>
				</Group>
			</Combobox.Option>
		));

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={handleValueSelect}
			withinPortal={false}
			mt="sm"
			withAsterisk
			description={description}
		>
			<Combobox.DropdownTarget>
				<PillsInput
					{...additionalProps}
					onClick={() => combobox.openDropdown()}
					label={label}
				>
					<Pill.Group>
						{values}

						<Combobox.EventsTarget>
							<PillsInput.Field
								onFocus={() => combobox.openDropdown()}
								onBlur={() => combobox.closeDropdown()}
								value={search}
								placeholder={
									value.length === 0 ? 'Select options or create your own' : ''
								}
								onChange={(event) => {
									combobox.updateSelectedOptionIndex();
									if (event.currentTarget.value?.length < 70){
										setSearch(event.currentTarget.value);

									}
								}}
								onKeyDown={(event) => {
									if (event.key === 'Backspace' && search.length === 0) {
										event.preventDefault();
										handleValueRemove(value[value.length - 1]);
									}
								}}
							/>
						</Combobox.EventsTarget>
					</Pill.Group>
				</PillsInput>
			</Combobox.DropdownTarget>

			<Combobox.Dropdown className="max-h-[230px] overflow-x-scroll">
				<Combobox.Options>
					{readyOptions}

					{!exactOptionMatch && search.trim().length > 0 && (
						<Combobox.Option value="$create" className="flex items-center"><IconPlus style={{ width: rem(18), height: rem(18) }} stroke={1.5}/> &nbsp; {search}</Combobox.Option>
					)}

					{exactOptionMatch &&
						search.trim().length > 0 &&
						readyOptions.length === 0 && (
							<Combobox.Empty>Nothing found</Combobox.Empty>
						)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
