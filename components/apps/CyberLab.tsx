'use client';

import React, { useState } from 'react';
import { Shield, Server, Network, AlertTriangle, Play, HelpCircle } from 'lucide-react';

interface SecurityAlert {
  id: string;
  source: string;
  type: string;
  severity: 'High' | 'Medium' | 'Low';
  timestamp: string;
}

export const CyberLab: React.FC = () => {
  const [scanStatus, setScanStatus] = useState('Ready');
  const [alerts] = useState<SecurityAlert[]>([
    { id: 'WZ-1042', source: 'ubuntu-agent', type: 'Wazuh: privileged command review', severity: 'Medium', timestamp: '16:01:22' },
    { id: 'SN-2190', source: 'lab-vlan', type: 'Snort: scan pattern detected', severity: 'High', timestamp: '15:58:10' },
    { id: 'CW-3301', source: 'cowrie-node', type: 'Honeypot: failed SSH attempt', severity: 'Medium', timestamp: '15:52:05' },
    { id: 'LB-0871', source: 'haproxy', type: 'Health check failover test', severity: 'Low', timestamp: '15:10:44' },
  ]);

  const triggerScan = () => {
    setScanStatus('Lab audit queued');
    setTimeout(() => setScanStatus('Ready'), 2500);
  };

  return (
    <div className="h-full w-full bg-[#0a0c10] text-[#a9b1d6] p-6 overflow-y-auto font-mono select-none border-t border-gray-800/80">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center space-x-2.5">
          <Shield className="text-red-400 w-5 h-5" />
          <h2 className="text-lg font-bold text-white tracking-wide">Cybersecurity & Infrastructure Homelab</h2>
        </div>
        <button
          onClick={triggerScan}
          className="flex items-center space-x-2 px-3 py-1.5 rounded bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors"
        >
          <Play size={12} />
          <span>{scanStatus}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="p-5 rounded-lg bg-[#11131c] border border-gray-900 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <Network size={14} className="text-red-300" />
              <span>Lab Architecture</span>
            </h3>

            <p className="text-xs leading-relaxed text-gray-300 font-sans">
              A personal lab for monitoring, alert triage, IDS testing, honeypot behavior analysis, load balancing, failover testing, and enterprise-style network simulation. It connects practical blue-team tooling with infrastructure fundamentals.
            </p>

            <div className="p-4 rounded-lg bg-black/40 border border-gray-800 text-[10px] text-center flex flex-col items-center justify-center space-y-2">
              <div className="text-white font-bold">Monitoring Flow</div>
              <div className="text-gray-500 font-mono mt-1">
                Windows / Ubuntu agents -&gt; Wazuh manager -&gt; Snort / Cowrie lab signals -&gt; alert review + packet analysis
              </div>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-[#11131c] border border-gray-900 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <AlertTriangle size={14} className="text-red-300" />
              <span>Lab Event Feed</span>
            </h3>

            <div className="space-y-2.5">
              {alerts.map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-[#0c0e16] border border-gray-900">
                  <div className="flex items-center space-x-3 text-xs">
                    <span className={`w-2 h-2 rounded-full ${a.severity === 'High' ? 'bg-red-500 animate-pulse' : a.severity === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                    <div>
                      <div className="font-bold text-white flex items-center space-x-1.5">
                        <span>{a.type}</span>
                        <span className="text-[9px] text-gray-600">[{a.id}]</span>
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Source Node: {a.source}</div>
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-gray-500">
                    <div>{a.timestamp}</div>
                    <div className={`font-semibold ${a.severity === 'High' ? 'text-red-400' : a.severity === 'Medium' ? 'text-orange-400' : 'text-blue-400'}`}>{a.severity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-lg bg-[#11131c] border border-gray-900 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <Server size={14} className="text-red-300" />
              <span>Lab Stack</span>
            </h3>

            <div className="space-y-3 text-[11px]">
              {['Wazuh SIEM', 'Snort IDS', 'Cowrie Honeypot', 'Proxmox', 'HAProxy', 'Wireshark'].map((tool) => (
                <div key={tool} className="flex justify-between border-b border-gray-800 pb-1.5 last:border-b-0">
                  <span className="text-gray-500">{tool}</span>
                  <span className="text-green-400 font-semibold">USED</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#0d0f17] border border-gray-900 text-center font-mono text-[10px] text-gray-500 flex items-center justify-center space-x-2">
            <HelpCircle size={14} className="text-blue-400 shrink-0" />
            <span className="font-sans leading-tight">Lab content is framed as learning, detection, and safe isolated testing.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CyberLab;
