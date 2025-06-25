# AI Career Coach - Immigrant Professional Platform

An AI-powered platform that matches immigrant professionals with industry mentors and tailored job opportunities through mock interviews, skill gap analysis, and personalized career coaching.

**🚀 HACKATHON PROJECT - 2 Day Sprint**

## 🎯 Project Overview

This platform helps newcomers overcome barriers to white-collar employment by providing:
- **AI Mock Interviews**: Real-time voice conversations with personalized questions
- **Skill Gap Analysis**: Resume-to-job-description matching with improvement recommendations
- **Resource Hub**: Course and event recommendations based on identified gaps
- **Career Coaching**: Personalized feedback and learning paths

## 🎨 UI Design Blueprint

### **1. Landing Page (Public)**
```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] AI Career Coach                    [Login] [Sign Up]     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🚀 Master Your Career with AI-Powered Coaching                │
│                                                                 │
│  Transform your interview skills with personalized AI mentors   │
│  designed specifically for immigrant professionals              │
│                                                                 │
│  [Start Free Trial] [Watch Demo]                               │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │ 🎤 Voice    │ │ 📊 Skill    │ │ 📚 Resource │              │
│  │ Interviews  │ │ Analysis    │ │ Hub         │              │
│  │             │ │             │ │             │              │
│  │ Practice    │ │ Identify    │ │ Curated     │              │
│  │ with AI     │ │ gaps &      │ │ learning    │              │
│  │ mentors     │ │ strengths   │ │ materials   │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### **2. Authentication Pages**
```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] AI Career Coach                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Welcome Back                                                   │
│  Sign in to continue your career journey                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Email Address                                               │ │
│  │ [_____________________________]                             │ │
│  │                                                             │ │
│  │ Password                                                    │ │
│  │ [_____________________________] [👁️]                       │ │
│  │                                                             │ │
│  │ [✓] Remember me    [Forgot Password?]                       │ │
│  │                                                             │ │
│  │ [Sign In]                                                   │ │
│  │                                                             │ │
│  │ ────────────────────────────────────────────────────────── │ │
│  │                                                             │ │
│  │ Don't have an account? [Sign Up]                            │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### **3. Dashboard (Main Interface)**
```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] AI Career Coach    [🔔] [👤 Profile] [Logout]           │
├─────────────────────────────────────────────────────────────────┤
│ [🏠] Dashboard │ [🎤] Interviews │ [📊] Skills │ [📚] Resources │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Welcome back, Sarah! 👋                                        │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │ Total       │ │ This Week   │ │ Avg Score   │ │ Skills      │ │
│  │ Interviews  │ │ Interviews  │ │             │ │ Mastered    │ │
│  │             │ │             │ │             │ │             │ │
│  │ 12          │ │ 3           │ │ 8.5/10      │ │ 5/12        │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
│                                                                 │
│  Quick Actions                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ [🎤 Start New Interview] [📊 Take Skill Assessment]        │ │
│  │ [📚 Browse Resources] [📈 View Progress]                   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Recent Activity                                                │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 🎤 Software Engineer Interview - 2 hours ago - Score: 8/10  │ │
│  │ 📊 Skill Assessment Completed - Yesterday - 3 gaps found   │ │
│  │ 📚 Resource: "System Design Basics" - 1 day ago            │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### **4. Interview Interface**
```
┌─────────────────────────────────────────────────────────────────┐
│ [← Back] Software Engineer Interview    [⏸️] [⏹️] [⚙️]        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  AI Mentor: Sarah (Friendly)    Difficulty: Intermediate       │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │ 👩‍💼 Sarah: "Hi! I'm Sarah, your interview coach today.     │ │
│  │    Let's start with a behavioral question. Can you tell me  │ │
│  │    about a time when you had to solve a complex technical   │ │
│  │    problem?"                                                │ │
│  │                                                             │ │
│  │ [🎤] [Type your response...]                                │ │
│  │                                                             │ │
│  │ [Send] [Voice Mode] [Text Mode]                             │ │
│  │                                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Interview Progress: Question 3 of 8                           │
│  [████████████████████████████████████████████████████████████] │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │ Question    │ │ Time        │ │ Score       │              │
│  │ History     │ │ Remaining   │ │ Estimate    │              │
│  │             │ │             │ │             │              │
│  │ Q1: ✓ 9/10  │ │ 12:45       │ │ 8.5/10      │              │
│  │ Q2: ✓ 7/10  │ │ remaining   │ │ so far      │              │
│  │ Q3: 🔄      │ │             │ │             │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### **5. Skill Analysis Dashboard**
```
┌─────────────────────────────────────────────────────────────────┐
│ [← Back] Skill Analysis    [📊 Export Report] [🔄 Retake]      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Your Skill Profile                                             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Technical Skills                                            │ │
│  │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │ │
│  │ │ Python  │ │ React   │ │ Node.js │ │ AWS     │            │ │
│  │ │ ████████│ │ ████████│ │ ████████│ │ ████████│            │ │
│  │ │ 8/10    │ │ 7/10    │ │ 6/10    │ │ 4/10    │            │ │
│  │ └─────────┘ └─────────┘ └─────────┘ └─────────┘            │ │
│  │                                                             │ │
│  │ Soft Skills                                                │ │
│  │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │ │
│  │ │ Comm.   │ │ Leader. │ │ Problem │ │ Team    │            │ │
│  │ │ ████████│ │ ████████│ │ ████████│ │ ████████│            │ │
│  │ │ 6/10    │ │ 5/10    │ │ 8/10    │ │ 7/10    │            │ │
│  │ └─────────┘ └─────────┘ └─────────┘ └─────────┘            │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Recommended Learning Path                                      │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 🎯 Priority 1: AWS Cloud Computing (4/10 → 7/10)            │ │
│  │    📚 3 courses, 12 hours estimated                         │ │
│  │                                                             │ │
│  │ 🎯 Priority 2: Leadership Skills (5/10 → 7/10)             │ │
│  │    🎤 2 courses, 8 hours estimated                          │ │
│  │                                                             │ │
│  │ 🎯 Priority 3: Communication (6/10 → 8/10)                 │ │
│  │    📚 1 course, 4 hours estimated                           │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### **6. Resource Hub**
```
┌─────────────────────────────────────────────────────────────────┐
│ [← Back] Resource Hub    [🔍 Search] [Filter: All] [Sort: New] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 📚 System Design Fundamentals                              │ │
│  │    Master the basics of scalable system architecture       │ │
│  │    ⭐⭐⭐⭐⭐ (4.8/5) • 2 hours • Beginner                    │ │
│  │    [Start Learning] [Bookmark] [Share]                     │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 🎤 Behavioral Interview Mastery                            │ │
│  │    Learn to answer STAR method questions effectively       │ │
│  │    ⭐⭐⭐⭐⭐ (4.9/5) • 1.5 hours • Intermediate              │ │
│  │    [Start Learning] [Bookmark] [Share]                     │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 💼 Resume Optimization for Tech Roles                      │ │
│  │    ATS-friendly resume templates and tips                  │ │
│  │    ⭐⭐⭐⭐ (4.2/5) • 45 min • All Levels                     │ │
│  │    [Start Learning] [Bookmark] [Share]                     │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Categories: [All] [Technical] [Soft Skills] [Interview] [Career] │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### **7. Interview History**
```
┌─────────────────────────────────────────────────────────────────┐
│ [← Back] Interview History    [📊 Analytics] [Export Data]     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 🎤 Software Engineer @ Google                              │ │
│  │    Dec 15, 2024 • 45 minutes • Score: 8.5/10               │ │
│  │    AI Mentor: Sarah (Friendly) • Difficulty: Intermediate  │ │
│  │    [View Details] [Replay] [Download Transcript]           │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 🎤 Product Manager @ Microsoft                             │ │
│  │    Dec 12, 2024 • 38 minutes • Score: 7.2/10               │ │
│  │    AI Mentor: David (Challenging) • Difficulty: Advanced   │ │
│  │    [View Details] [Replay] [Download Transcript]           │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 🎤 Frontend Developer @ Meta                               │ │
│  │    Dec 10, 2024 • 42 minutes • Score: 9.1/10               │ │
│  │    AI Mentor: Lisa (Supportive) • Difficulty: Beginner     │ │
│  │    [View Details] [Replay] [Download Transcript]           │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Performance Trends                                             │
│  [📈 Graph showing score improvement over time]                │ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### **8. Profile Settings**
```
┌─────────────────────────────────────────────────────────────────┐
│ [← Back] Profile Settings    [💾 Save Changes] [Reset]         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Personal Information                                           │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Profile Picture: [👤] [Upload New]                         │ │
│  │                                                             │ │
│  │ First Name: [Sarah________________]                        │ │
│  │ Last Name:  [Johnson______________]                         │ │
│  │ Email:      [sarah.j@email.com____]                        │ │
│  │ Phone:      [+1 (555) 123-4567___]                         │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Career Information                                             │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Current Role: [Software Engineer]                           │ │
│  │ Experience:  [3-5 years]                                    │ │
│  │ Target Role: [Senior Software Engineer]                     │ │
│  │ Industry:    [Technology]                                   │ │
│  │ Location:    [San Francisco, CA]                            │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  AI Mentor Preferences                                          │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Preferred Personality: [Friendly] [Challenging] [Supportive]│ │
│  │ Interview Style: [Technical] [Behavioral] [Mixed]           │ │
│  │ Difficulty Level: [Beginner] [Intermediate] [Advanced]      │ │
│  │ Voice Speed: [Slow] [Normal] [Fast]                         │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 **Color Scheme & Design System**

**Primary Colors:**
- Primary Blue: `#2563eb` (Professional, trustworthy)
- Secondary Teal: `#0d9488` (Growth, learning)
- Accent Orange: `#ea580c` (Energy, motivation)

**Neutral Colors:**
- Background: `#f8fafc` (Light gray)
- Surface: `#ffffff` (White)
- Text Primary: `#1e293b` (Dark slate)
- Text Secondary: `#64748b` (Medium gray)
- Border: `#e2e8f0` (Light gray)

**Status Colors:**
- Success: `#16a34a` (Green)
- Warning: `#ca8a04` (Yellow)
- Error: `#dc2626` (Red)
- Info: `#2563eb` (Blue)

## 📱 **Responsive Design**
- **Desktop**: Full sidebar navigation, detailed analytics
- **Tablet**: Collapsible sidebar, optimized layouts
- **Mobile**: Bottom navigation, simplified interfaces

## 🎯 **Key UI Principles**
1. **Clean & Professional**: Minimal clutter, focus on content
2. **Accessible**: High contrast, readable fonts, keyboard navigation
3. **Progressive**: Show complexity gradually as users advance
4. **Encouraging**: Positive feedback, progress indicators
5. **Efficient**: Quick access to common actions, smart defaults

## 🏗️ Architecture & Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn/ui** for component library
- **React Hook Form** for form management
- **Zustand** for state management

### Backend & Database
- **Supabase** for authentication, database, and real-time features
- **NoSQL Database** (via Supabase) for flexible data storage
- **Supabase Auth** for user management
- **Supabase Realtime** for live updates

### AI & ML Services
- **OpenAI GPT-4** for interview questions and responses
- **Google Vertex AI** for embeddings and RAG
- **Gemini 2.5 Flash** for AI functionality
- **Vapi.ai** for voice AI agent (speech-to-text, text-to-speech, real-time conversation)

### Infrastructure
- **Docker** for containerization
- **Environment Variables** for configuration
- **Supabase** for hosting and database

## 📋 Hackathon Development Plan

### Day 1 (Today) - Foundation & Core Setup
- [x] Project initialization and README
- [ ] Next.js app setup with TypeScript
- [ ] Docker configuration
- [ ] Supabase project setup
- [ ] Environment configuration
- [ ] Basic project structure
- [ ] Authentication system (login/register)
- [ ] Core database collections setup
- [ ] Basic UI framework (Tailwind + Shadcn)

### Day 2 (Tomorrow) - MVP Features & Deployment
- [ ] AI mock interview system (core functionality)
- [ ] Job description input and parsing
- [ ] Basic skill gap analysis
- [ ] Interview history storage and retrieval
- [ ] Voice conversation integration
- [ ] Interview transcripts and summaries
- [ ] Docker setup and deployment
- [ ] Demo preparation and testing

## 🎯 MVP Features for Hackathon Demo

1. **User Authentication**
   - Register/Login with email
   - Basic user profile

2. **Job Description Management**
   - Input job description (text)
   - Parse key requirements
   - Store multiple job descriptions

3. **AI Mock Interviews**
   - Start interview based on job description
   - Real-time voice conversation
   - Text chat option
   - Interview session management

4. **Interview History**
   - View past interviews
   - Access transcripts
   - Basic feedback and summaries

5. **Skill Gap Analysis**
   - Basic resume-to-job matching
   - Improvement recommendations

6. **Deployable Demo**
   - Docker containerization
   - Live demo environment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Docker and Docker Compose
- Supabase account
- OpenAI API key
- Google Cloud Platform account (for Vertex AI)
- Vapi.ai API key

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-mentor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # Google Cloud (Vertex AI)
   GOOGLE_CLOUD_PROJECT=your_project_id
   GOOGLE_APPLICATION_CREDENTIALS=path_to_service_account.json

   # Vapi.ai
   VAPI_API_KEY=your_vapi_api_key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start with Docker**
   ```bash
   # Build and start the application
   docker-compose up --build

   # Or run in detached mode
   docker-compose up -d --build
   ```

5. **Start without Docker (Alternative)**
   ```bash
   # Development mode
   npm run dev

   # Build for production
   npm run build
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api

### Database Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy the project URL and anon key to your `.env.local`

2. **Database Configuration**
   ```bash
   # The NoSQL database will be configured through Supabase dashboard
   # Collections and indexes will be set up programmatically
   # Check the /lib/supabase folder for database configuration
   ```

### Docker Commands

```bash
# Build the image
docker build -t ai-career-coach .

# Run the container
docker run -p 3000:3000 ai-career-coach

# Using docker-compose
docker-compose up --build

# Stop containers
docker-compose down

# View logs
docker-compose logs -f
```

## 📁 Project Structure

```
ai-mentor/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Shadcn/ui components
│   ├── forms/            # Form components
│   └── features/         # Feature-specific components
├── lib/                  # Utility functions
│   ├── supabase/         # Supabase client and NoSQL config
│   ├── ai/               # AI service integrations
│   └── utils/            # Helper functions
├── types/                # TypeScript type definitions
├── public/               # Static assets
├── docker-compose.yml    # Docker configuration
├── Dockerfile           # Docker image definition
└── package.json         # Dependencies and scripts
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript checks

# Docker
npm run docker:build    # Build Docker image
npm run docker:run      # Run Docker container
npm run docker:stop     # Stop Docker container
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📦 Deployment

### Production Deployment

1. **Build the Docker image**
   ```bash
   docker build -t ai-career-coach:latest .
   ```

2. **Deploy to your preferred platform**
   - Vercel (recommended for Next.js)
   - Railway
   - DigitalOcean App Platform
   - AWS ECS

### Environment Variables for Production

Ensure all environment variables are set in your production environment:
- Supabase credentials
- OpenAI API key
- Google Cloud credentials
- Vapi.ai API key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the `/docs` folder

## 🔄 Post-Hackathon Roadmap

- [ ] Advanced analytics dashboard
- [ ] Integration with job boards
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced AI features (sentiment analysis, personality insights)
- [ ] Real-time collaboration features
- [ ] Course/event API integrations 