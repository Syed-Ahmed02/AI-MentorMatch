import React from "react"
import { Users, MessageCircle, Lightbulb, Code, Target } from "lucide-react"

export interface InterviewQuestion {
  id: number
  type: "behavioral" | "technical"
  question: string
  category: string
  icon: React.ReactNode
}

export interface ResumeData {
  fileName: string
  content: string
  uploadDate: Date
}

export const generateQuestions = (
  jobTitle: string,
  jobDescription: string,
  resume?: ResumeData
): InterviewQuestion[] => {
  const behavioralQuestions: InterviewQuestion[] = [
    {
      id: 1,
      type: "behavioral",
      question: `Tell me about a time you had to adapt to a significant change in your work environment or process. How did you handle it, and what was the outcome?`,
      category: "Adaptability",
      icon: React.createElement(Users, { className: "w-4 h-4" }),
    },
    {
      id: 2,
      type: "behavioral",
      question: `Describe a situation where you had to collaborate with team members from different cultural backgrounds or departments. What challenges did you face and how did you overcome them?`,
      category: "Collaboration",
      icon: React.createElement(MessageCircle, { className: "w-4 h-4" }),
    },
    {
      id: 3,
      type: "behavioral",
      question: resume
        ? `Looking at your background, tell me about a time when you took initiative to improve a process or solve a problem without being asked. What motivated you and what was the result?`
        : `Give me an example of a time when you took initiative to improve a process or solve a problem without being asked. What motivated you and what was the result?`,
      category: "Initiative",
      icon: React.createElement(Lightbulb, { className: "w-4 h-4" }),
    },
  ]

  const technicalQuestions: InterviewQuestion[] = [
    {
      id: 4,
      type: "technical",
      question: resume
        ? `Based on your resume and this job description, what specific experience do you have that makes you a strong fit for this ${jobTitle} role? Can you walk me through a relevant project or achievement?`
        : jobTitle.toLowerCase().includes("developer") || jobTitle.toLowerCase().includes("engineer")
          ? `Based on the job description, what technical skills do you bring that would be most valuable for this ${jobTitle} role? Can you walk me through a recent project where you applied these skills?`
          : `What specific experience do you have that directly relates to the key responsibilities mentioned in this ${jobTitle} position?`,
      category: "Technical Skills",
      icon: React.createElement(Code, { className: "w-4 h-4" }),
    },
    {
      id: 5,
      type: "technical",
      question: `How do you stay current with industry trends and best practices in your field? Can you give me an example of something new you've learned recently and how you applied it?`,
      category: "Professional Development",
      icon: React.createElement(Target, { className: "w-4 h-4" }),
    },
  ]

  return [...behavioralQuestions, ...technicalQuestions]
} 