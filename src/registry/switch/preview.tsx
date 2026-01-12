import { useState } from 'react'
import { Switch } from '@/components/ui/switch'

export default function SwitchPreview() {
  const [enabled, setEnabled] = useState(true)

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <Switch checked={enabled} onCheckedChange={setEnabled} />
      <span>{enabled ? 'Notifications enabled' : 'Notifications disabled'}</span>
    </label>
  )
}



