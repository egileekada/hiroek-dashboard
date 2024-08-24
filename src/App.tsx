import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { ChangePasswordPage, ClaimAccountPage, LoginPage, ResetPasswordPage } from "./page";
import { DashboardLayout } from "./components/dashboard";


function App() {
  const router = createBrowserRouter(

    createRoutesFromElements(
      <Route path="/">
        <Route index element={<ClaimAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} /> 
        <Route path="/dashboard" element={<DashboardLayout />} >
          <Route index element={<div className=" bg-red-500 " >Dashoard</div>} />
          <Route path="event" element={<div>Event</div>} />
        </Route>
      </Route>
    )
  );
  return (
    <RouterProvider router={router} />
  )
}

export default App