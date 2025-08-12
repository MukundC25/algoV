# Backend - Algorithm Visualizer API

FastAPI backend that provides HTTP endpoints for running algorithm demonstrations.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the API

### Development mode (with auto-reload):
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production mode:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `GET /api/algorithms` - List available algorithms
- `POST /api/run` - Execute an algorithm

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Development

The backend is structured as:
- `app/main.py` - FastAPI application and endpoints
- `app/core/algos.py` - Core algorithm implementations
