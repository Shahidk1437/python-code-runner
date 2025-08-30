Backend (FastAPI) for code execution
===================================

Run locally:
- python -m venv venv
- source venv/bin/activate  # or venv\Scripts\activate on Windows
- pip install -r requirements.txt
- uvicorn main:app --host 0.0.0.0 --port 8000

POST /run with JSON { "code": "<python code>", "timeout": 6 }

SECURITY NOTE:
Running arbitrary code is dangerous. Use sandboxing/containerization for public deployment.
