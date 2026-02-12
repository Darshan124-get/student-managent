import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const reportData = [
  { student: 'Emily P.', avg: 84 },
  { student: 'Alex M.', avg: 75 },
  { student: 'Sarah W.', avg: 90 },
  { student: 'David L.', avg: 69 },
  { student: 'Jessica B.', avg: 81 },
];

const TeacherReportsPage = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="page-header">Student Reports</h1>
      <p className="page-subtitle">Performance overview for your assigned students</p>
    </div>
    <div className="stat-card">
      <h3 className="font-heading font-semibold text-foreground mb-4">Average Performance by Student</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={reportData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="student" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
          <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
          <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default TeacherReportsPage;
