import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Database, Activity, BarChart3, Settings, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Census Records', icon: Database, path: '/records' },
    { name: 'Predictions', icon: Activity, path: '/predict' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-50">
      <Link to="/" className="p-6 flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-9 h-9 bg-gradient-to-br from-accent-blue to-accent-indigo rounded-xl flex items-center justify-center shadow-md shadow-blue-500/10 border border-blue-100">
          <Activity size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold text-navy tracking-tight">Nexora</span>
      </Link>

      <div className="px-6 py-2">
        <div className="bg-green-50/80 border border-green-200/50 rounded-xl p-3 flex items-center gap-3 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></div>
          <span className="text-xs font-semibold text-green-700">Model Endpoint Active</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Platform Controls</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative ${
                  isActive
                    ? 'bg-blue-50 text-accent-blue font-semibold border border-blue-100/50 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-navy border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-6 bg-accent-blue rounded-r-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <Icon size={18} className={isActive ? 'text-accent-blue' : 'text-slate-400 group-hover:text-slate-600'} />
                  {item.name}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="mb-4 px-3 py-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100/50 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-700 text-sm font-semibold mb-1">
            <Zap size={14} className="text-indigo-500" /> Upgrade to Pro
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Unlock distributed training and unmetered API calls.</p>
        </div>
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-slate-500 hover:bg-slate-50 hover:text-navy transition-colors font-medium">
          <Settings size={18} className="text-slate-400" />
          <span className="text-sm">Workspace Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
