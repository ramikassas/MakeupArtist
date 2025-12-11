import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { base64ToUint8Array, createPcmBlob, decodeAudioData } from "./audioUtils";

// Initialize AI Client
// Note: In a real app, ensure API_KEY is set in environment
const getAIClient = () => {
    // For Veo/Pro features we might need to recreate this if key changes
    return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

// --- Fast Response (Flash Lite) ---
export const getFastMakeupAdvice = async (query: string): Promise<string> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: query,
      config: {
        systemInstruction: "You are a concise, friendly beauty assistant for MakeupArtist.ai. Keep answers short, practical, and encouraging."
      }
    });
    return response.text || "I couldn't generate a tip right now.";
  } catch (error) {
    console.error("Fast advice error:", error);
    throw error;
  }
};

// --- Deep Analysis (Thinking Model) ---
export const analyzeComplexQuery = async (query: string, type: string): Promise<string> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform a deep analysis regarding ${type}. Query: ${query}`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        systemInstruction: "You are a senior dermatologist and cosmetic chemist. Provide in-depth, scientific, yet accessible analysis of skin concerns or ingredients."
      }
    });
    return response.text || "Analysis complete, but no text returned.";
  } catch (error) {
    console.error("Deep analysis error:", error);
    throw error;
  }
};

// --- Video Generation (Veo) ---
export const generateMakeupVideo = async (prompt: string, aspectRatio: '16:9' | '9:16' = '9:16'): Promise<string | null> => {
  // Check for Paid Key Selection for Veo
  if (window.aistudio && window.aistudio.hasSelectedApiKey) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
         await window.aistudio.openSelectKey();
         // Just return null to signal UI to wait or retry, user needs to select key
         return null;
      }
  }

  // Create new client to ensure selected key is used
  const ai = getAIClient();

  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic makeup tutorial style: ${prompt}`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (uri) {
      // Append key for download
      return `${uri}&key=${process.env.API_KEY}`;
    }
    return null;
  } catch (error) {
    console.error("Video generation error:", error);
    throw error;
  }
};

// --- TTS ---
export const speakText = async (text: string): Promise<AudioBuffer | null> => {
    const ai = getAIClient();
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' }, // Soft, feminine voice
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
            const ctx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
            return await decodeAudioData(base64ToUint8Array(base64Audio), ctx, 24000, 1);
        }
        return null;
    } catch (e) {
        console.error("TTS Error", e);
        return null;
    }
}

// --- Live API (Real-time Consultant) ---
export class LiveConsultant {
    private ai: GoogleGenAI;
    private inputAudioContext: AudioContext | null = null;
    private outputAudioContext: AudioContext | null = null;
    private stream: MediaStream | null = null;
    private nextStartTime = 0;
    private sessionPromise: Promise<any> | null = null;
    private processor: ScriptProcessorNode | null = null;
    private source: MediaStreamAudioSourceNode | null = null;

    constructor() {
        this.ai = getAIClient();
    }

    async connect(onMessage: (text: string) => void) {
        this.inputAudioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
        this.outputAudioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
        
        // Setup Mic
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        this.sessionPromise = this.ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            callbacks: {
                onopen: () => {
                    console.log("Live session connected");
                    this.startAudioStreaming();
                },
                onmessage: async (message: LiveServerMessage) => {
                   // Handle Transcription for UI
                   if (message.serverContent?.modelTurn?.parts?.[0]?.text) {
                       onMessage(message.serverContent.modelTurn.parts[0].text);
                   }

                   // Handle Audio Output
                    const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                    if (base64Audio && this.outputAudioContext) {
                        this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);
                        
                        const audioBuffer = await decodeAudioData(
                            base64ToUint8Array(base64Audio), 
                            this.outputAudioContext, 
                            24000, 
                            1
                        );
                        
                        const source = this.outputAudioContext.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(this.outputAudioContext.destination);
                        source.start(this.nextStartTime);
                        this.nextStartTime += audioBuffer.duration;
                    }
                },
                onclose: () => console.log("Live session closed"),
                onerror: (e) => console.error("Live session error", e)
            },
            config: {
                responseModalities: [Modality.AUDIO], // Audio + Transcription via server message if needed, but strict modality is AUDIO
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
                },
                systemInstruction: "You are a professional makeup artist doing a live consultation. Be warm, encouraging, and give step-by-step beauty advice."
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
            
            this.sessionPromise?.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
            });
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
        // No explicit session.close() in SDK, usually closing connection drops it.
        // Assuming session object might have close in future updates, currently rely on cleanup.
    }
}