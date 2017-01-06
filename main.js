const electron = require('electron');
const { ipcMain, Menu } = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

/*
original size:
width: 560
height: 315
*/

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 560,
    maxWidth: 1120,
    minWidth: 224,
    height: 339,
    maxHeight: 654,
    minHeight: 150,
    alwaysOnTop: true,
    frame: false
  });
  // resizable
  // frame: false
  // alwaysOnTop: true

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

  // const menuTemplate = [
  //   {
  //     label: 'Ferret',
  //     submenu: [
  //       {
  //         role: 'quit'
  //       }]
  //   }
  // ];
  // const menu = Menu.buildFromTemplate(menuTemplate);
  // Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
  app.quit();
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// args are true, false
ipcMain.on('expand-search-bar', (event, args) => {
  var dimensions = mainWindow.getSize();
  if (args) {
    event.sender.send('change-viewer-padding', -25);
    mainWindow.setSize(dimensions[0], dimensions[1] + 25, true);
  } else {
    event.sender.send('change-viewer-padding', 0);
    mainWindow.setSize(dimensions[0], dimensions[1] - 25, true);
  }
});

// args are data.items.length
ipcMain.on('expand-search-list', (event, args) => {
  var dimensions = mainWindow.getSize();
  if (args) {
    event.sender.send('change-viewer-padding', -225);
    mainWindow.setSize(dimensions[0], dimensions[1] + 200, true);
  } else {
    mainWindow.setSize(dimensions[0], dimensions[1] - 200, true);
  }
});