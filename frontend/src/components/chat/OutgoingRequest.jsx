import React from 'react'
import { MessageSquare } from "lucide-react";

const OutgoingRequest = ({receiver}) => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-background">
    <div className="max-w-md text-center space-y-6">
      {/* Icon Display */}
      <div className="flex justify-center gap-4 mb-4">
        <div className="relative">
          <div
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
           justify-center animate-bounce"
          >
            <MessageSquare className="w-12 h-12 text-primary " />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold"> Waiting for {receiver.fullName} to accept your request</h2>
    </div>
  </div>
  )
}

export default OutgoingRequest