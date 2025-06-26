"use client";
import InterviewSessionHeader from '@/src/components/interviews/InterviewSessionHeader';
// import InterviewChat from '@/src/components/interviews/InterviewChat';
import InterviewControls from '@/src/components/interviews/InterviewControls';
// import InterviewProgress from '@/src/components/interviews/InterviewProgress';
import Transcriber from '@/src/components/interviews/Transcriber';
import { useVapi } from '@/src/hooks/useVapi';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { assistant } from '@/src/app/assistants/assistant';

export default function InterviewSessionPage() {
  const searchParams = useSearchParams();
  const jobDescription = searchParams.get('jobDescription') || null;
  const interviewType = searchParams.get('interviewType') || null;

  // Build context string
  const context = [
    jobDescription ? `Job Description: ${jobDescription}` : null,
    interviewType ? `Interview Type: ${interviewType}` : null,
  ].filter(Boolean).join('\n') || null;

  // Replace {{context}} in system prompt
  const systemPromptWithContext = assistant.model.messages[0].content.replace(
    '{{context}}',
    context || 'None'
  );

  // Use the system prompt with context in useVapi (assume useVapi accepts a prompt/config)
  const { transcript, callStatus, toggleCall, start } = useVapi();

  const voiceButton = (
    <button
      onClick={toggleCall}
      className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors shadow-lg ${
        callStatus === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {callStatus === 'active' ? 'Stop Voice Session' : 'Start Voice Session'}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <InterviewSessionHeader voiceButton={voiceButton} />
      
      <div className="flex h-screen">
        {/* Main Interview Area */}
        <div className="flex-1 flex flex-col">
          {/* Progress Bar removed */}
          {/* Chat Interface (now Transcriber) */}
          <div className="flex-1 p-6">
            <Transcriber transcript={transcript} />
          </div>
          {/* Controls */}
          <div className="flex items-center justify-center pb-4">
            <button
              onClick={toggleCall}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors shadow-lg ${
                callStatus === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {callStatus === 'active' ? 'Stop Voice Session' : 'Start Voice Session'}
            </button>
          </div>
          {/* Optionally keep InterviewControls if needed */}
          {/* <InterviewControls /> */}
        </div>
        
        {/* Sidebar - Interview Info */}
        <div className="w-80 bg-white border-l border-slate-200 p-6">
          <div className="space-y-6">
            {/* Interview Info */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Interview Info</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-slate-500">AI Mentor:</span>
                  <div className="font-medium text-slate-900">Alex (Professional)</div>
                </div>
                {/* Difficulty removed, optionally add Interview Type if needed */}
                {interviewType && (
                  <div>
                    <span className="text-sm text-slate-500">Interview Type:</span>
                    <div className="font-medium text-slate-900">{interviewType}</div>
                  </div>
                )}
                {jobDescription && (
                  <div>
                    <span className="text-sm text-slate-500">Job Description:</span>
                    <div className="text-xs text-slate-700 line-clamp-3">{jobDescription}</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">💡 Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Speak clearly and at a steady pace</li>
                <li>• Use specific examples from your experience</li>
                <li>• Structure your answers with STAR method</li>
                <li>• Ask clarifying questions if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 