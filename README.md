# Algorithm Visualizer

A full-stack application for visualizing and understanding algorithm complexity with interactive demonstrations.

## Project Structure

```
algoV/
├── frontend/          # React + Vite frontend
│   └── src/          # Frontend source code
├── backend/           # FastAPI backend
│   └── app/
│       ├── core/     # Core algorithm implementations
│       └── main.py   # FastAPI application
└── README.md
```

## Features

- **Algorithm Demonstrations**: Interactive examples of sorting and search algorithms
- **Complexity Analysis**: Visual representation of time and space complexity
- **Educational Content**: Step-by-step breakdowns of algorithm execution

## Development

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `POST /api/run` - Execute algorithm with parameters
- `GET /api/algorithms` - List available algorithms

## Technologies

- **Backend**: Python, FastAPI
- **Frontend**: React, Vite
- **Algorithms**: Custom implementations for educational purposes
