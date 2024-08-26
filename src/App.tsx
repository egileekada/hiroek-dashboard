import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { ChangePasswordPage, ClaimAccountPage, CommunityPage, EventDetailPage, EventPage, ImpactReportPage, LoginPage, NotificationPage, ResetPasswordPage } from "./page";
import { DashboardLayout } from "./components/dashboard";
import DashboardPage from "./page/dashboardPage"; 
import DonatePage from "./page/donatePage";
import CreateEventPage from "./page/event/createEventPage";


function App() {
  const router = createBrowserRouter(

    createRoutesFromElements(
      <Route path="/">
        <Route index element={<ClaimAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} /> 
        <Route path="/dashboard" element={<DashboardLayout />} >
          <Route index element={<DashboardPage />} />
          <Route path="event" element={<EventPage />} />
          <Route path="event-details" element={<EventDetailPage />} />
          <Route path="create-event" element={<CreateEventPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="donation" element={<DonatePage />} />
          <Route path="notification" element={<NotificationPage />} />
          <Route path="report" element={<ImpactReportPage />} />
        </Route>
      </Route>
    )
  );
  return (
    <RouterProvider router={router} />
  )
}

export default App