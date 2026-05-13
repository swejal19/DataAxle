import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Components';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { getMetrics } from '../services/api';
import toast from 'react-hot-toast';

const AnalyticsPage = () => {
  const [metrics, setMetrics] = useState(null);
  
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
        toast.error('Failed to load analytics data');
      }
    };
    fetchMetrics();
  }, []);

  const trendData = [
    { month: 'Jan', records: 4000, quality: 94 },
    { month: 'Feb', records: 4500, quality: 95 },
    { month: 'Mar', records: 6000, quality: 96 },
    { month: 'Apr', records: 8000, quality: 94 },
    { month: 'May', records: 9500, quality: 98 },
    { month: 'Jun', records: 12000, quality: 99 },
  ];

  const heatmapData = metrics?.demographic_clusters || [];

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-extrabold text-navy tracking-tight">Advanced Analytics</h1>
        <p className="text-text-muted mt-2 text-sm">Deep dive into data engineering metrics, feature impact, and platform usage.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-96 flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <CardHeader title="Ingestion Trend" subtitle="Monthly records processed" />
          <CardContent className="flex-1 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRecords" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="records" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRecords)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="h-96 flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <CardHeader title="Data Quality Score" subtitle="Automated cleaning pipeline performance" />
          <CardContent className="flex-1 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis domain={[90, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} />
                <Line type="monotone" dataKey="quality" stroke="#b6f36a" strokeWidth={4} dot={{ r: 5, fill: '#b6f36a', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="h-96 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 z-0 pointer-events-none"></div>
          <CardHeader title="Demographic Clusters" subtitle="Income distribution by Education vs Occupation" />
          <CardContent className="flex-1 pb-6 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="category" dataKey="x" name="Education" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="y" name="Occupation" stroke="#64748b" tickLine={false} axisLine={false} />
                <ZAxis type="number" dataKey="z" range={[100, 1000]} name="Count" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Scatter name="Demographics" data={heatmapData} fill="#8b5cf6" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
