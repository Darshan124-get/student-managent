import { useState, useEffect } from 'react';
import { Plus, Users, BookOpen } from 'lucide-react';
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
import { storage, ClassEntity } from '@/lib/storage';
import { toast } from "sonner";

const ClassesPage = () => {
  const [classes, setClasses] = useState<ClassEntity[]>([]);
  const [open, setOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    section: '',
    grade: '',
    teacher: '',
    students: 0,
    subjects: 0,
  });

  useEffect(() => {
    setClasses(storage.getClasses());
  }, []);

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    storage.addClass(newClass);
    setClasses(storage.getClasses());
    setOpen(false);
    setNewClass({
      name: '',
      section: '',
      grade: '',
      teacher: '',
      students: 0,
      subjects: 0,
    });
    toast.success("Class added successfully");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header">Class Management</h1>
          <p className="page-subtitle">Create and manage classes, sections, and assignments</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus size={16} className="mr-1.5" /> Add Class</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>Enter class details below.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddClass} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={newClass.name} onChange={e => setNewClass({ ...newClass, name: e.target.value })} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">Grade</Label>
                <Input id="grade" value={newClass.grade} onChange={e => setNewClass({ ...newClass, grade: e.target.value })} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="section" className="text-right">Section</Label>
                <Input id="section" value={newClass.section} onChange={e => setNewClass({ ...newClass, section: e.target.value })} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teacher" className="text-right">Teacher</Label>
                <Input id="teacher" value={newClass.teacher} onChange={e => setNewClass({ ...newClass, teacher: e.target.value })} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="students" className="text-right">Students</Label>
                <Input type="number" id="students" value={newClass.students} onChange={e => setNewClass({ ...newClass, students: parseInt(e.target.value) })} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subjects" className="text-right">Subjects</Label>
                <Input type="number" id="subjects" value={newClass.subjects} onChange={e => setNewClass({ ...newClass, subjects: parseInt(e.target.value) })} className="col-span-3" required />
              </div>
              <DialogFooter><Button type="submit">Save changes</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map(cls => (
          <div key={cls.id} className="stat-card cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-heading font-semibold text-foreground text-lg">{cls.name}</h3>
              <span className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium">Grade {cls.grade}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Homeroom: {cls.teacher}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Users size={14} /> {cls.students} students</span>
              <span className="flex items-center gap-1"><BookOpen size={14} /> {cls.subjects} subjects</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
