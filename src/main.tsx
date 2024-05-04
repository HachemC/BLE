import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { Home } from './Components/Home.tsx';
import { Start } from './Components/Start.tsx';
import BluetoothDeviceList from './Components/bluetoothlist.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Start" element={<Start/>}/>
        <Route path="/bluetoothlist" element={<BluetoothDeviceList/>}></Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message);
});
