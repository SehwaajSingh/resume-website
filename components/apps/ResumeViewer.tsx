'use client';

import React from 'react';
import {
  Download,
  FileText,
  BriefcaseBusiness,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';

/*
===============================================================================
RESUME SOURCE — SEPTEMBER 2026
Last updated: September 2026
File: Sehwaaj_resume_sep_2026.pdf

IMPORTANT:
This is the text version of the resume currently displayed by this component.
It is intentionally kept inside a code comment so it does not render or affect
the website UI.

When the resume is updated in the future:
1. Update this date.
2. Replace the resume text below.
3. Update the PDF filename/path in `pdfPath`.
===============================================================================

Sehwaaj Singh
Cloud • DevOps • Infrastructure • Security

Ludhiana, India | +91 98766 48277 | sehwaaj@gmail.com | Sehwaaj.com

PROFESSIONAL SUMMARY

Junior DevOps Engineer and Cybersecurity Practitioner experienced in AWS/Azure
infrastructure, Linux administration, and Docker deployments. Skilled in
centralizing log analysis using Wazuh SIEM and CloudWatch, securing CI/CD
pipelines with automated vulnerability scanning, and writing Python scripts
for operational tasks including automated VIN verification, log parsing, and
system health checks. Experienced in troubleshooting network issues,
configuring observability stacks, and automating threat response across cloud
and virtualized environments. Focused on cloud security architecture, threat
detection, and infrastructure reliability.

EXPERIENCE

Meander Software — Junior DevOps Engineer (Aug 2026 – Present)
DevOps Intern (Feb 2026 – Aug 2026)
On-site | Mohali, India

• Supported AWS and Azure environments across 3 live client projects,
  maintaining CI/CD deployment pipelines to achieve 95% build success rates
  in staging.
• Developed Python scripts to parse CloudWatch logs for error signatures and
  validate service health endpoints automatically.
• Assisted senior engineers with live deployments, basic system
  troubleshooting, and IAM security updates, earning an internal promotion
  from Intern to Junior Engineer.

Swift Freight — Documentation & Operations Automation
Feb 2026 – May 2026
Remote | Canada

• Automated vehicle verification workflows using custom Python parsing
  scripts.
• Extracted and validated VINs, shipment metadata, booking/container
  identifiers, and vehicle specifications from operational loading sheets.
• Integrated VIN decoding and validation workflows to detect invalid records,
  fuel-type mismatches, and operational inconsistencies.
• Processed and verified 3,000+ vehicle records with ~95% operational
  accuracy while reducing manual validation effort through automation
  workflows.

PROJECTS

Cloud-Native IPL Analytics & Prediction Platform

Next.js • FastAPI • Docker • AWS EC2 • Nginx • Prometheus • Grafana

• Built and deployed a full-stack IPL analytics platform using Next.js,
  FastAPI, Docker, and AWS EC2.
• Designed reverse-proxy architecture using Nginx with HTTPS enabled via
  Let’s Encrypt and Certbot.
• Containerized frontend/backend services using Docker Compose for
  reproducible deployments and isolated networking.
• Implemented observability stack using Prometheus, Grafana, and Node
  Exporter for infrastructure monitoring.
• Developed analytical APIs using FastAPI, Pandas, NumPy, SQLite, and
  Scikit-learn.

AWS Multi-Layer Cloud Security & Automated Threat Mitigation

AWS CloudTrail • CloudWatch • SNS • Lambda

• Built a real-time cloud security monitoring system to detect high-risk
  account, IAM, and infrastructure activity.
• Created CloudWatch metric filters and alarms for root usage, IAM changes,
  security group modifications, and authentication failures.
• Implemented composite alarms and SNS-triggered Lambda functions to
  automate remediation actions.
• Designed CloudWatch dashboards to visualize security posture, alerts, and
  remediation outcomes.

Secure CI/CD Pipeline for AWS Lambda (DevSecOps Project)

GitHub Actions • AWS Lambda • Trivy

• Built a secure GitHub Actions CI/CD pipeline for AWS Lambda with security
  gating and automated deployment.
• Integrated Trivy vulnerability scanning to block deployments on
  High/Critical findings.
• Implemented protected branch workflows with required PR-based reviews and
  status checks.
• Managed secret handling using GitHub Secrets and evaluated
  secret-scanning controls.

Personal Cybersecurity & Infrastructure Home Lab

Wazuh • Snort • Proxmox • HAProxy • Networking

• Deployed and managed Wazuh SIEM with Windows and Ubuntu agents for
  centralized monitoring and alert analysis.
• Configured Snort IDS with custom rules and deployed Cowrie honeypot to
  analyze attack behavior.
• Implemented HAProxy load balancing with health checks and failover
  testing to simulate high-availability systems.
• Built enterprise-style network simulations using RIP, OSPF, EIGRP, VLANs,
  DNS, DHCP, mail servers, and secure tunnels.
• Investigated system and network alerts, analyzed logs, and identified
  root causes using SIEM and packet analysis tools.

SKILLS

Cloud & DevOps:
AWS (EC2, S3, CloudFront, IAM, Lambda, CloudWatch, CloudTrail), Azure,
Docker, Docker Compose, Nginx, Prometheus, Grafana, CI/CD Pipelines,
GitHub Actions, Linux Administration

Security & Monitoring:
Wazuh SIEM, Snort IDS/IPS, Cowrie Honeypot, Wireshark, Incident Detection,
Alert Triage, Traffic Analysis, Infrastructure Monitoring

Development & Automation:
Python, FastAPI, Next.js, REST APIs, SQLite, Pandas, NumPy,
Scikit-learn, Workflow Automation

Networking & Systems:
Proxmox, HAProxy, DNS, DHCP, VLANs, TCP/IP, RIP, OSPF, EIGRP,
Linux Troubleshooting

EDUCATION

Bachelor of Technology (B.Tech) – Computer Science
PCTE Group of Institutes, Ludhiana, India
Aug 2022 – Jun 2026

CERTIFICATIONS

• 3-Month Ethical Hacking Certificate – CyberSec Guru, Ludhiana
  Focus: Penetration testing, OSINT, RAT simulations, Kali Linux tools

• 6-Week Networking Training – Solitaire Infosys, Chandigarh
  Focus: Network fundamentals, routing, switching, IP subnetting,
  LAN/WAN configuration

===============================================================================
END RESUME SOURCE — SEPTEMBER 2026
===============================================================================
*/

const resumeHighlights = [
  {
    title: 'Meander Software',
    subtitle:
      'Junior DevOps Engineer / DevOps Intern / Mohali, India / Feb 2026 - Present',
    body:
      'Supported AWS and Azure environments across 3 live client projects, maintained CI/CD deployment pipelines, developed Python health-check and CloudWatch log parsing scripts, and assisted with live deployments, troubleshooting, and IAM security updates.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Swift Freight',
    subtitle:
      'Documentation & Operations Automation / Remote, Canada / Feb 2026 - May 2026',
    body:
      'Automated vehicle verification workflows using Python, including VIN extraction and validation, shipment metadata checks, and operational consistency checks across 3,000+ vehicle records.',
    icon: FileText,
  },
  {
    title: 'Cloud + DevSecOps Projects',
    subtitle:
      'AWS, Docker, Nginx, Prometheus, Grafana, GitHub Actions, Trivy',
    body:
      'Built and deployed cloud-native applications, AWS security monitoring and automated threat mitigation, secure CI/CD pipelines with vulnerability scanning, and infrastructure observability systems.',
    icon: ShieldCheck,
  },
  {
    title: 'Education',
    subtitle:
      'B.Tech Computer Science / PCTE Group of Institutes / Aug 2022 - Jun 2026',
    body:
      'Focused on cloud infrastructure, DevOps, cybersecurity, networking, automation, Linux administration, and production-style deployment projects.',
    icon: GraduationCap,
  },
];

export const ResumeViewer: React.FC = () => {
  const pdfPath = `${
    process.env.NEXT_PUBLIC_BASE_PATH || ''
  }/Sehwaaj_resume_sep_2026.pdf`;

  return (
    <div className="h-full w-full bg-[#11131c] text-gray-300 flex flex-col font-sans select-none border-t border-gray-800">
      <div className="h-11 bg-gray-950/80 border-b border-gray-800 px-4 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center space-x-3 min-w-0">
          <FileText size={16} className="text-red-400 shrink-0" />
          <span className="font-semibold text-white truncate">
            Sehwaaj_resume_sep_2026.pdf
          </span>
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
            <h2 className="text-xl font-extrabold text-white">
              Sehwaaj Singh
            </h2>

            <p className="mt-1 text-xs uppercase tracking-widest text-blue-300">
              Cloud / DevOps / Infrastructure / Security
            </p>

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
                <div
                  key={item.title}
                  className="rounded-lg border border-gray-900 bg-[#11131c] p-3"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={15} className="text-blue-300" />

                    <h3 className="text-xs font-bold text-white">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-1 text-[10px] font-mono text-gray-500">
                    {item.subtitle}
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-gray-400">
                    {item.body}
                  </p>
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
