from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_remediation():
    return {'status': 'ok', 'component': 'remediation'}
