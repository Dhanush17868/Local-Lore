import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent crash on startup if API key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set. Please add it in your Settings > Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Trip Planner API route
app.post("/api/plan-trip", async (req, res) => {
  try {
    const { duration = 3, interests = ["history", "nature"], groupStyle = "solo", pace = "relaxed" } = req.body;
    
    const ai = getAiClient();
    
    const prompt = `Design a premium, deeply personalized, narrative-driven heritage and cultural travel journal for Udupi, Karnataka, India.
Parameters:
- Duration: ${duration} Days
- Interests: ${interests.join(", ")}
- Group Style: ${groupStyle}
- Travel Pace: ${pace}

Guidelines:
- Act as a highly intellectual, poetic, and passionate local Udupi cultural historian, writer, and travel curator.
- Avoid typical commercial travel agency jargon, and clichés (no "must-visit", "perfect spots", "ultimate lists"). Use soulful, sensory, and highly descriptive prose.
- Connect locations with their cultural lore, myths, architectural stories, and human connections. Explain why a place matters, who preserved its history, what sounds belong there, or what culinary secrets are cooked there.
- Focus on authentic Udupi elements (temples like Sri Krishna Matha, Anantheshwara, Pajaka Kshetra, Barkur ruins; coastal spots like Malpe, Kapu, St. Mary's Island; living arts like Yakshagana, Daivaradhane/Bhoota Kola; and culinary legends like authentic wood-fired matha kitchens, Goli Baje, Masala Dosa, Patrode, patholi).
- Structure the itinerary days beautifully, evoking a sensory feeling for each day.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the head heritage curator for LocalLore, a premium digital museum and interactive documentary platform of Udupi. Your voice is literary, serene, and deeply evocative.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tripTitle: { 
              type: Type.STRING, 
              description: "A highly evocative, cinematic, and poetic title for the overall itinerary (e.g., 'Sands of kapu and Sacred Temples' or 'The Echo of Bronze Bells and Salt Air')" 
            },
            themeDescription: { 
              type: Type.STRING, 
              description: "A literary, narrative overview of what this journey feels like, setting a calm, documentary-style mood." 
            },
            dayItineraries: {
              type: Type.ARRAY,
              description: "A chronological list of days, strictly structured according to the requested duration.",
              items: {
                type: Type.OBJECT,
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  title: { 
                    type: Type.STRING, 
                    description: "An evocative title for this specific day's story (e.g. 'The Dawn Horn and Golden Shells')" 
                  },
                  narrative: { 
                    type: Type.STRING, 
                    description: "A rich, sensory, and narrative paragraph describing the atmosphere, sounds, sights, and visual flow of the day." 
                  },
                  places: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING, description: "Specific Udupi site or experience" },
                        culturalLore: { 
                          type: Type.STRING, 
                          description: "A brief but fascinating architectural story, myth, or folklore legend associated with this site." 
                        },
                        localTip: { 
                          type: Type.STRING, 
                          description: "A deeply insightful local tip centered on sensory details or optimal times (e.g. 'Sit near the south gopuram to hear the flute performance' or 'Order hot Rasam Vada exactly when the afternoon sea breeze sets in')" 
                        }
                      },
                      required: ["name", "culturalLore", "localTip"]
                    }
                  }
                },
                required: ["dayNumber", "title", "narrative", "places"]
              }
            },
            culinaryRecommendations: {
              type: Type.ARRAY,
              description: "Curated Udupi culinary highlights aligned with the trip.",
              items: {
                type: Type.OBJECT,
                properties: {
                  dishName: { type: Type.STRING },
                  description: { type: Type.STRING, description: "Poetic description of the dish's texture, taste, and warmth." },
                  culturalContext: { type: Type.STRING, description: "The heritage background of the dish (e.g., Temple kitchen origin, monsoon traditions)." },
                  whereToTry: { type: Type.STRING, description: "Specific local place to try it (e.g. Mitra Samaj, local family kitchen, or Malpe shacks)." }
                },
                required: ["dishName", "description", "culturalContext", "whereToTry"]
              }
            },
            soundscapeRecommendation: { 
              type: Type.STRING, 
              description: "A beautiful editorial advice about what sounds to notice during this specific trip (e.g. 'The rhythmic clattering of wooden paddles in the backwaters blended with the rustle of coconut fronds')." 
            }
          },
          required: ["tripTitle", "themeDescription", "dayItineraries", "culinaryRecommendations", "soundscapeRecommendation"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Failed to generate content from Gemini API.");
    }
    
    const parsedData = JSON.parse(resultText);
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Trip Planner Error:", error);
    res.status(500).json({ 
      error: "Failed to curate itinerary.", 
      details: error.message || "An unexpected error occurred." 
    });
  }
});

// Concierge Assistant Chat API route
app.post("/api/concierge-chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    const ai = getAiClient();
    
    const contents = history.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: `You are Anantha, a trusted, warm, and deeply knowledgeable local companion and concierge in Udupi. You help travelers navigate the culture, etiquette, transit, food, and daily realities of Udupi. 
Guidelines:
- When asked about transportation: Explain that local private buses (like Sudarshan, Hanuman, etc.) are incredibly fast, frequent, and run everywhere from Service Bus Stand. Autos are handy; mention "meter-haaki" (put on the meter) or tell them standard fares (Rs. 30 minimum). St. Mary's ferry runs from Malpe Beach/Malpe Fishing Harbor between 9:00 AM and 5:00 PM.
- When asked about temple dress codes: Men must remove their shirts and vests before entering the inner sanctum (Chowki) of Sri Krishna Matha or Anantheshwara. Women should dress modestly (saree, salwar, or long skirts).
- Suggest regional culinary spots: Mitra Samaj on Car Street for Goli Baje and Masala Dosa; wood-fired afternoon temple lunch (Prasada) served on banana leaves at Krishna Matha (12:00 PM - 2:30 PM); Kedige or local coastal joints for Patrode.
- Keep responses friendly, poetic, yet highly practical. Provide 2-3 short, helpful sentences. Avoid sounding like an AI; speak like a proud, welcoming local friend who cares about responsible tourism.`,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Concierge Chat Error:", error);
    res.status(500).json({ 
      error: "Failed to chat with local companion.", 
      details: error.message || "An unexpected error occurred." 
    });
  }
});

// Vite & Static file handling
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[LocalLore Backend] Server operating on port ${PORT}`);
  });
}

setupServer();
