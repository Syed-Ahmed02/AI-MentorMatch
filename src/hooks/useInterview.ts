import { useState, useEffect } from "react"
import { useVapi, CALL_STATUS } from "./useVapi"
import { MessageTypeEnum, TranscriptMessageTypeEnum } from "../types/conversation.type"
import { generateQuestions, InterviewQuestion, ResumeData } from "../lib/interviewUtils"

interface JobDetails {
  jobTitle: string
  jobDescription: string
}

export type InterviewStep = "setup" | "interview" | "feedback"
export type VoiceState = "speaking" | "listening" | "processing" | "idle"

export function useInterview() {
  const [step, setStep] = useState<InterviewStep>("setup")
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

  // Get current voice state for UI
  const getVoiceState = (): VoiceState => {
    if (callStatus === CALL_STATUS.LOADING) return "processing"
    if (callStatus === CALL_STATUS.ACTIVE && isSpeechActive) return "speaking"
    if (callStatus === CALL_STATUS.ACTIVE && !isSpeechActive) return "listening"
    return "idle"
  }

  const voiceState = getVoiceState()

  return {
    // State
    step,
    jobDetails,
    setJobDetails,
    resumeData,
    setResumeData,
    currentQuestionIndex,
    responses,
    currentResponse,
    setCurrentResponse,
    questions,
    
    // Vapi state
    voiceState,
    callStatus,
    audioLevel,
    isLoading: callStatus === CALL_STATUS.LOADING,
    
    // Actions
    startInterview,
    submitResponse,
    repeatQuestion,
    toggleVoice,
    resetInterview,
    start,
    stop,
  }
} 