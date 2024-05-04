// BluetoothDevicesList.js

import React, { useState, useEffect } from 'react';

const BluetoothDevicesList = ({ ipcRenderer }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
 ipcRenderer.on('device-discovered', (event, deviceData) => {
      setDevices((prevDevices) => [...prevDevices, deviceData]);
    });

    return () => {
      ipcRenderer.removeAllListeners('device-discovered');
    };
  }, []);

  return (
    <div>
      <h2>Bluetooth Devices</h2>
      <ul>
        {devices.map((device, index) => (
          <li key={index}>
            <strong>ID:</strong> {device.id}, <strong>UUID:</strong> {device.uuid},{' '}
            <strong>Address:</strong> {device.address}, <strong>Connectable:</strong>{' '}
            {device.connectable.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BluetoothDevicesList;
