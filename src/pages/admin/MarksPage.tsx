import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Lock } from 'lucide-react';
import { storage, MarksRecord } from '@/lib/storage';
import { toast } from "sonner";

const MarksPage = () => {
  const [locked, setLocked] = useState(false);
  const [students, setStudents] = useState<MarksRecord[]>([]);

  useEffect(() => {
    setStudents(storage.getMarks());
  }, []);

  const handleSave = () => {
    storage.saveMarks(students);
    toast.success("Marks saved successfully");
  };

  const updateMark = (id: number, subject: keyof MarksRecord, value: number) => {
    setStudents(prev => prev.map(s =>
      s.studentId === id ? { ...s, [subject]: value } : s
    ));
  };

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
          <Button disabled={locked} onClick={handleSave}><Save size={16} className="mr-1.5" /> Save</Button>
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
                  <tr key={s.studentId} className="border-b border-border/50">
                    <td className="py-3 px-3 font-medium text-foreground">{s.name}</td>
                    <td className="py-3 px-3 text-muted-foreground">{s.rollNo}</td>
                    {(['math', 'science', 'english', 'history', 'physics'] as const).map(subj => (
                      <td key={subj} className="py-2 px-1 text-center">
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          value={s[subj]}
                          onChange={(e) => updateMark(s.studentId, subj, parseInt(e.target.value) || 0)}
                          disabled={locked}
                          className="w-16 mx-auto text-center h-8 text-sm"
                        />
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
