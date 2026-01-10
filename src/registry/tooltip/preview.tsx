import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export default function TooltipPreview() {
  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Simple tooltip - no arrow */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 w-48">Simple (no arrow):</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            This is a tooltip
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Simple tooltip - with arrow */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 w-48">Simple (with arrow):</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent hasArrow>
            This is a tooltip
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Extended tooltip - no arrow */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 w-48">With description (no arrow):</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent 
            description="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."
          >
            This is a tooltip
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Extended tooltip - with arrow */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 w-48">With description (with arrow):</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent 
            hasArrow
            description="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."
          >
            This is a tooltip
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}


