import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { AddBankDetailPage, ChangePasswordPage, ClaimAccountPage, CommunityDetailPage, CommunityMemberPage, CommunityPage, CommunityPostPage, CreateCommunityPage, CreateEventPage, DashboardPage, DonatePage, EventDetailPage, EventPage, EventSupportPage, ImpactReportDetailPage, ImpactReportPage, LoginPage, NotificationPage, PostReportPage, ProfileInfoPage, ResetPasswordPage, ResetSentPage, SelectUpdate, SettingsPage, SupportPage, TransactionHistory, WithDrawalPin, WithdrawPage } from "./page";
import { DashboardLayout } from "./components/dashboard";
import EventDashboardPage from "./page/event/eventDashboardPage";
import EventScanner from "./page/event/eventScanner";
import EventScanHistory from "./page/event/eventScanHistory";
import EventDetailByMemberPage from "./page/event/eventDetailBymemberPage"; 
import CommunitySinglePostPage from "./page/community/communitySinglePostPage"; 


function App() {
  const router = createBrowserRouter(

    createRoutesFromElements(
      <Route path="/">
        <Route index element={<ClaimAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ResetPasswordPage />} />
        <Route path="/reset-password" element={<ChangePasswordPage />} />
        <Route path="/reset-sent" element={<ResetSentPage />} />
          <Route path="message" element={
            <>
            </>
          } />
        <Route path="/dashboard" element={<DashboardLayout  />} >
          <Route index element={<DashboardPage />} />
          <Route path="event" >
            <Route index element={<EventPage />} />
            <Route path="details/:id" element={<EventDetailPage />} />
            <Route path="details/bymembers/:id" element={<EventDetailByMemberPage />} />
            <Route path="create" element={<CreateEventPage />} />
            <Route path="edit/:id" element={<CreateEventPage />} />
            <Route path="support/:id" element={<EventSupportPage />} />
            <Route path="scanner/:id" element={<EventScanner />} />
            <Route path="scan/history/:id" element={<EventScanHistory />} />
            <Route path="dashboard/:id" element={<EventDashboardPage />} />
          </Route>
          <Route path="community" >
            <Route index element={<CommunityPage />} />
            <Route path="details/:id" element={<CommunityDetailPage />} />
            <Route path="member/:id" element={<CommunityMemberPage />} />
            <Route path="create" element={<CreateCommunityPage />} />
            <Route path="post/:id" element={<CommunityPostPage />} />
            <Route path="post-comment/:id" element={<CommunitySinglePostPage />} />
          </Route>
          <Route path="donation" >
            <Route index element={<DonatePage />} />
            <Route path="setup" element={<SelectUpdate />} />
            <Route path="bankinfo" element={<AddBankDetailPage />} />
            <Route path="pin" element={<WithDrawalPin />} />
            <Route path="history" element={<TransactionHistory />} />
            <Route path="withdraw" element={<WithdrawPage />} />
          </Route>
          <Route path="notification" element={<NotificationPage />} />
          <Route path="profile" element={<ProfileInfoPage />} />
          {/* <Route path="profile" element={<ProfileInfoPage />} /> */}
          <Route path="settings" element={<SettingsPage />} />
          <Route path="support" element={<SupportPage />} />
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
    <div className=" inter-all w-full " >
      <RouterProvider router={router} />
    </div>
  )
}

export default App