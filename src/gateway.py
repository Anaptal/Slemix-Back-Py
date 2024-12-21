from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import httpx
from src.config.settings import AUTH_SERVICE_URL, DB_SERVICE_URL

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def proxy_request(request: Request, base_url: str):
    client = httpx.AsyncClient(base_url=base_url)
    
    try:
        url = str(request.url).split(request.url.path)[1]
        headers = dict(request.headers)
        body = await request.body()
        
        response = await client.request(
            method=request.method,
            url=url,
            headers=headers,
            content=body
        )
        
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await client.aclose()

@app.api_route("/auth/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def auth_proxy(request: Request, path: str):
    return await proxy_request(request, AUTH_SERVICE_URL)

@app.api_route("/users/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def users_proxy(request: Request, path: str):
    return await proxy_request(request, DB_SERVICE_URL)