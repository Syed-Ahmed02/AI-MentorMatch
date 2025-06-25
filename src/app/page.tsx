"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  MessageCircle,
  Briefcase,
  Users,
  Lightbulb,
  Code,
  Target,
  Mic,
  Volume2,
  VolumeX,
  Square,
  RotateCcw,
  Upload,
  FileText,
  X,
  AlertCircle,
} from "lucide-react"
import { useVapi, CALL_STATUS } from "./hooks/useVapi"
import { MessageTypeEnum, TranscriptMessageTypeEnum } from "@/lib/types/conversation.type"

interface JobDetails {
  jobTitle: string
  jobDescription: string
}

interface ResumeData {
  fileName: string
  content: string
  uploadDate: Date
}

interface InterviewQuestion {
  id: number
  type: "behavioral" | "technical"
  question: string
  category: string
  icon: React.ReactNode
}

export default function VoiceInterviewApp() {
  const [step, setStep] = useState<"setup" | "interview" | "feedback">("setup")
  const [jobDetails, setJobDetails] = useState<JobDetails>({ jobTitle: "", jobDescription: "" })
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<string[]>([])
  const [currentResponse, setCurrentResponse] = useState("")
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])

  // Vapi hook integration
  const { 
    isSpeechActive, 
    callStatus, 
    audioLevel, 
    activeTranscript, 
    messages, 
    start, 
    stop, 
    toggleCall 
  } = useVapi()

  // Upload state
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Process Vapi messages to extract user responses
  useEffect(() => {
    messages.forEach((message) => {
      if (message.type === MessageTypeEnum.TRANSCRIPT && 
          message.transcriptType === TranscriptMessageTypeEnum.FINAL &&
          message.role === "user") {
        setCurrentResponse((prev) => prev + message.transcript + " ")
      }
    })
  }, [messages])

  // Update transcript display from active transcript
  useEffect(() => {
    if (activeTranscript && activeTranscript.role === "user") {
      setCurrentResponse((prev) => {
        // Remove any previous partial transcript and add the new one
        const baseResponse = prev.replace(/\[partial\].*$/, "").trim()
        return baseResponse + " [partial] " + activeTranscript.transcript
      })
    }
  }, [activeTranscript])

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setUploadError(null)

    try {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ]

      if (!allowedTypes.includes(file.type)) {
        throw new Error("Please upload a PDF, Word document, or text file")
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB")
      }

      let content = ""

      if (file.type === "text/plain") {
        content = await file.text()
      } else {
        // For PDF and Word files, we'll extract basic text
        // In a real application, you'd use libraries like pdf-parse or mammoth
        content = `Resume uploaded: ${file.name}\nFile type: ${file.type}\nSize: ${(file.size / 1024).toFixed(1)}KB\n\nNote: Full text extraction would be implemented with appropriate libraries in production.`
      }

      setResumeData({
        fileName: file.name,
        content: content,
        uploadDate: new Date(),
      })
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Failed to upload file")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const removeResume = () => {
    setResumeData(null)
    setUploadError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const generateQuestions = (jobTitle: string, jobDescription: string, resume?: ResumeData): InterviewQuestion[] => {
    const behavioralQuestions = [
      {
        id: 1,
        type: "behavioral" as const,
        question: `Tell me about a time you had to adapt to a significant change in your work environment or process. How did you handle it, and what was the outcome?`,
        category: "Adaptability",
        icon: <Users className="w-4 h-4" />,
      },
      {
        id: 2,
        type: "behavioral" as const,
        question: `Describe a situation where you had to collaborate with team members from different cultural backgrounds or departments. What challenges did you face and how did you overcome them?`,
        category: "Collaboration",
        icon: <MessageCircle className="w-4 h-4" />,
      },
      {
        id: 3,
        type: "behavioral" as const,
        question: resume
          ? `Looking at your background, tell me about a time when you took initiative to improve a process or solve a problem without being asked. What motivated you and what was the result?`
          : `Give me an example of a time when you took initiative to improve a process or solve a problem without being asked. What motivated you and what was the result?`,
        category: "Initiative",
        icon: <Lightbulb className="w-4 h-4" />,
      },
    ]

    const technicalQuestions = [
      {
        id: 4,
        type: "technical" as const,
        question: resume
          ? `Based on your resume and this job description, what specific experience do you have that makes you a strong fit for this ${jobTitle} role? Can you walk me through a relevant project or achievement?`
          : jobTitle.toLowerCase().includes("developer") || jobTitle.toLowerCase().includes("engineer")
            ? `Based on the job description, what technical skills do you bring that would be most valuable for this ${jobTitle} role? Can you walk me through a recent project where you applied these skills?`
            : `What specific experience do you have that directly relates to the key responsibilities mentioned in this ${jobTitle} position?`,
        category: "Technical Skills",
        icon: <Code className="w-4 h-4" />,
      },
      {
        id: 5,
        type: "technical" as const,
        question: `How do you stay current with industry trends and best practices in your field? Can you give me an example of something new you've learned recently and how you applied it?`,
        category: "Professional Development",
        icon: <Target className="w-4 h-4" />,
      },
    ]

    return [...behavioralQuestions, ...technicalQuestions]
  }

  const startInterview = () => {
    if (!jobDetails.jobTitle.trim() || !jobDetails.jobDescription.trim()) {
      alert("Please fill in both job title and job description to continue.")
      return
    }

    const generatedQuestions = generateQuestions(
      jobDetails.jobTitle,
      jobDetails.jobDescription,
      resumeData || undefined,
    )
    setQuestions(generatedQuestions)
    setStep("interview")

    // Start Vapi call
    setTimeout(() => {
      start()
    }, 1000)
  }

  const submitResponse = () => {
    if (!currentResponse.trim()) {
      alert("Please provide a response before continuing.")
      return
    }

    // Clean up partial transcript markers
    const cleanResponse = currentResponse.replace(/\[partial\].*$/, "").trim()

    const newResponses = [...responses, cleanResponse]
    setResponses(newResponses)
    setCurrentResponse("")

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1
      setCurrentQuestionIndex(nextIndex)
    } else {
      setStep("feedback")
      stop()
    }
  }

  const repeatQuestion = () => {
    // In a real implementation, you would send the question to Vapi
    // For now, we'll just show a message
    console.log("Repeating question:", questions[currentQuestionIndex]?.question)
  }

  const toggleVoice = () => {
    if (callStatus === CALL_STATUS.ACTIVE) {
      stop()
    } else if (callStatus === CALL_STATUS.INACTIVE && step === "interview") {
      start()
    }
  }

  const resetInterview = () => {
    setStep("setup")
    setJobDetails({ jobTitle: "", jobDescription: "" })
    setCurrentQuestionIndex(0)
    setResponses([])
    setCurrentResponse("")
    setQuestions([])
    
    if (callStatus === CALL_STATUS.ACTIVE) {
      stop()
    }
  }

  const progress = step === "interview" ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0

  // Get current voice state for UI
  const getVoiceState = () => {
    if (callStatus === CALL_STATUS.LOADING) return "processing"
    if (callStatus === CALL_STATUS.ACTIVE && isSpeechActive) return "speaking"
    if (callStatus === CALL_STATUS.ACTIVE && !isSpeechActive) return "listening"
    return "idle"
  }

  const voiceState = getVoiceState()

  if (step === "setup") {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice Mock Interview Simulator</h1>
            <p className="text-gray-600">Practice your interview skills with AI-powered voice interaction</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Resume Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Upload Resume (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!resumeData ? (
                  <div>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-medium text-gray-700 mb-2">Drop your resume here or click to browse</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Supports PDF, Word documents, and text files (max 5MB)
                      </p>
                      <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="mb-2">
                        {isUploading ? "Uploading..." : "Choose File"}
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </div>

                    {uploadError && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <p className="text-sm text-red-700">{uploadError}</p>
                      </div>
                    )}

                    <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Why upload your resume?</strong> Get personalized interview questions and more relevant
                        feedback based on your experience.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">{resumeData.fileName}</p>
                          <p className="text-sm text-green-600">
                            Uploaded {resumeData.uploadDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={removeResume}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        ✓ Resume uploaded successfully! Your interview will be personalized based on your background.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Job Details Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Job Details
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Frontend Developer, Marketing Manager, Data Analyst"
                    value={jobDetails.jobTitle}
                    onChange={(e) => setJobDetails({ ...jobDetails, jobTitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste the job description here or describe the key responsibilities and requirements..."
                    rows={6}
                    className="h-76"
                    value={jobDetails.jobDescription}
                    onChange={(e) => setJobDetails({ ...jobDetails, jobDescription: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Start Interview Button */}
          <div className="mt-6">
            <Button onClick={startInterview} className="w-full" size="lg">
              {resumeData ? "Start Personalized Voice Interview" : "Start Voice Interview"}
            </Button>
          </div>

          <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Voice Interview Features:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-blue-500" />
                AI interviewer speaks questions aloud
              </li>
              <li className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-green-500" />
                Voice recognition captures your responses
              </li>
              <li className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-500" />
                Resume upload for personalized questions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Real-time transcription and feedback
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  if (step === "interview") {
    const currentQuestion = questions[currentQuestionIndex]

    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {resumeData ? "Personalized Voice Interview" : "Voice Interview"} in Progress
              </h1>
              <div className="flex items-center gap-4">
                {resumeData && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <FileText className="w-4 h-4" />
                    Resume-based
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleVoice}
                  className={callStatus === CALL_STATUS.ACTIVE ? "text-green-600" : "text-gray-400"}
                >
                  {callStatus === CALL_STATUS.ACTIVE ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  {callStatus === CALL_STATUS.ACTIVE ? "Voice Active" : "Voice Inactive"}
                </Button>
                <span className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid gap-6">
            {/* Voice Status Indicator */}
            <Card className="border-2 border-dashed border-blue-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div
                    className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg font-medium ${
                      voiceState === "speaking"
                        ? "bg-blue-100 text-blue-800"
                        : voiceState === "listening"
                          ? "bg-green-100 text-green-800 animate-pulse"
                          : voiceState === "processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {voiceState === "speaking" && <Volume2 className="w-5 h-5" />}
                    {voiceState === "listening" && <Mic className="w-5 h-5" />}
                    {voiceState === "processing" && (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    )}
                    {voiceState === "idle" && <MessageCircle className="w-5 h-5" />}

                    {voiceState === "speaking" && "AI is speaking..."}
                    {voiceState === "listening" && "Listening to your response..."}
                    {voiceState === "processing" && "Processing your response..."}
                    {voiceState === "idle" && "Ready for interaction"}
                  </div>
                  
                  {/* Audio Level Indicator */}
                  {callStatus === CALL_STATUS.ACTIVE && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-100" 
                          style={{ width: `${audioLevel * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Audio Level: {Math.round(audioLevel * 100)}%</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {currentQuestion.icon}
                    {currentQuestion.category} Question
                  </span>
                  <Button variant="outline" size="sm" onClick={repeatQuestion} disabled={voiceState === "speaking"}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Repeat Question
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-lg font-medium text-blue-900">"{currentQuestion.question}"</p>
                </div>

                {currentQuestion.type === "behavioral" && (
                  <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Tip:</strong> Use the STAR method (Situation, Task, Action, Result) to structure your
                      response.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Voice Response Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Your Response
                  <div className="flex gap-2">
                    {callStatus === CALL_STATUS.ACTIVE ? (
                      <Button onClick={stop} variant="destructive" size="sm">
                        <Square className="w-4 h-4 mr-2" />
                        Stop Call
                      </Button>
                    ) : (
                      <Button
                        onClick={start}
                        disabled={callStatus === CALL_STATUS.LOADING}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        Start Call
                      </Button>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Your response will appear here as you speak, or you can type directly..."
                  rows={8}
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                />

                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={resetInterview}>
                    Start Over
                  </Button>
                  <Button onClick={submitResponse} disabled={callStatus === CALL_STATUS.LOADING}>
                    {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Interview"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (step === "feedback") {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice Interview Complete!</h1>
            <p className="text-gray-600">Thank you for completing the voice-powered mock interview session.</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Interview Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <strong>Position:</strong> {jobDetails.jobTitle}
                </div>
                <div>
                  <strong>Questions Answered:</strong> {responses.length} of {questions.length}
                </div>
                <div>
                  <strong>Interview Format:</strong>{" "}
                  {resumeData ? "Personalized voice-powered with resume analysis" : "Voice-powered with AI interaction"}
                </div>
                {resumeData && (
                  <div>
                    <strong>Resume Used:</strong> {resumeData.fileName}
                  </div>
                )}
                <div>
                  <strong>Estimated Duration:</strong> {responses.length * 4} minutes
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Voice Interview Performance & Canadian Interview Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Voice Communication Strengths:</h4>
                <ul className="text-sm space-y-1">
                  <li>• You practiced speaking your responses aloud</li>
                  <li>• Real-time interaction simulated actual interview conditions</li>
                  <li>• Voice practice helps with confidence and clarity</li>
                  {resumeData && <li>• Questions were tailored to your background and experience</li>}
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Canadian Interview Success Tips:</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    • <strong>Clear Communication:</strong> Speak slowly and clearly
                  </li>
                  <li>
                    • <strong>Active Listening:</strong> Show engagement through verbal cues
                  </li>
                  <li>
                    • <strong>Cultural Fit:</strong> Emphasize teamwork and inclusivity
                  </li>
                  <li>
                    • <strong>Confidence:</strong> Practice reduces anxiety and improves delivery
                  </li>
                  <li>
                    • <strong>Storytelling:</strong> Use specific examples with clear outcomes
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Next Practice Steps:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Record yourself answering questions to review your pace</li>
                  <li>• Practice with friends or family for feedback</li>
                  <li>• Research company-specific values and culture</li>
                  <li>• Prepare questions to ask the interviewer</li>
                  {resumeData && <li>• Review your resume and prepare specific examples from your experience</li>}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={resetInterview} size="lg">
              Practice Another Voice Interview
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
