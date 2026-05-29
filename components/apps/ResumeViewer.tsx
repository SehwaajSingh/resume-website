'use client';

import React from 'react';
import { Download, FileText, BriefcaseBusiness, GraduationCap, ShieldCheck } from 'lucide-react';

const resumeHighlights = [
  {
    title: 'Swift Freight',
    subtitle: 'Documentation & Operations Automation / Remote, Canada / Feb 2026 - Present',
    body: 'Automated vehicle verification workflows using Python parsing scripts, VIN decoding, metadata validation, and operational consistency checks across 3,000+ vehicle records.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Cloud + DevOps Projects',
    subtitle: 'AWS EC2, Docker, Nginx, Prometheus, Grafana',
    body: 'Built and deployed a cloud-native IPL analytics platform with Next.js, FastAPI, Docker Compose, HTTPS, and infrastructure observability.',
    icon: FileText,
  },
  {
    title: 'Security Engineering',
    subtitle: 'CloudTrail, CloudWatch, SNS, Lambda, Wazuh, Snort',
    body: 'Implemented AWS threat detection and automated mitigation, plus a personal security lab for SIEM monitoring, IDS rules, honeypot testing, and alert analysis.',
    icon: ShieldCheck,
  },
  {
    title: 'Education',
    subtitle: 'B.Tech Computer Science / PCTE Group of Institutes / 2022-2026',
    body: 'Focused on cloud infrastructure, cybersecurity, networking, automation, and full-stack deployment projects.',
    icon: GraduationCap,
  },
];

export const ResumeViewer: React.FC = () => {
  const pdfPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Sehwaaj_resume_may2026.pdf`;

  return (
    <div className="h-full w-full bg-[#11131c] text-gray-300 flex flex-col font-sans select-none border-t border-gray-800">
      <div className="h-11 bg-gray-950/80 border-b border-gray-800 px-4 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center space-x-3 min-w-0">
          <FileText size={16} className="text-red-400 shrink-0" />
          <span className="font-semibold text-white truncate">Sehwaaj_resume_may2026.pdf</span>
        </div>

        <a
          href={pdfPath}
          download
          className="bg-red-600 hover:bg-red-500 text-white font-medium px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition-colors"
          title="Download PDF"
        >
          <Download size={12} />
          <span className="hidden sm:inline text-[10px]">Download</span>
        </a>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[320px_1fr]">
        <aside className="border-b lg:border-b-0 lg:border-r border-gray-800 bg-[#0a0c10] p-5 overflow-y-auto">
          <div className="mb-5">
            <h2 className="text-xl font-extrabold text-white">Sehwaaj Singh</h2>
            <p className="mt-1 text-xs uppercase tracking-widest text-blue-300">Cloud / DevOps / Infrastructure / Security</p>
            <div className="mt-3 space-y-1 text-xs text-gray-500 font-mono">
              <div>Ludhiana, India</div>
              <div>sehwaaj@gmail.com</div>
              <div>+91 98766 48277</div>
            </div>
          </div>

          <div className="space-y-3">
            {resumeHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-gray-900 bg-[#11131c] p-3">
                  <div className="flex items-center gap-2">
                    <Icon size={15} className="text-blue-300" />
                    <h3 className="text-xs font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="mt-1 text-[10px] font-mono text-gray-500">{item.subtitle}</p>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400">{item.body}</p>
                </div>
              );
            })}
          </div>
        </aside>

        <div className="min-h-0 bg-[#1e2030] p-4">
          <iframe
            src={pdfPath}
            title="Sehwaaj Singh Resume PDF"
            className="h-full min-h-[520px] w-full rounded-lg border border-gray-700 bg-white"
          />
        </div>
      </div>
    </div>
  );
};
export default ResumeViewer;
