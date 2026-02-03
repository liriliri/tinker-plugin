import { contextBridge } from 'electron'

const api = {}

contextBridge.exposeInMainWorld('plugin', api)

declare global {
  const plugin: typeof api
}
