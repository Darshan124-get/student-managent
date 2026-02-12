import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import ClassesPage from "./pages/admin/ClassesPage";
import SubjectsPage from "./pages/admin/SubjectsPage";
import StudentsPage from "./pages/admin/StudentsPage";
import MarksPage from "./pages/admin/MarksPage";
import AttendancePage from "./pages/admin/AttendancePage";
import ResultsPage from "./pages/admin/ResultsPage";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherClassesPage from "./pages/teacher/TeacherClassesPage";
import TeacherMarksPage from "./pages/teacher/TeacherMarksPage";
import TeacherAttendancePage from "./pages/teacher/TeacherAttendancePage";
import TeacherReportsPage from "./pages/teacher/TeacherReportsPage";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentMarksPage from "./pages/student/StudentMarksPage";
import StudentAttendancePage from "./pages/student/StudentAttendancePage";
import StudentReportPage from "./pages/student/StudentReportPage";
import StudentProfilePage from "./pages/student/StudentProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Admin routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="classes" element={<ClassesPage />} />
              <Route path="subjects" element={<SubjectsPage />} />
              <Route path="students" element={<StudentsPage />} />
              <Route path="marks" element={<MarksPage />} />
              <Route path="attendance" element={<AttendancePage />} />
              <Route path="results" element={<ResultsPage />} />
            </Route>

            {/* Teacher routes */}
            <Route path="/teacher" element={<ProtectedRoute allowedRoles={['teacher']}><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<TeacherDashboard />} />
              <Route path="classes" element={<TeacherClassesPage />} />
              <Route path="marks" element={<TeacherMarksPage />} />
              <Route path="attendance" element={<TeacherAttendancePage />} />
              <Route path="reports" element={<TeacherReportsPage />} />
            </Route>

            {/* Student routes */}
            <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<StudentDashboard />} />
              <Route path="marks" element={<StudentMarksPage />} />
              <Route path="attendance" element={<StudentAttendancePage />} />
              <Route path="report" element={<StudentReportPage />} />
              <Route path="profile" element={<StudentProfilePage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
