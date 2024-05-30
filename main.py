from datetime import datetime, timedelta, timezone
from typing import Union, Annotated

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext
from jose import JWTError, jwt
import base64

from configuration.config import load_config
import database.get as get
import database.insert as insert
import database.delete as delete
import database.update as update
from database import powermeter
from device_registers.registers_repo import repo as registers

config = load_config()

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

@app.get("/")
def read_root():
	return {"Hello": "World"}

class User(BaseModel):
    full_name: str
    username: str
    email: EmailStr
    password: str = Field(min_length=8)
    role: int

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None
    
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

@app.post("/users")
def insert_new_user(user: User):
	user.password = get_password_hash(user.password)
	data = insert.insert_new_user(user)
	return {"status": "success", "results": user}


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(username: str, password: str):
    user = get.get_user_by_username(username)
    if not user:
        return False
    if not verify_password(password, user[2]):
        return False
    return user

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

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
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get.get_user_by_username(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

@app.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_user)],
):
    return current_user

@app.get("/users")
def get_all_users(token: Annotated[str, Depends(oauth2_scheme)]):
    data = get.get_all_user()
    return data


@app.get("/devices")
def read_all_device_ip(token: Annotated[str, Depends(oauth2_scheme)]):
    data = get.get_all_devices_ip()
    if data.get("error"):
        raise HTTPException(
            status_code=500,
            detail="database connection error"
        )
    if data.get("data") == []:
        raise HTTPException(
            status_code=404,
            detail="no data"
        )
    
    result = []
    
    for data in data.get("data"):
        lst = list(data)
        lst[2] = base64.b64encode(str(data[2]).encode()).decode("utf-8")
        result.append(tuple(lst))

    return {"status": "success", "results": {"data": result}}

class Device(BaseModel):
	name: str
	ip_addr: str
	seri: str = Field(default="AW9L")

@app.post("/devices")
def insert_new_device(device: Device, token: Annotated[str, Depends(oauth2_scheme)]):
	data = insert.insert_device(device.name, device.ip_addr, device.seri)
	return {"status": "success", "results": base64.b64encode(str(data).encode)}

@app.get("/devices/{device_id}")
def read_device_info(device_id: str, token: Annotated[str, Depends(oauth2_scheme)]):
    device_id = base64.b64decode(device_id).decode("utf-8")
    data = get.get_device(device_id)
	
    return {"status": "success", "results": data}

@app.put("/devices/{device_id}")
def update_device_info(device_id: str, device: Device, token: Annotated[str, Depends(oauth2_scheme)]):
    data = update.update_device_detail(
          device_id=device_id, 
          device_name=device.name,
          device_ip=device.ip_addr
        )
    
    if data.get("error"):
        raise HTTPException(
            status_code=500,
            detail="database connection error"
        )
    
    return {
         "status": "success",
         "results": data
    } 

@app.delete("/devices/{device_id}")
def remove_device_by_id(device_id: str, token: Annotated[str, Depends(oauth2_scheme)]):
    device_id = base64.b64decode(device_id).decode("utf-8")
    data = delete.remove_device(device_id)
    return {"status": "success", "results": data}

@app.get("/devices/{device_id}/latest")
def read_device_data(device_id: str, token: Annotated[str, Depends(oauth2_scheme)]):
    device_id = base64.b64decode(device_id).decode("utf-8")
    data = get.get_data_latest(device_id)
    
    if data == None:
        raise HTTPException(
            status_code=404,
            detail="no data"
        )

    return {"status": "success", "results": {
        "data": data[0],
        "timestamp": data[1]
    }}

@app.post("/devices/{device_id}/latest")
def insert_dummy_data(device_id: str, data: str, token: Annotated[str, Depends(oauth2_scheme)]):
    device_id = base64.b64decode(device_id).decode("utf-8")
    insert.insert_data(device_id, data)

    return { "status": "success" }

@app.get("/datasheet/{seri}")
def get_datasheet(seri: str, token: Annotated[str, Depends(oauth2_scheme)]):
    return { "status": "success", "results": registers[seri]}

# Struktur database baru
@app.post("/powermeter")
async def insert_powermeter(pm_seri: str, pm_name: str, token: Annotated[str, Depends(oauth2_scheme)]):
    res = powermeter.new(
        pm_name=pm_name,
        pm_seri=pm_seri,
        config=config
    )

    if (res.get("error")):
        raise HTTPException(
            status_code=400,
            detail=res.get("error")
        )
    
    return {
        "status": "success",
        "results": base64.b64encode(str(res.get("data")).encode()).decode()
    }

@app.get("/powermeter")
async def get_all_powermeter(token: Annotated[str, Depends(oauth2_scheme)]):
    res = powermeter.get_all(config)

    if (res.get("error")):
        raise HTTPException(
            status_code=400,
            detail=res.get("error")
        )
    
    return {
        "status": "success",
        "results": res.get("data")
    }

@app.get("/powermeter/{id}")
async def get_powermeter_by_id(id: str, token: Annotated[str, Depends(oauth2_scheme)]):
    id = base64.b64decode(id).decode()
    res = powermeter.get_one(id=id,config=config)
    print("ID", id)

    if (res.get("error")):
        raise HTTPException(
            status_code=400,
            detail=str(res.get("error"))
        )
    
    return {
        "status": "success",
        "results": res.get("data")
    }