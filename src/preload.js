const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('peakrpBrowser', {
  connect: (token) => ipcRenderer.invoke('connect', token),
  reconnect: () => ipcRenderer.invoke('reconnect'),
});
