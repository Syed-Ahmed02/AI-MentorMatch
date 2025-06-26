"use client";
import React, { useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { firestoreService } from '../../lib/firestoreService';
import { useRouter } from 'next/navigation';

export default function UploadResumePage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSummary("");
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setError("You must be logged in to upload a resume.");
      return;
    }
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }
    setLoading(true);
    setError("");
    setSummary("");
    try {
      const formData = new FormData();
      formData.append("pdf", file);
      const res = await fetch("/api/summarize", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to summarize resume");
      const data = await res.json();
      setSummary(data.summary);
      // Save summary to Firestore
      await firestoreService.addResume({
        userId: currentUser.uid,
        fileName: file.name,
        originalFileName: file.name,
        storagePath: "", // Not used here
        downloadURL: "", // Not used here
        fileSize: file.size,
        status: "indexed",
        error: "",
        // Optionally, you can add a summary field to the ResumeDocument type
        summary: data.summary,
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Upload Your Resume</h1>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Upload & Summarize"}
        </button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>
    
    </div>
  );
} 