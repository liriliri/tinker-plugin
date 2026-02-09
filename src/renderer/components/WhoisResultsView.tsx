import { useTranslation } from 'react-i18next'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Separator from '@radix-ui/react-separator'
import className from 'licia/className'
import {
  Server,
  FileText,
  FileCode,
  Globe,
  Calendar,
  Mail,
  Building2,
  Shield,
} from 'lucide-react'
import type { ParsedWhoisData } from '../../../preload/whoisParser'

interface WhoisResultsViewProps {
  parsed?: ParsedWhoisData
  rawData?: string
  server?: string
  showRaw: boolean
  onToggleView: () => void
}

const WhoisResultsView = ({
  parsed,
  rawData,
  server,
  showRaw,
  onToggleView,
}: WhoisResultsViewProps) => {
  const { t } = useTranslation()

  const getFieldIcon = (label: string) => {
    const iconClass = 'w-3.5 h-3.5 flex-shrink-0'
    const lowerLabel = label.toLowerCase()

    if (lowerLabel.includes('domain') || lowerLabel.includes('url')) {
      return <Globe className={iconClass} />
    }
    if (
      lowerLabel.includes('date') ||
      lowerLabel.includes('expir') ||
      lowerLabel.includes('creat') ||
      lowerLabel.includes('updat')
    ) {
      return <Calendar className={iconClass} />
    }
    if (lowerLabel.includes('mail')) {
      return <Mail className={iconClass} />
    }
    if (
      lowerLabel.includes('registrar') ||
      lowerLabel.includes('organization')
    ) {
      return <Building2 className={iconClass} />
    }
    if (
      lowerLabel.includes('status') ||
      lowerLabel.includes('dnssec') ||
      lowerLabel.includes('server')
    ) {
      return <Shield className={iconClass} />
    }
    return null
  }

  const renderDataField = (label: string, value: any) => {
    if (!value) return null

    const icon = getFieldIcon(label)

    if (Array.isArray(value)) {
      return (
        <div className="group" key={label}>
          <dt className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            {icon}
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

    return (
      <div className="group" key={label}>
        <dt className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
          {icon}
          {label}
        </dt>
        <dd className="text-sm text-slate-700 dark:text-slate-300 font-mono mb-4">
          {String(value)}
        </dd>
      </div>
    )
  }

  const renderParsedData = (data: ParsedWhoisData) => {
    const fields: Record<string, any> = {}

    if (data.domainName) fields[t('domainName')] = data.domainName
    if (data.registrar) fields[t('registrar')] = data.registrar
    if (data.registrarUrl) fields[t('registrarUrl')] = data.registrarUrl
    if (data.creationDate) fields[t('creationDate')] = data.creationDate
    if (data.expiryDate) fields[t('expiryDate')] = data.expiryDate
    if (data.updatedDate) fields[t('updatedDate')] = data.updatedDate
    if (data.status && data.status.length > 0) fields[t('status')] = data.status
    if (data.nameServers && data.nameServers.length > 0)
      fields[t('nameServers')] = data.nameServers
    if (data.dnssec) fields[t('dnssec')] = data.dnssec

    return (
      <dl className="space-y-1">
        {Object.entries(fields).map(([label, value]) =>
          renderDataField(label, value),
        )}
      </dl>
    )
  }

  const renderRawData = (data?: string) => {
    return (
      <pre className="text-xs text-slate-700 dark:text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
        {data || ''}
      </pre>
    )
  }

  return (
    <div className="flex-1 min-h-0 px-8 pb-8 flex flex-col">
      <Separator.Root className="bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent h-[1px] mb-5" />

      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          {t('queryResults')}
        </h2>
        <div className="flex items-center gap-2">
          {parsed && (
            <button
              onClick={onToggleView}
              className={className(
                'flex items-center gap-2 px-3 py-1.5 rounded border transition-all duration-200',
                'text-xs font-medium',
                showRaw
                  ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400',
                'hover:shadow-md hover:scale-105 active:scale-95',
              )}
            >
              {showRaw ? (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t('viewParsed')}</span>
                </>
              ) : (
                <>
                  <FileCode className="w-3.5 h-3.5" />
                  <span>{t('viewRaw')}</span>
                </>
              )}
            </button>
          )}
          {server && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              <Server className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                {server}
              </span>
            </div>
          )}
        </div>
      </div>

      <ScrollArea.Root className="flex-1 min-h-0" type="auto">
        <ScrollArea.Viewport className="h-full w-full">
          {showRaw || !parsed
            ? renderRawData(rawData)
            : renderParsedData(parsed)}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 transition-colors duration-150 ease-out data-[orientation=vertical]:w-2 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-slate-300 dark:bg-slate-700 rounded-full hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  )
}

export default WhoisResultsView
