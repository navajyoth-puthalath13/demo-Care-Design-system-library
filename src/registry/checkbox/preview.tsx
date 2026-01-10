import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

export default function CheckboxPreview() {
  const [checked, setChecked] = useState(false)

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
      <span>Receive product updates</span>
    </label>
  )
}


