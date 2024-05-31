from fastapi import status, Depends, HTTPException
from jose import jwt, JWTError
from typing import Annotated
from pydantic import BaseModel, EmailStr, Field

from .auth import internal as auth
from .auth.config import SECRET_KEY, ALGORITHM
from .db import get_user_by_username
from dependencies import oauth2_scheme
from configuration import config

class User(BaseModel):
    full_name: str
    username: str
    email: EmailStr
    password: str = Field(min_length=8)
    role: int

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = auth.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user_by_username(username, config.load_config())
    if user is None:
        raise credentials_exception
    return user