import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import RegistryList from './pages/RegistryList'
import RegistryItem from './pages/RegistryItem'
import ColorTokens from './pages/ColorTokens'
import RegistryLayout from './components/RegistryLayout'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found. Ensure index.html contains <div id="root"></div>')

document.documentElement.setAttribute('data-theme', 'care')

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/registry" replace />} />
        <Route path="/registry" element={<RegistryLayout />}>
          <Route index element={<RegistryList />} />
          <Route path="colors" element={<ColorTokens />} />
          <Route path=":name" element={<RegistryItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)