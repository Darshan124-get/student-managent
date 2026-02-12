import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      // Navigate based on role
      navigate(`/${user.role}`);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (email: string, pass: string) => {
    setEmail(email);
    setPassword(pass);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left - branding */}
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-foreground/20 mb-8">
            <GraduationCap size={40} className="text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-primary-foreground mb-4">Student Management System</h1>
          <p className="text-primary-foreground/80 text-lg">A modern, enterprise-grade platform for managing academic operations efficiently.</p>
        </div>
      </div>

      {/* Right - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap size={22} className="text-primary-foreground" />
            </div>
            <h1 className="text-xl font-heading font-bold text-foreground">StudentMS</h1>
          </div>

          <h2 className="text-2xl font-heading font-bold text-foreground">Welcome back</h2>
          <p className="text-muted-foreground mt-1 mb-6">Sign in to your account to continue</p>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-lg mb-4 border border-destructive/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@school.com"
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 size={16} className="animate-spin mr-2" />}
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3">Quick demo login:</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => quickLogin('admin@school.com', 'admin123')} className="text-xs px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium transition-colors">Admin</button>
              <button onClick={() => quickLogin('teacher@school.com', 'teacher123')} className="text-xs px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium transition-colors">Teacher</button>
              <button onClick={() => quickLogin('student@school.com', 'student123')} className="text-xs px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium transition-colors">Student</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
