import { useState } from 'react'
import { CheckIcon, ClipboardIcon } from 'lucide-react'

type ColorToken = {
  name: string
  variable: string
  category: string
  subcategory?: string
}

const colorTokens: ColorToken[] = [
// Text Colors
{ name: 'Dark 950', variable: '--text-dark-950', category: 'Semantic', subcategory: 'text' },
{ name: 'Sub 700', variable: '--text-sub-700', category: 'Semantic', subcategory: 'text' },
{ name: 'Soft 600', variable: '--text-soft-600', category: 'Semantic', subcategory: 'text' },
{ name: 'Disabled 400', variable: '--text-disabled-300', category: 'Semantic', subcategory: 'text' },
{ name: 'White', variable: '--text-white', category: 'Semantic', subcategory: 'text' },
{ name: 'Placeholder', variable: '--text-placeholder', category: 'Semantic', subcategory: 'text' },

  // Icon Colors
{ name: 'Dark 950', variable: '--icon-dark-950', category: 'Semantic', subcategory: 'icon' },
{ name: 'Sub 700', variable: '--icon-sub-700', category: 'Semantic', subcategory: 'icon' },
{ name: 'Soft 600', variable: '--icon-soft-600', category: 'Semantic', subcategory: 'icon' },
{ name: 'Disabled 400', variable: '--icon-disabled-400', category: 'Semantic', subcategory: 'icon' },
{ name: 'White', variable: '--icon-white', category: 'Semantic', subcategory: 'icon' },

// Background Colors
{ name: 'Darker 950', variable: '--background-darker-950', category: 'Semantic', subcategory: 'background' },
{ name: 'Dark 800', variable: '--background-dark-800', category: 'Semantic', subcategory: 'background' },
{ name: 'Soft 200', variable: '--background-soft-200', category: 'Semantic', subcategory: 'background' },
{ name: 'Light 100', variable: '--background-light-100', category: 'Semantic', subcategory: 'background' },
{ name: 'Lighter 50', variable: '--background-lighter-50', category: 'Semantic', subcategory: 'background' },
{ name: 'White', variable: '--background-white', category: 'Semantic', subcategory: 'background' },

// Information Colors
{ name: 'Dark 900', variable: '--information-dark-900', category: 'Semantic', subcategory: 'information' },
{ name: 'Base 500', variable: '--information-base-500', category: 'Semantic', subcategory: 'information' },
{ name: 'Soft 200', variable: '--information-soft-200', category: 'Semantic', subcategory: 'information' },
{ name: 'Light 100', variable: '--information-light-100', category: 'Semantic', subcategory: 'information' },
{ name: 'Lighter 50', variable: '--information-lighter-50', category: 'Semantic', subcategory: 'information' },

// Warning Colors
{ name: 'Dark 900', variable: '--warning-dark-900', category: 'Semantic', subcategory: 'warning' },
{ name: 'Base 500', variable: '--warning-base-500', category: 'Semantic', subcategory: 'warning' },
{ name: 'Soft 200', variable: '--warning-soft-200', category: 'Semantic', subcategory: 'warning' },
{ name: 'Light 100', variable: '--warning-light-100', category: 'Semantic', subcategory: 'warning' },
{ name: 'Lighter 50', variable: '--warning-lighter-50', category: 'Semantic', subcategory: 'warning' },
// Negative Colors
{ name: 'Dark 900', variable: '--negative-dark-900', category: 'Semantic', subcategory: 'negative' },
{ name: 'Base 500', variable: '--negative-base-500', category: 'Semantic', subcategory: 'negative' },
{ name: 'Soft 200', variable: '--negative-soft-200', category: 'Semantic', subcategory: 'negative' },
{ name: 'Light 100', variable: '--negative-light-100', category: 'Semantic', subcategory: 'negative' },
{ name: 'Lighter 50', variable: '--negative-lighter-50', category: 'Semantic', subcategory: 'negative' },

// Border Colors
{ name: 'Darker 400', variable: '--border-darker-400', category: 'Semantic', subcategory: 'border' },
{ name: 'Dark 300', variable: '--border-dark-300', category: 'Semantic', subcategory: 'border' },
{ name: 'Default 200', variable: '--border-default-200', category: 'Semantic', subcategory: 'border' },
{ name: 'Soft 100', variable: '--border-soft-100', category: 'Semantic', subcategory: 'border' },
{ name: 'White', variable: '--border-white', category: 'Semantic', subcategory: 'border' },
{ name: 'Warning 300', variable: '--border-warning-300', category: 'Semantic', subcategory: 'border' },
{ name: 'Warning 200', variable: '--border-warning-200', category: 'Semantic', subcategory: 'border' },
{ name: 'Warning 100', variable: '--border-warning-100', category: 'Semantic', subcategory: 'border' },
{ name: 'Positive 300', variable: '--border-positive-300', category: 'Semantic', subcategory: 'border' },
{ name: 'Positive 200', variable: '--border-positive-200', category: 'Semantic', subcategory: 'border' },
{ name: 'Positive 100', variable: '--border-positive-100', category: 'Semantic', subcategory: 'border' },
{ name: 'Information 300', variable: '--border-information-300', category: 'Semantic', subcategory: 'border' },
{ name: 'Information 200', variable: '--border-information-200', category: 'Semantic', subcategory: 'border' },
{ name: 'Information 100', variable: '--border-information-100', category: 'Semantic', subcategory: 'border' },

// Positive Colors
{ name: 'Dark 900', variable: '--positive-dark-900', category: 'Semantic', subcategory: 'positive' },
{ name: 'Dark 800', variable: '--positive-dark-800', category: 'Semantic', subcategory: 'positive' },
{ name: 'Dark 700', variable: '--positive-dark-700', category: 'Semantic', subcategory: 'positive' },
{ name: 'Base 600', variable: '--positive-base-600', category: 'Semantic', subcategory: 'positive' },
{ name: 'Base 500', variable: '--positive-base-500', category: 'Semantic', subcategory: 'positive' },
{ name: 'Medium 400', variable: '--positive-medium-400', category: 'Semantic', subcategory: 'positive' },
{ name: 'Soft 300', variable: '--positive-soft-300', category: 'Semantic', subcategory: 'positive' },
{ name: 'Soft 200', variable: '--positive-soft-200', category: 'Semantic', subcategory: 'positive' },
{ name: 'Light 100', variable: '--positive-light-100', category: 'Semantic', subcategory: 'positive' },
{ name: 'Lighter 50', variable: '--positive-lighter-50', category: 'Semantic', subcategory: 'positive' },

// Neutral Colors
{ name: 'Darker 950', variable: '--neutral-darker-950', category: 'Semantic', subcategory: 'neutral' },
{ name: 'Dark 900', variable: '--neutral-dark-900', category: 'Semantic', subcategory: 'neutral' },
{ name: 'Dark 800', variable: '--neutral-dark-800', category: 'Semantic', subcategory: 'neutral' },
{ name: 'Dark 700', variable: '--neutral-dark-700', category: 'Semantic', subcategory: 'neutral' },
{ name: 'Base 600', variable: '--neutral-base-600', category: 'Semantic', subcategory: 'neutral' },
{ name: 'Base 500', variable: '--neutral-base-500', category: 'Semantic', subcategory: 'neutral' },
{ name: 'Medium 400', variable: '--neutral-medium-400', category: 'Semantic', subcategory: 'neutral' },
{ name: 'Soft 300', variable: '--neutral-soft-300', category: 'Semantic', subcategory: 'neutral' },
{ name: 'Soft 200', variable: '--neutral-soft-200', category: 'Semantic', subcategory: 'neutral' },
{ name: 'Light 100', variable: '--neutral-light-100', category: 'Semantic', subcategory: 'neutral' },
{ name: 'Lighter 50', variable: '--neutral-lighter-50', category: 'Semantic', subcategory: 'neutral' },

]

export default function ColorTokens() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedToken(text)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  const groupedTokens = colorTokens.reduce((acc, token) => {
    const key = token.subcategory || 'other'
    if (!acc[key]) acc[key] = []
    acc[key].push(token)
    return acc
  }, {} as Record<string, ColorToken[]>)

  const subcategoryOrder = ['text', 'icon', 'background', 'information', 'warning', 'negative', 'positive', 'neutral', 'border', 'brand', 'success', 'danger']
  const subcategoryLabels: Record<string, string> = {
    text: 'Text Colors',
    icon: 'Icon Colors',
    background: 'Background Colors',
    information: 'Information Colors',
    warning: 'Warning Colors',
    negative: 'Negative Colors',
    positive: 'Positive Colors',
    neutral: 'Neutral Colors',
    border: 'Border Colors',
    brand: 'Brand Colors',
    success: 'Success Colors',
    danger: 'Danger Colors',
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Color Tokens</h1>
        <p className="text-gray-600">
          Design system color tokens with CSS variable references
        </p>
      </div>

      {subcategoryOrder.map((subcategoryKey) => {
        const tokens = groupedTokens[subcategoryKey]
        if (!tokens) return null

        return (
          <section key={subcategoryKey} className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-2">
              {subcategoryLabels[subcategoryKey]}
            </h2>
            <div className="space-y-4">
              {tokens.map((token) => (
                <div
                  key={token.variable}
                  className="flex items-center gap-6"
                >
                  <div
                    className="h-16 w-16 rounded-lg flex-shrink-0 shadow-sm border border-gray-200"
                    style={{
                      backgroundColor: `var(${token.variable})`,
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1">{token.name}</h3>
                    <button
                      onClick={() => copyToClipboard(token.variable)}
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {copiedToken === token.variable ? (
                        <>
                          <CheckIcon className="w-4 h-4" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <ClipboardIcon className="w-4 h-4" />
                          <code className="font-mono">
                            {token.variable}
                          </code>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}