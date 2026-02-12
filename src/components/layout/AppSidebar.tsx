import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Users, BookOpen, GraduationCap, ClipboardList,
  CalendarCheck, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight,
  School, UserCheck, FileText, Menu, X
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const adminNav: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
  { label: 'Users', path: '/admin/users', icon: <Users size={20} /> },
  { label: 'Classes', path: '/admin/classes', icon: <School size={20} /> },
  { label: 'Subjects', path: '/admin/subjects', icon: <BookOpen size={20} /> },
  { label: 'Students', path: '/admin/students', icon: <GraduationCap size={20} /> },
  { label: 'Marks', path: '/admin/marks', icon: <ClipboardList size={20} /> },
  { label: 'Attendance', path: '/admin/attendance', icon: <CalendarCheck size={20} /> },
  { label: 'Results', path: '/admin/results', icon: <BarChart3 size={20} /> },
];

const teacherNav: NavItem[] = [
  { label: 'Dashboard', path: '/teacher', icon: <LayoutDashboard size={20} /> },
  { label: 'My Classes', path: '/teacher/classes', icon: <School size={20} /> },
  { label: 'Marks Entry', path: '/teacher/marks', icon: <ClipboardList size={20} /> },
  { label: 'Attendance', path: '/teacher/attendance', icon: <CalendarCheck size={20} /> },
  { label: 'Reports', path: '/teacher/reports', icon: <FileText size={20} /> },
];

const studentNav: NavItem[] = [
  { label: 'Dashboard', path: '/student', icon: <LayoutDashboard size={20} /> },
  { label: 'My Marks', path: '/student/marks', icon: <ClipboardList size={20} /> },
  { label: 'Attendance', path: '/student/attendance', icon: <CalendarCheck size={20} /> },
  { label: 'Report Card', path: '/student/report', icon: <FileText size={20} /> },
  { label: 'Profile', path: '/student/profile', icon: <UserCheck size={20} /> },
];

const AppSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = user?.role === 'admin' ? adminNav : user?.role === 'teacher' ? teacherNav : studentNav;

  const isActive = (path: string) => {
    if (path === `/${user?.role}`) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-heading font-bold text-lg shrink-0">
          S
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="font-heading font-bold text-base text-sidebar-primary-foreground leading-tight">StudentMS</h1>
            <p className="text-[11px] text-sidebar-muted">Management System</p>
          </div>
        )}
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-sidebar-accent text-sidebar-accent-foreground text-xs font-medium capitalize">
            {user?.role}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`sidebar-link ${isActive(item.path) ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}
            title={collapsed ? item.label : undefined}
          >
            {item.icon}
            {!collapsed && <span className="animate-fade-in">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-sidebar-border space-y-1">
        <button
          onClick={logout}
          className="sidebar-link sidebar-link-inactive w-full text-left"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse toggle - desktop only */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex items-center justify-center py-3 border-t border-sidebar-border text-sidebar-muted hover:text-sidebar-foreground transition-colors"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-lg bg-card shadow-md border border-border"
      >
        <Menu size={22} className="text-foreground" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 animate-slide-in-left">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-3 right-3 p-1 rounded-md text-sidebar-muted hover:text-sidebar-foreground z-10"
            >
              <X size={18} />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={`hidden lg:block shrink-0 h-screen sticky top-0 transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-60'}`}>
        {sidebarContent}
      </aside>
    </>
  );
};

export default AppSidebar;
