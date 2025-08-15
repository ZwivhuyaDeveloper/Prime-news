import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  accentColor?: string
  className?: string
}

export function SectionHeader({ 
  title, 
  description, 
  accentColor = 'from-orange-500 to-pink-600',
  className 
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 text-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        {title}
        <span className={cn(
          "relative mx-auto mt-2 block h-1 w-20 rounded-full bg-gradient-to-r",
          accentColor
        )}>
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r opacity-30 blur-sm" />
        </span>
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}
    </div>
  )
}
