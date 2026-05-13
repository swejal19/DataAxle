import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export const Card = ({ children, className = '', glow = false, topBorder = false }) => {
  return (
    <div className={`bg-surface rounded-2xl border border-border-soft shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden ${glow ? 'shadow-blue-500/5' : ''} ${className}`}>
      {topBorder && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue to-accent-indigo"></div>}
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action }) => {
  return (
    <div className="px-6 py-5 border-b border-border-soft flex items-center justify-between bg-slate-50/50">
      <div>
        <h3 className="text-lg font-semibold text-navy tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const Badge = ({ children, variant = 'gray' }) => {
  const variants = {
    gray: 'bg-slate-100 text-slate-600 border border-slate-200',
    blue: 'bg-blue-50 text-accent-blue border border-blue-100 shadow-sm shadow-blue-500/10',
    indigo: 'bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm shadow-indigo-500/10',
    green: 'bg-green-50 text-accent-green border border-green-100 shadow-sm shadow-green-500/10',
    red: 'bg-red-50 text-red-600 border border-red-100 shadow-sm shadow-red-500/10',
    navy: 'bg-navy/5 text-navy border border-navy/10',
    purple: 'bg-purple-50 text-purple-600 border border-purple-100 shadow-sm shadow-purple-500/10',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase ${variants[variant] || variants.gray}`}>
      {children}
    </span>
  );
};

export const InsightCard = ({ title, message, type = 'positive' }) => {
  const isPositive = type === 'positive';
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;
  
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={`p-4 rounded-xl border ${isPositive ? 'bg-gradient-to-br from-green-50 to-emerald-50/20 border-green-100' : 'bg-gradient-to-br from-amber-50 to-orange-50/20 border-amber-100'} shadow-sm`}
    >
      <div className="flex gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isPositive ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
          <Icon size={16} strokeWidth={3} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-navy">{title}</h4>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">{message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const RadialProgress = ({ value, label, colorClass = "text-accent-blue", bgClass = "text-blue-50" }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50" cy="50" r={radius}
            strokeWidth="8" fill="transparent"
            className={bgClass}
            stroke="currentColor"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50" cy="50" r={radius}
            strokeWidth="8" fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={colorClass}
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-navy">{value}%</span>
        </div>
      </div>
      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider mt-2">{label}</span>
    </div>
  );
};
