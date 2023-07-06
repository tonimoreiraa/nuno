import { Route, Routes } from "react-router-dom";
import FormAnswering from "../pages/FormAnswering";
import { useAuth } from "../contexts/AuthContext";
import GoogleLogin from "../pages/GoogleLogin";
import AuthHandler from "../pages/AuthHandler";
import DocumentCreate from "../pages/DocumentCreate";

function ApplicationRoutes()
{
    const auth = useAuth()

    return <Routes>
        {/* App Routes */}
            {auth.authenticated ? <>
                <Route path="/admin/document" element={<DocumentCreate />} />
            </> : <>
                <Route path="/auth/callback" element={<AuthHandler />} />
                <Route path="/admin/*" element={<GoogleLogin />} />
            </>}
        {/* User Routes */}
        <Route path="/forms/:id" element={<FormAnswering />} />
    </Routes>
}

export default ApplicationRoutes;