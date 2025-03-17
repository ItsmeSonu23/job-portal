import axiosInstance from "../Interceptor/AxiosInterceptor";

/**
 * Creates a new job posting
 * 
 * Makes a POST request to create a new job listing in the system
 * 
 * @param {Object} job - Job posting data
 * @param {string} job.title - Job title
 * @param {string} job.description - Job description
 * @param {string} job.company - Company name
 * @param {string} job.location - Job location
 * @param {string[]} job.requirements - Required skills/qualifications
 * @returns {Promise<Object>} Response data containing created job details
 * @throws {Error} If job creation fails
 * 
 * @example
 * try {
 *   const jobData = await postJob({
 *     title: "Software Engineer",
 *     description: "Full stack developer role...",
 *     company: "Tech Corp",
 *     location: "Remote",
 *     requirements: ["React", "Node.js"]
 *   });
 * } catch (error) {
 *   console.error("Failed to post job:", error);
 * }
 */
export const postJob = async (job:any) => {
    try {
        const res = await axiosInstance.post(`/jobs/post`,job);
        return res.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves all job listings
 * 
 * Makes a GET request to fetch all available job postings
 * 
 * @returns {Promise<Object[]>} Array of job posting objects
 * @throws {Error} If fetching jobs fails
 * 
 * @example
 * try {
 *   const jobs = await getAllJobs();
 *   jobs.forEach(job => {
 *     // Process each job
 *   });
 * } catch (error) {
 *   console.error("Failed to fetch jobs:", error);
 * }
 */
export const getAllJobs = async()=>{
    try {
        const res = await axiosInstance.get(`/jobs/getAll`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves a specific job posting by ID
 * 
 * Makes a GET request to fetch details of a single job posting
 * 
 * @param {number} id - ID of the job posting to retrieve
 * @returns {Promise<Object>} Job posting details
 * @throws {Error} If fetching job fails
 * 
 * @example
 * try {
 *   const job = await getJob(123);
 *   // Use job details
 * } catch (error) {
 *   console.error("Failed to fetch job:", error);
 * }
 */
export const getJob =async(id:any)=>{
    try {
        const res = await axiosInstance.get(`/jobs/get/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Submits a job application
 * 
 * Makes a POST request to submit an application for a specific job
 * 
 * @param {number} id - ID of the job being applied to
 * @param {Object} applicant - Applicant details
 * @param {string} applicant.name - Applicant's name
 * @param {string} applicant.email - Applicant's email
 * @param {string} applicant.resume - Resume/CV content or link
 * @returns {Promise<Object>} Response containing application status
 * @throws {Error} If application submission fails
 * 
 * @example
 * try {
 *   const result = await applyJob(123, {
 *     name: "John Doe",
 *     email: "john@example.com",
 *     resume: "resume.pdf"
 *   });
 * } catch (error) {
 *   console.error("Failed to submit application:", error);
 * }
 */
export const applyJob = async(id:any, applicant:any)=>{
    try {
        const res = await axiosInstance.post(`/jobs/apply/${id}`,applicant)
        return res;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves jobs posted by a specific user
 * 
 * Makes a GET request to fetch all jobs posted by given user ID
 * 
 * @param {number} id - ID of the user whose jobs to retrieve
 * @returns {Promise<Object[]>} Array of job postings by the user
 * @throws {Error} If fetching jobs fails
 * 
 * @example
 * try {
 *   const postedJobs = await getJobPostedBy(123);
 *   // Process posted jobs
 * } catch (error) {
 *   console.error("Failed to fetch posted jobs:", error);
 * }
 */
export const getJobPostedBy =async(id:any)=>{
    try {
        const res = await axiosInstance.get(`/jobs/postedBy/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Updates the status of a job application
 * 
 * Makes a POST request to change application status (e.g., accepted, rejected)
 * 
 * @param {Object} application - Application update data
 * @param {number} application.id - Application ID
 * @param {string} application.status - New application status
 * @returns {Promise<Object>} Response containing updated application
 * @throws {Error} If status update fails
 * 
 * @example
 * try {
 *   const result = await changeAppStatus({
 *     id: 456,
 *     status: "accepted"
 *   });
 * } catch (error) {
 *   console.error("Failed to update application status:", error);
 * }
 */
export const changeAppStatus = async(application:any)=>{
    try{
        const res = await axiosInstance.post(`/jobs/changeAppStatus`,application)
        return res;
    }catch(error){
        throw(error)
    }
}