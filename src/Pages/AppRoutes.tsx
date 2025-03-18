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
import { ProtectedRoute } from "../Services/ProtectedRoute"
import { PublicRoute } from "../Services/PublicRout"    
export const AppRoutes = () => {

    return (
        <BrowserRouter>
            <div className="relative">
                <Header />
                <Divider size="sm" mx="md" />
                <Routes>
                    <Route path='/find-jobs' element={<PublicRoute><FindJobs /></PublicRoute>} />

                    <Route path='/find-talent' element={<PublicRoute><FindTalentPage /></PublicRoute>} />

                    <Route path='/company/:name' element={<PublicRoute><CompanyPage /></PublicRoute>} />

                    <Route path='/posted-job/:id' element={<ProtectedRoute allowedRoles={["EMPLOYER"]}><PostedJobPage /></ProtectedRoute>} />

                    <Route path='/jobs/:id' element={<PublicRoute><JobDescriptionPage /></PublicRoute>} />

                    <Route path='/job-history' element={<ProtectedRoute allowedRoles={["APPLICANT"]}><JobHistoryPage /></ProtectedRoute>} />

                    <Route path='/apply-jobs/:id' element={<ProtectedRoute allowedRoles={["APPLICANT"]}><ApplyJobPage /></ProtectedRoute>} />

                    <Route path='/post-job/:id' element={<ProtectedRoute allowedRoles={["EMPLOYER"]}><PostJobPage /></ProtectedRoute>} />

                    <Route path='/signup' element={<PublicRoute><SignupPage /></PublicRoute>} />

                    <Route path='/login' element={<PublicRoute><SignupPage /></PublicRoute>} />

                    <Route path='/profile' element={<ProtectedRoute allowedRoles={["EMPLOYER","TALENT"]}><ProfilePage /></ProtectedRoute>} />

                    <Route path='/talent-profile/:id' element={<PublicRoute><TalentProfile /></PublicRoute>} />

                    <Route path='*' element={<PublicRoute><HomePage /></PublicRoute>} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}