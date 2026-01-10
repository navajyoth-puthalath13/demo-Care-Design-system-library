import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TabsPreview() {
  return (
    <Tabs defaultValue="components" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="components">Components</TabsTrigger>
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
      </TabsList>
      <TabsContent value="components" className="mt-3 text-sm text-muted-foreground">
        Browse all UI components in the Care design system.
      </TabsContent>
      <TabsContent value="tokens" className="mt-3 text-sm text-muted-foreground">
        See colors, typography, and other design tokens.
      </TabsContent>
    </Tabs>
  )
}


