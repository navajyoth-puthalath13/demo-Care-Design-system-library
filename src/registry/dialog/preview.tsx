import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function DialogPreview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Care Design dialog</DialogTitle>
          <DialogDescription>
            Use dialogs to focus attention on a short task or important message.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}


