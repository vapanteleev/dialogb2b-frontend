import React from 'react';
import logo from './logo.svg';
import './App.css';
import ResponseList from './components/ResponseList/ResponseList';
import AppRoutes from './Router/Router';

function App() {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
