from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import schemas, crud
from ..database import get_db
from ..auth import get_current_user

router = APIRouter()


@router.post("/", response_model=schemas.EmployeeRead)
def create_employee(
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    return crud.create_employee(db, employee)


@router.get("/", response_model=list[schemas.EmployeeRead])
def list_employees(
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    return crud.list_employees(db)


@router.get("/{emp_id}", response_model=schemas.EmployeeRead)
def get_employee(emp_id: int,
                 db: Session = Depends(get_db),
                 user: str = Depends(get_current_user)):
    emp = crud.get_employee(db, emp_id)
    if not emp:
        raise HTTPException(404, "Employee not found")
    return emp


@router.put("/{emp_id}", response_model=schemas.EmployeeRead)
def update_employee(
    emp_id: int,
    employee: schemas.EmployeeUpdate,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    emp = crud.get_employee(db, emp_id)
    if not emp:
        raise HTTPException(404, "Not found")
    return crud.update_employee(db, emp, employee)


@router.delete("/{emp_id}")
def delete_employee(
    emp_id: int,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    emp = crud.get_employee(db, emp_id)
    if not emp:
        raise HTTPException(404, "Not found")
    crud.delete_employee(db, emp)
    return {"status": "deleted"}
