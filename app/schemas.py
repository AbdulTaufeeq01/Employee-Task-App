from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr

# ---------- AUTH ----------
class UserCreate(BaseModel):
    username: str
    password: str

class UserRead(BaseModel):
    id: int
    username: str
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---------- Employee ----------
class EmployeeBase(BaseModel):
    name: str
    email: EmailStr
    role: str

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    role: Optional[str]

class TaskInEmployee(BaseModel):
    id: int
    title: str
    status: str
    class Config:
        from_attributes = True

class EmployeeRead(EmployeeBase):
    id: int
    created_at: datetime
    tasks: List[TaskInEmployee] = []
    class Config:
        from_attributes = True


# ---------- Task ----------
class TaskBase(BaseModel):
    title: str
    description: Optional[str]
    status: Optional[str] = "TODO"
    due_date: Optional[datetime]
    employee_id: Optional[int]

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    status: Optional[str]
    due_date: Optional[datetime]
    employee_id: Optional[int]

class EmployeeInTask(BaseModel):
    id: int
    name: str
    email: EmailStr
    class Config:
        from_attributes = True

class TaskRead(TaskBase):
    id: int
    created_at: datetime
    employee: Optional[EmployeeInTask]
    class Config:
        from_attributes = True
