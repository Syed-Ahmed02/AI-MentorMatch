"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { firestoreService } from "@/src/lib/firestoreService";

import Transcriber from "@/src/components/interviews/Transcriber";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useVapi } from "@/src/hooks/useVapi";
import Summary from "@/src/components/Summary";

const INTERVIEW_TYPES = [
  { value: "technical", label: "Technical" },
  { value: "behavioral", label: "Behavioral" },
  { value: "product", label: "Product" },
];

export default function InterviewPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [resumeSummary, setResumeSummary] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [interviewType, setInterviewType] = useState(INTERVIEW_TYPES[0].value);
  const [sessionStarted, setSessionStarted] = useState(false);
  const vapi = useVapi();
  const sessionIdRef = useRef<string | null>(null);
  const [endRequested, setEndRequested] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!currentUser) return;
      setLoading(true);
      try {
        const resumes = await firestoreService.getUserResumes(currentUser.uid);
        if (!resumes.length) {
          router.push("/upload-resume");
          return;
        }
        setResumeSummary(resumes[0].summary || "");
        const sessions = await firestoreService.getUserSessions(currentUser.uid);
        if (sessions.length > 0) {
          setJobDescription(sessions[0].jobDescription || "");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentUser, router]);





  // Start interview session
  async function startInterview() {
    if (!resumeSummary || !jobDescription || !interviewType || !currentUser) return;
    setSessionStarted(true);
    vapi.start(resumeSummary, jobDescription, interviewType);
  }

  // No need for vapi.on/off or appendSessionTranscript; use vapi.transcript
  const transcriptArr: { role: string; text: string }[] = Array.isArray(vapi.transcript) ? vapi.transcript : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        <Loader2 className="animate-spin mr-2" />Loading interview...
      </div>
    );
  }

  if (!resumeSummary) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-red-600">
        No resume summary found. Please upload your resume first.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-2 text-blue-700">Virtual Interview</h1>
        <p className="mb-6 text-gray-600 text-center">Your AI-powered mock interview. Speak your answers aloud and get instant feedback.</p>
        {!sessionStarted && (
          <>
            <div className="w-full mb-4">
              <div className="mb-2 font-semibold text-gray-700">Interview Type</div>
              <select
                className="w-full border rounded-lg p-2 bg-gray-50"
                value={interviewType}
                onChange={e => setInterviewType(e.target.value)}
              >
                {INTERVIEW_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div className="w-full mb-4">
              <div className="mb-2 font-semibold text-gray-700">Job Description</div>
              <textarea
                className="w-full border rounded-lg p-2 bg-gray-50 min-h-[80px]"
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
              />
            </div>
            <button
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all mb-2"
              onClick={startInterview}
              disabled={!resumeSummary || !jobDescription}
            >
              Start Interview
            </button>
          </>
        )}
        {sessionStarted && (
          <>
            <div className="w-full mb-4">
              <div className="font-semibold text-gray-700 mb-2">Live Interview Transcript</div>
              <div className="h-72 border rounded-lg bg-gray-50 overflow-y-auto">
                <Transcriber transcript={transcriptArr} error={vapi.error ?? undefined} />
              </div>
            </div>
            <div className="w-full flex flex-col items-center mt-4 gap-4">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">Voice call in progress with Vapi...</span>
              <button
                className="mt-2 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                onClick={() => {
                  setEndRequested(true);
                  vapi.stop();
                }}
                disabled={vapi.callStatus !== "active" && vapi.callStatus !== "loading"}
              >
                End Interview
              </button>
              {endRequested && (
                <div className="flex flex-col items-center">
                  <button
                    className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    onClick={() => setShowSummary((prev) => !prev)}
                  >
                    {showSummary ? "Hide Summary" : "View Summary"}
                  </button>
                  <button
                        className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-900 transition"
                        onClick={() => router.push('/dashboard')}
                      >
                        Back to Dashboard
                      </button>
                  {showSummary && (
                    <div className="w-full mt-4">
                      <Summary transcript={transcriptArr} jobDescription={jobDescription} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 