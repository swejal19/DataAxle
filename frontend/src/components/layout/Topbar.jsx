import { Search, Bell, Command, ChevronDown } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="h-16 bg-bg-main/80 backdrop-blur-xl border-b border-border-soft flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          placeholder="Search records, features, or metrics..."
          className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all shadow-sm"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50">
           <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded">⌘</kbd>
           <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded">K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-5 pl-4">
        <button className="relative p-2 text-slate-400 hover:text-navy hover:bg-slate-100 rounded-lg transition-all">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-blue rounded-full border border-white"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-blue to-accent-indigo p-[2px] shadow-sm">
            <div className="w-full h-full bg-white rounded-md overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=NexoraAdmin" alt="User Avatar" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div>
              <p className="text-sm font-semibold text-navy leading-none group-hover:text-accent-blue transition-colors">Admin User</p>
              <p className="text-[10px] text-text-muted mt-1 font-medium uppercase tracking-wider">Data Engineer</p>
            </div>
            <ChevronDown size={14} className="text-slate-400 ml-1" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
