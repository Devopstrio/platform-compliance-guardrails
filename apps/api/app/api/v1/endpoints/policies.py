from fastapi import APIRouter, Body
router = APIRouter()
@router.post('/evaluate')
def evaluate_policy(data: dict = Body(...)):
    return {'status': 'evaluated', 'result': 'ALLOW'}
