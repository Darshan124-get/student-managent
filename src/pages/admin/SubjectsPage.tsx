import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { storage, Subject } from '@/lib/storage';
import { toast } from "sonner";

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [open, setOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: '',
    code: '',
    teacher: '',
    classes: '', // Simplified for input as string, will split for storage if needed, but keeping simple for now
  });

  useEffect(() => {
    setSubjects(storage.getSubjects());
  }, []);

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const subjectData = {
      ...newSubject,
      classes: newSubject.classes.split(',').map(c => c.trim()),
    };
    if (newSubject.id) {
      storage.updateSubject(subjectData as Subject);
      toast.success("Subject updated successfully");
    } else {
      storage.addSubject(subjectData);
      toast.success("Subject added successfully");
    }
    setSubjects(storage.getSubjects());
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewSubject({
      id: undefined,
      name: '',
      code: '',
      teacher: '',
      classes: ''
    } as any);
  };

  const handleEdit = (subject: Subject) => {
    setNewSubject({
      ...subject,
      classes: subject.classes.join(', '),
    } as any);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      storage.deleteSubject(id);
      setSubjects(storage.getSubjects());
      toast.success("Subject deleted successfully");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header">Subject Management</h1>
          <p className="page-subtitle">Manage subjects and teacher assignments</p>
        </div>

        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus size={16} className="mr-1.5" /> Add Subject</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{newSubject.id ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
              <DialogDescription>{newSubject.id ? 'Update subject details.' : 'Enter subject details below.'}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSubject} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={newSubject.name} onChange={e => setNewSubject({ ...newSubject, name: e.target.value })} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">Code</Label>
                <Input id="code" value={newSubject.code} onChange={e => setNewSubject({ ...newSubject, code: e.target.value })} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teacher" className="text-right">Teacher</Label>
                <Input id="teacher" value={newSubject.teacher} onChange={e => setNewSubject({ ...newSubject, teacher: e.target.value })} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="classes" className="text-right">Classes</Label>
                <Input id="classes" value={newSubject.classes} onChange={e => setNewSubject({ ...newSubject, classes: e.target.value })} className="col-span-3" placeholder="e.g. 10-A, 10-B" required />
              </div>
              <DialogFooter><Button type="submit">Save changes</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(s)}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(s.id)}>Delete</Button>
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
