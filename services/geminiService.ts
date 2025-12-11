import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { base64ToUint8Array, createPcmBlob, decodeAudioData } from "./audioUtils";
import { SkinAnalysisResult, AnalysisType } from "../types";

const getAIClient = () => {
    return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

// --- Skin Analysis Engines ---

export const analyzeSkinBasic = async (userDescription: string): Promise<SkinAnalysisResult> => {
    const ai = getAIClient();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite-latest', // Fast model for free tier
            contents: `Analyze this skin description: "${userDescription}". 
            Return ONLY a JSON object with: 
            - skinType (string)
            - top3Tips (array of strings, keep them short)
            Do not include markdown code blocks.`,
            config: { responseMimeType: "application/json" }
        });
        
        const data = JSON.parse(response.text || '{}');
        return {
            type: 'BASIC',
            skinType: data.skinType,
            tips: data.top3Tips
        };
    } catch (e) {
        console.error(e);
        throw new Error("Basic analysis failed");
    }
};

export const analyzeSkinUltra = async (userDescription: string): Promise<SkinAnalysisResult> => {
    const ai = getAIClient();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview', // Thinking model for Pro
            contents: `Perform a CLINICAL GRADE skin analysis based on this input: "${userDescription}".
            Act as a senior dermatologist.
            Analyze 14 parameters including texture, pores, redness, hydration, elasticity.
            Provide a detailed AM/PM routine.
            Identify specific ingredients to avoid.
            
            Return JSON matching this structure:
            {
                "clinicalAnalysis": {
                    "texture": "detailed assessment",
                    "pores": "detailed assessment",
                    "redness": "detailed assessment",
                    "hydration": "detailed assessment",
                    "elasticity": "detailed assessment",
                    "sensitivity": "assessment",
                    "pigmentation": "assessment",
                    "agingSigns": "assessment"
                },
                "routine": {
                    "am": ["step 1", "step 2", "step 3"],
                    "pm": ["step 1", "step 2", "step 3"]
                },
                "ingredientsToAvoid": ["ingredient 1", "ingredient 2"]
            }`,
            config: { 
                thinkingConfig: { thinkingBudget: 32768 },
                responseMimeType: "application/json" 
            }
        });

        const data = JSON.parse(response.text || '{}');
        return {
            type: 'ULTRA',
            ...data
        };
    } catch (e) {
        console.error(e);
        throw new Error("Ultra analysis failed");
    }
};

export const analyzeComplexQuery = async (query: string, type: AnalysisType): Promise<string> => {
    const ai = getAIClient();
    try {
        const context = type === AnalysisType.SKINCARE ? "clinical dermatology" : "cosmetic chemistry";
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: `As an expert in ${context}, provide a detailed scientific analysis of: "${query}".
            
            Include:
            - Mechanism of action
            - Clinical efficacy/concerns
            - Safety profile
            - Expert recommendations
            
            Format clearly with Markdown.`,
            config: {
                thinkingConfig: { thinkingBudget: 16384 }
            }
        });
        return response.text || "Analysis unavailable.";
    } catch (e) {
        console.error(e);
        throw new Error("Complex analysis failed");
    }
};

// --- Business Tools ---

export const generateInstagramCaption = async (lookDescription: string): Promise<string> => {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Write a high-converting Instagram caption for a makeup artist posting this look: "${lookDescription}".
        Include:
        - A catchy hook
        - Professional description of the technique
        - Call to action (Book Now)
        - 15 relevant hashtags
        Tone: Luxurious, Professional, Trendy.`,
    });
    return response.text || "";
}

export const calculatePricing = async (details: string): Promise<string> => {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Act as a business consultant for makeup artists. Calculate a recommended price range and justification based on: ${details}.
        Consider market rates for professional artistry.`,
    });
    return response.text || "";
}


// --- Previous Services (Veo, Live, TTS, Quick Chat) ---

export const getFastMakeupAdvice = async (query: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite-latest',
    contents: query,
    config: { systemInstruction: "Concise, friendly beauty assistant." }
  });
  return response.text || "No advice generated.";
};

export const generateMakeupVideo = async (prompt: string, aspectRatio: '16:9' | '9:16' = '9:16'): Promise<string | null> => {
  if (window.aistudio && window.aistudio.hasSelectedApiKey) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) { await window.aistudio.openSelectKey(); return null; }
  }
  const ai = getAIClient();
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic professional makeup tutorial: ${prompt}`,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: aspectRatio }
    });
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
    return uri ? `${uri}&key=${process.env.API_KEY}` : null;
  } catch (error) { return null; }
};

export const speakText = async (text: string): Promise<AudioBuffer | null> => {
    const ai = getAIClient();
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
            const ctx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
            return await decodeAudioData(base64ToUint8Array(base64Audio), ctx, 24000, 1);
        }
        return null;
    } catch (e) { return null; }
}

export class LiveConsultant {
    private ai: GoogleGenAI;
    private inputAudioContext: AudioContext | null = null;
    private outputAudioContext: AudioContext | null = null;
    private stream: MediaStream | null = null;
    private nextStartTime = 0;
    private sessionPromise: Promise<any> | null = null;
    private processor: ScriptProcessorNode | null = null;
    private source: MediaStreamAudioSourceNode | null = null;

    constructor() { this.ai = getAIClient(); }

    async connect(onMessage: (text: string) => void) {
        this.inputAudioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
        this.outputAudioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        this.sessionPromise = this.ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            callbacks: {
                onopen: () => this.startAudioStreaming(),
                onmessage: async (message: LiveServerMessage) => {
                   if (message.serverContent?.modelTurn?.parts?.[0]?.text) onMessage(message.serverContent.modelTurn.parts[0].text);
                    const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                    if (base64Audio && this.outputAudioContext) {
                        this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);
                        const audioBuffer = await decodeAudioData(base64ToUint8Array(base64Audio), this.outputAudioContext, 24000, 1);
                        const source = this.outputAudioContext.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(this.outputAudioContext.destination);
                        source.start(this.nextStartTime);
                        this.nextStartTime += audioBuffer.duration;
                    }
                },
                onclose: () => {}, onerror: (e) => {}
            },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
                systemInstruction: "You are a top-tier celebrity makeup artist in a live consultation."
            }
        });
    }

    private startAudioStreaming() {
        if (!this.inputAudioContext || !this.stream) return;
        this.source = this.inputAudioContext.createMediaStreamSource(this.stream);
        this.processor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);
        this.processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcmBlob = createPcmBlob(inputData);
            this.sessionPromise?.then(session => session.sendRealtimeInput({ media: pcmBlob }));
        };
        this.source.connect(this.processor);
        this.processor.connect(this.inputAudioContext.destination);
    }
    disconnect() {
        this.stream?.getTracks().forEach(track => track.stop());
        this.processor?.disconnect();
        this.source?.disconnect();
        this.inputAudioContext?.close();
        this.outputAudioContext?.close();
    }
}