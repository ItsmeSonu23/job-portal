import { Tabs } from "@mantine/core"
import { Card } from "./Card"
import { useEffect, useState } from "react"
import { getAllJobs } from "../../Services/JobService"
import { useSelector } from "react-redux"

/**
 * JobHistory Component
 * 
 * A component that displays a user's job application history and saved jobs.
 * Uses tabs to organize different job statuses and renders job cards for each category.
 * 
 * @component
 * 
 * Features:
 * - Tab navigation between different job statuses (Applied, Saved, Offered, Interviewing)
 * - Dynamic filtering of jobs based on selected tab
 * - Job cards display with status-specific information
 * - Integration with Redux for user and profile state
 * - Real-time job list updates
 * 
 * State Management:
 * - activeTab: Current selected tab status
 * - jobList: Complete list of all jobs
 * - showList: Filtered list of jobs based on active tab
 * 
 * Data Flow:
 * 1. Fetches all jobs on component mount
 * 2. Filters jobs based on user's application status
 * 3. Updates displayed jobs when tab changes
 * 
 * Tab Categories:
 * - APPLIED: Jobs user has applied to
 * - SAVED: Jobs user has bookmarked
 * - OFFERED: Jobs with offers extended
 * - INTERVIEWING: Jobs in interview stage
 * 
 * Styling:
 * - Custom tab styling with Electric Violet accent
 * - Responsive flex wrap layout for job cards
 * - Consistent spacing and typography
 * 
 * @returns {JSX.Element} A tabbed interface showing job history
 */
export const JobHistory = () => {
    const profile = useSelector((state:any)=> state.profile)
    const user = useSelector((state:any)=> state.user)
    const[activeTab,setActiveTab] = useState<any>('APPLIED')
    const[jobList,setJobList] = useState<any>([])
    const[showList, setShowList] = useState<any>([])

    // Fetch all jobs on component mount
    useEffect(()=>{
        getAllJobs().then((res)=>{
            setJobList(res);
            // Initially filter for applied jobs
            setShowList(res.filter((job:any)=> job.applicants?.filter((applicant:any)=>
                applicant.applicantId==user.id && applicant.applicationStatus=="APPLIED"
            ).length>0))
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    /**
     * Handles tab change events and filters job list accordingly
     * @param {string|null} value - The new tab value
     */
    const handleTabChange=(value:string|null)=>{
        setActiveTab(value)
        if(value==="SAVED"){
            setShowList(jobList.filter((job:any)=>profile.savedJobs?.includes(job.id)))
        }else{
            setShowList(jobList.filter((job:any)=> job.applicants?.filter((applicant:any)=>
                applicant.applicantId==user.id && applicant.applicationStatus==value
            ).length>0))
        }
    }

    return (
        <div className="">
            <div className="text-2xl font-semibold mb-5">Job History</div>
            <div className="w-full">
                <Tabs value={activeTab} onChange={handleTabChange} variant="outline" radius="lg" defaultValue="applied">
                    <Tabs.List className="[&_button]:!text-lg mb-5 font-semibold [&_button[data-active='true']]:!text-[var(--color-electric-violet-500)] max-smsm:[&_button]:!text-lg max-xssm:[&_button]:!text-base max-xssm:[&_button]:!px-1.5 max-xssm:[&_button]:!font-medium max-xssm:[&_button]:!py-1.5 max-xsmm:[&_button]:!text-sm">
                        <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
                        <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
                        <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
                        <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={activeTab}>
                        <div className="w-full mx-5 mt-10 flex flex-wrap gap-5">
                            {
                                showList.map((job:any, index:any) => <Card key={index} {...job} {...{[activeTab.toLowerCase()]:true}}/>)
                            }
                        </div>
                    </Tabs.Panel>
                   
                </Tabs>
            </div>
        </div>
    )
}