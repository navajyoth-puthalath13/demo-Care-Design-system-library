import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import RegistryLayout from './components/RegistryLayout'
import RegistryList from './pages/RegistryList'
import RegistryItem from './pages/RegistryItem'
import ColorTokens from './pages/ColorTokens'
import Playground from './pages/Playground'
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
        <Route path="/playground" element={<Playground />} />
      </Routes>
      <div className="mt-auto pt-4 border-t">
        <Link
          to="/playground"
          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
          Playground
        </Link>
      </div>
    </BrowserRouter>
  )
}

export default App
