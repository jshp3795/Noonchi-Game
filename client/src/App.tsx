import React from 'react';
import { Router, Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Index from "./pages/index";
import Iceberg from './pages/iceberg';
import { SocketMessage } from './types';

const wss = new WebSocket("ws://127.0.0.1:6969");

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game/iceberg/:id" element={<Iceberg/>} />
          <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
export { wss };
