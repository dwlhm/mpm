from datetime import datetime, timedelta, timezone
from typing import Union, Annotated

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext
from jose import JWTError, jwt
import base64

import user.auth.router as auth
import user.router as user
import powermeter.register.router as powermeter_register
import powermeter.router as powermeter
import kampus.router as kampus
import unit.router as unit
import gedung.router as gedung
import device.router as device

from configuration.config import load_config
import database.get as get
import database.insert as insert
import database.delete as delete
import database.update as update
from device_registers.registers_repo import repo as registers

config = load_config()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:4173",
    "https://simaung.unsil.ac.id",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(powermeter.router)
app.include_router(powermeter_register.router)
app.include_router(kampus.router)
app.include_router(unit.router)
app.include_router(gedung.router)
app.include_router(device.router)