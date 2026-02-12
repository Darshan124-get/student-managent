import { useState } from 'react';
import { Search, Plus, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const students = [
  { id: 1, name: 'Emily Parker', class: '10-A', rollNo: '101', gpa: 3.65, attendance: 92, status: 'active' },
  { id: 2, name: 'Alex Martinez', class: '10-A', rollNo: '102', gpa: 3.45, attendance: 88, status: 'active' },
  { id: 3, name: 'Sarah Williams', class: '10-B', rollNo: '201', gpa: 3.80, attendance: 95, status: 'active' },
  { id: 4, name: 'David Lee', class: '11-A', rollNo: '301', gpa: 3.20, attendance: 85, status: 'active' },
  { id: 5, name: 'Jessica Brown', class: '11-A', rollNo: '302', gpa: 3.55, attendance: 91, status: 'active' },
  { id: 6, name: 'Michael Johnson', class: '12-A', rollNo: '401', gpa: 3.90, attendance: 97, status: 'active' },
  { id: 7, name: 'Rachel Green', class: '12-B', rollNo: '501', gpa: 2.90, attendance: 78, status: 'inactive' },
];

const StudentsPage = () => {
  const [search, setSearch] = useState('');
  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.class.includes(search) || s.rollNo.includes(search));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header">Student Management</h1>
          <p className="page-subtitle">View and manage all enrolled students</p>
        </div>
        <Button><Plus size={16} className="mr-1.5" /> Add Student</Button>
      </div>

      <div className="stat-card">
        <div className="relative mb-4 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name, class, roll no..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Student</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Roll No</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Class</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">GPA</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Attendance</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold"><GraduationCap size={14} /></div>
                      <span className="font-medium text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">{s.rollNo}</td>
                  <td className="py-3 px-3 text-foreground">{s.class}</td>
                  <td className="py-3 px-3 font-medium text-foreground">{s.gpa.toFixed(2)}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${s.attendance}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${s.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>{s.status}</span>
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

export default StudentsPage;
