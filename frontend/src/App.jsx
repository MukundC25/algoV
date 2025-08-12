import React, { useState, useEffect } from 'react'

function App() {
  const [algorithms, setAlgorithms] = useState([])
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('')
  const [inputData, setInputData] = useState('')
  const [targetValue, setTargetValue] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Use relative paths for production deployment
  const API_BASE = '/api'

  useEffect(() => {
    fetchAlgorithms()
  }, [])

  const fetchAlgorithms = async () => {
    try {
      const response = await fetch(`${API_BASE}/algorithms`)
      const data = await response.json()
      setAlgorithms(data.algorithms)
    } catch (err) {
      setError('Failed to fetch algorithms')
      console.error('Error fetching algorithms:', err)
    }
  }

  const runAlgorithm = async () => {
    if (!selectedAlgorithm) {
      setError('Please select an algorithm')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const requestBody = {
        algorithm: selectedAlgorithm
      }

      // Add algorithm-specific parameters
      if (selectedAlgorithm === 'bubble_sort' && inputData) {
        try {
          const dataArray = JSON.parse(inputData)
          if (Array.isArray(dataArray)) {
            requestBody.data = dataArray
          }
        } catch (e) {
          setError('Invalid array format. Use JSON array like [1,2,3,4,5]')
          setLoading(false)
          return
        }
      } else if (selectedAlgorithm === 'binary_search') {
        if (inputData) {
          try {
            const dataArray = JSON.parse(inputData)
            if (Array.isArray(dataArray)) {
              requestBody.data = dataArray
            }
          } catch (e) {
            setError('Invalid array format. Use JSON array like [1,2,3,4,5]')
            setLoading(false)
            return
          }
        }
        if (targetValue) {
          requestBody.target = parseInt(targetValue)
        }
      }

      const response = await fetch(`${API_BASE}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(`Failed to run algorithm: ${err.message}`)
      console.error('Error running algorithm:', err)
    } finally {
      setLoading(false)
    }
  }

  const getDefaultInput = (algorithm) => {
    switch (algorithm) {
      case 'bubble_sort':
        return '[64, 34, 25, 12, 22]'
      case 'binary_search':
        return '[1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31]'
      default:
        return ''
    }
  }

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm)
    setInputData(getDefaultInput(algorithm))
    setTargetValue('')
    setResult(null)
    setError('')
  }

  return (
    <div className="App">
      <h1>🧮 Algorithm Visualizer</h1>
      <p>Interactive demonstrations of algorithm complexity and execution</p>

      <div className="algorithm-selection">
        <h2>Select Algorithm</h2>
        <div className="algorithm-grid">
          {algorithms.map((algo) => (
            <div 
              key={algo.name}
              className={`algorithm-card ${selectedAlgorithm === algo.name ? 'selected' : ''}`}
              onClick={() => handleAlgorithmChange(algo.name)}
            >
              <h3>{algo.name.replace('_', ' ').toUpperCase()}</h3>
              <p>{algo.description}</p>
              <span className="complexity-badge">{algo.complexity}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedAlgorithm && (
        <div className="algorithm-controls">
          <h2>Run {selectedAlgorithm.replace('_', ' ').toUpperCase()}</h2>
          
          {selectedAlgorithm === 'bubble_sort' && (
            <div className="input-group">
              <label htmlFor="inputData">Input Array (JSON format):</label>
              <input
                id="inputData"
                type="text"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="[64, 34, 25, 12, 22]"
              />
            </div>
          )}

          {selectedAlgorithm === 'binary_search' && (
            <>
              <div className="input-group">
                <label htmlFor="inputData">Sorted Array (JSON format):</label>
                <input
                  id="inputData"
                  type="text"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder="[1, 3, 5, 7, 9, 11, 13, 15]"
                />
              </div>
              <div className="input-group">
                <label htmlFor="targetValue">Target Value:</label>
                <input
                  id="targetValue"
                  type="number"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  placeholder="15"
                />
              </div>
            </>
          )}

          <button 
            onClick={runAlgorithm} 
            disabled={loading}
            className="run-button"
          >
            {loading ? 'Running...' : 'Run Algorithm'}
          </button>
        </div>
      )}

      {error && (
        <div className="error-message">
          <h3>❌ Error</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="result-section">
          <h2>📊 Results</h2>
          <div className="result-summary">
            <p><strong>Algorithm:</strong> {result.algorithm}</p>
            <p><strong>Complexity:</strong> <span className="complexity-badge">{result.complexity}</span></p>
            <p><strong>Steps:</strong> {result.steps}</p>
          </div>
          
          <div className="result-display">
            <h4>Execution Output:</h4>
            <pre>{result.message}</pre>
          </div>

          {result.result && (
            <div className="result-data">
              <h4>Result Data:</h4>
              <pre>{JSON.stringify(result.result, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      <div className="footer">
        <p>Algorithm Visualizer - Production Ready</p>
        <p>Check <a href="/docs" target="_blank" rel="noopener noreferrer">API Documentation</a></p>
      </div>
    </div>
  )
}

export default App
