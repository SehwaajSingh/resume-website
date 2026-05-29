'use client';

import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Server, Cpu, Database, Activity, Globe, CheckCircle, Layers 
} from 'lucide-react';

interface MetricPoint {
  time: string;
  cpu: number;
  memory: number;
  network: number;
}

export const Monitoring: React.FC = () => {
  const [data, setData] = useState<MetricPoint[]>([]);
  const [cpuUsage, setCpuUsage] = useState(24);
  const [memUsage, setMemUsage] = useState(48);
  const [uptime, setUptime] = useState(128450); // seconds
  const [mounted, setMounted] = useState(false);
  const [containers] = useState([
    { name: 'nginx-proxy', status: 'running', port: '80/443', cpu: '0.8%' },
    { name: 'portfolio-app', status: 'running', port: '3000', cpu: '1.2%' },
    { name: 'wazuh-agent', status: 'running', port: '1514', cpu: '2.5%' },
    { name: 'prometheus', status: 'running', port: '9090', cpu: '1.8%' },
    { name: 'grafana', status: 'running', port: '3000', cpu: '0.5%' },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate initial historical data
  useEffect(() => {
    if (!mounted) return;
    const initialData: MetricPoint[] = [];
    const now = new Date();
    for (let i = 15; i >= 0; i--) {
      const t = new Date(now.getTime() - i * 5000);
      initialData.push({
        time: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        cpu: Math.floor(Math.random() * 25) + 15,
        memory: Math.floor(Math.random() * 5) + 45,
        network: Math.floor(Math.random() * 80) + 120,
      });
    }
    setData(initialData);
  }, [mounted]);

  // Update metrics dynamically
  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      const newCpu = Math.max(5, Math.min(95, Math.round(cpuUsage + (Math.random() * 10 - 5))));
      const newMem = Math.max(30, Math.min(98, Math.round(memUsage + (Math.random() * 2 - 1))));
      setCpuUsage(newCpu);
      setMemUsage(newMem);
      setUptime(prev => prev + 2);

      setData(prev => {
        const nextTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const updated = [
          ...prev.slice(1),
          {
            time: nextTime,
            cpu: newCpu,
            memory: newMem,
            network: Math.floor(Math.random() * 100) + 100,
          }
        ];
        return updated;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [mounted, cpuUsage, memUsage]);

  const formatUptime = (seconds: number) => {
    const h = Math.floor((seconds % (24 * 3600)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  if (!mounted) return null;

  return (
    <div className="h-full w-full bg-[#0a0c10] text-[#a9b1d6] flex flex-col font-mono select-none border-t border-gray-800/80 overflow-y-auto">
      {/* Top dashboard header bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#11131c] border-b border-gray-900 shrink-0">
        <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
          <Activity className="animate-pulse" size={16} />
          <span>Grafana Metrics Panel</span>
        </div>
        <div className="flex items-center space-x-4 text-[10px] text-gray-500">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span>Live Data Syncing</span>
          </div>
          <span className="text-gray-700">|</span>
          <span>Refresh Interval: 2s</span>
        </div>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1: CPU */}
          <div className="p-4 rounded-xl bg-[#11131c] border border-gray-900 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">CPU Utilization</div>
              <div className="text-2xl font-bold text-white mt-1">{cpuUsage}%</div>
            </div>
            <div className="p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <Cpu size={18} />
            </div>
          </div>

          {/* Card 2: Memory */}
          <div className="p-4 rounded-xl bg-[#11131c] border border-gray-900 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">RAM Usage</div>
              <div className="text-2xl font-bold text-white mt-1">{memUsage}%</div>
            </div>
            <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Database size={18} />
            </div>
          </div>

          {/* Card 3: Active Docker Services */}
          <div className="p-4 rounded-xl bg-[#11131c] border border-gray-900 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Docker Containers</div>
              <div className="text-2xl font-bold text-white mt-1">5 / 5 Running</div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Layers size={18} />
            </div>
          </div>

          {/* Card 4: System Uptime */}
          <div className="p-4 rounded-xl bg-[#11131c] border border-gray-900 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Core Uptime</div>
              <div className="text-sm font-bold text-white mt-2 truncate">{formatUptime(uptime)}</div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
              <Server size={18} />
            </div>
          </div>
        </div>

        {/* Charts & System Status Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chart Card */}
          <div className="md:col-span-2 p-5 rounded-xl bg-[#11131c] border border-gray-900 flex flex-col">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center space-x-2">
              <Activity size={14} className="text-blue-400" />
              <span>Real-Time Performance Monitor</span>
            </h3>
            
            <div className="h-64 w-full text-xs font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f7768e" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#f7768e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e0af68" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#e0af68" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2335" />
                  <XAxis dataKey="time" stroke="#565f89" tick={{ fontSize: 9 }} />
                  <YAxis stroke="#565f89" tick={{ fontSize: 9 }} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1b26', borderColor: '#1f2335', color: '#a9b1d6', fontFamily: 'monospace' }}
                  />
                  <Area type="monotone" dataKey="cpu" name="CPU %" stroke="#f7768e" fillOpacity={1} fill="url(#colorCpu)" />
                  <Area type="monotone" dataKey="memory" name="RAM %" stroke="#e0af68" fillOpacity={1} fill="url(#colorMem)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Docker Details & Infrastructure Info */}
          <div className="p-5 rounded-xl bg-[#11131c] border border-gray-900 flex flex-col space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <Layers size={14} className="text-blue-400" />
              <span>Active Containers</span>
            </h3>

            <div className="flex-1 space-y-2 overflow-auto max-h-64 text-xs">
              {containers.map(c => (
                <div key={c.name} className="flex items-center justify-between p-2.5 rounded-lg bg-[#0a0c10] border border-gray-900">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-semibold text-white">{c.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-500 text-[10px]">
                    <span>{c.port}</span>
                    <span className="text-blue-400 font-semibold">{c.cpu}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-800 text-[10px] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold uppercase">Cloud Region:</span>
                <span className="text-white flex items-center space-x-1">
                  <Globe size={10} className="text-blue-400" />
                  <span>aws (ap-south-1)</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold uppercase">Wazuh Status:</span>
                <span className="text-green-400 flex items-center space-x-1">
                  <CheckCircle size={10} />
                  <span>Active & Secure</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Monitoring;
