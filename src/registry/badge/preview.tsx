import { Badge } from '@/components/ui/badge'

export default function BadgePreview() {
  return (
    <div className="flex flex-wrap gap-4">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="red">Red</Badge>
      <Badge variant="indigo">Indigo</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="sky">Sky</Badge>
      <Badge variant="cyan">Cyan</Badge>
      <Badge variant="teal">Teal</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="yellow">Yellow</Badge>
      <Badge variant="orange">Orange</Badge>
      <Badge variant="pink">Pink</Badge>
      <Badge variant="gray">Gray</Badge>
      <Badge variant="accent-red">Accent Red</Badge>
      
      <div className="w-full mt-4 border-t pt-4">
        <p className="text-sm text-gray-600 mb-2">Medium Size:</p>
        <div className="flex flex-wrap gap-4">
          <Badge variant="primary" size="md">Primary</Badge>
          <Badge variant="blue" size="md">Blue</Badge>
          <Badge variant="accent-red" size="md">Accent Red</Badge>
        </div>
      </div>
    </div>
  )
}


