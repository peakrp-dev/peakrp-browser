const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('peakrpBrowser', {
  reconnect: () => ipcRenderer.invoke('reconnect'),
});
