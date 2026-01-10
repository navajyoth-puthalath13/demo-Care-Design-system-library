import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

type RegistryNavItem = {
  name: string
  title?: string
  description?: string
  category?: string
}

type RegistryJson = {
  items?: RegistryNavItem[]
}

async function loadRegistryJson(): Promise<RegistryJson | null> {
  // Try shadcn-style build output first: /r/registry.json
  try {
    const res = await fetch('/r/registry.json')
    if (res.ok) {
      return res.json()
    }
  } catch {
    // ignore and fall through
  }

  // Fallback to root registry.json (source of truth in this app)
  try {
    const res = await fetch('/registry.json')
    if (res.ok) {
      return res.json()
    }
  } catch {
    // ignore
  }

  return null
}

function useRegistryNav() {
  const [items, setItems] = useState<RegistryNavItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      setLoading(true)
      const data = await loadRegistryJson()
      if (cancelled) return
      setItems(data?.items ?? [])
      setLoading(false)
    }

    run()

    return () => {
      cancelled = true
    }
  }, [])

  return { items, loading }
}

export default function RegistryLayout() {
  const location = useLocation()
  const { items, loading } = useRegistryNav()

  const grouped = useMemo(() => {
    const groups: Record<string, RegistryNavItem[]> = {}
    for (const item of items) {
      const category = item.category || 'Components'
      if (!groups[category]) groups[category] = []
      groups[category].push(item)
    }
    // sort categories and items for stable nav
    for (const key of Object.keys(groups)) {
      groups[key] = groups[key].slice().sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name))
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
  }, [items])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 flex flex-col border-r bg-background shadow-sm">
          <div className="px-4 py-4 border-b">
            <Link to="/" className="flex items-center gap-2">
              <img src="/img/care.png" alt="Care Design" className="w-6 h-6" />
              <div>
                <div className="text-sm font-semibold tracking-tight">Care Design</div>
                <div className="text-xs text-muted-foreground">Components</div>
              </div>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 text-sm">
            {/* Tokens Navigation */}
            <div className="mb-4 pb-4 border-b">
              <div className="px-2 mb-2 text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
                Tokens
              </div>
              <NavLink
                to="/registry/colors"
                className={({ isActive }) =>
                  [
                    'flex items-center gap-2 rounded px-2 py-1.5 text-xs transition-colors',
                    isActive
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:bg-accent/60 hover:text-accent-foreground',
                  ].join(' ')
                }
              >
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                Color Palette
              </NavLink>
            </div>

            {loading && <div className="px-2 py-1 text-xs text-muted-foreground">Loading registry…</div>}
            {!loading && !items.length && (
              <div className="px-2 py-1 text-xs text-muted-foreground">No registry items found.</div>
            )}

            {grouped.map(([category, groupItems]) => (
              <div key={category} className="mb-4">
                <div className="px-2 mb-1 text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
                  {category}
                </div>
                <div className="space-y-0.5">
                  {groupItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={`/registry/${encodeURIComponent(item.name)}`}
                      className={({ isActive }) =>
                        [
                          'flex items-center justify-between rounded px-2 py-1.5 text-xs transition-colors',
                          isActive
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:bg-accent/60 hover:text-accent-foreground',
                        ].join(' ')
                      }
                    >
                      <span className="truncate">{item.title || item.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t text-xs text-muted-foreground">
            <div className="flex items-center justify-between gap-2">
              <span>Registry</span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wide">
                {items.length} items
              </span>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="border-b border-gray-200 bg-white px-8 py-4">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Care Design</div>
            <h1 className="text-2xl font-bold">Component Registry</h1>
          </div>

          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}


