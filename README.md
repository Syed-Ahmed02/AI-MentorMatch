# Immploy

Immploy is an AI-powered platform for mock interviews, resume analysis, and job preparation. It helps users practice interviews, receive instant feedback, and get actionable suggestions to improve their resumes and job readiness.

## Features

- **AI-Powered Mock Interviews:** Practice technical, behavioral, and product interviews with real-time voice transcription and feedback.
- **Resume Analysis:** Upload your resume and receive a summary, strengths, and areas for improvement.
- **Job Description Matching:** Analyze your resume against job descriptions to identify missing skills and get tailored resources.
- **Mentor Finder:** Find possible mentors based on your missing skills.
- **User Dashboard:** Track previous sessions, resume scores, and access resources.

## Project Structure

- `src/app/` - Main Next.js app pages and API routes
- `src/components/` - Reusable React components (dashboard, interviews, UI, etc.)
- `src/contexts/` - React context providers (e.g., authentication)
- `src/genkit/` - AI and flow logic for resume/job/interview analysis
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility libraries (Firebase, Vapi, etc.)
- `src/services/` - Service layer for messaging and data
- `src/types/` - TypeScript types

## Getting Started

### Prerequisites
- Node.js (18+ recommended)
- pnpm (or npm/yarn)
- Firebase project (for authentication and storage)

### Setup
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd immploy
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your Firebase and other API keys.

4. **Run the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

### Environment Variables
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- (Add any other required keys for third-party APIs)

## Usage
- **Upload Resume:** Go to the dashboard and upload your resume.
- **Analyze Job:** Paste a job description and analyze your fit.
- **Practice Interview:** Start a mock interview and get instant feedback.
- **Find Mentors:** Use the "Find Mentors" feature to connect with mentors based on your missing skills.

## License
MIT 