'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, Cpu, Shield, Award, Terminal, Code, Database, Globe 
} from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: any;
  skills: { name: string; level: number }[];
  colorClass: string;
  bgClass: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Cloud Architecture',
    icon: Cloud,
    colorClass: 'text-blue-400 border-blue-500/20',
    bgClass: 'bg-blue-500/10',
    skills: [
      { name: 'Amazon Web Services (AWS)', level: 85 },
      { name: 'EC2 / S3 / CloudFront / IAM', level: 82 },
      { name: 'CloudWatch / CloudTrail / Lambda', level: 78 },
      { name: 'Linux Server Administration', level: 80 },
    ],
  },
  {
    title: 'DevOps & GitOps',
    icon: Cpu,
    colorClass: 'text-orange-400 border-orange-500/20',
    bgClass: 'bg-orange-500/10',
    skills: [
      { name: 'Terraform (IaC)', level: 90 },
      { name: 'Docker / Docker Compose', level: 86 },
      { name: 'Docker Containerization', level: 85 },
      { name: 'GitHub Actions / CI/CD', level: 80 },
    ],
  },
  {
    title: 'Cybersecurity',
    icon: Shield,
    colorClass: 'text-red-400 border-red-500/20',
    bgClass: 'bg-red-500/10',
    skills: [
      { name: 'Wazuh SIEM Deployment', level: 80 },
      { name: 'Snort IDS Rules', level: 76 },
      { name: 'Cloud Security Monitoring', level: 82 },
      { name: 'Wireshark Packet Analysis', level: 78 },
    ],
  },
  {
    title: 'Development & Scripting',
    icon: Code,
    colorClass: 'text-purple-400 border-purple-500/20',
    bgClass: 'bg-purple-500/10',
    skills: [
      { name: 'Python / Scripting', level: 80 },
      { name: 'FastAPI / REST APIs', level: 76 },
      { name: 'Next.js / React', level: 75 },
      { name: 'Pandas / NumPy / Scikit-learn', level: 72 },
    ],
  },
];

export const Skills: React.FC = () => {
  return (
    <div className="h-full w-full bg-[#0a0c10] text-[#a9b1d6] p-6 overflow-y-auto font-sans select-none border-t border-gray-800/80">
      <div className="flex items-center space-x-2.5 mb-6">
        <Award className="text-blue-400 w-5 h-5" />
        <h2 className="text-lg font-bold text-white tracking-wide">Skills Matrix</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-5 rounded-xl border ${cat.colorClass} bg-[#11131c] flex flex-col space-y-4`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${cat.bgClass} text-white`}>
                  <Icon size={18} className="text-current" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">{cat.title}</h3>
              </div>

              <div className="space-y-3.5">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-gray-300">
                      <span>{skill.name}</span>
                      <span className="font-mono text-gray-400">{skill.level}%</span>
                    </div>
                    {/* Progress Track */}
                    <div className="h-1.5 w-full bg-gray-950 rounded-full overflow-hidden border border-gray-900">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${
                          cat.title.includes('Cloud') 
                            ? 'bg-blue-500' 
                            : cat.title.includes('DevOps') 
                            ? 'bg-orange-500' 
                            : cat.title.includes('Cybersecurity')
                            ? 'bg-red-500'
                            : 'bg-purple-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
export default Skills;
