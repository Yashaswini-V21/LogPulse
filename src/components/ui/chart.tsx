import * as React from "react"
import { ResponsiveContainer } from "recharts"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: Record<string, any>
  }
>(({ id, className, children, config, ...props }, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
))
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hideLabel?: boolean
    nameKey?: string
    labelKey?: string
  }
>(({ className, hideLabel, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border border-slate-200 bg-white p-2 shadow-md dark:border-slate-800 dark:bg-slate-950 ${className || ""}`}
    {...props}
  />
))
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }
