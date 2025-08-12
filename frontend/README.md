# Frontend - Algorithm Visualizer

React + Vite frontend for the Algorithm Visualizer application.

## Features

- **Interactive Algorithm Selection**: Choose from available algorithms
- **Real-time Execution**: Run algorithms and see results instantly
- **Complexity Visualization**: Display time and space complexity information
- **Responsive Design**: Modern, mobile-friendly interface

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

- `src/App.jsx` - Main application component
- `src/main.jsx` - React entry point
- `src/index.css` - Global styles
- `index.html` - HTML template

## Backend Integration

The frontend connects to the FastAPI backend running on `http://localhost:8000`.

Make sure the backend is running before using the frontend features.

## Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features
- **Fetch API** - HTTP requests to backend
