import { AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface WhoisErrorViewProps {
  error: string
}

const WhoisErrorView = ({ error }: WhoisErrorViewProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 border border-red-200 dark:border-red-800/50 rounded-md">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-red-900 dark:text-red-300 mb-2 text-base">
          {t('queryFailed')}
        </h3>
        <p className="text-sm text-red-800 dark:text-red-400 font-mono leading-relaxed">
          {error}
        </p>
      </div>
    </div>
  )
}

export default WhoisErrorView
