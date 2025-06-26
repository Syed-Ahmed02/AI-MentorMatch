"use client";
import React, { useState, useEffect, useRef } from "react";
import { runFlow } from '@genkit-ai/next/client';
import { useAuth } from '../../contexts/AuthContext';
import { firestoreService } from '../../lib/firestoreService';
import { Loader2, Link as LinkIcon, AlertCircle } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { SessionDocument } from '../../lib/firestoreService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const [resumeSummary, setResumeSummary] = useState("");
  const [aiResult, setAiResult] = useState<any>(null);
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [error, setError] = useState("");
  const [interviewType, setInterviewType] = useState("technical");
  const [fetchingSummary, setFetchingSummary] = useState(true);
  const [selectedSession, setSelectedSession] = useState<SessionDocument | null>(null);
  const sidebarRef = useRef<any>(null);

  useEffect(() => {
    if (!loading && currentUser === null) {
      router.replace('/login');
    }
  }, [currentUser, loading, router]);

  useEffect(() => {
    async function fetchSummaryAndSessions() {
      if (!currentUser) return;
      setFetchingSummary(true);
      try {
        const resumes = await firestoreService.getUserResumes(currentUser.uid);
        if (!resumes.length) {
          router.push('/upload-resume');
          return;
        }
        if (resumes.length > 0 && resumes[0].summary) {
          setResumeSummary(resumes[0].summary);
        }
        const userSessions = await firestoreService.getUserSessions(currentUser.uid);
        if (userSessions.length > 0) {
          setSelectedSession(userSessions[0]);
          setAiResult(userSessions[0]);
          setJobDescription(userSessions[0].jobDescription);
        }
      } catch (err: any) {
        setError("Failed to fetch resume summary or sessions");
      } finally {
        setFetchingSummary(false);
      }
    }
    fetchSummaryAndSessions();
  }, [currentUser]);

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setAnalyzeLoading(true);
    setError("");
    setAiResult(null);
    try {
      const result = await runFlow<any>({
        url: "/api/analyze-job",
        input: { resumeSummary, jobDescription },
      });
      setAiResult(result);
      // Save analysis as a session
      if (currentUser && resumeSummary) {
        const sessionId = await firestoreService.addSession({
          userId: currentUser.uid,
          resumeId: "", // Optionally link to resume document if available
          jobDescription,
          score: result.score,
          strengths: result.strengths,
          improvements: result.improvements,
          missingSkills: result.missingSkills,
          resources: result.resources,
          summary: result.summary,
        });
        // Refresh sidebar sessions and select the new one
        if (sidebarRef.current && sidebarRef.current.refreshSessions) {
          await sidebarRef.current.refreshSessions();
        }
        const userSessions = await firestoreService.getUserSessions(currentUser.uid);
        const newSession = userSessions.find(s => s.id === sessionId) || userSessions[0];
        setSelectedSession(newSession);
      }
    } catch (err: any) {
      setError(err.message || "Failed to analyze");
    } finally {
      setAnalyzeLoading(false);
    }
  }

  function handleSelectSession(session: SessionDocument) {
    setSelectedSession(session);
    setAiResult(session);
    setJobDescription(session.jobDescription);
  }

  const summary = aiResult?.summary || "";
  const score = aiResult?.score ?? "-";
  const strengths = aiResult?.strengths || "";
  const improvements = aiResult?.improvements || "";
  const resources = aiResult?.resources || [];
  const missingSkills = aiResult?.missingSkills || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (currentUser === null) {
    return null;
  }

  if (fetchingSummary) {
    return <div className="min-h-screen flex items-center justify-center text-lg"><Loader2 className="animate-spin mr-2" />Loading your resume summary...</div>;
  }

  if (!resumeSummary) {
    return <div className="min-h-screen flex items-center justify-center text-lg text-red-600"><AlertCircle className="mr-2" />No resume summary found. Please upload your resume first.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex">
      <DashboardSidebar
        ref={sidebarRef}
        onSelectSession={handleSelectSession}
        selectedSessionId={selectedSession?.id}
        onPracticeInterview={() => {
          setSelectedSession(null);
          setAiResult(null);
          setJobDescription("");
          setError("");
        }}
      />
      <main className="flex-1 flex flex-col items-center py-8 px-2">
        <form onSubmit={handleAnalyze} className="w-full max-w-5xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resume Summary Card */}
            <div className="rounded-2xl p-8 bg-white shadow-xl flex flex-col border border-blue-100">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold text-xl tracking-wide">Resume.pdf</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-blue-600">{score}/10</span>
                <span className="text-gray-500 text-base">Resume Score</span>
              </div>
              <div className="mb-3">
                <div className="font-semibold text-gray-700 mb-1">Strengths</div>
                <div className="text-green-700 whitespace-pre-line bg-green-50 rounded p-2 text-sm">{strengths}</div>
              </div>
              <div className="mb-3">
                <div className="font-semibold text-gray-700 mb-1">Improvements</div>
                <div className="text-yellow-800 whitespace-pre-line bg-yellow-50 rounded p-2 text-sm">{improvements}</div>
              </div>
              {summary && <div className="mt-2 text-gray-700 text-base italic">{summary}</div>}
              <div className="mt-4 text-gray-400 text-xs">Resume Summary: {resumeSummary}</div>
            </div>
            {/* Job Description Card */}
            <div className="rounded-2xl p-8 bg-white shadow-xl flex flex-col border border-blue-100">
              <label className="font-semibold text-lg mb-2 text-gray-700">Job Description</label>
              <textarea
                className="border rounded-lg p-3 text-base min-h-[120px] h-full resize-none bg-gray-50 focus:ring-2 focus:ring-blue-200"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
              />
              <button
                type="submit"
                className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                disabled={analyzeLoading || !resumeSummary || !jobDescription}
              >
                {analyzeLoading && <Loader2 className="animate-spin" />}
                {analyzeLoading ? "Analyzing..." : "Analyze Resume & Job"}
              </button>
              {/* Only show error if it's not a session fetch error */}
              {error && !error.toLowerCase().includes('session') && (
                <div className="text-red-600 text-sm mt-2 flex items-center"><AlertCircle className="mr-1" />{error}</div>
              )}
            </div>
          </div>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Resources Card */}
          <div className="rounded-2xl p-8 bg-white shadow-xl flex flex-col border border-blue-100">
            <div className="font-semibold text-lg mb-4 text-gray-700 flex items-center gap-2">Resources</div>
            {missingSkills.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {missingSkills.map((skill: string, i: number) => (
                  <span key={i} className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">{skill}</span>
                ))}
              </div>
            )}
            {resources.length > 0 ? (
              <ul className="space-y-4">
                {resources.map((r: any, i: number) => (
                  <li key={i} className="mb-2">
                    <div className="font-semibold text-blue-700 mb-1">{r.skill}</div>
                    <ul className="ml-2 space-y-1">
                      {r.resources.map((res: string, j: number) => {
                        // Extract title and url from the string
                        const match = res.match(/Title:\s*(.*?)\s+Url:\s*(\S+)/i);
                        const title = match ? match[1] : res;
                        const url = match ? match[2] : undefined;
                        return (
                          <li key={j} className="flex items-center gap-2">
                            {url ? (
                              <Link href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black hover:underline text-sm font-semibold">
                                <LinkIcon className="w-4 h-4 min-w-4 min-h-4 text-blue-500" />
                                <span className="underline">{title}</span>
                              </Link>
                            ) : (
                              <span className="flex items-center gap-2 text-sm">
                                <LinkIcon className="w-4 h-4 min-w-4 min-h-4 text-blue-400" />
                                {title}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">No resources found yet.</div>
            )}
          </div>
          {/* Interview Type Card */}
          <div className="rounded-2xl p-8 bg-white shadow-xl flex flex-col border border-blue-100 items-center justify-center">
          <div className="font-semibold text-lg mb-4 text-gray-700 flex items-center gap-2">Virtual Interview</div>
          <p className="text-gray-600 mb-6 text-center">Practice a real time Live voice call interview with AI. Get instant feedback on your answers.</p>
          <Link href="/interview" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2">
            Start Mock Interview (Live Call)
          </Link>
          </div>
        </div>
        
      </main>
    </div>
  );
} 