import Marquee from "react-fast-marquee"
import { companies } from "../../Data/Data"

/**
 * Companies Component
 * 
 * A component that displays a scrolling marquee of company logos to showcase companies
 * that trust and use the platform.
 * 
 * @component
 * 
 * Features:
 * - Auto-scrolling marquee of company logos
 * - Pause on hover functionality
 * - Interactive logo cards with hover effects
 * - Responsive layout and sizing
 * 
 * Visual Elements:
 * - Large heading with accent colored number
 * - Horizontally scrolling company logos
 * - Hover effects on logo containers
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Electric Violet accent for emphasis
 * - Consistent spacing and typography
 * - Hover background effects on logo cards
 * 
 * Layout:
 * - Top margin of 80px (mt-20)
 * - Bottom padding of 20px (pb-5)
 * - Centered text alignment
 * - Horizontal spacing between logos (mx-8)
 * 
 * Data Flow:
 * - Imports company names from Data file
 * - Maps company names to logo images
 * - Dynamically generates image paths
 * 
 * Props: None
 * 
 * Dependencies:
 * - react-fast-marquee for scrolling effect
 * - companies array from Data file
 * 
 * @returns {JSX.Element} A marquee section displaying company logos
 */
export const Companies = () => {
    return <div className="mt-20 pb-5">
        <div className="text-4xl max-mdsm:text-3xl max-xssm:text-2xl max-smsm:text-3xl font-semibold text-[var(--color-mine-shaft-100)] text-center mb-10">Trusted By <span className="text-[var(--color-electric-violet-500)]">1000+</span> Companies</div>
        <Marquee pauseOnHover={true}>
            {
              companies.map((company,index)=>{
                    return(
                        <div key={index} className=" mx-8 max-smsm:mx-4 max-xssm:mx-2   px-2 py-1 hover:bg-[var(--color-mine-shaft-900)] rounded-xl cursor-pointer">
                            <img className="h-14 max-xssm:h-10" src={`/Companies/${company}.png`} alt={company} />
                        </div>
                    )
              })
            }
            
        </Marquee>
    </div>
}