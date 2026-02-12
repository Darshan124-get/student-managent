const StudentMarksPage = () => {
  const marks = [
    { subject: 'Mathematics', marks: 88, total: 100, grade: 'A' },
    { subject: 'Science', marks: 76, total: 100, grade: 'B+' },
    { subject: 'English', marks: 92, total: 100, grade: 'A+' },
    { subject: 'History', marks: 81, total: 100, grade: 'A' },
    { subject: 'Physics', marks: 85, total: 100, grade: 'A' },
    { subject: 'Chemistry', marks: 79, total: 100, grade: 'B+' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">My Marks</h1>
        <p className="page-subtitle">View your subject-wise marks and grades</p>
      </div>
      <div className="stat-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Subject</th>
                <th className="text-center py-3 px-3 text-muted-foreground font-medium">Marks</th>
                <th className="text-center py-3 px-3 text-muted-foreground font-medium">Grade</th>
                <th className="text-center py-3 px-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((m, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-3 font-medium text-foreground">{m.subject}</td>
                  <td className="py-3 px-3 text-center text-foreground">{m.marks}/{m.total}</td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">{m.grade}</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">Pass</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentMarksPage;
