export interface ParsedWhoisData {
  domainName?: string
  registrar?: string
  registrarUrl?: string
  creationDate?: string
  expiryDate?: string
  updatedDate?: string
  status?: string[]
  nameServers?: string[]
  dnssec?: string
  registrant?: {
    name?: string
    organization?: string
    email?: string
    country?: string
  }
  admin?: {
    name?: string
    organization?: string
    email?: string
  }
  tech?: {
    name?: string
    organization?: string
    email?: string
  }
}

function extractField(text: string, patterns: string[]): string | undefined {
  for (const pattern of patterns) {
    const regex = new RegExp(`${pattern}:?\\s*(.+)`, 'i')
    const match = text.match(regex)
    if (match && match[1]) {
      return match[1].trim()
    }
  }
  return undefined
}

function extractMultipleFields(text: string, patterns: string[]): string[] {
  const results: string[] = []
  for (const pattern of patterns) {
    const regex = new RegExp(`${pattern}:?\\s*(.+)`, 'gi')
    let match
    while ((match = regex.exec(text)) !== null) {
      if (match[1]) {
        const value = match[1].trim()
        if (value && !results.includes(value)) {
          results.push(value)
        }
      }
    }
  }
  return results
}

export function parseWhoisData(rawData: string): ParsedWhoisData {
  const lines = rawData.split('\n')
  const parsed: ParsedWhoisData = {}

  parsed.domainName = extractField(rawData, ['Domain Name', 'domain', 'Domain'])

  parsed.registrar = extractField(rawData, [
    'Registrar',
    'Sponsoring Registrar',
    'Registrar Name',
  ])

  parsed.registrarUrl = extractField(rawData, [
    'Registrar URL',
    'Registrar Web',
  ])

  parsed.creationDate = extractField(rawData, [
    'Creation Date',
    'Created',
    'Created Date',
    'Registration Time',
    'Registered',
    'Domain Registration Date',
  ])

  parsed.expiryDate = extractField(rawData, [
    'Expiry Date',
    'Expiration Date',
    'Expires',
    'Registry Expiry Date',
    'Expiration Time',
    'Paid-till',
  ])

  parsed.updatedDate = extractField(rawData, [
    'Updated Date',
    'Last Updated',
    'Modified',
    'Last Modified',
  ])

  const statusList = extractMultipleFields(rawData, [
    'Domain Status',
    'Status',
    'state',
  ])
  if (statusList.length > 0) {
    parsed.status = statusList
  }

  const nameServers = extractMultipleFields(rawData, [
    'Name Server',
    'Nameserver',
    'nserver',
    'DNS',
  ])
  if (nameServers.length > 0) {
    parsed.nameServers = nameServers
  }

  parsed.dnssec = extractField(rawData, ['DNSSEC', 'dnssec'])

  const registrantName = extractField(rawData, [
    'Registrant Name',
    'Registrant Contact Name',
  ])
  const registrantOrg = extractField(rawData, [
    'Registrant Organization',
    'Registrant',
  ])
  const registrantEmail = extractField(rawData, [
    'Registrant Email',
    'Registrant Contact Email',
  ])
  const registrantCountry = extractField(rawData, [
    'Registrant Country',
    'Registrant Contact Country',
  ])

  if (registrantName || registrantOrg || registrantEmail || registrantCountry) {
    parsed.registrant = {
      name: registrantName,
      organization: registrantOrg,
      email: registrantEmail,
      country: registrantCountry,
    }
  }

  const adminName = extractField(rawData, [
    'Admin Name',
    'Administrative Contact Name',
  ])
  const adminOrg = extractField(rawData, [
    'Admin Organization',
    'Administrative Contact Organization',
  ])
  const adminEmail = extractField(rawData, [
    'Admin Email',
    'Administrative Contact Email',
  ])

  if (adminName || adminOrg || adminEmail) {
    parsed.admin = {
      name: adminName,
      organization: adminOrg,
      email: adminEmail,
    }
  }

  const techName = extractField(rawData, [
    'Tech Name',
    'Technical Contact Name',
  ])
  const techOrg = extractField(rawData, [
    'Tech Organization',
    'Technical Contact Organization',
  ])
  const techEmail = extractField(rawData, [
    'Tech Email',
    'Technical Contact Email',
  ])

  if (techName || techOrg || techEmail) {
    parsed.tech = {
      name: techName,
      organization: techOrg,
      email: techEmail,
    }
  }

  return parsed
}
