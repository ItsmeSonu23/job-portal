import { Avatar, Rating } from "@mantine/core"
import { testimonials } from "../../Data/Data"

/**
 * Testimonials Component
 * 
 * A component that displays user testimonials and ratings in a grid layout.
 * Shows social proof through user feedback and experiences.
 * 
 * @component
 * 
 * Features:
 * - Grid display of user testimonials
 * - User avatar and name display
 * - Star rating system
 * - Individual testimonial cards with custom styling
 * 
 * Visual Elements:
 * - Large heading with accent colored "User"
 * - Avatar images for each testimonial
 * - Star rating display
 * - Bordered testimonial cards
 * 
 * Layout:
 * - Top margin of 80px (mt-20)
 * - Bottom padding of 20px (pb-5)
 * - Evenly spaced flex container
 * - 23% width cards with rounded borders
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Electric Violet accents for borders
 * - Consistent typography and spacing
 * - Custom avatar sizing
 * 
 * Card Features:
 * - User avatar (14x14 size)
 * - User name in large font
 * - Fractional star rating (readonly)
 * - Testimonial text in small font
 * 
 * Data Flow:
 * - Imports testimonials data from Data file
 * - Maps testimonial objects to card components
 * - Displays name, rating, and testimonial text
 * 
 * @returns {JSX.Element} A section displaying user testimonials
 */
export const Testimonials = () => {
    return <div className="mt-20 p-5">
        <div className="text-4xl  max-mdsm:text-3xl max-xssm:text-2xl max-smsm:text-3xl text-center font-semibold mb-5 text-[var(--color-mine-shaft-100)]">What <span className="text-[var(--color-electric-violet-500)]">User</span> says about us</div>
        <div className="flex justify-evenly max-mdsm:flex-wrap gap-5 mt-5">
            {
                testimonials.map((data, index) => {
                    return (
                        <div key={index} className="flex flex-col gap-3 w-[23%] max-mdsm:w-[48%] max-xssm:w-full border border-[var(--color-electric-violet-500)] p-3 rounded-xl ">
                            <div className="flex gap-2 items-center">
                                <Avatar className="!h-14 !w-14" src="images/avatar.png" />
                                <div className="">
                                    <div className="text-lg max-mdsm:text-base max-xssm:text-sm  text-[var(--color-mine-shaft-100)] font-semibold">{data.name}</div>
                                    <Rating value={data.rating} fractions={2} readOnly />
                                </div>
                            </div>
                            <div className="text-xs text-[var(--color-mine-shaft-100)] ">
                                {data.testimonial}
                            </div>
                        </div>
                    )
                })
            }
        </div>

    </div>
}