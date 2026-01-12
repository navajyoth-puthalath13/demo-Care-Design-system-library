import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function LabelPreview() {
  return (
    <div className="space-y-2 max-w-sm">
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
    </div>
  )
}



