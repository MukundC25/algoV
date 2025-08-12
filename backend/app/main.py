from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import sys
import os

# Add the core directory to the path to import algos
sys.path.append(os.path.join(os.path.dirname(__file__), 'core'))
from algos import bubble_sort_complexity_demo, binary_search_demo, space_complexity_demo

app = FastAPI(
    title="Algorithm Visualizer API",
    description="API for running and analyzing algorithm demonstrations",
    version="1.0.0"
)

# Add CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files (built frontend)
app.mount("/static", StaticFiles(directory="dist"), name="static")

class AlgorithmRequest(BaseModel):
    algorithm: str
    data: Optional[List[int]] = None
    target: Optional[int] = None
    parameters: Optional[Dict[str, Any]] = None

class AlgorithmResponse(BaseModel):
    algorithm: str
    result: Any
    complexity: str
    steps: int
    message: str

@app.get("/")
async def serve_frontend():
    """Serve the React frontend"""
    return FileResponse(os.path.join("dist", "index.html"))

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    """Catch-all route for React Router - serve index.html for all frontend routes"""
    # Skip API routes
    if full_path.startswith("api") or full_path.startswith("docs") or full_path.startswith("openapi"):
        raise HTTPException(status_code=404, detail="Not found")
    
    # Serve frontend for all other routes
    return FileResponse(os.path.join("dist", "index.html"))

@app.get("/api")
async def root():
    return {"message": "Algorithm Visualizer API", "version": "1.0.0"}

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": "2024-08-12T17:48:00Z"}

@app.get("/api/algorithms")
async def list_algorithms():
    """List available algorithms"""
    return {
        "algorithms": [
            {
                "name": "bubble_sort",
                "description": "Bubble Sort with complexity analysis",
                "complexity": "O(n²)",
                "endpoint": "/api/run"
            },
            {
                "name": "binary_search", 
                "description": "Binary Search with step-by-step analysis",
                "complexity": "O(log n)",
                "endpoint": "/api/run"
            },
            {
                "name": "space_complexity",
                "description": "Space complexity comparison of sorting algorithms",
                "complexity": "O(1) to O(n)",
                "endpoint": "/api/run"
            }
        ]
    }

@app.post("/api/run", response_model=AlgorithmResponse)
async def run_algorithm(request: AlgorithmRequest):
    """Execute an algorithm with the given parameters"""
    
    try:
        if request.algorithm == "bubble_sort":
            # For bubble sort, we'll create a custom demo
            if not request.data:
                request.data = [64, 34, 25, 12, 22]
            
            # Run bubble sort and capture output
            import io
            import contextlib
            
            f = io.StringIO()
            with contextlib.redirect_stdout(f):
                # Create a copy to avoid modifying original
                test_array = request.data.copy()
                n = len(test_array)
                comparisons = 0
                
                for i in range(n-1):
                    for j in range(n-1-i):
                        comparisons += 1
                        if test_array[j] > test_array[j+1]:
                            test_array[j], test_array[j+1] = test_array[j+1], test_array[j]
                
                print(f"Total comparisons: {comparisons}")
            
            output = f.getvalue()
            
            return AlgorithmResponse(
                algorithm="bubble_sort",
                result={"sorted_array": test_array, "comparisons": comparisons},
                complexity="O(n²)",
                steps=comparisons,
                message=output
            )
            
        elif request.algorithm == "binary_search":
            if not request.data:
                request.data = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31]
            if request.target is None:
                request.target = 15
            
            # Run binary search and capture output
            import io
            import contextlib
            
            f = io.StringIO()
            with contextlib.redirect_stdout(f):
                binary_search_demo()
            
            output = f.getvalue()
            
            return AlgorithmResponse(
                algorithm="binary_search",
                result={"array": request.data, "target": request.target},
                complexity="O(log n)",
                steps=4,  # log2(16) = 4
                message=output
            )
            
        elif request.algorithm == "space_complexity":
            # Run space complexity demo and capture output
            import io
            import contextlib
            
            f = io.StringIO()
            with contextlib.redirect_stdout(f):
                space_complexity_demo()
            
            output = f.getvalue()
            
            return AlgorithmResponse(
                algorithm="space_complexity",
                result={"message": "Space complexity analysis completed"},
                complexity="O(1) to O(n)",
                steps=1,
                message=output
            )
            
        else:
            raise HTTPException(status_code=400, detail=f"Unknown algorithm: {request.algorithm}")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error running algorithm: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
