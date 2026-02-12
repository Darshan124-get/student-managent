import { TrendingUp, Award, CalendarCheck, BookOpen } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const subjectMarks = [
  { subject: 'Math', marks: 88 }, { subject: 'Science', marks: 76 },
  { subject: 'English', marks: 92 }, { subject: 'History', marks: 81 },
  { subject: 'Physics', marks: 85 }, { subject: 'Chemistry', marks: 79 },
];

const attendanceData = [
  { month: 'Jul', pct: 96 }, { month: 'Aug', pct: 92 }, { month: 'Sep', pct: 88 },
  { month: 'Oct', pct: 95 }, { month: 'Nov', pct: 90 }, { month: 'Dec', pct: 94 },
];

const StudentDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Student Dashboard</h1>
        <p className="page-subtitle">Welcome back, Emily Parker!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="GPA" value="3.65" icon={TrendingUp} trend="0.12 increase" trendUp color="primary" />
        <StatCard title="Grade" value="A" icon={Award} color="accent" />
        <StatCard title="Class Rank" value="#5" icon={Award} color="warning" />
        <StatCard title="Attendance" value="92.5%" icon={CalendarCheck} color="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="stat-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">Subject-wise Marks</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={subjectMarks}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="subject" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Bar dataKey="marks" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">Monthly Attendance</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="pct" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Marks detail table */}
      <div className="stat-card">
        <h3 className="font-heading font-semibold text-foreground mb-4">Detailed Marks</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Subject</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Marks</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Grade</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {subjectMarks.map((s, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-3 font-medium text-foreground">{s.subject}</td>
                  <td className="py-3 px-3 text-foreground">{s.marks}/100</td>
                  <td className="py-3 px-3 text-foreground">{s.marks >= 90 ? 'A+' : s.marks >= 80 ? 'A' : s.marks >= 70 ? 'B' : 'C'}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">Pass</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
