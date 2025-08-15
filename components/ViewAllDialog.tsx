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
        <DialogContent className="max-w-6xl overflow-hidden rounded-2xl p-0">
          <div className="relative">
            {/* Header with gradient background */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <DialogHeader className="space-y-1">
                  <span className="text-sm font-medium uppercase tracking-wider text-orange-100">
                    Latest Updates
                  </span>
                  <DialogTitle className="text-3xl font-bold tracking-tight text-white">
                    {category} News
                  </DialogTitle>
                </DialogHeader>
                <Button
                  onClick={() => setOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>

            {/* Content area with custom scrollbar */}
            <div className="max-h-[70vh] overflow-y-auto p-6">
              <div className="space-y-6">
                {children}
              </div>
              
              {/* Footer */}
              <div className="sticky bottom-0 bg-gradient-to-t from-white to-white/80 px-6 py-4 backdrop-blur-sm dark:from-gray-900 dark:to-gray-900/80">
                <div className="flex justify-end">
                  <Button
                    onClick={() => setOpen(false)}
                    className="bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
