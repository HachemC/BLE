import React from 'react';

const BluetoothEle = ({ device }) => {
  return (
    <div className="bluetooth-element">
      <h2>Bluetooth Device</h2>
      <p>ID: {device.id}</p>
      <p>UUID: {device.uuid}</p>
      <p>Address: {device.address}</p>
      <p>Connectable: {device.connectable ? 'Yes' : 'No'}</p>
      {/* Display other relevant information */}
    </div>
  );
};

export default BluetoothEle;
