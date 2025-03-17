import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { SelectInput } from "./SelectInput"
import { TextEditor } from "./TextEditor";
import { content, feilds } from "../../Data/Data";
import { isNotEmpty, useForm } from "@mantine/form";
import { postJob, getJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useNavigate, useParams  } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
/**
 * PostJob Component
 * 
 * A form component for creating and publishing job postings with validation and draft capabilities.
 * 
 * @component
 * 
 * Features:
 * - Complete job posting form with validation
 * - Draft saving functionality
 * - Rich text editor for job description
 * - Skills input with tag support
 * - Form validation with error messages
 * 
 * Visual Elements:
 * - "Post a Job" heading in large font
 * - Two-column layout for form fields
 * - Rich text editor with custom styling
 * - Action buttons for publishing and drafting
 * 
 * Layout:
 * - 80% width container (w-4/5)
 * - Centered with auto margins (mx-auto)
 * - Two-column grid for paired inputs
 * - Vertical spacing between sections (gap-5)
 * 
 * Form Fields:
 * - Job Title (SelectInput)
 * - Company (SelectInput)
 * - Experience (SelectInput)
 * - Job Type (SelectInput)
 * - Location (SelectInput)
 * - Package/Salary (NumberInput)
 * - Skills (TagsInput)
 * - About Job (Textarea)
 * - Job Description (TextEditor)
 * 
 * Validation:
 * - Required field validation
 * - Input-level validation on change
 * - Form-level validation before submission
 * 
 * State Management:
 * - Uses Mantine form hook for form state
 * - Redux integration for user data
 * - Controlled form inputs
 * 
 * Data Flow:
 * - Form data collected through Mantine useForm
 * - User ID from Redux store
 * - API integration for job posting
 * - Navigation after successful submission
 * 
 * Error Handling:
 * - Form validation errors
 * - API error notifications
 * - Success notifications
 * 
 * Dependencies:
 * - @mantine/core for UI components
 * - @mantine/form for form handling
 * - react-redux for state management
 * - react-router-dom for navigation
 * 
 * @returns {JSX.Element} A form interface for creating job postings
 */
export const PostJob = () => {
   const {id} = useParams()
   const user = useSelector((state:any)=>state.user)
   const select = feilds;
   const navigate = useNavigate()
   const[editorData, setEditorData] = useState<any>(content)

   useEffect(()=>{
      window.scrollTo(0,0)
      if(id!=="0"){
         getJob(id).then((res:any)=>{
            form.setValues(res)
            setEditorData(res.description)
         }).catch((err:any)=>{
            console.log(err);
         })
      }else{
         form.reset()
         setEditorData(content)
      }
   },[id])

   const form = useForm({
      mode: 'controlled',
      validateInputOnChange: true,
      initialValues: {
         jobTitle: "",
         company: '',
         expirience: "",
         jobType: "",
         location: "",
         packageOffered: "",
         skillsRequired: [],
         about: "",
         description: content
      },
      validate: {
         jobTitle: isNotEmpty("Title is required"),
         company: isNotEmpty("Comapny is required"),
         expirience: isNotEmpty("Expirience is required"),
         jobType: isNotEmpty("Job Type is required"),
         location: isNotEmpty("Location is required"),
         packageOffered: isNotEmpty("Package is required"),
         skillsRequired: isNotEmpty("Skills are required"),
         about: isNotEmpty("About is required"),
         description: isNotEmpty("Description is required")
      }
   })

   const handlePost = () => {
      form.validate();
      if (!form.isValid())return;
      console.log(form.getValues());
      
      postJob({...form.getValues(),postedBy:user.id,jobStatus:"ACTIVE"}).then((res)=>{
         console.log(res);  
         successNotification("Success","Job posted SuccesFully")
         navigate(`/posted-job/${res.id}`)
      }).catch((err)=>{
         console.log(err);
         errorNotification("Job Posting failed",err.response.data.errorMessage)
      } )
   }

   const handleDraft = () => {      
      postJob({...form.getValues(),id,postedBy:user.id,jobStatus:"DRAFT"}).then((res)=>{
         console.log(res);  
         successNotification("Success","Job drafted SuccesFully")
         navigate(`/posted-job/${res.id}`)
      }).catch((err)=>{
         console.log(err);
         errorNotification("Job drafting failed",err.response.data.errorMessage)
      } )
   }

   return <div className="px-16 max-bssm:px-10 max-mdsm:px-5 py-5">
      <div className="text-2xl font-semibold mb-5">Post a Job</div>
      <div className="flex flex-col gap-5">
         <div className="flex gap-10 max-mdsm:gap-5 [&>*]:w-1/2 max-smsm:[&>*]:!w-full  max-smsm:flex-wrap">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />

         </div>
         <div className="flex gap-10 max-mdsm:gap-5 [&>*]:w-1/2 max-smsm:[&>*]:!w-full max-smsm:flex-wrap">
            <SelectInput form={form} name="expirience" {...select[2]} />
            <SelectInput form={form} name="jobType" {...select[3]} />

         </div>
         <div className="flex gap-10 max-mdsm:gap-5 [&>*]:w-1/2 max-smsm:[&>*]:!w-full max-smsm:flex-wrap">
            <SelectInput form={form} name="location" {...select[4]} />
            <NumberInput withAsterisk {...form.getInputProps("packageOffered")} clampBehavior="strict" label="Salary" min={1} max={300} placeholder="Enter salary" hideControls />
         </div>
         <TagsInput {...form.getInputProps("skillsRequired")} withAsterisk label="Skills" placeholder="Enter Skills" clearable acceptValueOnBlur splitChars={[",", " ", "|"]} />
         <Textarea {...form.getInputProps("about")} withAsterisk label="About Job" autosize minRows={3} placeholder="Enter about the job" />
         <div className="[&_button[data-active='true']]:text-[var(--color-electric-violet-500)] [&_button[data-active='true']]:bg-[var(--color-electric-violet-500)]/20">
            <div className="text-sm font-medium">Job Description <span className="text-red-700">*</span></div>
            <TextEditor form={form} data={editorData} />
         </div>
         <div className="flex gap-4 ">
            <Button color="darkorchid" variant="light" onClick={handlePost}>Publish Job</Button>
            <Button onClick={handleDraft} color="darkorchid" variant="outline">Save As Draft</Button>
         </div>
      </div>
   </div>
}