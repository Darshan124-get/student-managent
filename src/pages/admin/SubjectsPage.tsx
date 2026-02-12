import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const subjects = [
  { id: 1, name: 'Mathematics', code: 'MATH101', teacher: 'Mr. James Wilson', classes: ['10-A', '10-B', '11-A'] },
  { id: 2, name: 'Science', code: 'SCI101', teacher: 'Ms. Linda Chen', classes: ['10-A', '10-B'] },
  { id: 3, name: 'English', code: 'ENG101', teacher: 'Mr. Robert Brown', classes: ['10-A', '10-B', '11-A', '11-B'] },
  { id: 4, name: 'Physics', code: 'PHY201', teacher: 'Ms. Linda Chen', classes: ['11-A', '11-B', '12-A'] },
  { id: 5, name: 'Chemistry', code: 'CHM201', teacher: 'Mr. Robert Brown', classes: ['11-A', '12-A', '12-B'] },
  { id: 6, name: 'History', code: 'HIS101', teacher: 'Mr. James Wilson', classes: ['10-A', '11-B'] },
];

const SubjectsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header">Subject Management</h1>
          <p className="page-subtitle">Manage subjects and teacher assignments</p>
        </div>
        <Button><Plus size={16} className="mr-1.5" /> Add Subject</Button>
      </div>

      <div className="stat-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Subject</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Code</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Teacher</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Classes</th>
                <th className="text-right py-3 px-3 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(s => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-3 font-medium text-foreground">{s.name}</td>
                  <td className="py-3 px-3 text-muted-foreground">{s.code}</td>
                  <td className="py-3 px-3 text-foreground">{s.teacher}</td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1">
                      {s.classes.map(c => (
                        <span key={c} className="text-xs px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
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

export default SubjectsPage;
