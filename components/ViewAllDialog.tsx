"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ViewAllDialogProps {
  category: string
  children: React.ReactNode
  buttonText?: string
  buttonClassName?: string
  articleCount?: number
}

export function ViewAllDialog({ 
  category, 
  children, 
  buttonText = "View all",
  buttonClassName,
  articleCount: propArticleCount
}: ViewAllDialogProps) {
  const articleCount = propArticleCount ?? React.Children.count(children)
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
          buttonClassName
        )}
      >
        {buttonText}
        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 overflow-hidden bg-white dark:bg-gray-900">
          {/* Header */}
          <div className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 px-6 py-4 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/95">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category} News
                </DialogTitle>
                <div className="mt-1 flex items-center space-x-4 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <span className="text-gray-500 dark:text-gray-500">
                    Updated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => setOpen(false)}
                variant="ghost"
                size="icon"
                className="ml-2 h-9 w-9 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {children}
            </div>
          </div>
          
          {/* Footer */}
          <div className="sticky bottom-0 border-t border-gray-200 bg-white/90 px-6 py-3 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/90">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium text-gray-900 dark:text-white">{articleCount}</span> {articleCount === 1 ? 'article' : 'articles'}
              </p>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                >
                  Back to top
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
