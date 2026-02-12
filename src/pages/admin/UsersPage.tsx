import { useState } from 'react';
import { Search, Plus, MoreHorizontal, UserCheck, UserX, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockUsers = [
  { id: 1, name: 'Dr. Sarah Johnson', email: 'admin@school.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Mr. James Wilson', email: 'teacher@school.com', role: 'teacher', status: 'active' },
  { id: 3, name: 'Ms. Linda Chen', email: 'linda@school.com', role: 'teacher', status: 'active' },
  { id: 4, name: 'Mr. Robert Brown', email: 'robert@school.com', role: 'teacher', status: 'inactive' },
  { id: 5, name: 'Emily Parker', email: 'student@school.com', role: 'student', status: 'active' },
  { id: 6, name: 'Alex Martinez', email: 'alex@school.com', role: 'student', status: 'active' },
  { id: 7, name: 'Sarah Williams', email: 'sarahw@school.com', role: 'student', status: 'active' },
  { id: 8, name: 'David Lee', email: 'david@school.com', role: 'student', status: 'inactive' },
];

const UsersPage = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filtered = mockUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header">User Management</h1>
          <p className="page-subtitle">Manage teachers, students, and administrators</p>
        </div>
        <Button><Plus size={16} className="mr-1.5" /> Add User</Button>
      </div>

      <div className="stat-card">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2">
            {['all', 'admin', 'teacher', 'student'].map(r => (
              <button key={r} onClick={() => setRoleFilter(r)} className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${roleFilter === r ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>{r}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Name</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Email</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Role</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Status</th>
                <th className="text-right py-3 px-3 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">{u.name.charAt(0)}</div>
                      <span className="font-medium text-foreground">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">{u.email}</td>
                  <td className="py-3 px-3"><span className="capitalize text-foreground">{u.role}</span></td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${u.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>{u.status}</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="Toggle status"><UserCheck size={15} className="text-muted-foreground" /></button>
                      <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="Reset password"><KeyRound size={15} className="text-muted-foreground" /></button>
                      <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="More"><MoreHorizontal size={15} className="text-muted-foreground" /></button>
                    </div>
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

export default UsersPage;
