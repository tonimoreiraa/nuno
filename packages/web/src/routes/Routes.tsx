import { Route, Routes } from "react-router-dom";
import FormAnswering from "../pages/FormAnswering";

function ApplicationRoutes()
{
    return <Routes>
        {/* User Routes */}
        <Route path="/forms/:id" element={<FormAnswering />} />
    </Routes>
}

export default ApplicationRoutes;