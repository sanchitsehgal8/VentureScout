import { GoogleGenAI, Type, Schema } from "@google/genai";
import { VentureReport } from "../types";

// Define the schema for the model to ensure strict JSON output
const reportSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    ideaSummary: { type: Type.STRING, description: "A concise professional summary of the startup idea." },
    marketAnalysis: {
      type: Type.OBJECT,
      properties: {
        tam: { type: Type.NUMBER, description: "Total Addressable Market in Billions (estimate if needed)" },
        sam: { type: Type.NUMBER, description: "Serviceable Available Market in Billions" },
        som: { type: Type.NUMBER, description: "Serviceable Obtainable Market in Billions" },
        currency: { type: Type.STRING, description: "Currency symbol, e.g. $" },
        growthRate: { type: Type.STRING, description: "Market CAGR or growth rate text" },
        insight: { type: Type.STRING, description: "Key insight about the market size and trajectory." }
      },
      required: ["tam", "sam", "som", "growthRate", "insight", "currency"]
    },
    competitors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          strength: { type: Type.STRING },
          weakness: { type: Type.STRING }
        },
        required: ["name", "description", "strength", "weakness"]
      }
    },
    gaps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3-5 identified market gaps or opportunities."
    },
    gtmStrategy: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phase: { type: Type.STRING, description: "e.g., Launch, Growth, Scale" },
          action: { type: Type.STRING },
          channel: { type: Type.STRING }
        },
        required: ["phase", "action", "channel"]
      }
    },
    pricing: {
      type: Type.OBJECT,
      properties: {
        model: { type: Type.STRING, description: "e.g., Freemium, Enterprise SaaS" },
        recommendation: { type: Type.STRING, description: "Strategic reasoning for this pricing model." },
        tiers: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              price: { type: Type.STRING },
              features: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["name", "price", "features"]
          }
        }
      },
      required: ["model", "recommendation", "tiers"]
    },
    icp: {
      type: Type.OBJECT,
      properties: {
        role: { type: Type.STRING },
        industry: { type: Type.STRING },
        companySize: { type: Type.STRING },
        painPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["role", "industry", "companySize", "painPoints"]
    }
  },
  required: ["ideaSummary", "marketAnalysis", "competitors", "gaps", "gtmStrategy", "pricing", "icp"]
};

export const analyzeStartupIdea = async (idea: string): Promise<VentureReport> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please checks your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as a senior Venture Capitalist and Elite Market Researcher.
    Conduct a deep-dive analysis on the following startup idea:
    "${idea}"

    Use Google Search to find REAL data regarding market size (TAM/SAM/SOM), existing competitors, and current trends.
    Do not make up numbers; use the most recent available data from credible sources found via search. If exact numbers are not found, provide educated estimates based on similar markets.
    
    Identify critical gaps in the market that this idea could fill.
    Propose a concrete Go-To-Market (GTM) strategy.
    Define the Ideal Customer Profile (ICP) and suggest a pricing strategy.

    Output the result purely as a JSON object adhering to the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: reportSchema,
        thinkingConfig: { thinkingBudget: 4096 } // Give it some budget to reason about the search results
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from the model.");
    }

    const jsonReport = JSON.parse(text) as VentureReport;
    return jsonReport;

  } catch (error) {
    console.error("Error analyzing startup:", error);
    throw error;
  }
};