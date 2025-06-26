export default function InterviewChat() {
  const messages = [
    {
      id: 1,
      sender: 'ai',
      name: 'Sarah',
      avatar: '👩‍💼',
      message: "Hi! I'm Sarah, your interview coach today. Let's start with a behavioral question. Can you tell me about a time when you had to solve a complex technical problem?",
      timestamp: '2:30 PM'
    },
    {
      id: 2,
      sender: 'user',
      name: 'You',
      avatar: '👤',
      message: "Sure! I was working on a project where we needed to optimize database queries that were taking too long. I started by analyzing the slow queries using profiling tools...",
      timestamp: '2:32 PM'
    },
    {
      id: 3,
      sender: 'ai',
      name: 'Sarah',
      avatar: '👩‍💼',
      message: "That's a great example! I can see you used a systematic approach. What specific steps did you take to identify the bottleneck?",
      timestamp: '2:33 PM'
    }
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-6 p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-3xl ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                msg.sender === 'ai' ? 'bg-blue-100' : 'bg-slate-100'
              }`}>
                {msg.avatar}
              </div>
              
              {/* Message */}
              <div className={`mx-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-4 py-3 rounded-lg ${
                  msg.sender === 'ai' 
                    ? 'bg-white border border-slate-200 shadow-sm' 
                    : 'bg-blue-600 text-white'
                }`}>
                  <div className="text-sm font-medium mb-1">
                    {msg.name}
                  </div>
                  <div className="text-sm leading-relaxed">
                    {msg.message}
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        <div className="flex justify-start">
          <div className="flex max-w-3xl">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">
              👩‍💼
            </div>
            <div className="mx-3">
              <div className="inline-block px-4 py-3 rounded-lg bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-medium mb-1">Sarah</div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 