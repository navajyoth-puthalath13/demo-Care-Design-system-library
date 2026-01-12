import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function AlertPreview() {
  return (
    <div className="space-y-3">
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>This is a subtle alert for general information.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong while saving your changes.</AlertDescription>
      </Alert>
    </div>
  )
}



