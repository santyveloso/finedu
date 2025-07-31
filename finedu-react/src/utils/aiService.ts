export interface AIResponse {
  message: string;
  suggestions?: string[];
  calculations?: {
    grossSalary?: number;
    netSalary?: number;
    taxAmount?: number;
    socialSecurity?: number;
  };
}

export interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

// Configuration for Google AI Studio
const GEMINI_CONFIG = {
  apiKey: process.env.REACT_APP_GEMINI_API_KEY || '',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
  model: 'gemini-1.5-flash',
};

// Portuguese financial context for better AI responses
const FINANCIAL_CONTEXT = `
You are a Portuguese financial advisor assistant. You help young workers understand Portuguese taxes, salaries, and financial regulations.

Key information to always include:
- Portuguese tax rates and calculations
- IRS deadlines and procedures
- Social Security contributions
- Contract types (efetivo, recibos verdes, IEFP)
- Worker rights and benefits
- Important deadlines and dates

Always respond in Portuguese and provide practical, actionable advice.
`;

export class AIService {
  private static instance: AIService;
  private isOnline: boolean = false;

  private constructor() {
    // Check if API key is available
    this.isOnline = !!GEMINI_CONFIG.apiKey;
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  public async generateResponse(question: string): Promise<AIResponse> {
    if (this.isOnline && GEMINI_CONFIG.apiKey) {
      return this.callGeminiAPI(question);
    } else {
      // Fallback to local responses
      return this.getLocalResponse(question);
    }
  }

  private async callGeminiAPI(question: string): Promise<AIResponse> {
    try {
      const requestBody: GeminiRequest = {
        contents: [
          {
            parts: [
              {
                text: `${FINANCIAL_CONTEXT}\n\nUser question: ${question}\n\nPlease provide a helpful response in Portuguese with practical financial advice.`
              }
            ]
          }
        ]
      };

      const response = await fetch(
        `${GEMINI_CONFIG.baseUrl}/${GEMINI_CONFIG.model}:generateContent?key=${GEMINI_CONFIG.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      const aiMessage = data.candidates[0].content.parts[0].text;

      // Parse the response and extract suggestions
      const suggestions = this.extractSuggestions(aiMessage);
      
      return {
        message: aiMessage,
        suggestions,
        calculations: this.extractCalculations(question, aiMessage)
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      // Fallback to local response
      return this.getLocalResponse(question);
    }
  }

  private getLocalResponse(question: string): AIResponse {
    // Import the local response generator
    const { generateAIResponse } = require('./aiResponses');
    return generateAIResponse(question);
  }

  private extractSuggestions(message: string): string[] {
    // Extract follow-up questions from the AI response
    const suggestions = [
      "Como calcular salário líquido?",
      "Quais os prazos do IRS?",
      "Como funcionam os recibos verdes?",
      "Quais os direitos do trabalhador?"
    ];
    
    return suggestions.slice(0, 3);
  }

  private extractCalculations(question: string, response: string): any {
    // Extract salary calculations if present
    const salaryMatch = question.match(/(\d+)[€\s]*/);
    if (salaryMatch) {
      const grossSalary = parseInt(salaryMatch[1]);
      // Use the same calculation logic as local responses
      const { calculatePortugueseSalary } = require('./aiResponses');
      return calculatePortugueseSalary(grossSalary);
    }
    return null;
  }

  public setAPIKey(apiKey: string): void {
    GEMINI_CONFIG.apiKey = apiKey;
    this.isOnline = !!apiKey;
  }

  public isAPIAvailable(): boolean {
    return this.isOnline;
  }
}

// Export singleton instance
export const aiService = AIService.getInstance(); 