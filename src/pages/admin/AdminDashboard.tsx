import { Users, GraduationCap, School, CalendarCheck, TrendingUp, Award } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const performanceData = [
  { month: 'Jan', avg: 72 }, { month: 'Feb', avg: 75 }, { month: 'Mar', avg: 68 },
  { month: 'Apr', avg: 80 }, { month: 'May', avg: 78 }, { month: 'Jun', avg: 85 },
];

const passFailData = [
  { class: '10-A', pass: 32, fail: 3 }, { class: '10-B', pass: 28, fail: 7 },
  { class: '11-A', pass: 30, fail: 5 }, { class: '11-B', pass: 25, fail: 10 },
  { class: '12-A', pass: 35, fail: 2 }, { class: '12-B', pass: 29, fail: 6 },
];

const gradeDistribution = [
  { name: 'A+', value: 45, color: 'hsl(142, 71%, 45%)' },
  { name: 'A', value: 80, color: 'hsl(217, 91%, 60%)' },
  { name: 'B', value: 120, color: 'hsl(38, 92%, 50%)' },
  { name: 'C', value: 60, color: 'hsl(262, 83%, 58%)' },
  { name: 'F', value: 15, color: 'hsl(0, 84%, 60%)' },
];

const recentActivity = [
  { action: 'Marks uploaded for Class 10-A Math', time: '2 hours ago', type: 'marks' },
  { action: 'New student Emily Parker enrolled', time: '5 hours ago', type: 'student' },
  { action: 'Attendance marked for Class 12-B', time: '1 day ago', type: 'attendance' },
  { action: 'Results approved for Mid-term Exam', time: '2 days ago', type: 'result' },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Admin Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's your school overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Students" value="1,247" icon={GraduationCap} trend="12% from last year" trendUp color="primary" />
        <StatCard title="Total Teachers" value="64" icon={Users} trend="3 new this term" trendUp color="accent" />
        <StatCard title="Classes" value="42" icon={School} color="warning" />
        <StatCard title="Attendance" value="94.2%" icon={CalendarCheck} trend="1.5% improvement" trendUp color="accent" />
        <StatCard title="Avg GPA" value="3.42" icon={TrendingUp} trend="0.15 increase" trendUp color="primary" />
        <StatCard title="Toppers" value="45" icon={Award} color="warning" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Performance trend */}
        <div className="stat-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">Student Performance Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 13 }} />
              <Line type="monotone" dataKey="avg" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: 'hsl(var(--primary))', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pass vs Fail */}
        <div className="stat-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">Pass vs Fail by Class</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={passFailData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="class" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 13 }} />
              <Bar dataKey="pass" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fail" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Grade distribution */}
        <div className="stat-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                {gradeDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-3 mt-2">
            {gradeDistribution.map(g => (
              <span key={g.name} className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.color }} />
                {g.name}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="stat-card lg:col-span-2">
          <h3 className="font-heading font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
