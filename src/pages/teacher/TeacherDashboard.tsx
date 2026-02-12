import { School, BookOpen, Users, CalendarCheck } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const classPerformance = [
  { class: '10-A', avg: 82 }, { class: '10-B', avg: 75 }, { class: '11-A', avg: 88 },
];

const subjectRadar = [
  { subject: 'Math', score: 85 }, { subject: 'Science', score: 78 },
  { subject: 'English', score: 92 }, { subject: 'History', score: 70 },
  { subject: 'Physics', score: 80 },
];

const assignedClasses = [
  { name: 'Class 10-A', subject: 'Mathematics', students: 35, time: 'Mon, Wed, Fri - 9:00 AM' },
  { name: 'Class 10-B', subject: 'Mathematics', students: 32, time: 'Tue, Thu - 10:00 AM' },
  { name: 'Class 11-A', subject: 'Advanced Math', students: 28, time: 'Mon, Wed - 2:00 PM' },
];

const TeacherDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Teacher Dashboard</h1>
        <p className="page-subtitle">Welcome back, Mr. James Wilson!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Assigned Classes" value="3" icon={School} color="primary" />
        <StatCard title="Subjects" value="2" icon={BookOpen} color="accent" />
        <StatCard title="Total Students" value="95" icon={Users} color="warning" />
        <StatCard title="Attendance Today" value="91%" icon={CalendarCheck} trend="2% up" trendUp color="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="stat-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">Class Performance</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={classPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="class" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">Subject Analysis</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={subjectRadar}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <PolarRadiusAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
              <Radar dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="stat-card">
        <h3 className="font-heading font-semibold text-foreground mb-4">Assigned Classes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Class</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Subject</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Students</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Schedule</th>
              </tr>
            </thead>
            <tbody>
              {assignedClasses.map((cls, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-3 font-medium text-foreground">{cls.name}</td>
                  <td className="py-3 px-3 text-foreground">{cls.subject}</td>
                  <td className="py-3 px-3 text-foreground">{cls.students}</td>
                  <td className="py-3 px-3 text-muted-foreground">{cls.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
