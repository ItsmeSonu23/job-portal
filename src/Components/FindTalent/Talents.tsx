import { Sort } from "../FindJobs/Sort"
import { TalentCard } from "./TalentCard"
import { useEffect, useState } from "react"
import { getAllProfiles } from "../../Services/ProfileService"
import { useSelector, useDispatch } from "react-redux"
import { resetFilter } from "../../Slices/FilterSlice"
import { resetSort } from "../../Slices/SortSlice"
/**
 * Talents Component
 * 
 * A component that displays a grid of talent cards with sorting functionality.
 * 
 * @component
 * 
 * Features:
 * - Displays a header with title and sort options
 * - Renders a responsive grid of TalentCard components
 * - Supports sorting of talent listings
 * - Flexible layout that adapts to different screen sizes
 * 
 * Layout:
 * - Outer padding of 28px (p-7)
 * - Header with flex justify-between
 * - Card grid with:
 *   - Top margin of 40px (mt-10)
 *   - Horizontal margin of 20px (mx-5)
 *   - Flex wrap for responsive layout
 *   - 40px gap between cards (gap-10)
 * 
 * Components:
 * 1. Header Section:
 *    - "Talents" title in 24px (text-2xl)
 *    - Sort component for filtering options
 *    - Semibold font weight for title
 * 
 * 2. Card Grid:
 *    - Maps through talents array
 *    - Renders TalentCard for each talent
 *    - Passes talent data as props
 *    - Unique key for each card
 * 
 * Styling:
 * - Clean typography with semibold title
 * - Consistent spacing using Tailwind classes
 * - Responsive flex-wrap layout for cards
 * - Even spacing between card elements
 * 
 * Dependencies:
 * - talents data array from Data.ts
 * - Sort component for filtering
 * - TalentCard component for individual profiles
 * 
 * @returns {JSX.Element} A grid layout of talent cards with header
 */
export const Talents = () => {
    const dispatch = useDispatch()
    const sort = useSelector((state: any) => state.sort)
    const [talents, setTalents] = useState<any>([])
    const filter = useSelector((state: any) => state.filter)
    const [filterTalents, setFilterTalents] = useState<any>([])
    useEffect(() => {
        dispatch(resetFilter())
        dispatch(resetSort())
        getAllProfiles().then((res) => {
            setTalents(res)
        }).catch((err: any) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {   
        if (sort=="Relevant") {
            setTalents([...talents].sort((a: any, b: any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime()))
        }
        if (sort=="Experience(Low to High)") {
            setTalents([...talents].sort((a: any, b: any) => a.totalExp - b.totalExp))
        }
        if (sort=="Experience(High to Low)") {
            setTalents([...talents].sort((a: any, b: any) => b.totalExp - a.totalExp))
        }
    }, [sort])

    useEffect(() => {
        let filterTalent = talents
        if (filter.name)
            filterTalent = filterTalent.filter((talent: any) => talent.name?.toLowerCase().includes(filter.name?.toLowerCase()))
        if (filter["Job Title"] && filter["Job Title"].length > 0) {
            filterTalent = filterTalent.filter((talent: any) => filter["Job Title"].some((job: any) => talent.jobTitle?.toLowerCase().includes(job.toLowerCase())))
        }
        if (filter["Location"] && filter["Location"].length > 0) {
            filterTalent = filterTalent.filter((talent: any) => filter["Location"].some((location: any) => talent.location?.toLowerCase().includes(location.toLowerCase())))
        }
        if (filter["Skills"] && filter["Skills"].length > 0) {
            filterTalent = filterTalent.filter((talent: any) => 
                talent.skills?.some((talentSkill: string) => 
                    filter["Skills"].some((skill: string) => talentSkill.toLowerCase().includes(skill.toLowerCase()))
                )
            );
        }
        if (filter.exp && filter.exp.length > 0) {
           filterTalent=filterTalent.filter((talent:any)=>filter.exp[0]<=talent.totalExp && filter.exp[1]>=talent.totalExp)
        }
        setFilterTalents(filterTalent)

    }, [filter, talents])
    return <div className="p-7">
        <div className="flex justify-between">
            <div className="text-2xl font-semibold">Talents</div>
            <Sort sort="talent" />
        </div>
        <div className="mt-10 mx-5 flex flex-wrap gap-10">
            {
                filterTalents.length ? filterTalents.map((talent: any) => <TalentCard key={talent.id} {...talent} />) : <div className="text-center text-2xl font-semibold">No Talents Found</div>
            }
        </div>
    </div>
}