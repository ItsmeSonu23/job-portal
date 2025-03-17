import { useState } from 'react';
import { Combobox, useCombobox } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateSort } from '../../Slices/SortSlice';

/**
 * Sort Component
 * 
 * A dropdown component that allows users to sort job listings by different criteria.
 * 
 * @component
 * 
 * Features:
 * - Dropdown menu with sort options
 * - Custom styled trigger button with icon
 * - Maintains selected sort option state
 * - Smooth open/close transitions
 * 
 * Sort Options:
 * - Relevant (default)
 * - Most Recent
 * - Salary (Low to High)
 * - Salary (High to Low)
 * 
 * State Management:
 * - selectedItem: Tracks currently selected sort option
 * - combobox: Mantine useCombobox hook for dropdown control
 * 
 * Styling:
 * - Electric violet border and icon color
 * - Rounded corners (xl)
 * - Small text size for options
 * - Flex layout with consistent spacing
 * - Custom cursor styles
 * 
 * Interactions:
 * - Click to toggle dropdown
 * - Select option to update sort and close dropdown
 * - Resets selected option on dropdown close
 * 
 * @returns {JSX.Element} A dropdown component for sorting options
 */
const opt = ['Relevant', 'Most Recent', 'Salary(Low to High)', 'Salary(High to Low)'];
const talentSort = ['Relevant', 'Experience(Low to High)', 'Experience(High to Low)'];

export const Sort = (props: any) => {
    const dispatch = useDispatch()
    const [selectedItem, setSelectedItem] = useState<string | null>("Relevent");
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options =props.sort=="job" ? opt.map((item) => (
        <Combobox.Option className='text-xs ' value={item} key={item}>
            {item}
        </Combobox.Option>
    )) : talentSort.map((item) => (
        <Combobox.Option className='text-xs ' value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    return (
        <>
            <Combobox
                store={combobox}
                width={150}
                position="bottom-start"
                onOptionSubmit={(val) => {
                    setSelectedItem(val);
                    dispatch(updateSort(val))
                    combobox.closeDropdown();
                }}
            >
                <Combobox.Target>
                    <div onClick={() => combobox.toggleDropdown()} className="border border-[var(--color-electric-violet-500)] text-sm max-xssm:text-xs gap-2 px-2 max-xssm:px-1 py-1 max-xssm:mt-2 max-xssm:py-0.5 rounded-xl flex items-center cursor-pointer">
                        {selectedItem} <IconAdjustments className='text-[var(--color-electric-violet-500)] h-5 w-5' />
                    </div>
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}