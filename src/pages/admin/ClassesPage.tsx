import { useState } from 'react';
import { Plus, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockClasses = [
  { id: 1, name: 'Class 10-A', section: 'A', grade: '10', teacher: 'Mr. James Wilson', students: 35, subjects: 6 },
  { id: 2, name: 'Class 10-B', section: 'B', grade: '10', teacher: 'Ms. Linda Chen', students: 32, subjects: 6 },
  { id: 3, name: 'Class 11-A', section: 'A', grade: '11', teacher: 'Mr. James Wilson', students: 28, subjects: 7 },
  { id: 4, name: 'Class 11-B', section: 'B', grade: '11', teacher: 'Mr. Robert Brown', students: 30, subjects: 7 },
  { id: 5, name: 'Class 12-A', section: 'A', grade: '12', teacher: 'Ms. Linda Chen', students: 25, subjects: 5 },
  { id: 6, name: 'Class 12-B', section: 'B', grade: '12', teacher: 'Mr. Robert Brown', students: 27, subjects: 5 },
];

const ClassesPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header">Class Management</h1>
          <p className="page-subtitle">Create and manage classes, sections, and assignments</p>
        </div>
        <Button><Plus size={16} className="mr-1.5" /> Add Class</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockClasses.map(cls => (
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
