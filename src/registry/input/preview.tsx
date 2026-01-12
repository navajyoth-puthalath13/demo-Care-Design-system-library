import { Input } from '@/components/ui/input'

export default function InputPreview() {
  return (
    <div className="space-y-2 max-w-sm">
      <Input placeholder="Search components..." />
      <Input type="email" placeholder="you@example.com" />
    </div>
  )
}



