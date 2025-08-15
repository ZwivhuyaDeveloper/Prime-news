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
        <DialogContent className="max-w-4xl overflow-hidden rounded-2xl p-0 bg-white dark:bg-gray-900">
          <div className="relative">
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
              
              <div className="mt-3 flex items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {React.Children.count(children)} articles
                </span>
                <div className="mx-3 h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Updated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="max-h-[70vh] overflow-y-auto">
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {children}
              </div>
            </div>
            
            {/* Footer */}
            <div className="sticky bottom-0 border-t border-gray-200 bg-white px-6 py-3 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing all {React.Children.count(children)} articles
                </div>
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
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
