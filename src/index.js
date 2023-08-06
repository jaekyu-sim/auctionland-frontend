// webpack 설정을 통하여 src/index.js 가 entry 포인트로 가장 먼저 실행됨
import React from "react";
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
