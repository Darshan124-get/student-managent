import { useState, useEffect } from 'react';
import { Search, Plus, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { storage, Student } from '@/lib/storage';
import { toast } from "sonner";

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    rollNo: '',
    gpa: 0,
    attendance: 0,
    status: 'active' as const,
  });

  useEffect(() => {
    setStudents(storage.getStudents());
  }, []);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    storage.addStudent(newStudent);
    setStudents(storage.getStudents());
    setOpen(false);
    setNewStudent({
      name: '',
      class: '',
      rollNo: '',
      gpa: 0,
      attendance: 0,
      status: 'active',
    });
    toast.success("Student added successfully");
  };

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.class.includes(search) || s.rollNo.includes(search));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header">Student Management</h1>
          <p className="page-subtitle">View and manage all enrolled students</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus size={16} className="mr-1.5" /> Add Student</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Enter the details of the new student here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddStudent} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rollNo" className="text-right">
                  Roll No
                </Label>
                <Input
                  id="rollNo"
                  value={newStudent.rollNo}
                  onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">
                  Class
                </Label>
                <Input
                  id="class"
                  value={newStudent.class}
                  onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gpa" className="text-right">
                  GPA
                </Label>
                <Input
                  id="gpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={newStudent.gpa}
                  onChange={(e) => setNewStudent({ ...newStudent, gpa: parseFloat(e.target.value) })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="attendance" className="text-right">
                  Attendance (%)
                </Label>
                <Input
                  id="attendance"
                  type="number"
                  min="0"
                  max="100"
                  value={newStudent.attendance}
                  onChange={(e) => setNewStudent({ ...newStudent, attendance: parseInt(e.target.value) })}
                  className="col-span-3"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
