import { useEffect, useState, Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'


type RegistryFile = {
  path: string
  content?: string
  language?: string
}

type RegistryItem = {
  name: string
  title?: string
  description?: string
  files?: RegistryFile[]
}

export default function RegistryItemPage() {
  const { name } = useParams<{ name: string }>()
  const [item, setItem] = useState<RegistryItem | null>(null)
  const [Preview, setPreview] = useState<null | React.ComponentType<any>>(null)
  const [showSource, setShowSource] = useState(false)

  useEffect(() => {
    if (!name) return

    const load = async () => {
      // Prefer shadcn-style per-item files in /r, then fall back to root registry.json
      try {
        const res = await fetch(`/r/${name}.json`)
        if (res.ok) {
          const data = await res.json()
          setItem(data)
          return
        }
      } catch {
        // ignore and fall through
      }

      try {
        const res = await fetch('/registry.json')
        if (res.ok) {
          const data = await res.json()
          const found = (data.items || []).find((it: RegistryItem) => it.name === name)
          if (found) {
            setItem(found)
            return
          }
        }
      } catch {
        // ignore
      }

      setItem(null)
    }

    load()
  }, [name])

  // import.meta.glob for all registry example modules under src/registry
  useEffect(() => {
    if (!item) return
    // build a map from path -> loader
    const modules = (import.meta as any).glob('../registry/**/preview.{tsx,ts,jsx,js}', { eager: false })
    const pick = async () => {
      // try to find a module whose path matches item.files[0].path, or fallback by name
      if (item.files && item.files.length) {
        const desired = item.files[0].path
        // normalize to ../registry/<...> style path candidates
        for (const key of Object.keys(modules)) {
          if (key.includes(name!)) {
            const mod = await (modules as any)[key]()
            setPreview(() => mod.default ?? mod)
            return
          }
        }
      }
      // fallback: nothing found
      setPreview(null)
    }
    pick()
  }, [item, name])

  if (!item) {
    return (
      <div className="p-6">
        <div className="mb-2 text-sm text-muted-foreground">Component not found in registry.</div>
        <Link to="/registry" className="text-xs underline">
          Back to all components
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold tracking-tight">{item.title || item.name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {item.description || 'Component from the Care design system.'}
      </p>

      <div className="space-y-3">
        <div className="border rounded-lg bg-card/60">
          <div className="flex items-center justify-between px-4 py-2.5 border-b">
            <h3 className="text-base font-medium">Live preview</h3>
            <span className="rounded bg-muted px-2 py-1 text-xs uppercase tracking-wide text-muted-foreground">
              Preview
            </span>
          </div>
          <div className="p-6 bg-gradient-to-br from-slate-50/80 to-gray-50/60 border-t rounded-b-lg min-h-[140px] flex items-center justify-center">
            <Suspense
              fallback={
                <div className="text-base text-muted-foreground">Loading preview…</div>
              }
            >
              {Preview ? <Preview /> : <div className="text-sm text-slate-500">No live preview module found.</div>}
            </Suspense>
          </div>
        </div>

        <div className="border rounded-lg bg-card/60">
          <button
            onClick={() => setShowSource(!showSource)}
            className="w-full flex items-center justify-between px-4 py-2.5 border-b hover:bg-accent/50 transition-colors"
          >
            <h3 className="text-base font-medium">Source Code</h3>
            <div className="flex items-center gap-2">
              <span className="rounded bg-muted px-2 py-1 text-xs uppercase tracking-wide text-muted-foreground">
                {showSource ? 'Hide' : 'Show'}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${showSource ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {showSource && item.files && item.files.length ? (
            <div className="divide-y max-h-80 overflow-y-auto">
              {item.files.map((f, idx) => (
                <div key={idx} className="p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="truncate">{f.path}</span>
                    {f.language && (
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[0.65rem] uppercase tracking-wide">
                        {f.language}
                      </span>
                    )}
                  </div>
                  <pre className="max-h-40 overflow-auto rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm leading-relaxed text-gray-800 font-mono shadow-sm">
                    <code>{f.content || 'No source available.'}</code>
                  </pre>
                </div>
              ))}
            </div>
          ) : showSource ? (
            <div className="p-4 text-sm text-muted-foreground">
              No source files in this registry item.
            </div>
          ) : null}
        </div>

        <section className="border rounded-lg bg-card/60">
          <div className="flex items-center justify-between px-4 py-2.5 border-b">
            <h3 className="text-base font-medium">Installation</h3>
            <span className="rounded bg-muted px-2 py-1 text-xs uppercase tracking-wide text-muted-foreground">
              CLI
            </span>
          </div>
          <div className="p-3 space-y-2 text-sm">
            <p className="text-muted-foreground">
              Install this component from the shadcn/ui CLI:
            </p>
            <pre className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm text-gray-800 font-mono overflow-x-auto shadow-sm">
              <code>{`pnpm dlx shadcn@latest add ${item.name}`}</code>
            </pre>
          </div>
        </section>

        <section className="border rounded-lg bg-card/60">
          <div className="flex items-center justify-between px-4 py-2.5 border-b">
            <h3 className="text-base font-medium">Accessibility</h3>
            <span className="rounded bg-muted px-2 py-1 text-xs uppercase tracking-wide text-muted-foreground">
              A11y
            </span>
          </div>
          <div className="p-3 space-y-2 text-sm text-muted-foreground">
            <p>
              This component is built on top of accessible primitives and follows WCAG
              recommendations for color contrast and keyboard navigation.
            </p>
            <p>
              Always provide clear labels, focus states, and ARIA attributes when you compose it
              with other elements in your product.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
