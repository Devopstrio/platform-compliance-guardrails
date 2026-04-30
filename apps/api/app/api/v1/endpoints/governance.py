from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_governance():
    return {'status': 'ok', 'component': 'governance'}
