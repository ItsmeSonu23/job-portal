import { Avatar, Divider, Tabs } from "@mantine/core"
import { IconBriefcase, IconMapPin } from "@tabler/icons-react"
import { AboutCom } from "./AboutCom"
import { CompanyJobs } from "./CompanyJobs"
import { CompanyEmpoyees } from "./CompanyEmployees"

/**
 * Company component displays a company's profile page with details and tabs for different sections
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.role - The role/position at the company
 * @param {string} props.company - The company name
 * @param {string} props.location - The company's location
 * 
 * @returns {JSX.Element} A company profile page with banner, logo, company details and tabbed sections
 */
export const Company = (props: any) => {
    return (
        <div className="w-3/4">
            {/* Banner and Logo Section */}
            <div className="relative">
                <img 
                    className="rounded-t-2xl" 
                    src="/Profile/Banner.png" 
                    alt="Company Banner" 
                />
                <img 
                    className="h-48 w-48 border-8 absolute -bottom-1/3 left-5 rounded-3xl bg-[var(--color-mine-shaft-950)] p-1 border-[var(--color-mine-shaft-950)]" 
                    src="/Icons/Microsoft.png" 
                    alt="Company Logo" 
                />
            </div>

            {/* Company Details and Tabs Section */}
            <div className="px-4 mt-20">
                {/* Company Name and Employee Avatars */}
                <div className="text-3xl font-semibold flex justify-between">
                    Microsoft
                    <Avatar.Group>
                        <Avatar src="/images/avatar.png" />
                        <Avatar src="/images/avatar-7.png" />
                        <Avatar src="/images/avatar-8.png" />
                        <Avatar>+10K</Avatar>
                    </Avatar.Group>
                </div>

                {/* Role and Company Info */}
                <div className="text-xl flex gap-1 items-center">
                    <IconBriefcase className="h-5 w-5" stroke={1.5} />
                    {props.role} &bull; {props.company}
                </div>

                {/* Location Info */}
                <div className="text-lg flex gap-1 items-center text-[var(--color-mine-shaft-400)]">
                    <IconMapPin className="h-5 w-5" stroke={1.5} />
                    {props.location}
                </div>

                <Divider mx="xs" my="xl" />

                {/* Tabbed Content Section */}
                <div className="">
                    <Tabs variant="outline" radius="lg" defaultValue="about">
                        <Tabs.List className="[&_button]:!text-lg mb-5 font-semibold [&_button[data-active='true']]:!text-[var(--color-electric-violet-500)]">
                            <Tabs.Tab value="about">About</Tabs.Tab>
                            <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                            <Tabs.Tab value="employees">Employees</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="about"><AboutCom/></Tabs.Panel>
                        <Tabs.Panel value="jobs"><CompanyJobs/></Tabs.Panel>
                        <Tabs.Panel value="employees"><CompanyEmpoyees/></Tabs.Panel>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}