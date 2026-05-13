import { motion } from 'framer-motion';
import { ArrowRight, Database, BrainCircuit, Activity, BarChart3, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import XGBoostSection from '../components/landing/XGBoostSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#0f172a] selection:bg-[#2563eb] selection:text-white">
      {/* Navbar */}
      <div className="pt-4 px-4 md:px-8 max-w-7xl mx-auto relative z-50">
        <nav className="flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border border-[#e2e8f0] shadow-sm shadow-[#0f172a]/5 rounded-[20px]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Activity size={20} className="text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-[#0f172a]">Nexora</span>
        </div>
        {/* <div className="hidden md:flex gap-10 text-sm font-medium text-[#475569]">
          <a href="#platform" className="hover:text-[#2563eb] transition-colors">Platform</a>
          <a href="#solutions" className="hover:text-[#2563eb] transition-colors">Solutions</a>
          <a href="#resources" className="hover:text-[#2563eb] transition-colors">Resources</a>
          <a href="#enterprise" className="hover:text-[#2563eb] transition-colors">Enterprise</a>
        </div> */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="hidden md:block text-sm font-medium text-[#475569] hover:text-[#0f172a] transition-colors">
            Sign In
          </Link>
          <Link to="/dashboard" className="px-5 py-2.5 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] transition-all shadow-md">
            Enter Dashboard
          </Link>
        </div>
        </nav>
      </div>

      {/* Hero Section */}
      <main className="relative max-w-7xl mx-auto px-8 pt-24 pb-32 grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e2e8f0] text-[#334155] font-medium text-xs mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
            </span>
            Nexora Enterprise AI v2.0 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 text-[#0f172a]">
            Intelligence for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#0ea5e9]">
              Census Data
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#475569] mb-10 max-w-lg leading-relaxed">
            Unify data engineering, machine learning, and real-time analytics in one enterprise-grade platform. Turn raw demographics into actionable business insights instantly.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link to="/dashboard" className="px-7 py-3.5 bg-[#2563eb] text-white font-medium rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-[#2563eb]/25 flex items-center gap-2">
              Start Exploring <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6 text-[#64748b] text-sm font-medium">
            <div className="flex items-center gap-2"><Shield size={16} className="text-[#4ade80]" /> SOC2 Compliant</div>
            <div className="flex items-center gap-2"><Zap size={16} className="text-[#f59e0b]" /> Sub-50ms Latency</div>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:ml-10"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#2563eb]/20 to-[#4ade80]/20 blur-[80px] rounded-full transform -translate-y-10"></div>

          <div className="relative bg-white border border-[#e2e8f0] shadow-2xl shadow-[#0f172a]/5 rounded-2xl overflow-hidden backdrop-blur-xl">
            {/* Mac-like header */}
            <div className="h-12 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-[#fca5a5]"></div>
              <div className="w-3 h-3 rounded-full bg-[#fcd34d]"></div>
              <div className="w-3 h-3 rounded-full bg-[#86efac]"></div>
              <div className="mx-auto text-xs font-medium text-[#94a3b8] flex items-center gap-2">
                <Shield size={12} /> secure.dataaxle.io
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-semibold text-lg text-[#0f172a] tracking-tight">Income Prediction Engine</h3>
                  <p className="text-sm text-[#64748b]">Live ML Model Inference</p>
                </div>
                <div className="bg-[#ecfdf5] text-[#059669] px-3 py-1 rounded-full text-xs font-semibold border border-[#a7f3d0]">
                  Model Active
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#64748b] font-medium uppercase tracking-wider">
                    <span>Processing Pipeline</span>
                    <span>100%</span>
                  </div>
                  <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] w-full rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#f8fafc] rounded-xl p-5 border border-[#e2e8f0]">
                    <BrainCircuit className="text-[#2563eb] mb-3" size={24} />
                    <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-1">Prediction</p>
                    <p className="text-2xl font-bold text-[#0f172a]">&gt;50K</p>
                  </div>
                  <div className="bg-[#f8fafc] rounded-xl p-5 border border-[#e2e8f0]">
                    <BarChart3 className="text-[#059669] mb-3" size={24} />
                    <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-1">Confidence</p>
                    <p className="text-2xl font-bold text-[#0f172a]">94.2%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </main>

      {/* XGBoost AI Engine Section */}
      <XGBoostSection />

      {/* Feature Highlight Section */}
      <section className="bg-white border-t border-[#e2e8f0] py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#0f172a] tracking-tight mb-4">Everything you need for census intelligence</h2>
            <p className="text-[#64748b] text-lg">A fully managed suite of tools designed for modern data teams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Real-time Analytics', desc: 'Visualize massive datasets instantly with our high-performance rendering engine.', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
              { title: 'Automated ML Pipelines', desc: 'Deploy predictive models without writing complex infrastructure code.', icon: BrainCircuit, color: 'text-purple-600', bg: 'bg-purple-50' },
              { title: 'Enterprise Data Quality', desc: 'Automatically detect anomalies, null values, and schema drifts.', icon: Database, color: 'text-green-600', bg: 'bg-green-50' }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${f.bg} ${f.color}`}>
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-3">{f.title}</h3>
                <p className="text-[#64748b] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-[#0f172a] text-white pt-20 pb-10 border-t border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <Activity size={18} className="text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">Nexora</span>
            </div>
            <p className="text-[#94a3b8] max-w-sm mb-6 leading-relaxed">
              The premier enterprise intelligence platform for demographic data engineering and predictive analytics.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1e293b] hover:bg-[#334155] cursor-pointer transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-[#1e293b] hover:bg-[#334155] cursor-pointer transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-[#1e293b] hover:bg-[#334155] cursor-pointer transition-colors"></div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-white tracking-wide">Product</h4>
            <ul className="space-y-4 text-[#94a3b8] text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Platform Overview</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data Engineering</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Machine Learning</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-white tracking-wide">Resources</h4>
            <ul className="space-y-4 text-[#94a3b8] text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-white tracking-wide">Company</h4>
            <ul className="space-y-4 text-[#94a3b8] text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-[#1e293b] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#64748b]">
          <p>© 2026 Nexora Intelligence Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
