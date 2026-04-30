import json
import re

class PolicyEngine:
    """A lightweight policy-as-code evaluation engine (Simulating OPA behavior)."""
    
    def __init__(self):
        self.rules = []

    def load_policies(self, policy_json: str):
        self.rules = json.loads(policy_json)

    def evaluate(self, input_data: dict):
        results = []
        for rule in self.rules:
            outcome = self._process_rule(rule, input_data)
            results.append({
                "rule_id": rule["id"],
                "name": rule["name"],
                "status": "ALLOW" if outcome else "DENY",
                "severity": rule.get("severity", "MEDIUM")
            })
        return results

    def _process_rule(self, rule: dict, data: dict):
        # Simulated Rego logic: check if certain patterns exist
        # Example: rule["condition"] = "resource.type == 'aws_s3_bucket' and resource.acl == 'public-read'"
        condition = rule.get("condition", "")
        
        # Super simple python-based evaluator for the demo
        if "aws_s3_bucket" in condition and data.get("resource_type") == "aws_s3_bucket":
            if "public-read" in condition and data.get("acl") == "public-read":
                return False # Violation found
        
        return True # Compliant

class ScanningEngine:
    """Engine for performing IaC and Runtime scans."""
    
    def __init__(self, engine: PolicyEngine):
        self.engine = engine

    def scan_iac(self, tf_plan: dict):
        print("Starting IaC Compliance Scan...")
        violations = []
        resources = tf_plan.get("resource_changes", [])
        
        for res in resources:
            input_context = {
                "resource_type": res.get("type"),
                "acl": res.get("change", {}).get("after", {}).get("acl")
            }
            results = self.engine.evaluate(input_context)
            for r in results:
                if r["status"] == "DENY":
                    violations.append({
                        "resource": res.get("name"),
                        "violation": r["name"],
                        "severity": r["severity"]
                    })
        
        return violations

if __name__ == "__main__":
    pe = PolicyEngine()
    pe.load_policies(json.dumps([
        {"id": "POL-001", "name": "No Public S3 Buckets", "condition": "resource.type == 'aws_s3_bucket' and resource.acl == 'public-read'", "severity": "CRITICAL"}
    ]))
    
    scanner = ScanningEngine(pe)
    # Mock terraform plan
    mock_plan = {
        "resource_changes": [
            {"name": "bad_bucket", "type": "aws_s3_bucket", "change": {"after": {"acl": "public-read"}}}
        ]
    }
    
    print(f"Scan Results: {scanner.scan_iac(mock_plan)}")
