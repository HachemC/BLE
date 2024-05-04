import { app, BrowserWindow,ipcMain  } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import bleno from 'bleno'; // Import bleno
const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow 

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true ,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
ipcMain.on('close-app', () => {
  app.quit();
});

app.on('ready', createWindow);


const noble = require('noble');

// Initialize noble
// main.js


// Initialize noble
noble.on('stateChange', function(state) {
  console.log('Noble stateChange:', state);

  if (state === 'poweredOn') {
    // Start scanning when Bluetooth is powered on
    
  } else {
    // Stop scanning when Bluetooth is not powered on
    noble.stopScanning();
  }
});

// Handle IPC messages from renderer process to control Bluetooth
ipcMain.on('open-bluetooth', () => {
  console.log('Opening Bluetooth...');
  startScanning(); // Start scanning for Bluetooth devices
});

ipcMain.on('close-bluetooth', () => {
  console.log('stoping the scan...');
  noble.stopScanning(); // Stop scanning for Bluetooth devices
});

// Function to start scanning for Bluetooth devices
function startScanning() {
  console.log('Starting Bluetooth scanning...');

  noble.on('discover', function(peripheral) {
     const deviceData = {
      id: peripheral.id,
      uuid: peripheral.uuid,
      address: peripheral.address,
      connectable: peripheral.connectable,
      // Add other relevant data
    };
    console.log('Discovered peripheral:', peripheral);
    win.webContents.send('device-discovered', deviceData);
  });
   
  noble.startScanning(); // Start scanning for Bluetooth devices
}