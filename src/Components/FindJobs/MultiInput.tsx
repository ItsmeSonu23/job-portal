import { useEffect, useState } from 'react';
import { Checkbox, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../Slices/FilterSlice';
/**
 * MultiInput Component
 * 
 * A customizable multi-select input component with search, create, and remove functionality.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string[]} props.options - Array of selectable options
 * @param {string} props.title - Placeholder text when no items are selected
 * @param {Component} props.icon - Icon component to display on the left side
 * 
 * Features:
 * - Multi-select functionality with checkbox options
 * - Search filtering of available options
 * - Create new options on-the-fly
 * - Remove selected items
 * - Shows count of additional selected items beyond first
 * - Custom styling with Mine Shaft color palette
 * 
 * State Management:
 * - search: Tracks current search input
 * - data: Available options list
 * - value: Currently selected items
 * 
 * Key Functions:
 * - handleValueSelect: Handles selection of existing items or creation of new ones
 * - createNewItem: Adds new items to both data and selected values
 * - toggleItemSelection: Toggles selection state of items
 * - handleValueRemove: Removes items from selection
 * 
 * UI Components:
 * - PillsInput: Main input container with custom styling
 * - Combobox: Dropdown menu with search and options
 * - Checkbox: Selection indicator for each option
 * - Pill: Display selected items and count
 * 
 * Styling:
 * - Uses Mine Shaft color variables for dark theme
 * - Custom styling for placeholder text and icons
 * - Purple accent colors for interactive elements
 * 
 * @returns {JSX.Element} A multi-select input component with dropdown
 */
export const MultiInput = (props:any) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        setData(props.options)
    },[])
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const [search, setSearch] = useState('');
    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string[]>([]);

    const exactOptionMatch = data.some((item) => item === search);

    const handleValueSelect = (val: string) => {
        setSearch('');

        if (val === '$create') {
            createNewItem(search);
            dispatch(updateFilter({[props.title]:[...value,search]}))
        } else {
            dispatch(updateFilter({[props.title]:value.includes(val)?value.filter((v:any)=>v!==val):[...value,val]}))
            toggleItemSelection(val);
        }
    };

    const createNewItem = (item: string) => {
        setData((current) => [...current, item]);
        setValue((current) => [...current, item]);
    };

    const toggleItemSelection = (item: string) => {
        setValue((current) =>
            current.includes(item) ? current.filter((v) => v !== item) : [...current, item]
        );
    };

    const handleValueRemove = (val: string) =>{
        dispatch(updateFilter({[props.title]:value.filter((v:any)=>v!==val)}))
        setValue((current) => current.filter((v) => v !== val));
    }


    const values = value
        .slice(0, 1)
        .map((item) => (
            <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
                {item}
            </Pill>
        ));

    const options = data
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
        <Combobox.Option value={item} key={item} active={value.includes(item)}>
            <Group gap="sm">
                <Checkbox
                    size="xs"
                    color="darkorchid"
                    checked={value.includes(item)}
                    onChange={() => toggleItemSelection(item)}
                    aria-hidden
                    tabIndex={-1}
                    style={{ pointerEvents: 'none' }}
                />
                <span className='text-[var(--color-mine-shaft-300)]'>{item}</span>
            </Group>
        </Combobox.Option>
    ));

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
            <Combobox.DropdownTarget>
                <PillsInput
                    variant="unstyled"
                    rightSection={<IconSelector />}
                    onClick={() => combobox.toggleDropdown()}
                    leftSection={
                        <div className="text-[var(--color-electric-violet-500)] p-1 bg-[var(--color-mine-shaft-900)] rounded-full mr-2">
                           {<props.icon/>}
                        </div>
                    }
                >
                    <Pill.Group>
                        {value.length > 0 ? (
                            <>
                                {values}
                                {value.length > 1 && <Pill>+{value.length - 1} more</Pill>}
                            </>
                        ) : (
                            <Input.Placeholder className='!text-[var(--color-mine-shaft-200)]'>{props.title}</Input.Placeholder>
                        )}
                       
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <Combobox.Search
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    placeholder="Search"
                />
                <Combobox.Options>
                    {options}

                    {!exactOptionMatch && search.trim().length > 0 && (
                        <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
                    )}

                    {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
                        <Combobox.Empty>Nothing found</Combobox.Empty>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};
