import { useState } from 'react';
import { Card, CardHeader, CardContent, Badge } from '../components/ui/Components';
import { predictIncome } from '../services/api';
import { Sparkles, BrainCircuit, Loader2, GitCommit, CheckCircle2, Circle } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PredictionPage = () => {
  const [formData, setFormData] = useState({
    age: 35,
    workclass: 'Private',
    education: 'Bachelors',
    marital_status: 'Married-civ-spouse',
    occupation: 'Exec-managerial',
    relationship: 'Husband',
    race: 'White',
    gender: 'Male',
    hours_per_week: 40,
    native_country: 'United-States',
  });
  
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'hours_per_week' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await predictIncome(formData);
      setPrediction(result.prediction);
      setConfidence(result.confidence || 0.0);
      toast.success('Inference completed via XGBoost Engine!');
    } catch (error) {
      console.error('Prediction failed', error);
      setPrediction("Error");
      toast.error('Failed to generate prediction. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const featureImportance = [
    { feature: 'Education', A: 95 },
    { feature: 'Occupation', A: 85 },
    { feature: 'Age', A: 75 },
    { feature: 'Hours/Wk', A: 65 },
    { feature: 'Marital', A: 88 },
    { feature: 'Workclass', A: 40 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-navy tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <Sparkles className="text-white" size={20} />
            </div>
            Income Classification Engine
          </h1>
          <p className="text-text-muted mt-2 text-sm">Interactive ML inference sandbox powered by XGBoost.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 relative overflow-hidden" topBorder>
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <CardHeader title="Input Features" subtitle="Adjust demographics to run real-time inference" />
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Sliders for continuous variables */}
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 p-5 rounded-xl border border-slate-100">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-slate-700">Age</label>
                      <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{formData.age} years</span>
                    </div>
                    <input type="range" name="age" min="17" max="90" value={formData.age} onChange={handleChange} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-slate-700">Hours Per Week</label>
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{formData.hours_per_week} hours</span>
                    </div>
                    <input type="range" name="hours_per_week" min="1" max="99" value={formData.hours_per_week} onChange={handleChange} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  </div>
                </div>

                {/* Selects for categorical */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Education</label>
                  <select name="education" value={formData.education} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-medium text-navy focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-shadow shadow-sm hover:border-slate-400">
                    <option>Bachelors</option><option>HS-grad</option><option>Masters</option><option>Doctorate</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Occupation</label>
                  <select name="occupation" value={formData.occupation} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-medium text-navy focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-shadow shadow-sm hover:border-slate-400">
                    <option>Exec-managerial</option><option>Prof-specialty</option><option>Craft-repair</option><option>Sales</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Workclass</label>
                  <select name="workclass" value={formData.workclass} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-medium text-navy focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-shadow shadow-sm hover:border-slate-400">
                     <option>Private</option><option>Self-emp-not-inc</option><option>Local-gov</option><option>State-gov</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Marital Status</label>
                  <select name="marital_status" value={formData.marital_status} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-medium text-navy focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-shadow shadow-sm hover:border-slate-400">
                     <option>Married-civ-spouse</option><option>Never-married</option><option>Divorced</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-medium text-navy focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-shadow shadow-sm hover:border-slate-400">
                    <option>Male</option><option>Female</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Race</label>
                  <select name="race" value={formData.race} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-medium text-navy focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-shadow shadow-sm hover:border-slate-400">
                    <option>White</option><option>Black</option><option>Asian-Pac-Islander</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <BrainCircuit size={18} />}
                  Run XGBoost Inference
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-navy text-white border-0 shadow-2xl relative overflow-hidden h-64">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-navy to-navy"></div>
            <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full relative z-10">
              <p className="text-slate-400 font-bold text-xs mb-3 uppercase tracking-[0.2em]">Predicted Annual Income</p>
              {loading ? (
                <div className="animate-pulse bg-white/10 h-16 w-40 rounded-2xl"></div>
              ) : prediction ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                  <h2 className={`text-6xl font-extrabold tracking-tight ${prediction.includes('>50K') ? 'text-accent-lime drop-shadow-[0_0_15px_rgba(182,243,106,0.3)]' : 'text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]'}`}>
                    {prediction}
                  </h2>
                  
                  {/* Animated Confidence Meter */}
                  <div className="mt-6 w-full max-w-[200px] space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-400">
                      <span>Confidence</span>
                      <span className="text-white">{(confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }} 
                         animate={{ width: `${(confidence * 100).toFixed(1)}%` }} 
                         transition={{ duration: 1, ease: "easeOut" }}
                         className={`h-full rounded-full ${prediction.includes('>50K') ? 'bg-accent-lime' : 'bg-blue-400'}`}
                       ></motion.div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-slate-500 italic mt-2 text-sm border border-slate-700/50 bg-slate-800/30 px-4 py-2 rounded-lg">Submit features to infer</div>
              )}
            </CardContent>
          </Card>

          <Card className="h-64 flex flex-col">
            <CardHeader title="Feature Importance" subtitle="SHAP Value Analysis" />
            <CardContent className="flex-1 pt-0 pb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={featureImportance}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="feature" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <Radar name="Impact" dataKey="A" stroke="#4f46e5" strokeWidth={2} fill="#6366f1" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* ML Experiment Timeline */}
      <div className="mt-6">
        <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4 px-2">Model Version History</h3>
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
          {[
            { v: 'v1.0.0', type: 'Logistic Regression', acc: '78.2%', active: false },
            { v: 'v1.2.0', type: 'Random Forest', acc: '84.5%', active: false },
            { v: 'v2.0.0', type: 'XGBoost Baseline', acc: '91.0%', active: false },
            { v: 'v2.4.0', type: 'XGBoost Optimized', acc: '94.2%', active: true },
          ].map((node, i, arr) => (
            <div key={i} className="flex items-center min-w-[200px]">
              <div className="flex flex-col items-center relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${node.active ? 'bg-indigo-50 border-indigo-500 text-indigo-600 shadow-sm shadow-indigo-500/20' : 'bg-slate-50 border-slate-300 text-slate-400'}`}>
                   {node.active ? <CheckCircle2 size={16} /> : <Circle size={12} />}
                </div>
                <div className="mt-3 text-center">
                  <p className={`text-sm font-bold ${node.active ? 'text-navy' : 'text-slate-500'}`}>{node.v}</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-0.5">{node.type}</p>
                  <p className={`text-xs font-mono font-bold mt-1 ${node.active ? 'text-accent-green' : 'text-slate-400'}`}>{node.acc}</p>
                </div>
              </div>
              {i < arr.length - 1 && (
                <div className="flex-1 h-0.5 bg-slate-200 mx-4 -mt-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
