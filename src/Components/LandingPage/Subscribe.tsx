import { Button, TextInput } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"

/**
 * Subscribe Component
 * 
 * A newsletter subscription component that allows users to sign up for job news updates.
 * Features a prominent call-to-action and email input field.
 * 
 * @component
 * 
 * Features:
 * - Email subscription form
 * - Large heading with accent text
 * - Interactive subscribe button
 * - Dark themed container
 * 
 * Visual Elements:
 * - Heading with "Job News?" in accent color
 * - Email input field with placeholder
 * - Subscribe button with dark orchid color
 * - Dark background container
 * 
 * Layout:
 * - Top margin of 80px (mt-20)
 * - Horizontal margin of 80px (mx-20)
 * - Flex container with centered alignment
 * - Two-column layout (40% heading, 60% form)
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Electric Violet accent for emphasis
 * - Rounded corners on container and button
 * - Custom input field styling
 * 
 * Form Elements:
 * - Unstyled TextInput for email
 * - Extra large input size
 * - Large button with filled variant
 * - Custom text color for input
 * 
 * @returns {JSX.Element} A newsletter subscription section
 */
export const Subscribe = () => {
    const matches = useMediaQuery('(max-width: 639px)');
    const matches1 = useMediaQuery('(max-width: 475px)');
    return <div className="mt-20 flex items-center bg-[var(--color-mine-shaft-900)] mx-20 max-smsm:mx-5 py-3 rounded-xl justify-around flex-wrap px-5">
        <div className="text-4xl max-mdsm:text-3xl max-xssm:text-2xl max-smsm:text-3xl  w-2/5 max-bssm:w-4/5 text-center font-semibold  text-[var(--color-mine-shaft-100)]">Never Wants to Miss Any  <span className="text-[var(--color-electric-violet-500)] ">Job News?</span></div>
        <div className="flex gap-4 rounded-xl max-xssm:flex-col bg-[var(--color-mine-shaft-700)] px-3 py-2 xs:items-center">
            <TextInput
                className="[&_input]:text-[var(--color-mine-shaft-900)] font-semibold"
                variant="unstyled"
                placeholder="example@gmail.com"
                size={matches1 ? 'sm' : matches ? 'md' : 'xl'}
            />
            <Button className="!rounded-lg " size={matches1 ? 'sm' : matches ? 'md' : 'xl'} color="darkorchid" variant="filled">Subscribe</Button>
        </div>
    </div>
}