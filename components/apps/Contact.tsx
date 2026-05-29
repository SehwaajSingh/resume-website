'use client';

import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, ExternalLink, UserRound } from 'lucide-react';

const contactItems = [
  {
    label: 'Email',
    value: 'sehwaaj@gmail.com',
    href: 'mailto:sehwaaj@gmail.com',
    icon: Mail,
    tone: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    label: 'Phone',
    value: '+91 98766 48277',
    href: 'tel:+919876648277',
    icon: Phone,
    tone: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    label: 'Location',
    value: 'Ludhiana, India',
    href: '',
    icon: MapPin,
    tone: 'text-orange-300 bg-orange-500/10 border-orange-500/20',
  },
  {
    label: 'GitHub',
    value: 'github.com/sehwaaj',
    href: 'https://github.com/sehwaaj',
    icon: Github,
    tone: 'text-white bg-white/10 border-white/20',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/sehwaaj',
    href: 'https://linkedin.com/in/sehwaaj',
    icon: Linkedin,
    tone: 'text-sky-300 bg-sky-500/10 border-sky-500/20',
  },
];

export const Contact: React.FC = () => {
  const copyValue = (value: string) => {
    navigator.clipboard?.writeText(value);
  };

  return (
    <div className="h-full w-full bg-[#0a0c10] text-[#a9b1d6] p-6 overflow-y-auto font-sans select-none border-t border-gray-800/80">
      <div className="flex items-center space-x-2.5 mb-6 shrink-0">
        <Mail className="text-cyan-300 w-5 h-5" />
        <h2 className="text-lg font-bold text-white tracking-wide">Contact Card</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-3 rounded-lg border ${item.tone}`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{item.label}</div>
                    <div className="mt-1 truncate font-mono text-sm text-white">{item.value}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      copyValue(item.value);
                    }}
                    className="p-2 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                    title={`Copy ${item.label}`}
                  >
                    <Copy size={14} />
                  </button>
                  {item.href && <ExternalLink size={14} className="text-gray-600" />}
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="block rounded-lg border border-gray-900 bg-[#11131c] p-4 hover:border-gray-700 hover:bg-[#151824] transition-all"
              >
                {content}
              </a>
            ) : (
              <div key={item.label} className="rounded-lg border border-gray-900 bg-[#11131c] p-4">
                {content}
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-gray-900 bg-[#11131c] p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 text-blue-300">
                <UserRound size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Sehwaaj Singh</h3>
                <p className="mt-1 text-xs text-gray-500">Cloud, DevOps, Infrastructure, Security</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-xs leading-relaxed text-gray-400">
              <p>Open to entry-level Cloud, DevOps, Infrastructure, and Security Engineering roles.</p>
              <p className="font-mono text-[11px] text-cyan-300">No web form, no fake dispatch queue. Just direct details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
