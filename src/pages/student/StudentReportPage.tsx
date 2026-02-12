import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StudentReportPage = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="page-header">Report Card</h1>
        <p className="page-subtitle">Academic Year 2025-2026 — Mid-Term</p>
      </div>
      <Button><Download size={16} className="mr-1.5" /> Download PDF</Button>
    </div>

    <div className="stat-card max-w-2xl">
      <div className="border-b border-border pb-4 mb-4">
        <h2 className="font-heading font-bold text-xl text-foreground">Emily Parker</h2>
        <p className="text-sm text-muted-foreground">Class 10-A • Roll No: 101 • Section: A</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div><p className="text-xs text-muted-foreground">GPA</p><p className="text-xl font-bold font-heading text-foreground">3.65</p></div>
        <div><p className="text-xs text-muted-foreground">Overall Grade</p><p className="text-xl font-bold font-heading text-foreground">A</p></div>
        <div><p className="text-xs text-muted-foreground">Class Rank</p><p className="text-xl font-bold font-heading text-foreground">#5 / 35</p></div>
        <div><p className="text-xs text-muted-foreground">Attendance</p><p className="text-xl font-bold font-heading text-foreground">92.5%</p></div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 text-muted-foreground font-medium">Subject</th>
            <th className="text-center py-2 text-muted-foreground font-medium">Marks</th>
            <th className="text-center py-2 text-muted-foreground font-medium">Grade</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: 'Mathematics', m: 88 }, { s: 'Science', m: 76 }, { s: 'English', m: 92 },
            { s: 'History', m: 81 }, { s: 'Physics', m: 85 }, { s: 'Chemistry', m: 79 },
          ].map((r, i) => (
            <tr key={i} className="border-b border-border/50">
              <td className="py-2 text-foreground">{r.s}</td>
              <td className="py-2 text-center text-foreground">{r.m}/100</td>
              <td className="py-2 text-center"><span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">{r.m >= 90 ? 'A+' : r.m >= 80 ? 'A' : r.m >= 70 ? 'B+' : 'B'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 pt-4 border-t border-border text-right">
        <p className="text-sm text-muted-foreground">Total: <span className="font-semibold text-foreground">501/600</span></p>
        <p className="text-sm text-muted-foreground">Percentage: <span className="font-semibold text-foreground">83.5%</span></p>
      </div>
    </div>
  </div>
);

export default StudentReportPage;
