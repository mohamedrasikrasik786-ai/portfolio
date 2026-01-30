// CRITICAL: Import error suppression FIRST before ANYTHING else
import "../config/errorSuppression";

import { FirebaseErrorBoundary } from "./components/FirebaseErrorBoundary";
import { ThemeProvider } from "../contexts/ThemeContext";
import { NotificationProvider } from "../contexts/NotificationContext";
import Large from "../imports/Large";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { ProjectDetail } from "./components/ProjectDetail";
import { NotFoundPage } from "./components/NotFoundPage";
import { Suspense, lazy } from "react";

const AdminPage = lazy(() => import("./components/AdminPage").then(m => ({ default: m.AdminPage })));

function ProjectDetailWrapper() {
  const { id } = useParams();
  return <ProjectDetail id={id} />;
}

export default function App() {
  return (
    <FirebaseErrorBoundary>
      <ThemeProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <div className="w-full min-h-screen relative">
                  <Large />
                </div>
              } />
              <Route path="/case-study/:id" element={<ProjectDetailWrapper />} />
              <Route path="/admin" element={
                <Suspense fallback={<div className="min-h-screen bg-[#0E0E0E]" />}>
                  <AdminPage />
                </Suspense>
              } />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </ThemeProvider>
    </FirebaseErrorBoundary>
  );
}