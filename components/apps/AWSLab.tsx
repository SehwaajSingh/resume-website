'use client';

import React from 'react';
import { Cloud, GitBranch, HardDrive, Cpu, CheckCircle } from 'lucide-react';

export const AWSLab: React.FC = () => {
  return (
    <div className="h-full w-full bg-[#0a0c10] text-[#a9b1d6] p-6 overflow-y-auto font-mono select-none border-t border-gray-800/80">
      <div className="flex items-center space-x-2.5 mb-6 shrink-0">
        <Cloud className="text-orange-300 w-5 h-5" />
        <h2 className="text-lg font-bold text-white tracking-wide">AWS Security Automation Lab</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="p-5 rounded-lg bg-[#11131c] border border-gray-900 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <Cloud size={14} className="text-orange-300" />
              <span>Threat Detection & Automated Mitigation</span>
            </h3>

            <p className="text-xs leading-relaxed text-gray-300 font-sans">
              A real-time AWS security monitoring system that detects risky account and infrastructure activity, alerts through SNS, and invokes Lambda functions to remediate issues such as SSH opened to the internet or public S3 exposure.
            </p>

            <div className="p-4 rounded-lg bg-black/40 border border-gray-800 text-[10px] text-center flex flex-col items-center justify-center space-y-2">
              <div className="text-white font-bold">AWS Security Event Flow</div>
              <div className="text-gray-500 font-mono mt-1 leading-normal">
                CloudTrail logs -&gt; CloudWatch metric filters -&gt; Alarm -&gt; SNS -&gt; Lambda remediation -&gt; CloudTrail audit event
              </div>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-[#11131c] border border-gray-900 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <GitBranch size={14} className="text-orange-300" />
              <span>Detection Rules & Remediation Actions</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {[
                ['SecurityGroupModified', 'Detects open SSH exposure and triggers AutoRemediateOpenSSH to revoke 0.0.0.0/0 ingress rules.'],
                ['PublicS3Change', 'Detects PutBucketPolicy, PutBucketAcl, and PutObjectAcl events, then removes public bucket/object access automatically.'],
                ['SecurityIncidentDetected', 'Composite alarm that creates one high-priority signal when root, IAM, console login, or infrastructure events fire.'],
              ].map(([name, detail]) => (
                <div key={name} className="p-3.5 rounded-lg bg-[#0d0f17] border border-gray-900 space-y-2">
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-orange-300 font-semibold">{name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-bold uppercase">Verified</span>
                  </div>
                  <div className="text-[10px] text-gray-500 font-sans">{detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-lg bg-[#11131c] border border-gray-900 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <HardDrive size={14} className="text-orange-300" />
              <span>AWS Services Used</span>
            </h3>

            <div className="space-y-3 text-[11px]">
              <div className="flex justify-between border-b border-gray-800 pb-1.5">
                <span className="text-gray-500">CloudTrail</span>
                <span className="text-white font-bold font-mono">Multi-region</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-1.5">
                <span className="text-gray-500">CloudWatch</span>
                <span className="text-white font-bold font-mono">Filters + alarms</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-1.5">
                <span className="text-gray-500">SNS + Lambda</span>
                <span className="text-white font-bold font-mono">Auto-remediation</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Dashboard</span>
                <span className="text-green-400 font-bold">Enabled</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-[#11131c] border border-gray-900 space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <Cpu size={14} className="text-orange-300" />
              <span>Verified Proof</span>
            </h3>
            <div className="flex items-start space-x-2 text-xs">
              <CheckCircle size={14} className="text-green-400 shrink-0 mt-0.5" />
              <span className="text-gray-300 font-sans">CloudTrail recorded RevokeSecurityGroupIngress from the Lambda role after the alarm chain fired.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AWSLab;
