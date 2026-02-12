import { useState } from 'react';
import { Check, X, Minus } from 'lucide-react';

const students = [
  'Emily Parker', 'Alex Martinez', 'Sarah Williams', 'David Lee', 'Jessica Brown',
  'Michael Johnson', 'Rachel Green', 'Tom Harris',
];

type Status = 'present' | 'absent' | 'late';

const AttendancePage = () => {
  const [date] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, Status>>(
    Object.fromEntries(students.map(s => [s, 'present']))
  );

  const toggle = (name: string) => {
    setAttendance(prev => {
      const current = prev[name];
      const next: Status = current === 'present' ? 'absent' : current === 'absent' ? 'late' : 'present';
      return { ...prev, [name]: next };
    });
  };

  const statusConfig: Record<Status, { icon: React.ReactNode; bg: string }> = {
    present: { icon: <Check size={14} />, bg: 'bg-success text-success-foreground' },
    absent: { icon: <X size={14} />, bg: 'bg-destructive text-destructive-foreground' },
    late: { icon: <Minus size={14} />, bg: 'bg-warning text-warning-foreground' },
  };

  const counts = { present: 0, absent: 0, late: 0 };
  Object.values(attendance).forEach(s => counts[s]++);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Attendance Management</h1>
        <p className="page-subtitle">Mark daily attendance — {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      {/* Summary */}
      <div className="flex gap-3">
        <span className="px-3 py-1.5 rounded-lg bg-success/10 text-success text-sm font-medium">Present: {counts.present}</span>
        <span className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">Absent: {counts.absent}</span>
        <span className="px-3 py-1.5 rounded-lg bg-warning/10 text-warning text-sm font-medium">Late: {counts.late}</span>
      </div>

      <div className="stat-card">
        <div className="space-y-2">
          {students.map(name => {
            const status = attendance[name];
            const config = statusConfig[status];
            return (
              <div key={name} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">{name.charAt(0)}</div>
                  <span className="font-medium text-foreground text-sm">{name}</span>
                </div>
                <button
                  onClick={() => toggle(name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${config.bg} capitalize`}
                >
                  {config.icon} {status}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
