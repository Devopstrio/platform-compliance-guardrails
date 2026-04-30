from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, policies, compliance, scan, remediation, governance, dashboard, metrics
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(policies.router, prefix="/policies", tags=["policies"])
api_router.include_router(compliance.router, prefix="/compliance", tags=["compliance"])
api_router.include_router(scan.router, prefix="/scan", tags=["scan"])
api_router.include_router(remediation.router, prefix="/remediation", tags=["remediation"])
api_router.include_router(governance.router, prefix="/governance", tags=["governance"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
