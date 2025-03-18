import { Carousel } from '@mantine/carousel'
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { jobCategory } from '../../Data/Data';

/**
 * JobCategory Component
 * 
 * A carousel component that displays different job categories with their details
 * and allows users to browse through them.
 * 
 * @component
 * 
 * Features:
 * - Infinite loop carousel of job categories
 * - Custom navigation arrows that appear on hover
 * - Interactive category cards with hover effects
 * - Visual representation of each category with icons
 * - Job count display for each category
 * 
 * Visual Elements:
 * - Section heading with accent colored "Job" text
 * - Descriptive subheading with centered alignment
 * - Category cards with:
 *   - Icon in circular purple background
 *   - Category name in large font
 *   - Category description
 *   - Number of available jobs
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Electric Violet accents for emphasis
 * - Hover effects with purple glow on cards
 * - Custom carousel navigation buttons
 * - Consistent spacing and typography
 * 
 * Layout:
 * - Top margin of 80px (mt-20)
 * - Bottom padding of 20px (pb-5)
 * - Centered content alignment
 * - 20% slide width with medium gaps
 * 
 * Carousel Features:
 * - Infinite loop scrolling
 * - Navigation arrows visible on hover
 * - Smooth transitions
 * - Custom arrow icons
 * 
 * Data Flow:
 * - Imports jobCategory data from Data file
 * - Maps categories to carousel slides
 * - Dynamically generates image paths
 * 
 * @returns {JSX.Element} A carousel section displaying job categories
 */
export const JobCategory = () => {
    return (
        <div className="mt-20 pb-5">
            <div className="text-4xl max-mdsm:text-3xl max-xssm:text-2xl max-smsm:text-3xl  text-center font-semibold text-[var(--color-mine-shaft-100)]">Browse <span className="text-[var(--color-electric-violet-500)]">Job</span> Categories</div>
            <div className="text-lg max-mdsm:text-base max-xssm:text-sm max-smsm:text-base mb-10 text-center w-1/2 mx-auto max-smsm:w-11/12 text-[var(--color-mine-shaft-300)]">Explore diverse job opportunities tailored to your skills . Start your career journey today!</div>
            <Carousel slideSize="20%" slideGap="md" loop
                className='[&_button]:!bg-[var(--color-electric-violet-500)] 
                [&_button]:!border-none 
                [&_button]:opacity-0 
                [&_button]:visibility-hidden 
                hover:[&_button]:opacity-100 
                hover:[&_button]:visibility-visible 
                [&_button]:transition-opacity duration-300'
                nextControlIcon={<IconArrowRight className="h-8 w-8" />}
                previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
            >
                {
                    jobCategory.map((category, index) => <Carousel.Slide key={index}>

                        <div className="flex flex-col items-center w-64 gap-2 border border-[var(--color-electric-violet-500)] p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_darkorchid] my-5">
                            <div className="p-2 bg-[var(--color-electric-violet-500)] rounded-full">
                                <img className="h-8 w-8" src={`Categories/${category.name}.png`} alt={category.name} />
                            </div>
                            <div className="text-[var(--color-mine-shaft-100)] text-xl max-smsm:text-lg max-xssm:text-base font-semibold">{category.name}</div>
                            <div className="text-[var(--color-mine-shaft-300)] text-sm max-smsm:text-sm max-xssm:text-base text-center">{category.desc}</div>
                            <div className="text-[var(--color-electric-violet-400)] text-lg max-smsm:text-lg max-xssm:text-base">{category.jobs}+ new jobs posted</div>
                        </div>

                    </Carousel.Slide>)
                }
            </Carousel>

        </div>
    )
}