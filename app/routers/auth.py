from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import schemas, crud
from ..database import get_db
from ..auth import create_access_token, verify_password, get_password_hash

router = APIRouter()


@router.post("/register", response_model=schemas.UserRead)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    exists = crud.get_user_by_username(db, user_in.username)
    if exists:
        raise HTTPException(400, "Username already taken")
    hashed = get_password_hash(user_in.password)
    return crud.create_user(db, user_in, hashed)


@router.post("/login", response_model=schemas.Token)
def login(form: OAuth2PasswordRequestForm = Depends(),
          db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, form.username)
    if not user:
        raise HTTPException(400, "Invalid credentials")
    if not verify_password(form.password, user.hashed_password):
        raise HTTPException(400, "Invalid credentials")

    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}
