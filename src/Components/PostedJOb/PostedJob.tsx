import { Tabs } from "@mantine/core"
import { PostedJobCard } from "./PostedJobCard"
import { useEffect, useState } from "react"

/**
 * PostedJob Component
 * 
 * A component that displays and manages a list of jobs posted by the user, organized by their status.
 * Uses a tabbed interface to filter between Active and Draft job listings.
 * 
 * @component
 * 
 * Features:
 * - Tab navigation between Active and Draft job statuses
 * - Dynamic job count indicators for each status
 * - Automatic tab selection based on selected job
 * - Filtered job card display based on status
 * - Responsive layout with consistent spacing
 * 
 * Visual Elements:
 * - "Jobs" heading in large font
 * - Pill-style tab navigation
 * - Job count badges in tab labels
 * - Vertically stacked job cards
 * 
 * Layout:
 * - 1/6 width container (w-1/6)
 * - Top margin of 20px (mt-5)
 * - Vertical spacing between cards (gap-5)
 * - Bottom margin below heading (mb-5)
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Custom tab styling for unselected state
 * - Medium font weight for tab labels
 * - Consistent spacing and typography
 * 
 * Props:
 * @param {Object} props - Component properties
 * @param {Object} [props.job] - Currently selected job object
 * @param {string} [props.job.jobStatus] - Status of the selected job ('ACTIVE' or 'DRAFT')
 * @param {Array<Object>} [props.jobList] - Array of job objects to display
 * 
 * State:
 * @property {string|null} activeTab - Currently selected tab/job status
 * 
 * Data Flow:
 * - Updates active tab when selected job changes
 * - Filters job list based on active tab
 * - Calculates job counts for each status
 * - Passes job data to PostedJobCard components
 * 
 * Dependencies:
 * - @mantine/core for Tabs component
 * - PostedJobCard for individual job display
 * - React hooks (useState, useEffect)
 * 
 * @returns {JSX.Element} A tabbed interface displaying filtered job listings
 */
export const PostedJob = (props: any) => {
    const [activeTab, setActiveTab] = useState<string | null>('ACTIVE')
    
    // Set active tab based on selected job status or default to 'ACTIVE'
    useEffect(() => {      
        if (props.job?.jobStatus) {
            setActiveTab(props.job?.jobStatus);
        } else {
            setActiveTab('ACTIVE');
        }
    }, [props.job]);

    // Calculate job counts for each status
    const activeJobCount = props.jobList?.filter((job: any) => job?.jobStatus === 'ACTIVE').length || 0;
    const draftJobCount = props.jobList?.filter((job: any) => job?.jobStatus === 'DRAFT').length || 0;
    const closedJobCount = props.jobList?.filter((job: any) => job?.jobStatus === 'CLOSED').length || 0;

    return (
        <div className="w-1/5 max-mdsm:w-full mt-5">
            <div className="text-2xl font-semibold mb-5">Jobs</div>
            <div className="">
                {/* Tabbed navigation for job status filtering */}
                <Tabs autoContrast variant="pills" value={activeTab} onChange={setActiveTab}>
                    <Tabs.List className="[&_button[aria-selected='false']]:bg-[var(--color-mine-shaft-900)] font-medium">
                        <Tabs.Tab value="ACTIVE">Active [{activeJobCount}]</Tabs.Tab>
                        <Tabs.Tab value="DRAFT">Draft [{draftJobCount}]</Tabs.Tab>
                        <Tabs.Tab value="CLOSED">Closed [{closedJobCount}]</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
                {/* Container for filtered job cards */}
                <div className="flex flex-col gap-5 mt-5">
                    {
                        props.jobList?.filter((job: any) => job?.jobStatus === activeTab).map((item: any, index: any) => <PostedJobCard key={index} {...item} />)
                    }
                </div>
            </div>
        </div>
    )
}