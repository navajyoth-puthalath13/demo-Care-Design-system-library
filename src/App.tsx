import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RegistryLayout from './components/RegistryLayout'
import RegistryList from './pages/RegistryList'
import RegistryItem from './pages/RegistryItem'
import ColorTokens from './pages/ColorTokens'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="snowflakes" aria-hidden="true">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="snowflake">❅</div>
        ))}
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/registry" replace />} />
        <Route path="/registry" element={<RegistryLayout />}>
          <Route index element={<RegistryList />} />
          <Route path="colors" element={<ColorTokens />} />
          <Route path=":name" element={<RegistryItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
