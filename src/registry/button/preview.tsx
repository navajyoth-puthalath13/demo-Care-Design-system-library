import { Button } from '@/components/ui/button'

export default function ButtonPreview() {
  return (
    <div className="flex gap-3">
      <Button variant="default">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}


