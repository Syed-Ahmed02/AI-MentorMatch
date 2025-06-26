"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StartNewInterview() {
  const aiMentor = {
    id: 'alex',
    name: 'Alex',
    personality: 'Professional & Approachable',
    specialty: 'Personalized Mock Interviews',
    avatar: '🧑‍💼',
    description: `Alex is a professional AI interviewer who conducts voice-powered mock interviews. Alex adapts questions based on your resume and the job you're applying for, providing a realistic interview experience and constructive feedback. Expect a warm, business-appropriate tone, clear and articulate questions, and a supportive environment focused on helping you improve your interview skills. Alex covers behavioral, technical, resume-based, and cultural fit questions, always personalizing the interview to your background and the target role.`
  }

  const interviewTypes = [
    { type: 'Technical', description: 'Focus on technical skills, problem-solving, and role-specific knowledge.' },
    { type: 'Behavioral', description: 'Emphasizes soft skills, teamwork, leadership, and past experiences.' }
  ]

  const [jobDescription, setJobDescription] = useState('');
  const [interviewType, setInterviewType] = useState(interviewTypes[0].type);
  const router = useRouter();

  const handleStart = () => {
    const job = jobDescription.trim() === '' ? null : jobDescription.trim();
    const type = interviewType.trim() === '' ? null : interviewType.trim();
    // Pass as query params
    const params = new URLSearchParams();
    if (job) params.append('jobDescription', job);
    if (type) params.append('interviewType', type);
    router.push(`/interviews/new/session?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Start New Interview</h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* AI Mentor Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Your AI Mentor</h3>
          <div className="space-y-4">
            <div
              key={aiMentor.id}
              className="border-2 border-blue-300 rounded-lg p-4 transition-colors cursor-pointer bg-blue-50"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{aiMentor.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-slate-900">{aiMentor.name}</h4>
                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {aiMentor.personality}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    <strong>Specialty:</strong> {aiMentor.specialty}
                  </p>
                  <p className="text-sm text-slate-600 whitespace-pre-line">{aiMentor.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interview Configuration */}
        <div className="space-y-6">
          {/* Job Description */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Job Description</h3>
            <textarea
              placeholder="Paste the job description here to customize your interview questions..."
              className="w-full h-32 p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
            />
            <p className="text-sm text-slate-500 mt-2">
              This helps us tailor questions to your target role
            </p>
          </div>

          {/* Interview Type */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Interview Type</h3>
            <div className="space-y-3">
              {interviewTypes.map((type, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="interviewType"
                    value={type.type}
                    checked={interviewType === type.type}
                    onChange={() => setInterviewType(type.type)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-slate-900">{type.type}</div>
                    <div className="text-sm text-slate-600">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg text-center transition-colors shadow-lg hover:shadow-xl"
          >
            Start Interview Session
          </button>
        </div>
      </div>
    </div>
  )
} 