import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded border font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-emerald-100 border-emerald-300 text-emerald-900",
        red: "bg-red-100 border-red-300 text-red-900",
        indigo: "bg-indigo-100 border-indigo-300 text-indigo-900",
        purple: "bg-purple-100 border-purple-300 text-purple-900",
        blue: "bg-blue-100 border-blue-300 text-blue-900",
        sky: "bg-sky-100 border-sky-400 text-sky-900",
        cyan: "bg-cyan-100 border-cyan-400 text-cyan-900",
        teal: "bg-teal-100 border-teal-400 text-teal-900",
        green: "bg-green-100 border-green-400 text-green-900",
        yellow: "bg-yellow-100 border-yellow-300 text-yellow-900",
        orange: "bg-orange-100 border-orange-300 text-orange-900",
        pink: "bg-pink-100 border-pink-300 text-pink-900",
        gray: "bg-gray-100 border-gray-300 text-gray-800",
        "accent-red": "bg-red-600 border-red-800 text-white",
      },
      size: {
        sm: "h-6 px-1.5 text-sm leading-5 gap-1",
        md: "h-7 px-2 text-base leading-6 gap-1.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
