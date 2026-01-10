"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger {...props} />
}

interface TooltipContentProps extends React.ComponentProps<typeof TooltipPrimitive.Content> {
  hasArrow?: boolean
  description?: string
}

function TooltipContent({
  className,
  sideOffset = 8,
  hasArrow = false,
  description,
  children,
  ...props
}: TooltipContentProps) {
  const hasDescription = !!description

  return (
    <TooltipPrimitive.Portal>
      <div className="relative">
        <TooltipPrimitive.Content
          sideOffset={sideOffset}
          className={cn(
            "z-50 rounded-lg bg-gray-100 shadow-lg",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
            hasDescription ? "p-3 max-w-[296px]" : "px-3 py-2",
            className
          )}
          {...props}
        >
          {hasDescription ? (
            <div className="flex flex-col gap-0.5">
              <div className="text-xs font-semibold leading-4 text-gray-700">
                {children}
              </div>
              <div className="text-xs font-medium leading-4 text-gray-600">
                {description}
              </div>
            </div>
          ) : (
            <div className="text-xs font-semibold leading-4 text-gray-700 text-center whitespace-nowrap">
              {children}
            </div>
          )}
          
          {hasArrow && (
            <div 
              className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-4 h-1.5 bg-gray-100"
              style={{
                clipPath: 'polygon(50% 100%, 0 0, 100% 0)'
              }}
            />
          )}
        </TooltipPrimitive.Content>
      </div>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
