import { TextInput, NumberInput, FileInput, Textarea, Button, LoadingOverlay } from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react"
import { useState } from "react";
import { getBase64 } from "../../Services/Utilities";
import { applyJob } from "../../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useSelector } from "react-redux";

/**
 * ApplicationForm Component
 * 
 * This component renders a form for job applications with preview and submission functionality.
 * It uses Mantine form components and handles file uploads.
 * 
 * Features:
 * - Form validation for all required fields
 * - Preview mode to review application before submission
 * - File upload for resume (PDF only)
 * - Loading overlay during submission
 * - Success/error notifications
 * - Automatic navigation after successful submission
 * 
 * @component
 */
export const ApplicationForm = () => {
    // Get job ID from URL parameters
    const { id } = useParams()
    const navigate = useNavigate()
    // Get current user from Redux store
    const user = useSelector((state: any) => state.user)
    // State for preview mode and submission status
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false)

    /**
     * Handles preview mode toggle and form validation
     * Scrolls to top of page and validates all fields before allowing preview
     */
    const handlePreview = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Manually validate the resume field (FileInput)
        if (!form.values.resume) {
            form.setErrors({ resume: 'Resume cannot be empty' });
            console.log('Form validation failed');
            return;
        }

        // Trigger validation
        form.validate();

        // Check if there are validation errors
        if (Object.keys(form.errors).length > 0) {
            console.log('Form validation failed');
            console.log(form.errors);  // Log validation errors for debugging
            return;
        }

        console.log('Form is valid');
        setPreview(!preview);  // Toggle preview state
    };

    /**
     * Handles form submission
     * Converts resume to base64, combines form data with user ID, and submits to API
     */
    const handleSubmit = async () => {
        setSubmit(true)
        let resume: any = await getBase64(form.getValues().resume)
        let applicant = { ...form.getValues(), applicantId: user.id, resume: resume.split(",")[1] }
        applyJob(id, applicant).then((res) => {
            setSubmit(false)
            successNotification("Succesfull", "Job applied successfully")
            navigate("/job-history")
        }).catch((err) => {
            console.log(err);
            errorNotification("Failed", err.response.data.errorMessage)
        })
    }

    /**
     * Form configuration using Mantine's useForm hook
     * Includes initial values, validation rules, and controlled mode settings
     */
    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            name: '',
            email: '',
            phone: '',
            website: '',
            resume: null,
            coverLetter: ''
        },
        validate: {
            name: isNotEmpty('Name cannot be empty'),
            email: isNotEmpty("Email cannot be empty"),
            phone: isNotEmpty("Phone cannot be empty"),
            website: isNotEmpty("Website cannot be empty"),
            resume: isNotEmpty("Resume cannot be empty"),
            coverLetter: isNotEmpty("CoverLetter cannot be empty")
        }
    })

    return (<>
        {/* Loading overlay shown during form submission */}
        <LoadingOverlay className="!fixed " visible={submit} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: "darkorchid", type: "dots" }} />
        <div className="text-xl font-semibold mb-5 max-xssm:text-lg">Submit your Application</div>
        {/* Main form container */}
        <div className="flex flex-col gap-5">
            {/* Name and Email row */}
            <div className="flex gap-10 max-mdsm:gap-5 [&>*]:w-1/2 max-smsm:[&>*]:!w-full max-smsm:flex-wrap">
                <TextInput {...form.getInputProps("name")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-[(--color-mine-shaft-300)] font-semibold" : ""}`} label="Full-Name" withAsterisk placeholder="Enter your name" />
                <TextInput {...form.getInputProps("email")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-[(--color-mine-shaft-300)] font-semibold" : ""}`} label="Email" withAsterisk placeholder="Enter your email" />
            </div>
            {/* Phone and Website row */}
            <div className="flex gap-10 max-mdsm:gap-5 [&>*]:w-1/2 max-smsm:[&>*]:!w-full max-smsm:flex-wrap">
                <NumberInput {...form.getInputProps("phone")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-[(--color-mine-shaft-300)] font-semibold" : ""}`} label="Phone Number" hideControls withAsterisk clampBehavior="strict" placeholder="Enter your phone number" />
                <TextInput {...form.getInputProps("website")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-[(--color-mine-shaft-300)] font-semibold" : ""}`} label="Portfolio" withAsterisk placeholder="Enter your url" />
            </div>
            {/* Resume upload field */}
            <FileInput readOnly={preview}  {...form.getInputProps("resume")} accept="application/pdf" variant={preview ? "unstyled" : "default"} className={`${preview ? "text-[(--color-mine-shaft-300)] font-semibold" : ""}`} withAsterisk leftSection={<IconPaperclip stroke={1.5} />} label="Attach your CV/Resume" placeholder="Attach your CV/Resume" />
            {/* Cover letter text area */}
            <Textarea {...form.getInputProps("coverLetter")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-[(--color-mine-shaft-300)] font-semibold" : ""}`} withAsterisk autosize placeholder="About yourself" label="Cover Letter" minRows={4} />
            {/* Preview button shown when not in preview mode */}
            {!preview && <Button color="darkorchid" variant="light" onClick={handlePreview}>Preview</Button>}
            {/* Edit and Submit buttons shown in preview mode */}
            {preview && <div className="flex gap-10 [$>*:w-1/2]">
                <Button fullWidth color="darkorchid" variant="light" onClick={handlePreview}>Edit</Button>
                <Button fullWidth color="darkorchid" variant="light" onClick={handleSubmit}>Submit</Button>
            </div>}
        </div>
    </>)
}
