import { UserCheck, Mail, School, Calendar } from 'lucide-react';

const StudentProfilePage = () => (
  <div className="space-y-6 animate-fade-in">
    <h1 className="page-header">My Profile</h1>

    <div className="stat-card max-w-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold font-heading">E</div>
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground">Emily Parker</h2>
          <p className="text-sm text-muted-foreground">Student • Class 10-A</p>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { icon: Mail, label: 'Email', value: 'student@school.com' },
          { icon: UserCheck, label: 'Roll Number', value: '101' },
          { icon: School, label: 'Class & Section', value: 'Class 10 - Section A' },
          { icon: Calendar, label: 'Date of Birth', value: 'March 15, 2009' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <item.icon size={18} className="text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-medium text-foreground">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default StudentProfilePage;
