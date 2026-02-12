import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Lock } from 'lucide-react';

const students = [
  { id: 1, name: 'Emily Parker', rollNo: '101', math: 88, science: 76, english: 92, history: 81, physics: 85 },
  { id: 2, name: 'Alex Martinez', rollNo: '102', math: 72, science: 68, english: 85, history: 78, physics: 70 },
  { id: 3, name: 'Sarah Williams', rollNo: '201', math: 95, science: 89, english: 91, history: 85, physics: 92 },
  { id: 4, name: 'David Lee', rollNo: '301', math: 65, science: 72, english: 78, history: 60, physics: 68 },
  { id: 5, name: 'Jessica Brown', rollNo: '302', math: 82, science: 80, english: 88, history: 75, physics: 79 },
];

const MarksPage = () => {
  const [locked, setLocked] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header">Marks Management</h1>
          <p className="page-subtitle">Enter and manage student marks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setLocked(!locked)}>
            <Lock size={16} className="mr-1.5" /> {locked ? 'Unlock' : 'Lock'} Marks
          </Button>
          <Button disabled={locked}><Save size={16} className="mr-1.5" /> Save</Button>
        </div>
      </div>

      {locked && (
        <div className="bg-warning/10 text-warning text-sm px-4 py-3 rounded-lg border border-warning/20">
          Marks are locked. Unlock to make changes.
        </div>
      )}

      <div className="stat-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Student</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Roll No</th>
                <th className="text-center py-3 px-2 text-muted-foreground font-medium">Math</th>
                <th className="text-center py-3 px-2 text-muted-foreground font-medium">Science</th>
                <th className="text-center py-3 px-2 text-muted-foreground font-medium">English</th>
                <th className="text-center py-3 px-2 text-muted-foreground font-medium">History</th>
                <th className="text-center py-3 px-2 text-muted-foreground font-medium">Physics</th>
                <th className="text-center py-3 px-2 text-muted-foreground font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const total = s.math + s.science + s.english + s.history + s.physics;
                return (
                  <tr key={s.id} className="border-b border-border/50">
                    <td className="py-3 px-3 font-medium text-foreground">{s.name}</td>
                    <td className="py-3 px-3 text-muted-foreground">{s.rollNo}</td>
                    {['math', 'science', 'english', 'history', 'physics'].map(subj => (
                      <td key={subj} className="py-2 px-1 text-center">
                        <Input type="number" min={0} max={100} defaultValue={(s as any)[subj]} disabled={locked} className="w-16 mx-auto text-center h-8 text-sm" />
                      </td>
                    ))}
                    <td className="py-3 px-2 text-center font-semibold text-foreground">{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarksPage;
