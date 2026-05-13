import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, InsightCard, RadialProgress, Badge } from '../components/ui/Components';
import { getMetrics } from '../services/api';
import { Users, Database, AlertCircle, TrendingUp, Activity, CheckCircle2, ShieldAlert } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import toast from 'react-hot-toast';

const MetricWidget = ({ title, value, icon: Icon, trend, colorClass = "from-blue-500 to-blue-600", trendPos = true }) => (
  <Card glow topBorder className="hover:-translate-y-1 transition-transform duration-300">
    <CardContent className="flex items-center p-6">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mr-4 shadow-inner shadow-white/20`}>
        <Icon className="text-white" size={24} />
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">{title}</p>
        <h4 className="text-3xl font-extrabold text-navy mt-1 tracking-tight">{value}</h4>
      </div>
      {trend && (
        <div className={`text-xs font-bold px-2 py-1 rounded-full ${trendPos ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {trend}
        </div>
      )}
    </CardContent>
  </Card>
);

const ActivityItem = ({ title, time, type }) => {
  const isUpdate = type === 'update';
  return (
    <div className="flex gap-4 relative pb-6 last:pb-0">
      <div className="absolute left-[11px] top-6 bottom-0 w-px bg-slate-200 last:hidden"></div>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm z-10 ${isUpdate ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
        {isUpdate ? <Database size={10} /> : <CheckCircle2 size={10} />}
      </div>
      <div>
        <p className="text-sm font-medium text-navy">{title}</p>
        <p className="text-xs text-text-muted mt-0.5">{time}</p>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
        toast.error('Failed to load dashboard metrics');
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-slate-200 rounded w-1/4"></div>
      <div className="grid grid-cols-4 gap-6"><div className="h-32 bg-slate-200 rounded-2xl"></div><div className="h-32 bg-slate-200 rounded-2xl"></div><div className="h-32 bg-slate-200 rounded-2xl"></div><div className="h-32 bg-slate-200 rounded-2xl"></div></div>
      <div className="grid grid-cols-3 gap-6"><div className="col-span-2 h-96 bg-slate-200 rounded-2xl"></div><div className="h-96 bg-slate-200 rounded-2xl"></div></div>
    </div>
  );

  const incomeData = metrics?.income_label_distribution 
    ? Object.entries(metrics.income_label_distribution).map(([name, value]) => ({ name, value }))
    : [];

  const totalNulls = metrics?.null_value_counts ? Object.values(metrics.null_value_counts).reduce((a, b) => a + b, 0) : 0;
  const totalCells = (metrics?.total_records || 0) * 14;
  const completeness = totalCells > 0 ? (((totalCells - totalNulls) / totalCells) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-navy tracking-tight">Intelligence Overview</h1>
          <p className="text-text-muted mt-1 text-sm">Real-time metrics, pipeline health, and AI insights.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="green"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Pipeline Active</span></Badge>
          <Badge variant="indigo">v2.4.0 Model</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricWidget title="Total Records" value={metrics?.total_records?.toLocaleString() || '0'} icon={Database} trend="+12%" colorClass="from-blue-500 to-indigo-600" />
        <MetricWidget title="Data Quality" value={`${completeness}%`} icon={AlertCircle} trend={completeness > 95 ? "+1.2%" : "-0.5%"} trendPos={completeness > 95} colorClass="from-emerald-400 to-green-500" />
        <MetricWidget title="Predictions" value="1,204" icon={TrendingUp} trend="+4%" colorClass="from-purple-500 to-indigo-500" />
        <MetricWidget title="Model Latency" value="42ms" icon={Activity} trend="-5ms" colorClass="from-amber-400 to-orange-500" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Spans 2) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-96 flex flex-col relative overflow-hidden">
            {/* Soft background gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0 pointer-events-none"></div>
            
            <CardHeader title="Income Distribution Engine" subtitle="Target variable classification spread" />
            <CardContent className="flex-1 pb-8 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={36}>
                    {incomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#4f46e5' : '#b6f36a'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="h-[340px] flex flex-col">
              <CardHeader title="Null Value Anomalies" subtitle="Data quality scanner results" />
              <CardContent className="flex-1 overflow-auto p-0">
                 <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 sticky top-0 border-b border-slate-100">
                      <tr className="text-slate-500">
                        <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">Feature</th>
                        <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-right">Nulls</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {metrics?.null_value_counts && Object.entries(metrics.null_value_counts).map(([feature, count]) => (
                        <tr key={feature} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-3 font-medium text-navy capitalize flex items-center gap-2">
                             {count > 0 ? <ShieldAlert size={14} className="text-amber-500" /> : <CheckCircle2 size={14} className="text-green-500" />}
                             {feature.replace('_', ' ')}
                          </td>
                          <td className="px-6 py-3 text-right font-mono text-slate-600">{count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              </CardContent>
            </Card>

            <Card className="h-[340px] flex flex-col">
              <CardHeader title="AI Intelligent Insights" subtitle="Automated findings from the pipeline" />
              <CardContent className="flex-1 space-y-3 p-4 bg-slate-50/50">
                <InsightCard title="Classification Imbalance" message="The '>50K' class represents only 24% of the dataset. Consider SMOTE for the next training run." type="negative" />
                <InsightCard title="Data Quality Stable" message="Null values in 'occupation' have decreased by 14% since the last pipeline run." type="positive" />
                <InsightCard title="Feature Importance Shift" message="'Education' has overtaken 'Age' as the top predictive feature in the XGBoost tree." type="positive" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column (Spans 1) */}
        <div className="space-y-6">
          
          <Card className="bg-white border border-slate-100 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <CardHeader title={<span className="text-navy font-bold">Dataset Health</span>} />
            <CardContent className="flex justify-center py-8">
              <RadialProgress value={Math.round(parseFloat(completeness))} label="Overall Score" colorClass="text-accent-blue" bgClass="text-blue-50" />
            </CardContent>
            <div className="px-6 pb-6 pt-0">
               <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                 <div>
                   <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mb-1">Completeness</p>
                   <p className="text-lg font-bold text-navy">{completeness}%</p>
                 </div>
                 <div>
                   <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mb-1">Consistency</p>
                   <p className="text-lg font-bold text-navy">89.5%</p>
                 </div>
               </div>
            </div>
          </Card>

          <Card className="flex-1">
            <CardHeader title="Activity Feed" subtitle="Real-time pipeline logs" />
            <CardContent className="pt-2">
               <ActivityItem title="Batch Prediction Complete" time="2 minutes ago" type="success" />
               <ActivityItem title="Dataset 'census_raw' appended" time="1 hour ago" type="update" />
               <ActivityItem title="XGBoost v2.4.0 deployed" time="3 hours ago" type="success" />
               <ActivityItem title="Null value imputer executed" time="3 hours ago" type="update" />
               <ActivityItem title="Feature engineering pipeline ran" time="4 hours ago" type="update" />
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
