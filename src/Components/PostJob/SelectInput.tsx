import { useEffect, useState } from 'react';
import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';

/**
 * SelectInput Component
 * 
 * A customizable combobox component that allows both selection from predefined options
 * and creation of new options. Integrates with Mantine form handling.
 * 
 * @component
 * 
 * Features:
 * - Searchable dropdown with filtered options
 * - Create new options on-the-fly
 * - Form integration with validation
 * - Scrollable options list
 * - Maintains selected value state
 * 
 * Visual Elements:
 * - Input field with asterisk for required fields
 * - Dropdown chevron indicator
 * - Scrollable dropdown menu
 * - "Create new" option when no exact match
 * 
 * Props:
 * @param {Object} props - Component properties
 * @param {Object} props.form - Mantine form instance
 * @param {string} props.name - Form field name
 * @param {string[]} props.options - Array of selectable options
 * @param {string} props.label - Input label text
 * @param {string} props.placeholder - Input placeholder text
 * 
 * State:
 * @property {string[]} data - Available options including newly created ones
 * @property {string|null} value - Currently selected value
 * @property {string} search - Current search input text
 * 
 * Behavior:
 * - Filters options based on search text
 * - Allows creating new options if no exact match exists
 * - Updates form value on selection/creation
 * - Maintains search text while dropdown is open
 * - Resets to selected value on blur
 * 
 * @returns {JSX.Element} A searchable select input with creation capability
 */
export const SelectInput = (props: any) => {

    useEffect(() => {
        setData(props.options)
        setValue(props.form.getInputProps(props.name).value)
        setSearch(props.form.getInputProps(props.name).value)
    }, [props])

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const exactOptionMatch = data.some((item) => item === search);
    const filteredOptions = exactOptionMatch
        ? data
        : data.filter((item) => item.toLowerCase().includes(search?.toLowerCase().trim()));

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
                    setSearch(val);
                    props.form.setFieldValue(props.name,val)
                }

                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase withAsterisk {...props.form.getInputProps(props.name)}
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
                        {!exactOptionMatch && search?.trim().length > 0 && (
                            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
                        )}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}