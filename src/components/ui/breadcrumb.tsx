import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const BreadcrumbContext = React.createContext<{
  size?: "sm" | "md" | "lg"
}>({
  size: "md",
})

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
    size?: "sm" | "md" | "lg"
  }
>(({ className, size = "md", ...props }, ref) => {
  return (
    <BreadcrumbContext.Provider value={{ size }}>
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn("flex items-center gap-2", className)}
        {...props}
      />
    </BreadcrumbContext.Provider>
  )
})
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-2",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-2", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ className, ...props }, ref) => {
  const { size } = React.useContext(BreadcrumbContext)
  
  return (
    <a
      ref={ref}
      className={cn(
        "font-medium text-gray-700 transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:rounded-lg focus-visible:px-2",
        size === "sm" && "text-xs leading-4",
        size === "md" && "text-sm leading-5",
        size === "lg" && "text-base leading-6",
        className
      )}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => {
  const { size } = React.useContext(BreadcrumbContext)
  
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "font-bold text-gray-950",
        size === "sm" && "text-xs leading-4",
        size === "md" && "text-sm leading-5",
        size === "lg" && "text-base leading-6",
        className
      )}
      {...props}
    />
  )
})
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => {
  const { size } = React.useContext(BreadcrumbContext)
  
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center", className)}
      {...props}
    >
      {children ?? (
        <ChevronRight 
          className="text-gray-950" 
          size={size === "sm" ? 16 : 20} 
        />
      )}
    </li>
  )
}
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  const { size } = React.useContext(BreadcrumbContext)
  
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center", className)}
      {...props}
    >
      <MoreHorizontal 
        className="text-black" 
        size={size === "sm" ? 16 : 20} 
      />
      <span className="sr-only">More</span>
    </span>
  )
}
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}