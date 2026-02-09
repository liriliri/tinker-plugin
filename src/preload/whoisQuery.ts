import * as net from 'net'
import isIp from 'licia/isIp'
import { TLD_TO_WHOIS_SERVER, IP_WHOIS_SERVERS } from './whoisServers'
import { parseWhoisData, ParsedWhoisData } from './whoisParser'

const WHOIS_PORT = 43
const WHOIS_TIMEOUT = 10000

export interface WhoisResult {
  success: boolean
  data?: string
  parsed?: ParsedWhoisData
  error?: string
  server?: string
}

function isASN(str: string): boolean {
  return /^(?:as|asn)?\d+$/i.test(str)
}

function getTLD(domain: string): string {
  const parts = domain.split('.')
  return parts[parts.length - 1].toLowerCase()
}

function getMainDomain(domain: string): string {
  const parts = domain.split('.')
  if (parts.length <= 2) {
    return domain
  }
  return parts.slice(-2).join('.')
}

function formatQuery(domain: string, server: string): string {
  if (
    server === 'whois.verisign-grs.com' ||
    server === 'whois.networksolutions.com'
  ) {
    return `domain ${domain}`
  }
  return domain
}

async function queryWhoisServer(
  server: string,
  query: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = new net.Socket()
    let data = ''

    client.setTimeout(WHOIS_TIMEOUT)

    client.on('timeout', () => {
      client.destroy()
      reject(new Error('Connection timeout'))
    })

    client.on('error', (err) => {
      reject(err)
    })

    client.on('data', (chunk) => {
      data += chunk.toString()
    })

    client.on('close', () => {
      resolve(data)
    })

    client.connect(WHOIS_PORT, server, () => {
      client.write(query + '\r\n')
    })
  })
}

async function queryDomain(domain: string): Promise<WhoisResult> {
  try {
    const mainDomain = getMainDomain(domain)
    const tld = getTLD(mainDomain)
    const server = TLD_TO_WHOIS_SERVER[tld]

    if (!server) {
      return {
        success: false,
        error: `No WHOIS server found for TLD: ${tld}`,
      }
    }

    const formattedQuery = formatQuery(mainDomain, server)
    const data = await queryWhoisServer(server, formattedQuery)
    const parsed = parseWhoisData(data)

    // Only include parsed data if it's meaningful (not null)
    return {
      success: true,
      data,
      ...(parsed && { parsed }),
      server,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

async function queryIP(ip: string): Promise<WhoisResult> {
  try {
    let lastError: Error | null = null

    for (const server of IP_WHOIS_SERVERS) {
      try {
        const data = await queryWhoisServer(server, ip)
        if (data && data.trim().length > 0) {
          return {
            success: true,
            data,
            server,
          }
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        continue
      }
    }

    return {
      success: false,
      error: lastError ? lastError.message : 'No WHOIS data found for this IP',
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

async function queryASN(asn: string): Promise<WhoisResult> {
  try {
    const normalizedASN = asn.replace(/^(?:as|asn)/i, '')
    const server = 'whois.arin.net'
    const data = await queryWhoisServer(server, `AS${normalizedASN}`)

    return {
      success: true,
      data,
      server,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

export async function whoisQuery(resource: string): Promise<WhoisResult> {
  const trimmedResource = resource.trim().toLowerCase()

  if (!trimmedResource) {
    return {
      success: false,
      error: 'Please enter a domain, IP address, or ASN',
    }
  }

  if (isIp(trimmedResource)) {
    return queryIP(trimmedResource)
  } else if (isASN(trimmedResource)) {
    return queryASN(trimmedResource)
  } else {
    return queryDomain(trimmedResource)
  }
}
