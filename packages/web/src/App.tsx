import { BrowserRouter, Routes } from "react-router-dom";
import { default as ApplicationRoutes } from "./routes/Routes";

function App()
{
  return <BrowserRouter>
    <ApplicationRoutes />
  </BrowserRouter>
}

export default App;