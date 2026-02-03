import App from './App'
import { createRoot } from 'react-dom/client'
import './index.scss'

const container: HTMLElement = document.getElementById('app') as HTMLElement

createRoot(container).render(<App />)
