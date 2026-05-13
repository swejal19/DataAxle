import { motion } from 'framer-motion';
import { BrainCircuit, TrendingUp, ShieldCheck, Zap, GitBranch, Layers, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

const comparisonData = [
  { name: 'Logistic Regression', accuracy: 78, stability: 70, complexity: 30 },
  { name: 'Decision Tree', accuracy: 82, stability: 65, complexity: 45 },
  { name: 'Random Forest', accuracy: 89, stability: 85, complexity: 80 },
  { name: 'XGBoost', accuracy: 94, stability: 92, complexity: 75 },
];

const featureImportance = [
  { subject: 'Education', A: 95 },
  { subject: 'Occupation', A: 85 },
  { subject: 'Age', A: 75 },
  { subject: 'Capital Gain', A: 88 },
  { subject: 'Hours/Wk', A: 65 },
];

const XGBoostSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-[#e2e8f0]">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#2563eb]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: Content & Comparison */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-[#2563eb] font-medium text-xs mb-6 border border-blue-100 uppercase tracking-wider">
              <BrainCircuit size={14} /> Intelligence Architecture
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] leading-tight mb-6 tracking-tight">
              Why Nexora Uses <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#0ea5e9]">XGBoost</span>
            </h2>
            
            <p className="text-lg text-[#475569] mb-8 leading-relaxed">
              When processing complex demographic census data, traditional models fall short. We engineered our core prediction pipeline around XGBoost for its unparalleled accuracy, sophisticated handling of structured data, and dominant generalization capabilities.
            </p>

            {/* Comparison Cards */}
            <div className="space-y-4 mb-8">
              {[
                { title: 'Logistic Regression', desc: 'Simple baseline, but severely limited for capturing complex non-linear relationships.', icon: TrendingUp },
                { title: 'Decision Tree', desc: 'Easy to interpret structurally, but highly prone to overfitting on census noise.', icon: GitBranch },
                { title: 'Random Forest', desc: 'Strong ensemble performance, but computationally heavier and slower to iterate.', icon: Layers },
              ].map((model, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] opacity-70 grayscale-[50%]">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#e2e8f0] flex items-center justify-center shrink-0">
                    <model.icon size={18} className="text-[#64748b]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#334155]">{model.title}</h4>
                    <p className="text-xs text-[#64748b] leading-relaxed mt-1">{model.desc}</p>
                  </div>
                </div>
              ))}
              
              {/* XGBoost Highlighted Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex gap-4 p-5 rounded-xl border-2 border-[#2563eb]/20 bg-blue-50/50 relative overflow-hidden shadow-lg shadow-blue-500/10"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563eb]"></div>
                <div className="w-10 h-10 rounded-lg bg-[#2563eb] flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30">
                  <Zap size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0f172a] flex items-center gap-2">
                    XGBoost (Selected) <CheckCircle2 size={16} className="text-[#059669]" />
                  </h4>
                  <p className="text-sm text-[#475569] leading-relaxed mt-1 font-medium">
                    Industry-leading accuracy, advanced regularization to prevent overfitting, native handling of sparse structured census data, and lightning-fast optimization.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="bg-[#0f172a] rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <ShieldCheck size={100} />
               </div>
               <p className="text-white/90 text-lg font-medium relative z-10 leading-relaxed italic">
                 "XGBoost improved prediction performance and provided the most stable results across all our complex census income classification tasks."
               </p>
            </div>

          </motion.div>

          {/* RIGHT SIDE: Visualizations */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 relative"
          >
            {/* Performance Chart */}
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-xl shadow-[#0f172a]/5">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="font-bold text-[#0f172a]">Model Accuracy Comparison</h3>
                  <p className="text-xs text-[#64748b]">F1-Score / Accuracy Metrics</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-[#2563eb]">94%</span>
                  <p className="text-xs font-semibold text-[#059669] uppercase tracking-wider">Peak Accuracy</p>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} domain={[50, 100]} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }} 
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Bar dataKey="accuracy" radius={[6, 6, 0, 0]} barSize={40}>
                      {comparisonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.name === 'XGBoost' ? '#2563eb' : '#cbd5e1'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Feature Importance & Pipeline */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]"></div>
                <h3 className="font-bold text-[#0f172a] text-sm mb-1">Feature Importance</h3>
                <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-4">Native SHAP capability</p>
                <div className="h-40 w-full relative z-10 -ml-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="65%" data={featureImportance}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9 }} />
                      <Radar name="Impact" dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-[#0f172a] text-sm mb-1">Gradient Boosting</h3>
                  <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-4">Iterative Refinement</p>
                </div>
                
                <div className="space-y-3 relative">
                  <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-blue-100 z-0"></div>
                  
                  {[
                    { label: 'Base Learner', val: 'Err: 20%' },
                    { label: 'Residual Fit', val: 'Err: 12%' },
                    { label: 'Ensemble Opt.', val: 'Err: 6%' }
                  ].map((step, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (i * 0.2) }}
                      className="flex items-center gap-3 relative z-10"
                    >
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-[#2563eb] flex items-center justify-center shrink-0 shadow-sm text-xs font-bold text-[#2563eb]">
                        {i + 1}
                      </div>
                      <div className="bg-white border border-[#e2e8f0] rounded-lg px-3 py-1.5 flex-1 flex justify-between items-center shadow-sm">
                        <span className="text-xs font-semibold text-[#334155]">{step.label}</span>
                        <span className="text-[10px] font-mono text-[#059669]">{step.val}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default XGBoostSection;
