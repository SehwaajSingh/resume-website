'use client';

import React, { useState } from 'react';
import { Github, Folder, Star, GitFork, RefreshCw, Layers, ExternalLink, X } from 'lucide-react';

interface Repo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

export const GitHubApp: React.FC = () => {
  const [showRedirectPrompt, setShowRedirectPrompt] = useState(true);
  const [repos, setRepos] = useState<Repo[]>([
    {
      name: 'aws-security-automation',
      description: 'AWS security automation project using CloudTrail, CloudWatch, SNS, and Lambda remediation workflows.',
      stars: 1,
      forks: 0,
      language: 'Python',
      url: 'https://github.com/SehwaajSingh/aws-security-automation',
    },
    {
      name: 'aws-live',
      description: 'Live AWS/static web deployment work and cloud practice artifacts.',
      stars: 0,
      forks: 0,
      language: 'HTML',
      url: 'https://github.com/SehwaajSingh/aws-live',
    },
    {
      name: 'Sehwaaj-profile',
      description: 'Personal profile and portfolio web work.',
      stars: 0,
      forks: 0,
      language: 'HTML',
      url: 'https://github.com/SehwaajSingh/Sehwaaj-profile',
    },
    {
      name: 'angular-shop',
      description: 'TypeScript/Angular shopping interface project.',
      stars: 0,
      forks: 0,
      language: 'TypeScript',
      url: 'https://github.com/SehwaajSingh/angular-shop',
    }
  ]);

  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="h-full w-full bg-[#0a0c10] text-[#a9b1d6] p-6 overflow-y-auto font-sans select-none border-t border-gray-800/80">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center space-x-2.5">
          <Github className="text-white w-5 h-5" />
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">GitHub Profile Hub</h2>
            <p className="text-[10px] text-gray-500 font-mono">github.com/SehwaajSingh / 97 contributions last year</p>
          </div>
        </div>
        <button 
          onClick={refreshData}
          disabled={loading}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-gray-300 hover:text-white border border-gray-700 text-xs font-semibold font-mono transition-all"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          <span>Refresh API</span>
        </button>
      </div>

      {showRedirectPrompt && (
        <div className="mb-5 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3">
            <Github size={18} className="text-blue-300 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">Open Sehwaaj's GitHub profile?</h3>
              <p className="mt-1 text-xs text-gray-400">You can continue browsing the project cards here, or jump to the live GitHub profile.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://github.com/SehwaajSingh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-500 transition-colors"
            >
              <ExternalLink size={13} />
              <span>Yes</span>
            </a>
            <button
              onClick={() => setShowRedirectPrompt(false)}
              className="inline-flex items-center gap-1.5 rounded-md border border-gray-800 bg-[#0a0c10] px-3 py-1.5 text-xs font-bold text-gray-300 hover:text-white hover:border-gray-700 transition-colors"
            >
              <X size={13} />
              <span>No</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((r) => (
          <a
            key={r.name}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-[#11131c] hover:bg-[#1a1c26] border border-gray-900 hover:border-gray-800 transition-all flex flex-col justify-between group focus:outline-none"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2.5">
                <Folder className="text-blue-400 group-hover:text-blue-300 transition-colors" size={18} />
                <span className="font-mono text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{r.name}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{r.description}</p>
            </div>

            <div className="flex items-center justify-between mt-4 text-[10px] text-gray-500 font-mono">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>{r.language}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                  <Star size={12} />
                  <span>{r.stars}</span>
                </span>
                <span className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                  <GitFork size={12} />
                  <span>{r.forks}</span>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* GitHub Contribution Graph Template */}
      <div className="mt-6 p-5 rounded-lg bg-[#11131c] border border-gray-900 flex flex-col space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
          <Layers size={14} className="text-blue-400" />
          <span>Contribution Snapshot</span>
        </h3>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">97 contributions in the last year</span>
          <span className="text-yellow-300 font-mono">Pull Shark achievement</span>
        </div>
        
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px] flex items-center justify-center p-3 rounded-lg bg-black/30 border border-gray-900 font-mono text-[9px] text-gray-600">
            {/* Visual simulation of commit boxes */}
            <div className="grid grid-flow-col grid-rows-7 gap-1">
              {Array.from({ length: 364 }).map((_, i) => {
                const activityLevel = Math.floor(Math.random() * 4);
                const bg = 
                  activityLevel === 0 ? 'bg-gray-950 border border-gray-900' :
                  activityLevel === 1 ? 'bg-green-900/40 border border-green-900/10' :
                  activityLevel === 2 ? 'bg-green-700/60 border border-green-700/10' :
                  'bg-green-500 border border-green-500/10';
                return (
                  <div key={i} className={`w-2.5 h-2.5 rounded-sm ${bg}`} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GitHubApp;
