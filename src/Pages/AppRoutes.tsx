/**
 * Application Routes Component
 * 
 * Defines the main routing configuration for the application using React Router.
 * Handles protected routes, authentication redirects, and layout structure.
 * 
 * Features:
 * - Consistent layout with header, content area and footer
 * - Protected routes based on authentication state
 * - Redirects for authenticated users trying to access auth pages
 * - Fallback route to home page
 * 
 * Route Structure:
 * - /find-jobs: Job search page
 * - /find-talent: Talent search page  
 * - /company/:name: Company profile page
 * - /posted-job/:id: Individual posted job page
 * - /jobs/:id: Job description page
 * - /job-history: User's job application history
 * - /apply-jobs/:id: Job application page
 * - /post-job: Create new job posting
 * - /signup: User registration (redirects if authenticated)
 * - /login: User login (redirects if authenticated) 
 * - /profile: User profile page
 * - /talent-profile: Talent/candidate profile page
 * - /*: Fallback to home page
 * 
 * @component
 * @example
 * // In App.tsx
 * function App() {
 *   return (
 *     <Provider store={Store}>
 *       <AppRoutes />
 *     </Provider>
 *   )
 * }
 */

import { Divider } from "@mantine/core"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Footer } from "../Components/Footer/Footer"
import { Header } from "../Components/Header/Header"
import { ApplyJobPage } from "./ApplyJobPage"
import { CompanyPage } from "./CompanyPage"
import { FindJobs } from "./FindJobs"
import { FindTalentPage } from "./FindTalentPage"
import { HomePage } from "./HomePage"
import { JobDescriptionPage } from "./JobDescriptionPage"
import { JobHistoryPage } from "./JobHistoryPage"
import { PostedJobPage } from "./PostedJobPage"
import { PostJobPage } from "./PostJobPage"
import { ProfilePage } from "./ProfilePage"
import { SignupPage } from "./SignupPage"
import { TalentProfile } from "./TalentProfile" 
export const AppRoutes = () => {

    return (
        <BrowserRouter>
            <div className="relative">
                <Header />
                <Divider size="sm" mx="md" />
                <Routes>
                    <Route path='/find-jobs' element={<FindJobs />} />

                    <Route path='/find-talent' element={<FindTalentPage />} />

                    <Route path='/company/:name' element={<CompanyPage />} />

                    <Route path='/posted-job/:id' element={<PostedJobPage/>} />

                    <Route path='/jobs/:id' element={<JobDescriptionPage />} />

                    <Route path='/job-history' element={<JobHistoryPage />} />

                    <Route path='/apply-jobs/:id' element={<ApplyJobPage />} />

                    <Route path='/post-job/:id' element={<PostJobPage />} />

                    <Route path='/signup' element={<SignupPage />} />

                    <Route path='/login' element={<SignupPage />} />

                    <Route path='/profile' element={<ProfilePage />} />

                    <Route path='/talent-profile/:id' element={<TalentProfile />} />

                    <Route path='*' element={<HomePage />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}