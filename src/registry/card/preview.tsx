import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CardPreview() {
  return (
    <div className="max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Example card</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Cards are used to group related content and actions in a single container.
        </CardContent>
      </Card>
    </div>
  )
}



