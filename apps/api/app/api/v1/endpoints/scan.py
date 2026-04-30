from fastapi import APIRouter
router = APIRouter()
@router.get('/results')
def get_scan_results():
    return {'total_scanned': 450, 'violations': 12}
