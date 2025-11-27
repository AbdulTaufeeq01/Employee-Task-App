from sqlalchemy.orm import Session
from typing import Optional, List

from . import models, schemas


# ---------- USERS ----------
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def create_user(db: Session, user_in: schemas.UserCreate, hashed_pw: str):
    user = models.User(username=user_in.username, hashed_password=hashed_pw)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# ---------- EMPLOYEES ----------
def create_employee(db: Session, emp_in: schemas.EmployeeCreate):
    emp = models.Employee(**emp_in.dict())
    db.add(emp)
    db.commit()
    db.refresh(emp)
    return emp


def get_employee(db: Session, emp_id: int):
    return db.query(models.Employee).filter(models.Employee.id == emp_id).first()


def list_employees(db: Session):
    return db.query(models.Employee).all()


def update_employee(db: Session, emp: models.Employee, data: schemas.EmployeeUpdate):
    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(emp, key, value)
    db.commit()
    db.refresh(emp)
    return emp


def delete_employee(db: Session, emp: models.Employee):
    db.delete(emp)
    db.commit()


# ---------- TASKS ----------
def create_task(db: Session, task_in: schemas.TaskCreate):
    task = models.Task(**task_in.dict())
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def list_tasks(db: Session):
    return db.query(models.Task).all()


def update_task(db: Session, task: models.Task, data: schemas.TaskUpdate):
    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task: models.Task):
    db.delete(task)
    db.commit()
