import { companyData } from "../../Data/Data"

/**
 * AboutCom Component
 * 
 * This component renders the About section of a company profile page.
 * It displays various company information from the companyData object,
 * excluding the company name.
 * 
 * The component handles different types of data:
 * - Regular text fields are displayed as paragraphs
 * - Specialities are displayed as a bulleted list
 * - Website is displayed as a clickable link
 * 
 * @returns {JSX.Element} A flex column layout containing company information
 */
export const AboutCom = () => {
    // Type annotation for company data object
    const company: { [key: string]: any } = companyData

    return (
        <div className="flex flex-col gap-5">
            {/* Map through company data object keys excluding "Name" */}
            {Object.keys(company).map((key, index) => 
                // Only render if key is not "Name"
                key !== "Name" && (
                    <div key={index} className="">
                        {/* Section heading */}
                        <div className="text-xl mb-3 font-semibold">
                            {key}
                        </div>

                        {/* Content rendering based on field type */}
                        {key !== "Website" && (
                            <div className="text-sm text-justify text-[var(--color-mine-shaft-300)]">
                                {/* Handle specialities as bullet points, other fields as regular text */}
                                {key !== "Specialities" 
                                    ? company[key]
                                    : company[key].map((item: string, index: number) => (
                                        <span key={index}>  &bull; {item}</span>
                                    ))
                                }
                            </div>
                        )}

                        {/* Special handling for website field as a link */}
                        {key === "Website" && (
                            <a 
                                href={company[key]} 
                                className="text-sm text-justify text-[var(--color-electric-violet-500)]" 
                                target="_blank"
                            >
                                {company[key]}
                            </a>
                        )}
                    </div>
                )
            )}
        </div>
    )
}