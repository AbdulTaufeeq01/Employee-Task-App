from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import schemas, crud
from ..database import get_db
from ..auth import get_current_user

router = APIRouter()


@router.post("/", response_model=schemas.TaskRead)
def create_task(
    task: schemas.TaskCreate,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    return crud.create_task(db, task)


@router.get("/", response_model=list[schemas.TaskRead])
def list_tasks(
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    return crud.list_tasks(db)


@router.get("/{task_id}", response_model=schemas.TaskRead)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    task = crud.get_task(db, task_id)
    if not task:
        raise HTTPException(404, "Not found")
    return task


@router.put("/{task_id}", response_model=schemas.TaskRead)
def update_task(
    task_id: int,
    task_in: schemas.TaskUpdate,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    task = crud.get_task(db, task_id)
    if not task:
        raise HTTPException(404, "Not found")
    return crud.update_task(db, task, task_in)


@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    task = crud.get_task(db, task_id)
    if not task:
        raise HTTPException(404, "Not found")
    crud.delete_task(db, task)
    return {"status": "deleted"}
