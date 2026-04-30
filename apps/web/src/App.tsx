import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ComplianceDashboard from './pages/ComplianceDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The compliance guardrail engine is currently synchronizing policy definitions. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<ComplianceDashboard />} />
          <Route path="/policies" element={<Placeholder name="Policy-as-Code Registry" />} />
          <Route path="/scans" element={<Placeholder name="Infrastructure Compliance Scans" />} />
          <Route path="/remediation" element={<Placeholder name="Automated Remediation Workflows" />} />
          <Route path="/drift" element={<Placeholder name="Infrastructure Drift Analytics" />} />
          <Route path="/governance" element={<Placeholder name="Governance & Exception Approvals" />} />
          <Route path="/audit" element={<Placeholder name="Audit Evidence & Logs" />} />
          <Route path="/risk" element={<Placeholder name="Security Risk Assessment" />} />
          <Route path="/logs" element={<Placeholder name="Policy Enforcement History" />} />
          <Route path="/settings" element={<Placeholder name="Global Platform Configuration" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
