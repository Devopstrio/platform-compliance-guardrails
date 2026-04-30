from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_compliance():
    return {'status': 'ok', 'component': 'compliance'}
