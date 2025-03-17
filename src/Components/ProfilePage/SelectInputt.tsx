import { useEffect, useState } from 'react';
import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';

/**
 * SelectInputt Component
 * 
 * A custom select input component that combines combobox functionality with form integration.
 * Supports searching, creating new options, and form field binding.
 * 
 * @component
 * 
 * Features:
 * - Searchable dropdown with autocomplete
 * - Create new options on-the-fly
 * - Form integration with Mantine forms
 * - Custom left section icon support
 * - Scrollable dropdown with height limit
 * 
 * Props:
 * @param {Object} props - Component properties
 * @param {Object} props.form - Mantine form instance
 * @param {string} props.name - Form field name
 * @param {string[]} props.options - Array of available options
 * @param {Component} props.leftSection - Icon component for left section
 * @param {string} props.label - Input label text
 * @param {string} props.placeholder - Input placeholder text
 * 
 * State:
 * @property {string[]} data - Available options list
 * @property {string|null} value - Currently selected value
 * @property {string} search - Current search input value
 * 
 * Behaviors:
 * - Initializes with form field value
 * - Updates form on selection/creation
 * - Filters options based on search input
 * - Allows creating new options if no exact match
 * - Maintains scroll position in dropdown
 * 
 * @returns {JSX.Element} A custom select input component
 */
export const SelectInputt = (props: any) => {

    useEffect(() => {
        setData(props.options)
        setValue(props.form.getInputProps(props.name).value)
        setSearch(props.form.getInputProps(props.name).value)
    }, [])

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const exactOptionMatch = Array.isArray(data) && data.some((item) => item === search);
    const filteredOptions = Array.isArray(data) && exactOptionMatch
        ? data
        : Array.isArray(data) ? data.filter((item) => item?.toLowerCase().includes(search?.toLowerCase().trim())) : [];

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                if (val === '$create') {
                    setData((current) => [...current, search]);
                    setValue(search);
                    props.form.setFieldValue(props.name,search)
                } else {
                    setValue(val);
                    setSearch(val)
                    props.form.setFieldValue(props.name,val)
                }

                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase {...props.form.getInputProps(props.name)}
                    withAsterisk
                    leftSection={<props.leftSection stroke={1.5} />}
                    label={props.label}
                    rightSection={<Combobox.Chevron />}
                    value={search}
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || '');
                    }}
                    placeholder={props.placeholder}
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize mah={200} type="scroll">
                        {options}
                        {!exactOptionMatch && search?.trim()?.length > 0 && (
                            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
                        )}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}