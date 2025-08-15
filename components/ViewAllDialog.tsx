"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ViewAllDialogProps {
  category: string
  children: React.ReactNode
  buttonText?: string
  buttonClassName?: string
}

export function ViewAllDialog({ 
  category, 
  children, 
  buttonText = "View all",
  buttonClassName
}: ViewAllDialogProps) {
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
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 bg-white dark:bg-gray-900">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <DialogHeader className="space-y-0 p-0">
                  <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category} News
                  </DialogTitle>
                </DialogHeader>
                <Button
                  onClick={() => setOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">
                  {React.Children.count(children)} articles
                </span>
                <div className="mx-3 h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Updated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {children}
              </div>
            </div>
            
            {/* Footer */}
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 dark:bg-gray-900/80">
              <div className="px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing <span className="font-medium text-gray-700 dark:text-gray-200">{React.Children.count(children)}</span> articles
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
