export interface Student {
    id: number;
    name: string;
    class: string;
    rollNo: string;
    gpa: number;
    attendance: number;
    status: 'active' | 'inactive';
}

export interface ClassEntity {
    id: number;
    name: string;
    section: string;
    grade: string;
    teacher: string;
    students: number;
    subjects: number;
}

export interface Subject {
    id: number;
    name: string;
    code: string;
    teacher: string;
    classes: string[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'student';
    status: 'active' | 'inactive';
}

// Simple marks structure: key is studentId, value is object of subject scores
export interface MarksRecord {
    studentId: number;
    rollNo: string;
    name: string;
    math: number;
    science: number;
    english: number;
    history: number;
    physics: number;
}

export interface ResultRecord {
    id: number;
    studentId: number;
    name: string;
    class: string;
    total: number;
    pct: number;
    gpa: number;
    grade: string;
    rank: number;
    status: 'approved' | 'pending';
}

const STORAGE_KEYS = {
    STUDENTS: 'sms_students',
    CLASSES: 'sms_classes',
    SUBJECTS: 'sms_subjects',
    USERS: 'sms_users',
    MARKS: 'sms_marks',
    RESULTS: 'sms_results',
    ATTENDANCE: 'sms_attendance', // Keyed by date string, value is Record<studentId, status>
};

// --- Mock Data ---

const MOCK_STUDENTS: Student[] = [
    { id: 1, name: 'Emily Parker', class: '10-A', rollNo: '101', gpa: 3.65, attendance: 92, status: 'active' },
    { id: 2, name: 'Alex Martinez', class: '10-A', rollNo: '102', gpa: 3.45, attendance: 88, status: 'active' },
    { id: 3, name: 'Sarah Williams', class: '10-B', rollNo: '201', gpa: 3.80, attendance: 95, status: 'active' },
    { id: 4, name: 'David Lee', class: '11-A', rollNo: '301', gpa: 3.20, attendance: 85, status: 'active' },
    { id: 5, name: 'Jessica Brown', class: '11-A', rollNo: '302', gpa: 3.55, attendance: 91, status: 'active' },
    { id: 6, name: 'Michael Johnson', class: '12-A', rollNo: '401', gpa: 3.90, attendance: 97, status: 'active' },
    { id: 7, name: 'Rachel Green', class: '12-B', rollNo: '501', gpa: 2.90, attendance: 78, status: 'inactive' },
];

const MOCK_CLASSES: ClassEntity[] = [
    { id: 1, name: 'Class 10-A', section: 'A', grade: '10', teacher: 'Mr. James Wilson', students: 35, subjects: 6 },
    { id: 2, name: 'Class 10-B', section: 'B', grade: '10', teacher: 'Ms. Linda Chen', students: 32, subjects: 6 },
    { id: 3, name: 'Class 11-A', section: 'A', grade: '11', teacher: 'Mr. James Wilson', students: 28, subjects: 7 },
    { id: 4, name: 'Class 11-B', section: 'B', grade: '11', teacher: 'Mr. Robert Brown', students: 30, subjects: 7 },
    { id: 5, name: 'Class 12-A', section: 'A', grade: '12', teacher: 'Ms. Linda Chen', students: 25, subjects: 5 },
    { id: 6, name: 'Class 12-B', section: 'B', grade: '12', teacher: 'Mr. Robert Brown', students: 27, subjects: 5 },
];

const MOCK_SUBJECTS: Subject[] = [
    { id: 1, name: 'Mathematics', code: 'MATH101', teacher: 'Mr. James Wilson', classes: ['10-A', '10-B', '11-A'] },
    { id: 2, name: 'Science', code: 'SCI101', teacher: 'Ms. Linda Chen', classes: ['10-A', '10-B'] },
    { id: 3, name: 'English', code: 'ENG101', teacher: 'Mr. Robert Brown', classes: ['10-A', '10-B', '11-A', '11-B'] },
    { id: 4, name: 'Physics', code: 'PHY201', teacher: 'Ms. Linda Chen', classes: ['11-A', '11-B', '12-A'] },
    { id: 5, name: 'Chemistry', code: 'CHM201', teacher: 'Mr. Robert Brown', classes: ['11-A', '12-A', '12-B'] },
    { id: 6, name: 'History', code: 'HIS101', teacher: 'Mr. James Wilson', classes: ['10-A', '11-B'] },
];

const MOCK_USERS: User[] = [
    { id: 1, name: 'Dr. Sarah Johnson', email: 'admin@school.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Mr. James Wilson', email: 'teacher@school.com', role: 'teacher', status: 'active' },
    { id: 3, name: 'Ms. Linda Chen', email: 'linda@school.com', role: 'teacher', status: 'active' },
    { id: 4, name: 'Mr. Robert Brown', email: 'robert@school.com', role: 'teacher', status: 'inactive' },
    { id: 5, name: 'Emily Parker', email: 'student@school.com', role: 'student', status: 'active' },
    { id: 6, name: 'Alex Martinez', email: 'alex@school.com', role: 'student', status: 'active' },
    { id: 7, name: 'Sarah Williams', email: 'sarahw@school.com', role: 'student', status: 'active' },
    { id: 8, name: 'David Lee', email: 'david@school.com', role: 'student', status: 'inactive' },
];

const MOCK_MARKS: MarksRecord[] = [
    { studentId: 1, name: 'Emily Parker', rollNo: '101', math: 88, science: 76, english: 92, history: 81, physics: 85 },
    { studentId: 2, name: 'Alex Martinez', rollNo: '102', math: 72, science: 68, english: 85, history: 78, physics: 70 },
    { studentId: 3, name: 'Sarah Williams', rollNo: '201', math: 95, science: 89, english: 91, history: 85, physics: 92 },
    { studentId: 4, name: 'David Lee', rollNo: '301', math: 65, science: 72, english: 78, history: 60, physics: 68 },
    { studentId: 5, name: 'Jessica Brown', rollNo: '302', math: 82, science: 80, english: 88, history: 75, physics: 79 },
];

const MOCK_RESULTS: ResultRecord[] = [
    { id: 1, studentId: 1, name: 'Emily Parker', class: '10-A', total: 422, pct: 84.4, gpa: 3.65, grade: 'A', rank: 5, status: 'approved' },
    { id: 2, studentId: 3, name: 'Sarah Williams', class: '10-B', total: 452, pct: 90.4, gpa: 3.80, grade: 'A+', rank: 1, status: 'approved' },
    { id: 3, studentId: 6, name: 'Michael Johnson', class: '12-A', total: 465, pct: 93.0, gpa: 3.90, grade: 'A+', rank: 1, status: 'approved' },
    { id: 4, studentId: 2, name: 'Alex Martinez', class: '10-A', total: 373, pct: 74.6, gpa: 3.45, grade: 'B+', rank: 12, status: 'pending' },
    { id: 5, studentId: 4, name: 'David Lee', class: '11-A', total: 343, pct: 68.6, gpa: 3.20, grade: 'B', rank: 18, status: 'pending' },
    { id: 6, studentId: 7, name: 'Rachel Green', class: '12-B', total: 290, pct: 58.0, gpa: 2.90, grade: 'C+', rank: 25, status: 'pending' },
];


export const storage = {
    // --- Students ---
    getStudents: (): Student[] => {
        const stored = localStorage.getItem(STORAGE_KEYS.STUDENTS);
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(MOCK_STUDENTS));
            return MOCK_STUDENTS;
        }
        return JSON.parse(stored);
    },
    addStudent: (student: Omit<Student, 'id'>): Student => {
        const items = storage.getStudents();
        const newItem = { ...student, id: Date.now() };
        const updated = [...items, newItem];
        localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(updated));
        return newItem;
    },

    // --- Classes ---
    getClasses: (): ClassEntity[] => {
        const stored = localStorage.getItem(STORAGE_KEYS.CLASSES);
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(MOCK_CLASSES));
            return MOCK_CLASSES;
        }
        return JSON.parse(stored);
    },
    addClass: (cls: Omit<ClassEntity, 'id'>): ClassEntity => {
        const items = storage.getClasses();
        const newItem = { ...cls, id: Date.now() };
        const updated = [...items, newItem];
        localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(updated));
        return newItem;
    },

    // --- Subjects ---
    getSubjects: (): Subject[] => {
        const stored = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(MOCK_SUBJECTS));
            return MOCK_SUBJECTS;
        }
        return JSON.parse(stored);
    },
    addSubject: (subj: Omit<Subject, 'id'>): Subject => {
        const items = storage.getSubjects();
        const newItem = { ...subj, id: Date.now() };
        const updated = [...items, newItem];
        localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(updated));
        return newItem;
    },

    // --- Users ---
    getUsers: (): User[] => {
        const stored = localStorage.getItem(STORAGE_KEYS.USERS);
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MOCK_USERS));
            return MOCK_USERS;
        }
        return JSON.parse(stored);
    },
    addUser: (user: Omit<User, 'id'>): User => {
        const items = storage.getUsers();
        const newItem = { ...user, id: Date.now() };
        const updated = [...items, newItem];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
        return newItem;
    },
    updateUser: (user: User) => {
        const items = storage.getUsers();
        const index = items.findIndex(u => u.id === user.id);
        if (index !== -1) {
            items[index] = user;
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(items));
        }
    },
    deleteUser: (id: number) => {
        const items = storage.getUsers();
        const updated = items.filter(u => u.id !== id);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
    },

    // --- Marks ---
    getMarks: (): MarksRecord[] => {
        const stored = localStorage.getItem(STORAGE_KEYS.MARKS);
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.MARKS, JSON.stringify(MOCK_MARKS));
            return MOCK_MARKS;
        }
        return JSON.parse(stored);
    },
    saveMarks: (marks: MarksRecord[]) => {
        localStorage.setItem(STORAGE_KEYS.MARKS, JSON.stringify(marks));
    },

    // --- Results ---
    getResults: (): ResultRecord[] => {
        const stored = localStorage.getItem(STORAGE_KEYS.RESULTS);
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(MOCK_RESULTS));
            return MOCK_RESULTS;
        }
        return JSON.parse(stored);
    },
    updateResult: (updatedResult: ResultRecord) => {
        const items = storage.getResults();
        const index = items.findIndex(r => r.id === updatedResult.id);
        if (index !== -1) {
            items[index] = updatedResult;
            localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(items));
        }
    },

    // --- Attendance ---
    getAttendance: (date: string): Record<string, 'present' | 'absent' | 'late'> | null => {
        const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
        if (stored) {
            const allAttendance = JSON.parse(stored);
            return allAttendance[date] || null;
        }
        return null;
    },
    saveAttendance: (date: string, attendance: Record<string, 'present' | 'absent' | 'late'>) => {
        const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
        const allAttendance = stored ? JSON.parse(stored) : {};
        allAttendance[date] = attendance;
        localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(allAttendance));
    }
};
