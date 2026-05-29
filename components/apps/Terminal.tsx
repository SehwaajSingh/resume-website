'use client';

import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

interface TerminalProps {
  onClose: () => void;
}

const commandList = ['about', 'resume', 'projects', 'ipl', 'aws-security', 'homelab', 'skills', 'contact', 'clear'];

export const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const currentLineRef = useRef('');

  const commands: Record<string, () => string> = {
    help: () => `
Search commands:
  about          - who Sehwaaj is
  resume         - resume highlights
  projects       - all major projects
  ipl            - IPL analytics platform
  aws-security   - AWS threat detection and remediation
  homelab        - Wazuh, Snort, Proxmox, HAProxy lab
  skills         - technical skill map
  contact        - direct contact details
  clear          - clear terminal
  exit           - close terminal
    `.trim(),

    whoami: () => 'sehwaaj@cloud-security-workstation',

    about: () => `
Sehwaaj Singh
Cloud / DevOps / Infrastructure / Security

Hands-on with AWS infrastructure, Docker deployments, Linux administration,
monitoring stacks, automation workflows, and blue-team lab environments.
    `.trim(),

    resume: () => `
Resume snapshot
Location: Ludhiana, India
Current: Swift Freight - Documentation & Operations Automation
Education: B.Tech Computer Science, PCTE Group of Institutes, 2022-2026
Focus: entry-level Cloud, DevOps, Infrastructure, or Security Engineering roles
    `.trim(),

    projects: () => `
Major projects
  IPL Analytics Platform       Next.js, FastAPI, Docker, AWS EC2, Nginx, Grafana
  AWS Threat Mitigation        CloudTrail, CloudWatch, SNS, Lambda remediation
  Secure Lambda CI/CD          GitHub Actions, Trivy, protected branch checks
  Cybersecurity Homelab        Wazuh, Snort, Cowrie, Proxmox, HAProxy, networking
    `.trim(),

    ipl: () => `
Cloud-Native IPL Analytics & Prediction Platform
Built with Next.js, FastAPI, SQLite, Pandas, NumPy, Scikit-learn, and Recharts.
Deployed on AWS EC2 with Docker Compose, Nginx reverse proxy, HTTPS via Certbot,
and Prometheus/Grafana/Node Exporter observability.
    `.trim(),

    'aws-security': () => `
AWS Multi-Layer Threat Detection & Automated Mitigation
CloudTrail logs feed CloudWatch metric filters and alarms.
SNS invokes Lambda functions that revoke risky security group rules and remediate
public S3 exposure. CloudTrail records the remediation path for audit proof.
    `.trim(),

    homelab: () => `
Personal Cybersecurity & Infrastructure Lab
Wazuh SIEM with Windows/Ubuntu agents, Snort IDS custom rules, Cowrie honeypot,
Proxmox virtualization, HAProxy load balancing, VLAN/DNS/DHCP/routing simulations,
and packet analysis with Wireshark.
    `.trim(),

    skills: () => `
Cloud & DevOps: AWS EC2, S3, CloudFront, IAM, Lambda, CloudWatch, CloudTrail,
Docker, Docker Compose, Nginx, Prometheus, Grafana, GitHub Actions, Linux.

Security & Systems: Wazuh, Snort, Cowrie, Wireshark, alert triage, traffic analysis,
Proxmox, HAProxy, DNS, DHCP, VLANs, TCP/IP, RIP, OSPF, EIGRP.
    `.trim(),

    contact: () => `
Email:   sehwaaj@gmail.com
Phone:   +91 98766 48277
Place:   Ludhiana, India
GitHub:  github.com/sehwaaj
LinkedIn: linkedin.com/in/sehwaaj
    `.trim(),

    neofetch: () => `
sehwaaj@cloud-security-workstation
----------------------------------
OS: SehwaajOS portfolio desktop
Role target: Cloud / DevOps / Security
Runtime: Next.js static export
Stack: AWS, Docker, Linux, Python, FastAPI, Next.js
Status: available for entry-level engineering roles
    `.trim(),

    clear: () => 'CLEAR_TERMINAL',
    exit: () => 'EXIT_TERMINAL',
  };

  const writePrompt = () => {
    xtermRef.current?.write('\r\n\x1b[1;32msehwaaj@cloud\x1b[0m:\x1b[1;34m~\x1b[0m$ ');
  };

  const executeCommand = (cmd: string) => {
    if (!cmd) return;
    const lowerCmd = cmd.toLowerCase();
    const command = commands[lowerCmd];

    if (command) {
      const output = command();
      if (output === 'CLEAR_TERMINAL') {
        xtermRef.current?.clear();
      } else if (output === 'EXIT_TERMINAL') {
        onClose?.();
      } else {
        xtermRef.current?.write(output.replace(/\n/g, '\r\n') + '\r\n');
      }
    } else {
      xtermRef.current?.write(`\r\n\x1b[1;31mNo result for: ${cmd}\x1b[0m\r\nTry one of the search chips above, or run "help".\r\n`);
    }
  };

  const runSuggestedCommand = (cmd: string) => {
    if (!xtermRef.current) return;
    xtermRef.current.write(cmd);
    xtermRef.current.write('\r\n');
    executeCommand(cmd);
    writePrompt();
    currentLineRef.current = '';
  };

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      theme: {
        background: '#0c0d12',
        foreground: '#a9b1d6',
        cursor: '#c0caf5',
        selection: '#364a82',
        black: '#15161e',
        red: '#f7768e',
        green: '#9ece6a',
        yellow: '#e0af68',
        blue: '#7aa2f7',
        magenta: '#bb9af7',
        cyan: '#7dcfff',
        white: '#a9b1d6',
      },
      fontSize: 13,
      fontFamily: 'JetBrains Mono, Courier New, monospace',
      cursorBlink: true,
      allowTransparency: true,
      rows: 20,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    term.write('\x1b[1;36mSehwaajOS search shell\x1b[0m\r\n');
    term.write('Click a command chip above or run \x1b[1;33mhelp\x1b[0m.\r\n');
    writePrompt();

    const keyDispose = term.onKey(({ key, domEvent }) => {
      const code = domEvent.keyCode;
      if (code === 13) {
        term.write('\r\n');
        executeCommand(currentLineRef.current.trim());
        currentLineRef.current = '';
        writePrompt();
      } else if (code === 8) {
        if (currentLineRef.current.length > 0) {
          currentLineRef.current = currentLineRef.current.slice(0, -1);
          term.write('\b \b');
        }
      } else if (domEvent.key.length === 1) {
        currentLineRef.current += key;
        term.write(key);
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      try {
        fitAddonRef.current?.fit();
      } catch {
        // xterm can briefly be mid-layout while a window is moving.
      }
    });

    resizeObserver.observe(terminalRef.current);

    return () => {
      keyDispose.dispose();
      term.dispose();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="h-full w-full bg-[#0c0d12] overflow-hidden flex flex-col">
      <div className="flex flex-wrap gap-2 border-b border-gray-900 bg-[#11131c] px-3 py-2">
        {commandList.map((cmd) => (
          <button
            key={cmd}
            onClick={() => runSuggestedCommand(cmd)}
            className="rounded-md border border-gray-800 bg-[#080a0f] px-2.5 py-1 text-[10px] font-mono text-gray-300 hover:border-green-500/40 hover:text-green-300 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
      <div ref={terminalRef} className="flex-1 w-full h-full min-h-[300px] p-2" />
    </div>
  );
};
export default Terminal;
