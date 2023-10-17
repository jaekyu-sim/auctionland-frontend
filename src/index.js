// webpack 설정을 통하여 src/index.js 가 entry 포인트로 가장 먼저 실행됨
import React, {useEffect, useState} from "react";
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

// App.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, './index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
