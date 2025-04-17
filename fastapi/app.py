import os
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from db_conn import get_postgres_conn
from query import *

conn = None

@asynccontextmanager
async def db_connection(app: FastAPI):
    try:
        global conn
        conn = get_postgres_conn()
        yield
    except Exception as err:
        print(f"Error: {err}")

app = FastAPI(lifespan=db_connection)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def hello():
    print()
    return {"message": "backend server loaded!"}

@app.get("/pointstable")
async def dashboard():
    # print(conn)
    with conn:
        with conn.cursor() as curs:
            curs.execute(points_table_query)
            res = curs.fetchall()
            columns = [desc[0] for desc in curs.description]
            return [dict(zip(columns, row)) for row in res]
        
@app.get("/clubs")
async def clubs():
    # print(conn)
    with conn:
        with conn.cursor() as curs:
            curs.execute(league_clubs)
            res = curs.fetchall()
            columns = [desc[0] for desc in curs.description]
            return [dict(zip(columns, row)) for row in res]
        
@app.get("/fixtures")
async def fixture():
    # print(conn)
    with conn:
        with conn.cursor() as curs:
            curs.execute(fixtures)
            res = curs.fetchall()
            columns = [desc[0] for desc in curs.description]
            return [dict(zip(columns, row)) for row in res]
        
class clubFixtureBody(BaseModel):
    club_name: str = ''

@app.post("/clubFixtures")
async def clubFixtures(body: clubFixtureBody):
    # print(conn)
    with conn:
        with conn.cursor() as curs:
            curs.execute(club_fixtures, (body.club_name, body.club_name))
            res = curs.fetchall()
            columns = [desc[0] for desc in curs.description]
            return [dict(zip(columns, row)) for row in res]
        
@app.get("/leagueDetails")
async def leagueDetails():
    # print(conn)
    with conn:
        with conn.cursor() as curs:
            curs.execute(league_detail)
            res = curs.fetchall()
            columns = [desc[0] for desc in curs.description]
            return [dict(zip(columns, row)) for row in res]
        
class clubDetailsBody(BaseModel):
    club_name: str = ''
        
@app.post("/clubDetails")
async def clubDetails(body: clubDetailsBody):
    # print(conn)
    with conn:
        with conn.cursor() as curs:
            curs.execute(club_detail, (body.club_name, ))
            res = curs.fetchall()
            columns = [desc[0] for desc in curs.description]
            return [dict(zip(columns, row)) for row in res]
        
class clubProfileBody(BaseModel):
    club_name: str = ''
        
@app.post("/teamProfile")
async def teamProfile(body: clubProfileBody):
    # print(conn)
    with conn:
        with conn.cursor() as curs:
            curs.execute(team_profile, (body.club_name, ))
            res = curs.fetchall()
            columns = [desc[0] for desc in curs.description]
            return [dict(zip(columns, row)) for row in res]


if __name__ == "__main__":
    app_port = int(os.getenv("APP_PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=app_port)
