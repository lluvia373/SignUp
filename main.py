from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import (
    BaseModel,
)  # JSON 형태로 데이터를 주고받고 형태가 올바른지 검증하는것


app = FastAPI()


class ID(BaseModel):
    id: str


class User(BaseModel):
    id: str
    password: str


id_list = []


@app.post("/ids")
def check_id(id_data: ID):
    print("클라이언트에서 받은 ID:", id_data.id)  # 로그 출력
    if id_data.id in id_list:
        return {"exists": True}
    else:
        id_list.append(id_data.id)
        return {"exists": False}
    print(id_list)

@app.get("/ids")
def get_id():
    return {id_list}


    
app.mount("/", StaticFiles(directory="signup-package", html=True), name="signup")
