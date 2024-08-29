import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { AddBankDetailPage, ChangePasswordPage, ClaimAccountPage, CommunityDetailPage, CommunityMemberPage, CommunityPage, CommunityPostPage, CreateCommunityPage, CreateEventPage, DashboardPage, DonatePage, EventDetailPage, EventPage, EventSupportPage, ImpactReportDetailPage, ImpactReportPage, LoginPage, NotificationPage, PostReportPage, ProfileInfoPage, ResetPasswordPage } from "./page";
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
          <Route index element={<DashboardPage />} />
          <Route path="event" >
            <Route index element={<EventPage />} />
            <Route path="details" element={<EventDetailPage />} />
            <Route path="create" element={<CreateEventPage />} />
            <Route path="support" element={<EventSupportPage />} />
          </Route>
          <Route path="community" >
            <Route index element={<CommunityPage />} />
            <Route path="details" element={<CommunityDetailPage />} />
            <Route path="member" element={<CommunityMemberPage />} />
            <Route path="create" element={<CreateCommunityPage />} />
            <Route path="post" element={<CommunityPostPage />} />
          </Route>
          <Route path="donation" >
            <Route index element={<DonatePage />} />
            <Route path="bankInfo" element={<AddBankDetailPage />} />
          </Route>
          <Route path="notification" element={<NotificationPage />} />
          <Route path="profile" element={<ProfileInfoPage />} />
          <Route path="report" >
            <Route index element={<ImpactReportPage />} />
            <Route path="details" element={<ImpactReportDetailPage />} />
            <Route path="post" element={<PostReportPage />} />
          </Route>
        </Route>
      </Route>
    )
  );
  return (
    <RouterProvider router={router} />
  )
}

export default App