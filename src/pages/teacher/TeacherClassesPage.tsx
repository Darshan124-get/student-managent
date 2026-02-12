import { School, ClipboardList, CalendarCheck, FileText } from 'lucide-react';

const pages = [
  { title: 'My Classes', desc: 'View your assigned classes and schedules', icon: School, path: '/teacher/classes' },
  { title: 'Marks Entry', desc: 'Enter and manage marks for your subjects', icon: ClipboardList, path: '/teacher/marks' },
  { title: 'Attendance', desc: 'Mark daily attendance for your classes', icon: CalendarCheck, path: '/teacher/attendance' },
  { title: 'Reports', desc: 'View student progress and performance reports', icon: FileText, path: '/teacher/reports' },
];

const TeacherClassesPage = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="page-header">My Classes</h1>
      <p className="page-subtitle">Your assigned classes and quick links</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {pages.map(p => (
        <a key={p.path} href={p.path} className="stat-card flex items-start gap-4 group">
          <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <p.icon size={22} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">{p.title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{p.desc}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
);

export default TeacherClassesPage;
