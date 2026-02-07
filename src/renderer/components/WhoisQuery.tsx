import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import * as Tabs from '@radix-ui/react-tabs'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Separator from '@radix-ui/react-separator'
import * as Tooltip from '@radix-ui/react-tooltip'
import className from 'licia/className'
import store from '../store'

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

const WhoisQuery = observer(() => {
  const { t } = useTranslation()
  const { query, result, loading } = store

  const handleQuery = async () => {
    await store.executeQuery()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading && query.trim()) {
      handleQuery()
    }
  }

  const handleQueryChange = (value: string) => {
    store.setQuery(value)
  }

  const renderDataField = (label: string, value: any) => {
    if (!value) return null

    const fieldLabels: Record<string, string> = {
      name: t('name'),
      organization: t('organization'),
      email: t('email'),
      country: t('country'),
    }

    if (Array.isArray(value)) {
      return (
        <div className="group">
          <dt className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            {label}
          </dt>
          <dd className="text-sm mb-4">
            <div className="flex flex-col gap-1">
              {value.map((item, idx) => (
                <span
                  key={idx}
                  className="text-slate-700 dark:text-slate-300 font-mono text-xs px-2 py-1 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </dd>
        </div>
      )
    }

    if (typeof value === 'object') {
      return (
        <div className="group">
          <dt className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            {label}
          </dt>
          <dd className="text-sm mb-4 space-y-1">
            {Object.entries(value).map(([key, val]) => (
              <div key={key} className="flex gap-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium min-w-[100px]">
                  {fieldLabels[key] ?? key}:
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-mono">
                  {String(val)}
                </span>
              </div>
            ))}
          </dd>
        </div>
      )
    }

    return (
      <div className="group">
        <dt className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
          {label}
        </dt>
        <dd className="text-sm text-slate-700 dark:text-slate-300 font-mono mb-4">
          {String(value)}
        </dd>
      </div>
    )
  }

  const renderParsedData = (parsed: ParsedWhoisData) => {
    const data: Record<string, any> = {}

    if (parsed.domainName) data[t('domainName')] = parsed.domainName
    if (parsed.registrar) data[t('registrar')] = parsed.registrar
    if (parsed.registrarUrl) data[t('registrarUrl')] = parsed.registrarUrl
    if (parsed.creationDate) data[t('creationDate')] = parsed.creationDate
    if (parsed.expiryDate) data[t('expiryDate')] = parsed.expiryDate
    if (parsed.updatedDate) data[t('updatedDate')] = parsed.updatedDate
    if (parsed.status && parsed.status.length > 0)
      data[t('status')] = parsed.status
    if (parsed.nameServers && parsed.nameServers.length > 0)
      data[t('nameServers')] = parsed.nameServers
    if (parsed.dnssec) data[t('dnssec')] = parsed.dnssec
    if (parsed.registrant) data[t('registrant')] = parsed.registrant
    if (parsed.admin) data[t('admin')] = parsed.admin
    if (parsed.tech) data[t('tech')] = parsed.tech

    return (
      <ScrollArea.Root className="h-[500px]" type="auto">
        <ScrollArea.Viewport className="h-full w-full rounded">
          <dl className="p-6 space-y-1">
            {Object.entries(data).map(([label, value]) => (
              <div key={label}>{renderDataField(label, value)}</div>
            ))}
          </dl>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-slate-100 dark:bg-slate-800 transition-colors duration-150 ease-out hover:bg-slate-200 dark:hover:bg-slate-700 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-slate-400 dark:bg-slate-600 rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    )
  }

  const renderRawData = (data?: string) => {
    return (
      <ScrollArea.Root className="h-[500px]" type="auto">
        <ScrollArea.Viewport className="h-full w-full rounded">
          <pre className="p-6 text-xs text-slate-700 dark:text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
            {data || ''}
          </pre>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-slate-100 dark:bg-slate-800 transition-colors duration-150 ease-out hover:bg-slate-200 dark:hover:bg-slate-700 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-slate-400 dark:bg-slate-600 rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    )
  }

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-end gap-4">
              <h1 className="text-4xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-50 dark:to-slate-300 bg-clip-text text-transparent tracking-tight">
                {t('title')}
              </h1>
              <div className="h-[3px] flex-1 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full mb-2" />
            </div>
          </header>

          {/* Query Card */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 p-8 mb-6 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60">
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t('placeholder')}
                className={className(
                  'flex-1 px-5 py-3.5 bg-slate-50/50 dark:bg-slate-950/50',
                  'border border-slate-300/50 dark:border-slate-700/50',
                  'text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
                  'rounded-xl font-mono text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:border-blue-500/50 dark:focus:border-blue-400/50',
                  'transition-all duration-200',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'shadow-sm hover:shadow-md hover:border-slate-400/50 dark:hover:border-slate-600/50',
                )}
                disabled={loading}
              />
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={handleQuery}
                    disabled={loading || !query.trim()}
                    className={className(
                      'px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide',
                      'bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600',
                      'text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20',
                      'hover:shadow-xl hover:shadow-blue-500/40 dark:hover:shadow-blue-500/30',
                      'hover:scale-[1.02] active:scale-[0.98]',
                      'disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-800',
                      'disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100',
                      'transition-all duration-200 relative overflow-hidden group',
                    )}
                  >
                    <span className="relative z-10">
                      {loading ? t('querying') : t('query')}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-2 rounded-lg text-xs font-medium shadow-xl"
                    sideOffset={5}
                  >
                    {t('pressEnterToQuery')}
                    <Tooltip.Arrow className="fill-slate-900 dark:fill-slate-100" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </div>

            <Separator.Root className="bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent h-[1px] mb-5" />

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {t('examples')}
              </span>
              <div className="flex gap-2 flex-wrap">
                {['google.com', 'github.com', '8.8.8.8', 'AS15169'].map(
                  (example) => (
                    <button
                      key={example}
                      onClick={() => handleQueryChange(example)}
                      className={className(
                        'text-xs px-3 py-1.5 font-mono font-medium rounded-lg',
                        'bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900',
                        'text-slate-700 dark:text-slate-300',
                        'border border-slate-200 dark:border-slate-700',
                        'hover:border-slate-300 dark:hover:border-slate-600',
                        'hover:shadow-md hover:scale-105',
                        'active:scale-95',
                        'transition-all duration-150',
                      )}
                    >
                      {example}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Results Card */}
          {result && (
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
              {result.success ? (
                <>
                  <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200/50 dark:border-slate-800/50">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                      {t('queryResults')}
                    </h2>
                    {result.server && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                          {result.server}
                        </span>
                      </div>
                    )}
                  </div>

                  {result.parsed ? (
                    <Tabs.Root defaultValue="parsed" className="w-full">
                      <Tabs.List className="flex gap-1 px-8 pt-4 border-b border-slate-200/30 dark:border-slate-800/30">
                        <Tabs.Trigger
                          value="parsed"
                          className={className(
                            'px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-all duration-200',
                            'data-[state=active]:bg-gradient-to-b data-[state=active]:from-blue-50 data-[state=active]:to-white',
                            'data-[state=active]:dark:from-blue-950/30 data-[state=active]:dark:to-slate-900',
                            'data-[state=active]:text-blue-700 data-[state=active]:dark:text-blue-400',
                            'data-[state=active]:border-b-2 data-[state=active]:border-blue-500',
                            'data-[state=inactive]:text-slate-600 data-[state=inactive]:dark:text-slate-400',
                            'data-[state=inactive]:hover:bg-slate-50 data-[state=inactive]:dark:hover:bg-slate-800/50',
                          )}
                        >
                          {t('parsedData')}
                        </Tabs.Trigger>
                        <Tabs.Trigger
                          value="raw"
                          className={className(
                            'px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-all duration-200',
                            'data-[state=active]:bg-gradient-to-b data-[state=active]:from-blue-50 data-[state=active]:to-white',
                            'data-[state=active]:dark:from-blue-950/30 data-[state=active]:dark:to-slate-900',
                            'data-[state=active]:text-blue-700 data-[state=active]:dark:text-blue-400',
                            'data-[state=active]:border-b-2 data-[state=active]:border-blue-500',
                            'data-[state=inactive]:text-slate-600 data-[state=inactive]:dark:text-slate-400',
                            'data-[state=inactive]:hover:bg-slate-50 data-[state=inactive]:dark:hover:bg-slate-800/50',
                          )}
                        >
                          {t('rawData')}
                        </Tabs.Trigger>
                      </Tabs.List>
                      <Tabs.Content
                        value="parsed"
                        className="focus:outline-none"
                      >
                        {renderParsedData(result.parsed)}
                      </Tabs.Content>
                      <Tabs.Content value="raw" className="focus:outline-none">
                        {renderRawData(result.data)}
                      </Tabs.Content>
                    </Tabs.Root>
                  ) : (
                    renderRawData(result.data)
                  )}
                </>
              ) : (
                <div className="p-8">
                  <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                      <svg
                        className="w-5 h-5 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-red-900 dark:text-red-300 mb-2 text-base">
                        {t('queryFailed')}
                      </h3>
                      <p className="text-sm text-red-800 dark:text-red-400 font-mono leading-relaxed">
                        {result.error}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Tooltip.Provider>
  )
})

export default WhoisQuery
