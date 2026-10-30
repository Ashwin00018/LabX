import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("labx", {
  closeApp: () => ipcRenderer.invoke("close-app"),
});