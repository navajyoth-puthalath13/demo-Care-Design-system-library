import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AvatarPreview() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://avatar.vercel.sh/shadcn" alt="User" />
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <div className="text-sm text-muted-foreground">
        Use avatars to represent people in your product.
      </div>
    </div>
  )
}



