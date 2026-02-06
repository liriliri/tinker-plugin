import { contextBridge } from 'electron'
import { whoisQuery, WhoisResult } from './whoisQuery'

const whoisObj = {
  query: (resource: string): Promise<WhoisResult> => {
    return whoisQuery(resource)
  },
}

contextBridge.exposeInMainWorld('whois', whoisObj)

declare global {
  const whois: typeof whoisObj
}
