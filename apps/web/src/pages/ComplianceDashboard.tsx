import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Zap, 
  FileCheck, 
  Activity,
  History,
  Lock,
  Globe,
  Database,
  ArrowUpRight
} from 'lucide-react';

const scanData = [
  { time: '00:00', compliant: 94, violations: 6 },
  { time: '04:00', compliant: 92, violations: 8 },
  { time: '08:00', compliant: 96, violations: 4 },
  { time: '12:00', compliant: 95, violations: 5 },
  { time: '16:00', compliant: 91, violations: 9 },
  { time: '20:00', compliant: 97, violations: 3 },
  { time: '23:59', compliant: 98, violations: 2 },
];

const frameworkDistribution = [
  { name: 'CIS Benchmarks', value: 45, color: '#10b981' },
  { name: 'NIST 800-53', value: 30, color: '#3b82f6' },
  { name: 'PCI DSS v4.0', value: 15, color: '#f59e0b' },
  { name: 'ISO 27001', value: 10, color: '#8b5cf6' },
];

const KPI_CARDS = [
  { title: 'Global Compliance Score', value: '96.2%', trend: '+1.4% Monthly', color: 'emerald', icon: ShieldCheck },
  { title: 'Active Violations', value: '14', trend: '8 Critical Scoped', color: 'rose', icon: AlertTriangle },
  { title: 'Remediation Rate', value: '88%', trend: 'Auto-fix enabled', color: 'blue', icon: Zap },
  { title: 'Audit Readiness', value: 'Level 4', trend: 'Ready for Review', color: 'indigo', icon: FileCheck },
];

const ComplianceDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Platform Compliance Intelligence</h1>
          <p className="text-slate-400">Automated policy-as-code enforcement and continuous governance monitoring.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Download Audit Export
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Trigger Full Cloud Scan
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium text-slate-400`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Trend */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Continuous Compliance Validation</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scanData}>
                <defs>
                  <linearGradient id="colorCompliant" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="compliant" stroke="#10b981" fill="url(#colorCompliant)" name="Compliant %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Framework Distribution */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Policy Framework Mapping</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={frameworkDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {frameworkDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {frameworkDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-slate-400">{item.name}</span>
                  </div>
                  <span className="text-white font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Violations & Remediation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Critical Compliance Violations</h3>
          <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">View Remediation History</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Policy Name</th>
                <th className="px-6 py-4 font-semibold">Affected Resource</th>
                <th className="px-6 py-4 font-semibold">Severity</th>
                <th className="px-6 py-4 font-semibold">Framework</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { policy: 'S3 Bucket Public Access', resource: 'user-data-prod-v1', severity: 'CRITICAL', framework: 'CIS 1.2', status: 'Auto-Remediating' },
                { policy: 'SSH Port Open to 0.0.0.0/0', resource: 'jumpbox-staging-01', severity: 'HIGH', framework: 'NIST AC-4', status: 'Blocked' },
                { policy: 'EBS Volume No Encryption', resource: 'vol-0a82b8...', severity: 'MEDIUM', framework: 'ISO A.18', status: 'Scan Error' },
                { policy: 'Root Account MFA Missing', resource: 'aws-account-8821', severity: 'CRITICAL', framework: 'PCI 8.3', status: 'Alert Sent' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-300">{row.policy}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400 font-mono">{row.resource}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      row.severity === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400' : 
                      row.severity === 'HIGH' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>{row.severity}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-mono italic">{row.framework}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-300">{row.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;
