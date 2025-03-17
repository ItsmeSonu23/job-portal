import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react"
import { TbCloverFilled } from "react-icons/tb"
import { useLocation } from "react-router-dom"
import { footerLinks } from "../../Data/Data"

/**
 * Footer Component
 * 
 * A responsive footer component that displays company information and navigation links.
 * 
 * @component
 * 
 * Features:
 * - Company branding section with logo and description
 * - Social media links with hover effects
 * - Multiple columns of footer links from footerLinks data
 * - Conditional rendering based on current route
 * - Smooth hover animations
 * 
 * Layout:
 * - Top padding: 80px (pt-20)
 * - Bottom padding: 40px (pb-10)
 * - Flex container with gap and even spacing
 * - Left section takes 25% width (w-1/4)
 * 
 * Sections:
 * 1. Company Section:
 *    - Logo with Clover icon
 *    - Company name in Electric Violet
 *    - Description text
 *    - Social media icons with hover effects
 * 
 * 2. Link Columns:
 *    - Dynamic rendering from footerLinks data
 *    - Column title in Electric Violet
 *    - Links with hover effects:
 *      - Color change to Electric Violet
 *      - Slight rightward translation
 *      - Smooth transition
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Electric Violet accents
 * - Karla font family
 * - Consistent text sizes and spacing
 * - Interactive hover states
 * 
 * Conditional Rendering:
 * - Hidden on signup and login routes
 * - Visible on all other routes
 * 
 * State Management:
 * - Uses useLocation hook to determine current route
 * - Conditionally renders based on pathname
 * 
 * @returns {JSX.Element} A footer component or empty fragment based on route
 */
export const Footer = () => {
    const location = useLocation()
    return location.pathname != "/signup" &&  location.pathname != "/login"  ? <div className="pt-20 p-4 pb-10 bg-[var(--color-mine-shaft-950)] flex gap-8 justify-around font-['Karla'] flex-wrap">
        <div className="w-1/4 max-smsm:w-1/3 max-xssm:w-1/2 max-xsmm:w-full p-5 flex flex-col gap-4">
            <div className="flex gap-1 items-center text-[var(--color-electric-violet-500)]">
                <TbCloverFilled className="text-3xl" />
                <div className="text-3xl font-semibold">
                    Clover
                </div>
            </div>
            <div className="text-sm text-[var(--color-mine-shaft-300)]">
                Job portal with user profiles, skill updates, certifications, work expirience and admin job postings.
            </div>
            <div className=" flex gap-3 text-[var(--color-electric-violet-500)] [&>div]:bg-[var(--color-mine-shaft-900)] [&>div]:p-2 [&>div]:rounded-full [&>div]:cursor-pointer hover:[&>div]:bg-[var(--color-mine-shaft-700)]">
                <div className=""><IconBrandFacebook /></div>
                <div className=""><IconBrandInstagram /></div>
                <div className=""><IconBrandX /></div>
            </div>
        </div>
        {
            footerLinks.map((items, index) => {
                return (
                    <div key={index}>
                        <div className="text-lg font-semibold mb-4 text-[var(--color-electric-violet-500)]">{items.title}</div>
                        {
                            items.link.map((links, index) => {
                                return (
                                    <div className="text-[var(--color-mine-shaft-300)] text-sm hover:text-[var(--color-electric-violet-500)] cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out" key={index}>
                                        {links}
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            })
        }
    </div> : <></>
}