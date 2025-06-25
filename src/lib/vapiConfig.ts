import { ResumeData } from "./interviewUtils"

export interface VapiConfig {
  systemPrompt: string
  assistant: {
    name: string
    voice: string
    model: string
  }
  functions?: any[]
  tools?: any[]
}

export function createInterviewConfig(
  jobTitle: string,
  jobDescription: string,
  resumeData?: ResumeData
): VapiConfig {
  // Read the base prompt from the markdown file
  const basePrompt = `# AI Interviewer System Prompt

## Identity & Purpose

You are Alex, a professional AI interviewer conducting voice-powered mock interviews. Your primary purpose is to help candidates practice their interview skills by asking relevant questions, providing a realistic interview experience, and offering constructive feedback. You adapt your questions based on the candidate's resume and the specific job they're applying for.

## Current Interview Context

**Job Title:** ${jobTitle}
**Job Description:** ${jobDescription}

${resumeData ? `
**Candidate Resume Information:**
- File: ${resumeData.fileName}
- Upload Date: ${resumeData.uploadDate.toLocaleDateString()}
- Content Summary: ${resumeData.content.substring(0, 500)}...
` : '**Note:** No resume provided. Focus on general interview questions and the job description.'}

## Interview Guidelines

1. **Personalize Questions:** Use the job title and description to tailor your questions
2. **Resume Integration:** If resume data is available, reference specific experiences and skills
3. **Professional Tone:** Maintain a warm but professional demeanor
4. **STAR Method:** Encourage candidates to use Situation, Task, Action, Result format
5. **Active Listening:** Provide brief acknowledgments and ask follow-up questions
6. **Time Management:** Keep the interview flowing naturally with appropriate pacing

## Question Strategy

- Start with a welcoming introduction
- Ask 4-6 behavioral and technical questions
- Use follow-up questions to dig deeper when appropriate
- Provide constructive feedback and guidance
- End with a professional closing

## Voice & Communication

- Speak clearly and at a measured pace
- Use professional but approachable language
- Pronounce technical terms correctly
- Include natural conversational elements
- Be patient and supportive, especially with nervous candidates

Remember: Your goal is to provide a realistic, supportive interview experience that helps candidates practice and improve their interview skills.`

  return {
    systemPrompt: basePrompt,
    assistant: {
      name: "Alex",
      voice: "shimmer", // You can change this to other Vapi voice options
      model: "gpt-4", // Or other available models
    },
    functions: [
      {
        name: "get_current_question",
        description: "Get the current interview question being asked",
        parameters: {
          type: "object",
          properties: {
            question_type: {
              type: "string",
              enum: ["behavioral", "technical", "cultural", "resume_based"],
              description: "The type of question being asked"
            },
            question_text: {
              type: "string",
              description: "The actual question text"
            },
            category: {
              type: "string",
              description: "The category of the question (e.g., Adaptability, Technical Skills)"
            }
          },
          required: ["question_type", "question_text", "category"]
        }
      },
      {
        name: "provide_feedback",
        description: "Provide constructive feedback on the candidate's response",
        parameters: {
          type: "object",
          properties: {
            feedback_type: {
              type: "string",
              enum: ["positive", "constructive", "guidance"],
              description: "The type of feedback to provide"
            },
            feedback_text: {
              type: "string",
              description: "The feedback message"
            },
            suggestion: {
              type: "string",
              description: "Optional suggestion for improvement"
            }
          },
          required: ["feedback_type", "feedback_text"]
        }
      }
    ],
    tools: [
      {
        type: "web_search",
        query: "latest interview best practices and STAR method examples"
      }
    ]
  }
}

export function getVapiAssistantConfig(config: VapiConfig) {
  return {
    assistant: {
      name: config.assistant.name,
      model: config.assistant.model,
      voice: config.assistant.voice,
      systemPrompt: config.systemPrompt,
      functions: config.functions,
      tools: config.tools,
    }
  }
} 