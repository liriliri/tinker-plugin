import { makeAutoObservable } from 'mobx'

interface ParsedWhoisData {
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

interface WhoisResult {
  success: boolean
  data?: string
  parsed?: ParsedWhoisData
  error?: string
  server?: string
}

class Store {
  // Theme management
  isDark: boolean = false

  // Whois query state
  query: string = ''
  result: WhoisResult | null = null
  loading: boolean = false

  constructor() {
    makeAutoObservable(this)
    this.initTheme()
  }

  // Theme methods
  setIsDark(isDark: boolean) {
    this.isDark = isDark
  }

  protected async initTheme() {
    try {
      const theme = await tinker.getTheme()
      this.isDark = theme === 'dark'

      // Listen for theme changes
      tinker.on('changeTheme', async () => {
        const newTheme = await tinker.getTheme()
        this.setIsDark(newTheme === 'dark')
      })
    } catch (err) {
      console.error('Failed to initialize theme:', err)
    }
  }

  // Whois query methods
  setQuery(query: string) {
    this.query = query
  }

  setResult(result: WhoisResult | null) {
    this.result = result
  }

  setLoading(loading: boolean) {
    this.loading = loading
  }

  async executeQuery() {
    if (!this.query.trim()) {
      return
    }

    this.setLoading(true)
    this.setResult(null)

    try {
      const res = await whois.query(this.query.trim())
      this.setResult(res)
    } catch (error) {
      this.setResult({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      this.setLoading(false)
    }
  }
}

const store = new Store()

export default store
