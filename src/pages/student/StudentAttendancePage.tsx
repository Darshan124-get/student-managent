import { Check, X, Minus } from 'lucide-react';

const attendanceData = [
  { date: 'Feb 10', day: 'Mon', status: 'present' },
  { date: 'Feb 9', day: 'Sun', status: 'holiday' },
  { date: 'Feb 8', day: 'Sat', status: 'holiday' },
  { date: 'Feb 7', day: 'Fri', status: 'present' },
  { date: 'Feb 6', day: 'Thu', status: 'present' },
  { date: 'Feb 5', day: 'Wed', status: 'absent' },
  { date: 'Feb 4', day: 'Tue', status: 'present' },
  { date: 'Feb 3', day: 'Mon', status: 'late' },
  { date: 'Jan 31', day: 'Fri', status: 'present' },
  { date: 'Jan 30', day: 'Thu', status: 'present' },
];

const statusStyle: Record<string, string> = {
  present: 'bg-success/10 text-success',
  absent: 'bg-destructive/10 text-destructive',
  late: 'bg-warning/10 text-warning',
  holiday: 'bg-muted text-muted-foreground',
};

const statusIcon: Record<string, React.ReactNode> = {
  present: <Check size={14} />,
  absent: <X size={14} />,
  late: <Minus size={14} />,
  holiday: <Minus size={14} />,
};

const StudentAttendancePage = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="page-header">My Attendance</h1>
      <p className="page-subtitle">Your attendance record for this term</p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="stat-card text-center">
        <p className="text-sm text-muted-foreground">Total Days</p>
        <p className="text-2xl font-bold font-heading text-foreground">120</p>
      </div>
      <div className="stat-card text-center">
        <p className="text-sm text-muted-foreground">Present</p>
        <p className="text-2xl font-bold font-heading text-success">111</p>
      </div>
      <div className="stat-card text-center">
        <p className="text-sm text-muted-foreground">Absent</p>
        <p className="text-2xl font-bold font-heading text-destructive">6</p>
      </div>
      <div className="stat-card text-center">
        <p className="text-sm text-muted-foreground">Percentage</p>
        <p className="text-2xl font-bold font-heading text-foreground">92.5%</p>
      </div>
    </div>

    <div className="stat-card">
      <h3 className="font-heading font-semibold text-foreground mb-4">Recent Attendance</h3>
      <div className="space-y-2">
        {attendanceData.map((d, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 transition-colors">
            <div>
              <p className="text-sm font-medium text-foreground">{d.date}</p>
              <p className="text-xs text-muted-foreground">{d.day}</p>
            </div>
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium capitalize ${statusStyle[d.status]}`}>
              {statusIcon[d.status]} {d.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default StudentAttendancePage;
