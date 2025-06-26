import React, { useEffect, useState } from "react";

interface SummaryProps {
  transcript: { role: string; text: string }[];
  jobDescription: string;
}

interface ApiResponse {
  summary: string;
  strengths: string;
  improvements: string;
}

const Summary: React.FC<SummaryProps> = ({ transcript, jobDescription }) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const response = await fetch("https://n8n.syedd.com/webhook/e16ddf85-b81b-40db-9f70-0be41ab4b13c", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcript, jobDescription }),
        });
        if (!response.ok) throw new Error("Failed to fetch summary");
        const result = await response.json();
        // Handle the case where the API response is nested under 'output'
        const output = result.output || result;
        setData(output);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    if (transcript && transcript.length > 0) {
      fetchSummary();
    }
  }, [transcript]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Interview Summary</h2>
      {loading && <div className="text-blue-600">Generating summary...</div>}
      {error && <div className="text-red-600">Error: {error}</div>}
      {data && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Summary</h3>
            <p className="text-gray-700 whitespace-pre-line">{data.summary}</p>
          </div>
          <div>
            <h3 className="font-semibold">Strengths</h3>
            <p className="text-green-700 whitespace-pre-line">{data.strengths}</p>
          </div>
          <div>
            <h3 className="font-semibold">Areas for Improvement</h3>
            <p className="text-yellow-700 whitespace-pre-line">{data.improvements}</p>
          </div>
        </div>
      )}
      {!loading && !error && !data && (
        <div className="text-gray-500">No summary available.</div>
      )}
    </div>
  );
};

export default Summary; 