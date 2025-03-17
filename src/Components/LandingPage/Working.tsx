import { Avatar } from "@mantine/core"
import { work } from "../../Data/Data"

/**
 * Working Component
 * 
 * A component that illustrates the job search process through visual steps and an
 * interactive profile completion card.
 * 
 * @component
 * 
 * Features:
 * - Step-by-step process visualization
 * - Profile completion card with avatar
 * - Animated illustration
 * - Progress indicators
 * 
 * Visual Elements:
 * - Large heading with accent colored "Works"
 * - Descriptive subheading
 * - Girl illustration with floating card
 * - Step icons in purple circles
 * - Step descriptions with titles
 * 
 * Layout:
 * - Top margin of 80px (mt-20)
 * - Bottom padding of 20px (pb-5)
 * - Two-column layout:
 *   - Left: Illustration with floating card
 *   - Right: Process steps
 * - Horizontal padding of 192px (px-48)
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Electric Violet accents for emphasis
 * - Backdrop blur on floating card
 * - Consistent spacing and typography
 * - Custom avatar sizing
 * 
 * Profile Card Features:
 * - Avatar image (16x16 size)
 * - Completion status text
 * - Progress percentage
 * - Blurred backdrop effect
 * 
 * Process Steps:
 * - Icon in purple circular background
 * - Step title in large font
 * - Step description
 * - Vertical spacing between steps
 * 
 * Data Flow:
 * - Imports work steps from Data file
 * - Maps step objects to visual elements
 * - Dynamically generates image paths
 * 
 * @returns {JSX.Element} A section explaining how the job search process works
 */
export const Working = () => {
    return (
        <>
            <div className="mt-20 pb-5">
                <div className="text-4xl  max-mdsm:text-3xl max-xssm:text-2xl max-smsm:text-3xl text-center font-semibold text-[var(--color-mine-shaft-100)]">How it<span className="text-[var(--color-electric-violet-500)]">Works</span></div>
                <div className="text-lg max-mdsm:text-base max-xssm:text-sm max-smsm:text-base  mb-10 text-center w-1/2 mx-auto text-[var(--color-mine-shaft-300)] max-smsm:w-11/12">Effortlessly navigate through the process and land your dream job.</div>
                <div className="flex px-48 max-bssm:px-40 max-smsm:px-20 max-xssm:px-10 justify-between items-center  max-mdsm:flex-col">
                    <div className="relative">
                        <img className="w-[30rem]" src="/Working/girl.png" alt="girl" />
                        <div className="w-36 max-mdsm:w-32 max-smsm:w-28 max-xssm:w-24 flex flex-col absolute top-[15%] max-mdsm:top-[20%] max-smsm:top-[25%] max-xssm:top-[30%]  -left-20 max-mdsm:-left-10 max-smsm:-left-5 max-xssm:-left-2 items-center gap-1 border border-[var(--color-electric-violet-500)] rounded-xl p-2 max-mdsm:p-1 max-xssm:p-0.5 backdrop-blur-md">
                            <Avatar className="!h-16 !w-16 max-mdsm:!h-12 max-mdsm:!w-12 max-smsm:!h-10 max-smsm:!w-10 max-xssm:!h-8 max-xssm:!w-8" src="images/avatar-7.png" alt="it's me" />
                            <div className="text-sm max-smsm:text-sm max-xssm:text-xs font-semibold text-[var(--color-mine-shaft-200)] text-center">Complete your profile</div>
                            <div className="text-xs max-smsm:text-xs text-[var(--color-mine-shaft-300)]">70% completed</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10 max-mdsm:w-full max-mdsm:items-center ">
                        {
                            work.map((item, index) => {
                                return (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="p-2.5 bg-[var(--color-electric-violet-500)] rounded-full ">
                                            <img className="w-[3rem]" src={`/Working/${item.name}.png`} alt="resume" />
                                        </div>
                                        <div className="">
                                            <div className="text-xl font-semibold  text-[var(--color-mine-shaft-100)]">{item.name}</div>
                                            <div className=" text-[var(--color-mine-shaft-300)]">{item.desc}</div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}