import { createRoot } from 'react-dom/client'

import './index.scss'

import { App } from './App'

const div = document.getElementById('root') as HTMLDivElement
createRoot(div).render(<App />)
