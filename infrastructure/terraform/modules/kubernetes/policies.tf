resource "kubernetes_namespace" "guardrails" {
  metadata {
    name = "platform-guardrails"
  }
}

resource "kubernetes_config_map" "compliance_policies" {
  metadata {
    name      = "policy-catalog"
    namespace = kubernetes_namespace.guardrails.metadata[0].name
  }

  data = {
    "s3-no-public" = "DENY IF resource.type == 'aws_s3_bucket' AND acl == 'public-read'"
    "iam-no-star"   = "DENY IF resource.type == 'aws_iam_policy' AND action == '*'"
  }
}

# Admission Controller Simulation (Kyverno/Gatekeeper like)
resource "kubernetes_validating_webhook_configuration" "compliance_gate" {
  metadata {
    name = "compliance-admission-webhook"
  }

  webhook {
    name = "policy.devopstrio.io"
    client_config {
      service {
        name      = "policy-engine-svc"
        namespace = kubernetes_namespace.guardrails.metadata[0].name
        path      = "/validate"
      }
    }
    rule {
      api_groups   = ["*"]
      api_versions = ["*"]
      operations   = ["CREATE", "UPDATE"]
      resources    = ["*"]
    }
    admission_review_versions = ["v1"]
    side_effects              = "None"
  }
}
