import { Award, Download, CheckCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const results = [
  { id: 1, name: 'Emily Parker', class: '10-A', total: 422, pct: 84.4, gpa: 3.65, grade: 'A', rank: 5, status: 'approved' },
  { id: 2, name: 'Sarah Williams', class: '10-B', total: 452, pct: 90.4, gpa: 3.80, grade: 'A+', rank: 1, status: 'approved' },
  { id: 3, name: 'Michael Johnson', class: '12-A', total: 465, pct: 93.0, gpa: 3.90, grade: 'A+', rank: 1, status: 'approved' },
  { id: 4, name: 'Alex Martinez', class: '10-A', total: 373, pct: 74.6, gpa: 3.45, grade: 'B+', rank: 12, status: 'pending' },
  { id: 5, name: 'David Lee', class: '11-A', total: 343, pct: 68.6, gpa: 3.20, grade: 'B', rank: 18, status: 'pending' },
  { id: 6, name: 'Rachel Green', class: '12-B', total: 290, pct: 58.0, gpa: 2.90, grade: 'C+', rank: 25, status: 'pending' },
];

const ResultsPage = () => {
  const passCount = results.filter(r => r.pct >= 40).length;
  const passPct = ((passCount / results.length) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header">Results & Reports</h1>
          <p className="page-subtitle">View, approve, and export student results</p>
        </div>
        <Button variant="outline"><Download size={16} className="mr-1.5" /> Export PDF</Button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="stat-card text-center">
          <p className="text-sm text-muted-foreground">Pass Rate</p>
          <p className="text-2xl font-bold font-heading text-foreground">{passPct}%</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-sm text-muted-foreground">Class Topper</p>
          <p className="text-lg font-bold font-heading text-foreground">Sarah W.</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-sm text-muted-foreground">Highest GPA</p>
          <p className="text-2xl font-bold font-heading text-foreground">3.90</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="text-2xl font-bold font-heading text-foreground">{results.filter(r => r.status === 'approved').length}/{results.length}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Student</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Class</th>
                <th className="text-center py-3 px-3 text-muted-foreground font-medium">Total</th>
                <th className="text-center py-3 px-3 text-muted-foreground font-medium">%</th>
                <th className="text-center py-3 px-3 text-muted-foreground font-medium">GPA</th>
                <th className="text-center py-3 px-3 text-muted-foreground font-medium">Grade</th>
                <th className="text-center py-3 px-3 text-muted-foreground font-medium">Rank</th>
                <th className="text-center py-3 px-3 text-muted-foreground font-medium">Status</th>
                <th className="text-right py-3 px-3 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      {r.rank <= 3 && <Award size={14} className="text-warning" />}
                      <span className="font-medium text-foreground">{r.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-foreground">{r.class}</td>
                  <td className="py-3 px-3 text-center text-foreground">{r.total}/500</td>
                  <td className="py-3 px-3 text-center font-medium text-foreground">{r.pct}%</td>
                  <td className="py-3 px-3 text-center font-semibold text-foreground">{r.gpa}</td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">{r.grade}</span></td>
                  <td className="py-3 px-3 text-center text-foreground">#{r.rank}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${r.status === 'approved' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                      {r.status === 'approved' ? <CheckCircle size={12} /> : <Lock size={12} />}
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {r.status === 'pending' && <Button size="sm" variant="outline">Approve</Button>}
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

export default ResultsPage;
