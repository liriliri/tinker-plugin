import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import * as Separator from '@radix-ui/react-separator'
import className from 'licia/className'
import { Search, Loader2 } from 'lucide-react'
import store from '../store'

interface WhoisSearchBarProps {
  onQueryComplete?: () => void
}

const WhoisSearchBar = observer(
  ({ onQueryComplete }: WhoisSearchBarProps = {}) => {
    const { t } = useTranslation()
    const { query, loading } = store

    const handleQuery = async () => {
      await store.executeQuery()
      onQueryComplete?.()
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !loading && query.trim()) {
        handleQuery()
      }
    }

    const handleQueryChange = (value: string) => {
      store.setQuery(value)
    }

    const handleExampleClick = (example: string) => {
      store.setQuery(example)
    }

    const examples = ['google.com', 'github.com', '8.8.8.8', 'AS15169']

    return (
      <>
        <div className="flex gap-3 mb-6 px-8 pt-8">
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
              'rounded-md font-mono text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:border-blue-500/50 dark:focus:border-blue-400/50',
              'transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'hover:border-slate-400/50 dark:hover:border-slate-600/50',
            )}
            disabled={loading}
          />
          <button
            onClick={handleQuery}
            disabled={loading || !query.trim()}
            className={className(
              'px-8 py-3.5 rounded-md font-semibold text-sm tracking-wide',
              'bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600',
              'text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20',
              'hover:shadow-xl hover:shadow-blue-500/40 dark:hover:shadow-blue-500/30',
              'hover:scale-[1.02] active:scale-[0.98]',
              'disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-800',
              'disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100',
              'transition-all duration-200 relative overflow-hidden group',
              'flex items-center gap-2',
            )}
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('querying')}
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  {t('query')}
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>

        <Separator.Root className="bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent h-[1px] mb-5 mx-8" />

        <div className="flex items-center gap-3 flex-wrap mb-6 px-8">
          <div className="flex gap-2 flex-wrap">
            {examples.map((example) => (
              <button
                key={example}
                onClick={() => handleExampleClick(example)}
                className={className(
                  'text-xs px-3 py-1.5 font-mono font-medium rounded',
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
            ))}
          </div>
        </div>
      </>
    )
  },
)

export default WhoisSearchBar
