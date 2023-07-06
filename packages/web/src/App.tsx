import { BrowserRouter, Routes } from "react-router-dom";
import { default as ApplicationRoutes } from "./routes/Routes";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App()
{
  return <AuthProvider>
    <BrowserRouter>
      <ApplicationRoutes />
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
}

export default App;