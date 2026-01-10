import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type RegistryItemMeta = {
  name: string
  title?: string
  description?: string
  thumbnail?: string
}

export default function RegistryList() {
  console.log('🧪 TEST: RegistryList is rendering')

  const [items, setItems] = useState<RegistryItemMeta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      // Prefer shadcn-style build output in /r, then fall back to root registry.json
      try {
        const res = await fetch('/r/registry.json')
        if (res.ok) {
          const data = await res.json()
          setItems(data.items || [])
          return
        }
      } catch {
        // ignore, fall through
      }

      try {
        const res = await fetch('/registry.json')
        if (res.ok) {
          const data = await res.json()
          setItems(data.items || [])
          return
        }
      } catch {
        // ignore
      }

      setItems([])
      setLoading(false)
    }

    load().finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-4">Loading registry…</div>
  if (!items.length) return <div className="p-4">No components found in registry.</div>

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Components</h1>
          <p className="text-xs text-muted-foreground">
            Browse all components available in the Care design system.
          </p>
        </div>
        <Link to="/" className="text-xs text-muted-foreground hover:underline">
          Back to home
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((it) => (
          <Link
            key={it.name}
            to={`/registry/${encodeURIComponent(it.name)}`}
            className="group block border rounded-lg bg-card/50 hover:bg-card transition-colors"
          >
            <div className="h-28 flex items-center justify-center bg-muted rounded-t-lg border-b mb-2">
              {it.thumbnail ? (
                <img src={it.thumbnail} alt={it.title || it.name} className="max-h-24" />
              ) : (
                <div className="text-xs text-muted-foreground">
                  {it.title || it.name}
                </div>
              )}
            </div>
            <div className="px-3 pb-3">
              <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                {it.title || it.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {it.description || 'Component from Care design system.'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
