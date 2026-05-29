'use client';

import React, { useState } from 'react';
import { Folder, FileCode, ArrowLeft, ExternalLink, Github, Database, Server, Shield, Radio } from 'lucide-react';

interface Project {
  name: string;
  category: string;
  icon: any;
  tech: string[];
  desc: string;
  architecture: string;
  github: string;
  challenges: string;
  infra: string;
}

const projects: Project[] = [
  {
    name: 'Cloud-Native IPL Analytics',
    category: 'Full Stack / Cloud / Analytics',
    icon: Database,
    tech: ['Next.js', 'FastAPI', 'Docker Compose', 'AWS EC2', 'Nginx', 'Prometheus', 'Grafana'],
    desc: 'Production-style IPL analytics and prediction platform with historical statistics, player/team analytics, advanced filtering, dashboards, and machine-learning powered prediction endpoints.',
    architecture: 'Users -> HTTPS -> Nginx reverse proxy -> Next.js frontend + FastAPI backend -> SQLite analytics database',
    github: 'https://github.com/sehwaaj/ipl-analytics',
    challenges: 'Moved the project beyond localhost by containerizing frontend/backend services, routing traffic through Nginx, enabling HTTPS with Certbot, and adding host observability.',
    infra: 'AWS EC2 Ubuntu, Docker Compose, Let’s Encrypt, Prometheus, Grafana, Node Exporter'
  },
  {
    name: 'AWS Threat Detection',
    category: 'Cloud Security / Automation',
    icon: Shield,
    tech: ['CloudTrail', 'CloudWatch', 'SNS', 'Lambda', 'S3', 'IAM'],
    desc: 'Real-time AWS security monitoring and automated mitigation system for high-risk account activity, IAM changes, security group exposure, console login failures, and public S3 changes.',
    architecture: 'CloudTrail logs -> CloudWatch metric filters -> Alarms -> SNS -> Lambda remediation -> CloudTrail audit proof',
    github: 'https://github.com/sehwaaj/aws-security-monitoring',
    challenges: 'Verified end-to-end remediation by triggering CloudWatch alarms and confirming CloudTrail RevokeSecurityGroupIngress events executed by Lambda.',
    infra: 'Multi-region CloudTrail, SSE-KMS, CloudWatch dashboard, SNS topics, Lambda auto-remediation'
  },
  {
    name: 'Secure Lambda CI/CD',
    category: 'DevSecOps',
    icon: Server,
    tech: ['GitHub Actions', 'AWS Lambda', 'Trivy', 'GitHub Secrets', 'Branch Protection'],
    desc: 'Secure deployment pipeline for AWS Lambda with vulnerability scanning, protected branch workflows, required pull-request review gates, and secret handling through GitHub Secrets.',
    architecture: 'Pull request -> required checks -> Trivy scan -> protected merge -> Lambda deployment',
    github: 'https://github.com/sehwaaj/lambda-devsecops-pipeline',
    challenges: 'Designed the workflow so High/Critical findings block deployment instead of becoming silent warnings.',
    infra: 'GitHub Actions, AWS Lambda, Trivy security gate, protected branches'
  },
  {
    name: 'Cybersecurity Homelab',
    category: 'Security / Infrastructure',
    icon: Server,
    tech: ['Wazuh', 'Snort', 'Cowrie', 'Proxmox', 'HAProxy', 'Wireshark', 'VLANs'],
    desc: 'Personal lab for monitoring, alert triage, IDS rule testing, honeypot behavior analysis, load balancing, failover, and enterprise-style network simulation.',
    architecture: 'Proxmox / VMs -> Wazuh agents + Snort IDS + Cowrie honeypot -> alert analysis and packet review',
    github: 'https://github.com/sehwaaj/security-homelab',
    challenges: 'Built isolated test environments for attack simulation and detection without mixing lab traffic with personal systems.',
    infra: 'Windows and Ubuntu agents, HAProxy health checks, DNS/DHCP/VLAN/routing simulations'
  },
  {
    name: 'Enterprise Network Simulation',
    category: 'Networking',
    icon: Shield,
    tech: ['Cisco Packet Tracer', 'RIP', 'OSPF', 'EIGRP', 'VLANs', 'DNS', 'DHCP'],
    desc: 'Built enterprise-style network simulations with routing protocols, segmentation, DNS, DHCP, mail services, and secure tunnels.',
    architecture: 'Access VLANs -> routed distribution/core -> DNS/DHCP/mail services -> secure tunnel endpoints',
    github: 'https://github.com/sehwaaj/network-topologies',
    challenges: 'Practiced routing convergence, IP planning, and service placement in a simulated enterprise environment.',
    infra: 'Cisco Packet Tracer, LAN/WAN configuration, routing and switching fundamentals'
  },
  {
    name: 'Home NAS Setup',
    category: 'Infrastructure',
    icon: Database,
    tech: ['Raspberry Pi 4', 'OpenMediaVault', 'SMB', 'Static IP', 'User Roles'],
    desc: 'Built a personal NAS using Raspberry Pi 4 and OpenMediaVault with SMB shares, static IP assignment, read-only guest access, and OS separation through USB boot.',
    architecture: 'Raspberry Pi 4 -> OpenMediaVault -> SMB shares -> role-based access',
    github: 'https://github.com/sehwaaj/home-nas',
    challenges: 'Balanced low-cost hardware constraints while learning storage, access control, and local network service management.',
    infra: 'OpenMediaVault, SMB, static IP, user permissions'
  },
  {
    name: 'Iris Flower Detector',
    category: 'Machine Learning',
    icon: Radio,
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'],
    desc: 'Machine-learning classifier that identifies Iris Setosa, Versicolor, and Virginica from sepal and petal measurements.',
    architecture: 'Dataset -> preprocessing -> SVM model -> classification output in notebook interface',
    github: 'https://github.com/sehwaaj/iris-flower-detector',
    challenges: 'Used a small, interpretable ML project to learn supervised classification, preprocessing, model evaluation, and result presentation.',
    infra: 'Jupyter Notebook, Python ML libraries'
  }
];

export const FileExplorer: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="h-full w-full bg-[#0f111a] text-gray-300 flex font-sans select-none border-t border-gray-800/80">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#141622] p-4 border-r border-gray-800/80 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Navigation</div>
          <button 
            onClick={() => setSelectedProject(null)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${!selectedProject ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'hover:bg-gray-800/50 text-gray-400'}`}
          >
            <Folder size={16} />
            <span>Projects/</span>
          </button>
        </div>
        <div className="text-center p-2 rounded-lg bg-gray-900/30 border border-gray-800/40">
          <span className="text-[10px] text-gray-500 font-mono">Workspace: sehwaajOS</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        {!selectedProject ? (
          <div>
            <h2 className="text-lg font-bold text-white mb-6 flex items-center space-x-2">
              <Folder className="text-yellow-500" size={20} />
              <span>Projects Directory</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => {
                const ProjectIcon = p.icon;
                return (
                  <button
                    key={p.name}
                    onClick={() => setSelectedProject(p)}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-[#141622] hover:bg-[#1c1f30] border border-gray-800 hover:border-gray-700 transition-all text-left group focus:outline-none"
                  >
                    <div className="p-3 rounded-lg bg-[#0f111a] border border-gray-800 group-hover:border-gray-600 transition-all text-blue-400">
                      <ProjectIcon size={20} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{p.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{p.category}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.tech.slice(0, 3).map((t) => (
                          <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-900 text-gray-400 border border-gray-800">{t}</span>
                        ))}
                        {p.tech.length > 3 && <span className="text-[9px] text-gray-600">+{p.tech.length - 3}</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedProject(null)}
              className="flex items-center space-x-2 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              <span>Back to Directory</span>
            </button>

            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <FileCode className="text-blue-400" size={24} />
                  <span>{selectedProject.name}</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">{selectedProject.category}</p>
              </div>
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 text-xs bg-gray-900 border border-gray-800 hover:border-gray-700 px-3 py-1.5 rounded-lg text-white font-medium transition-colors"
              >
                <Github size={14} />
                <span>GitHub Repo</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</h3>
                  <p className="text-sm text-gray-300 leading-relaxed bg-[#141622] p-4 rounded-xl border border-gray-800/60">{selectedProject.desc}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">System Architecture Flow</h3>
                  <div className="text-xs text-gray-300 font-mono bg-black/40 p-4 rounded-xl border border-gray-800 flex items-center justify-center text-center">
                    {selectedProject.architecture}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Technical Challenges & Solutions</h3>
                  <p className="text-sm text-gray-300 leading-relaxed bg-[#141622] p-4 rounded-xl border border-gray-800/60">{selectedProject.challenges}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Technology Stack</h3>
                  <div className="flex flex-wrap gap-1.5 p-4 rounded-xl bg-[#141622] border border-gray-800/60">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded bg-[#0f111a] text-blue-300 border border-gray-800 font-mono">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Deployment & Infrastructure</h3>
                  <div className="text-xs text-gray-300 font-mono bg-[#141622] p-4 rounded-xl border border-gray-800/60 leading-relaxed">
                    {selectedProject.infra}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FileExplorer;
