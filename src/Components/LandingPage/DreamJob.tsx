import { Avatar, TextInput } from "@mantine/core"
import { CiSearch } from "react-icons/ci"

/**
 * DreamJob Component
 * 
 * The hero section component for the landing page that showcases job search functionality
 * and engagement metrics.
 * 
 * @component
 * 
 * Features:
 * - Job search interface with title and type filters
 * - Interactive search button
 * - Engaging hero image with floating cards
 * - User engagement metrics display
 * - Company job posting preview
 * 
 * Visual Elements:
 * - Large heading with accent colored words
 * - Search input fields with dark theme styling
 * - Circular search button with hover effect
 * - Hero image with overlaid floating cards
 * - Avatar group showing user engagement
 * - Company card with job posting details
 * 
 * Layout:
 * - Two-column layout (45% left, 55% right)
 * - Horizontal padding of 80px (px-20)
 * - Centered content alignment
 * - Floating cards with absolute positioning
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Electric Violet accents for emphasis
 * - Backdrop blur effects on floating cards
 * - Consistent spacing and typography
 * - Interactive hover states
 * 
 * Search Interface:
 * - Job Title input field
 * - Job Type input field
 * - Circular search button with icon
 * 
 * Engagement Display:
 * - "10K+ got jobs" metric
 * - Avatar group showing recent placements
 * - Additional count indicator
 * 
 * Job Preview Card:
 * - Company logo in dark container
 * - Job title and location
 * - Posting age and applicant count
 * 
 * @returns {JSX.Element} The hero section of the landing page
 */
export const DreamJob = () => {
    return (
        // landing page section 1 of the home page of the website
        <div className="flex items-center max-smsm:flex-col px-20 max-bssm:px-10 max-mdsm:px-5">
            <div className="flex flex-col w-[45%] max-smsm:w-full">
                <div className="text-7xl font-bold text-[var(--color-mine-shaft-100)] [&>span]:text-[var(--color-electric-violet-500)] max-bssm:text-6xl max-mdsm:text-5xl max-smsm:text-4xl">Find your <span>dream</span> <span>job</span> with us</div>
                <div className="text-lg max-mdsm:text-base max-xssm:text-sm text-[var(--color-mine-shaft-200)] my-3">Good life begins with a good company. Start explore thousand of jobs in one place</div>
                <div className="flex gap-3 items-center mt-3">
                    <TextInput className="bg-[var(--color-mine-shaft-700)] rounded-lg py-1 px-2 text-[var(--color-mine-shaft-100)] [&_input]:!text-[var(--color-mine-shaft-100)]"
                        variant="unstyled"
                        label="Job Title"
                        placeholder="Software Engineer"
                    />
                    <TextInput className="bg-[var(--color-mine-shaft-700)] rounded-lg py-1 px-2 text-[var(--color-mine-shaft-100)] [&_input]:!text-[var(--color-mine-shaft-100)]"
                        variant="unstyled"
                        label="Job Type"
                        placeholder="Full Time"
                    />
                    <div className="flex items-center justify-center h-full w-20 bg-[var(--color-electric-violet-500)] text-[var(--color-mine-shaft-100)] rounded-lg p-1 hover:bg-[var(--color-electric-violet-600)]">
                        <CiSearch className="h-[85%] w-[85%]" />

                    </div>
                </div>
            </div>
            <div className="w-[55%] max-smsm:w-full flex items-center justify-center">
                <div className="w-[28rem] relative ">
                    <img src="images/AvatarHome.png" alt="Its Homepage avatar" />
                    <div className="absolute -right-15 max-bssm:-right-0 max-xssm:top-[10%]  top-[50%] w-fit border border-[var(--color-electric-violet-500)] max-xssm:-left-5 rounded-lg p-2 backdrop-blur-md">
                        <div className="text-center text-[var(--color-mine-shaft-100)] mb-1 text-sm">10K+ got jobs</div>
                        <Avatar.Group>
                            <Avatar src="images/avatar.png" />
                            <Avatar src="images/avatar-7.png" />
                            <Avatar src="images/avatar-8.png" />
                            <Avatar>+9K</Avatar>
                        </Avatar.Group>
                    </div>
                    <div className="absolute xs:-left-5 max-bssm:top-[35%] max-xssm:top-[60%] top-[25%] w-fit border border-[var(--color-electric-violet-500)] max-xssm:-right-5 rounded-lg p-2 backdrop-blur-md flex gap-3 flex-col ">
                        <div className="flex gap-2 items-center">
                            <div className="w-10 h-10 p-1 bg-[var(--color-mine-shaft-900)] rounded-lg">
                                <img src="images/google.png" alt="" />
                            </div>
                            <div className="text-sm text-[var(--color-mine-shaft-100)]">
                                <div>Software Engineer</div>
                                <div className="text-[var(--color-mine-shaft-300)] text-xs ">Jaipur</div>
                            </div>
                        </div>
                        <div className="flex gap-2 text-[var(--color-mine-shaft-300)] justify-between text-xs">
                            <span>1 day ago</span><span>120 Applicants</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}