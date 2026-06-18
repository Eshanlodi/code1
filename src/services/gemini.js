import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.REACT_APP_GEMINI_API_KEY; 

const ai = new GoogleGenAI({ apiKey });

export const generateStudyPlan = async (exams, hoursPerDay) => {
  const prompt = `
    You are an expert academic advisor. Generate a highly structured study plan based on the following exams:
    ${JSON.stringify(exams)}
    The student has ${hoursPerDay} hours available to study per day.
    
    Prioritize:
    1. Earlier exams.
    2. Harder subjects.
    3. Dedicated revision time before each exam.

    Return ONLY a valid JSON object matching this exact structure, with no markdown formatting, no backticks, and no extra text:
    {
      "schedule": [
        { "date": "YYYY-MM-DD", "subject": "Subject Name", "hours": 3, "task": "Specific topic or revision task" }
      ],
      "priorities": [
        { "subject": "Subject Name", "level": "High/Medium/Low", "reason": "Short reason why" }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const cleanText = response.text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate plan. Please check your API key or inputs.");
  }
};