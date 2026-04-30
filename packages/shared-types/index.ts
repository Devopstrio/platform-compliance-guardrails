export enum ComplianceFramework {
  CIS = "CIS",
  NIST = "NIST",
  ISO_27001 = "ISO_27001",
  PCI_DSS = "PCI_DSS",
  SOC2 = "SOC2",
  HIPAA = "HIPAA"
}

export enum ControlType {
  PREVENTIVE = "PREVENTIVE",
  DETECTIVE = "DETECTIVE",
  CORRECTIVE = "CORRECTIVE"
}

export enum ComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  EXEMPT = "EXEMPT",
  ERROR = "ERROR",
  SCANNING = "SCANNING"
}

export interface CompliancePolicy {
  id: string;
  name: string;
  description: string;
  framework: ComplianceFramework;
  type: ControlType;
  regoRule?: string; // OPA rule string
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

export interface ScanResult {
  id: string;
  policyId: string;
  resourceId: string;
  resourceType: string;
  status: ComplianceStatus;
  timestamp: string;
  findings: string;
  evidencePath?: string;
}

export interface ExceptionRequest {
  id: string;
  policyId: string;
  resourceId: string;
  reason: string;
  requestedBy: string;
  expiresAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface ComplianceKPIs {
  overallScore: number; // 0-100
  activeViolations: number;
  unremediatedCriticals: number;
  driftRate: number; // Percentage
  avgRemediationTimeHours: number;
}
