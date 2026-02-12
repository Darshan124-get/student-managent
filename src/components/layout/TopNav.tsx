import { useAuth } from '@/contexts/AuthContext';
import { Bell, Search } from 'lucide-react';

const TopNav = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 w-72">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="sm:hidden w-10" /> {/* spacer for mobile hamburger */}

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
            <Bell size={18} className="text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </button>
          <div className="flex items-center gap-2.5 pl-2 border-l border-border">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium leading-tight text-foreground">{user?.name}</p>
              <p className="text-[11px] text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
