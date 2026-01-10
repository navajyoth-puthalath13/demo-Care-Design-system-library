import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

function readJson(filePath) {
  const full = path.resolve(projectRoot, filePath)
  const raw = fs.readFileSync(full, 'utf8')
  return JSON.parse(raw)
}

function readFileIfExists(filePath) {
  const full = path.resolve(projectRoot, filePath)
  if (!fs.existsSync(full)) return null
  return fs.readFileSync(full, 'utf8')
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function detectLanguage(filePath) {
  const ext = path.extname(filePath)
  switch (ext) {
    case '.ts':
      return 'ts'
    case '.tsx':
      return 'tsx'
    case '.js':
      return 'js'
    case '.jsx':
      return 'jsx'
    default:
      return undefined
  }
}

function build() {
  const registry = readJson('registry.json')
  const existingItems = registry.items || []

  const metaByName = new Map()
  for (const item of existingItems) {
    if (item?.name) {
      metaByName.set(item.name, item)
    }
  }

  // Discover all ui components under src/components/ui/*.tsx
  const uiDir = path.join(projectRoot, 'src', 'components', 'ui')
  const componentFiles = fs
    .readdirSync(uiDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.tsx'))

  const items = componentFiles.map((entry) => {
    const fileName = entry.name
    const name = fileName.replace(/\.tsx$/, '')

    const meta = metaByName.get(name) ?? {}

    const componentPath = `src/components/ui/${fileName}`
    const previewPath = `src/registry/${name}/preview.tsx`
    const hasPreview = fs.existsSync(path.join(projectRoot, previewPath))

    const files = [
      {
        path: componentPath,
        type: 'registry:component',
      },
      ...(hasPreview
        ? [
            {
              path: previewPath,
              type: 'registry:preview',
            },
          ]
        : []),
    ]

    return {
      name,
      type: meta.type ?? 'component',
      title: meta.title ?? name.charAt(0).toUpperCase() + name.slice(1),
      description: meta.description ?? `A component from the Care design system.`,
      category: meta.category ?? 'Components',
      files,
    }
  })

  const outDir = path.join(projectRoot, 'public', 'r')
  ensureDir(outDir)

  const enrichedItems = items.map((item) => {
    const files = (item.files || []).map((file) => {
      const content = readFileIfExists(file.path)
      return {
        ...file,
        content: content ?? undefined,
        language: detectLanguage(file.path),
      }
    })

    const enriched = { ...item, files }

    // Also write individual item file: public/r/<name>.json
    const itemOut = path.join(outDir, `${item.name}.json`)
    fs.writeFileSync(itemOut, JSON.stringify(enriched, null, 2), 'utf8')

    return enriched
  })

  const registryOut = {
    name: registry.name,
    homepage: registry.homepage,
    items: enrichedItems,
  }

  const outPath = path.join(outDir, 'registry.json')
  fs.writeFileSync(outPath, JSON.stringify(registryOut, null, 2), 'utf8')
}

build()


