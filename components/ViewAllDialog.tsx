"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
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
          "bg-orange-500/10 border border-px border-orange-500 text-orange-500 text-sm dark:bg-orange-900/30 dark:text-white gap-1 transition-colors hover:bg-orange-500/20 dark:hover:bg-orange-900/50",
          buttonClassName
        )}
      >
        {buttonText}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{category} News</DialogTitle>
            </DialogHeader>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setOpen(false)}
              className="h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="grid gap-6 py-4">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
