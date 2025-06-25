# AI Career Coach - Immigrant Professional Platform

An AI-powered platform that matches immigrant professionals with industry mentors and tailored job opportunities through mock interviews, skill gap analysis, and personalized career coaching.

**🚀 HACKATHON PROJECT - 2 Day Sprint**

## 🎯 Project Overview

This platform helps newcomers overcome barriers to white-collar employment by providing:
- **AI Mock Interviews**: Real-time voice conversations with personalized questions
- **Skill Gap Analysis**: Resume-to-job-description matching with improvement recommendations
- **Resource Hub**: Course and event recommendations based on identified gaps
- **Career Coaching**: Personalized feedback and learning paths

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