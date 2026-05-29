'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Terminal, Code, Cpu } from 'lucide-react';

export const AboutMe: React.FC = () => {
  return (
    <div className="h-full w-full bg-[#0a0c10] text-[#a9b1d6] p-6 overflow-y-auto font-sans select-none border-t border-gray-800/80">
      <div className="flex items-center space-x-2.5 mb-6 shrink-0">
        <User className="text-blue-400 w-5 h-5" />
        <h2 className="text-lg font-bold text-white tracking-wide">About Sehwaaj</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="p-5 rounded-xl bg-[#11131c] border border-gray-900 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Terminal size={14} className="text-blue-400" />
              <span>Bio Summary</span>
            </h3>
            <p className="text-xs leading-relaxed text-gray-300">
              I am a Cloud, DevOps, Infrastructure, and Security engineering learner with hands-on experience across AWS infrastructure, Docker deployments, Linux administration, monitoring stacks, and automation workflows.
            </p>
            <p className="text-xs leading-relaxed text-gray-300 mt-2">
              I like building things that prove themselves: deployed apps, working dashboards, alert pipelines, lab networks, and scripts that remove repetitive operational work. The resume website is meant to feel like that same workstation.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#11131c] border border-gray-900 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Code size={14} className="text-blue-400" />
              <span>What I Do Best</span>
            </h3>
            <ul className="list-disc pl-4 text-xs text-gray-300 space-y-2">
              <li>Deploy full-stack apps on AWS EC2 using Docker Compose, Nginx, HTTPS, and Linux troubleshooting.</li>
              <li>Build security monitoring flows with CloudTrail, CloudWatch, SNS, Lambda, and dashboard proof.</li>
              <li>Automate operational validation using Python parsing, VIN decoding, and consistency checks.</li>
              <li>Run cybersecurity and infrastructure labs with Wazuh, Snort, Cowrie, Proxmox, HAProxy, and Wireshark.</li>
            </ul>
          </div>
        </div>

        {/* Quick Facts Sidebar */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-[#11131c] border border-gray-900 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Cpu size={14} className="text-blue-400" />
              <span>Core Parameters</span>
            </h3>

            <div className="space-y-3 text-[11px] font-mono">
              <div className="flex justify-between border-b border-gray-800 pb-1.5">
                <span className="text-gray-500 uppercase">Current Role</span>
                <span className="text-white font-semibold">Entry Level</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-1.5">
                <span className="text-gray-500 uppercase">Core Platform</span>
                <span className="text-white font-semibold">AWS / Linux</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-1.5">
                <span className="text-gray-500 uppercase">Languages</span>
                <span className="text-white font-semibold">Python / TS</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-1.5">
                <span className="text-gray-500 uppercase">Homelab Engine</span>
                <span className="text-white font-semibold">Wazuh / Proxmox</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase">Location</span>
                <span className="text-white font-semibold">Ludhiana, IN</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#090b11]/80 border border-gray-900 text-center font-mono text-[10px] text-gray-500">
            "Proof beats polish: alerts, logs, dashboards, and deployments that actually work."
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutMe;
