export default function InterviewControls() {
  return (
    <div className="bg-white border-t border-slate-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Input Area */}
        <div className="flex items-end space-x-4">
          {/* Text Input */}
          <div className="flex-1">
            <textarea
              placeholder="Type your response here..."
              className="w-full p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
            />
          </div>
          
          {/* Voice Button */}
          <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          
          {/* Send Button */}
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Send
          </button>
        </div>
        
        {/* Additional Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <button className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Notes
            </button>
            <button className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ask for Hint
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">Voice Mode:</span>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 