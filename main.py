from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncio, uuid, os, sys

app = FastAPI()

class CodeRequest(BaseModel):
    code: str
    timeout: int = 6

@app.post("/run")
async def run_code(req: CodeRequest):
    code = req.code or ""
    if not code.strip():
        raise HTTPException(status_code=400, detail="No code provided")
    if len(code) > 10000:
        raise HTTPException(status_code=400, detail="Code too long")
    uid = uuid.uuid4().hex
    fn = f"/tmp/{uid}.py"
    with open(fn, "w", encoding="utf-8") as f:
        f.write(code)
    try:
        proc = await asyncio.create_subprocess_exec(
            sys.executable, fn,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        try:
            stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=req.timeout)
        except asyncio.TimeoutError:
            proc.kill()
            raise HTTPException(status_code=408, detail="Execution timed out")
        out = stdout.decode(errors='replace')
        err = stderr.decode(errors='replace')
        return { "stdout": out, "stderr": err, "exit_code": proc.returncode }
    finally:
        try:
            os.remove(fn)
        except Exception:
            pass
