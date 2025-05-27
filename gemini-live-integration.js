// Gemini Live Integration
// Para usar este código, você precisa instalar o SDK do Google GenAI:
// npm install @google/genai

import { GoogleGenAI, Modality } from '@google/genai';

class GeminiLiveChat {
    constructor(apiKey) {
        this.ai = new GoogleGenAI({ apiKey });
        this.model = 'gemini-2.0-flash-live-001';
        this.config = { 
            responseModalities: [Modality.TEXT, Modality.AUDIO] 
        };
        this.session = null;
        this.isConnected = false;
        this.callbacks = {};
    }

    // Configurar callbacks para eventos
    setCallbacks(callbacks) {
        this.callbacks = {
            onopen: callbacks.onopen || (() => {}),
            onmessage: callbacks.onmessage || (() => {}),
            onerror: callbacks.onerror || (() => {}),
            onclose: callbacks.onclose || (() => {}),
            onconnecting: callbacks.onconnecting || (() => {}),
            onlistening: callbacks.onlistening || (() => {}),
            onspeaking: callbacks.onspeaking || (() => {})
        };
    }

    // Conectar à sessão live
    async connect() {
        try {
            this.callbacks.onconnecting();
            
            this.session = await this.ai.live.connect({
                model: this.model,
                callbacks: {
                    onopen: () => {
                        console.debug('Gemini Live: Conexão aberta');
                        this.isConnected = true;
                        this.callbacks.onopen();
                        
                        // Enviar mensagem inicial de contexto
                        this.sendSystemMessage();
                    },
                    onmessage: (message) => {
                        console.debug('Gemini Live: Mensagem recebida', message);
                        this.callbacks.onmessage(message);
                        
                        // Se a IA está falando, notificar
                        if (message.type === 'audio' || message.speaking) {
                            this.callbacks.onspeaking();
                        } else {
                            this.callbacks.onlistening();
                        }
                    },
                    onerror: (error) => {
                        console.error('Gemini Live: Erro', error);
                        this.callbacks.onerror(error);
                    },
                    onclose: (event) => {
                        console.debug('Gemini Live: Conexão fechada', event.reason);
                        this.isConnected = false;
                        this.callbacks.onclose(event);
                    }
                },
                config: this.config
            });

            return this.session;
        } catch (error) {
            console.error('Erro ao conectar com Gemini Live:', error);
            this.callbacks.onerror(error);
            throw error;
        }
    }

    // Enviar mensagem de contexto inicial
    sendSystemMessage() {
        const systemPrompt = `Você é Opus, personal trainer virtual especialista da Axoma. 

🎯 CONTEXTO: Conversa por voz em tempo real
📋 DIRETRIZES:
• Responda APENAS sobre fitness, treino, nutrição, bem-estar
• Português brasileiro, tom amigável e conversacional
• Respostas curtas e diretas (máximo 3 frases)
• Use linguagem natural para conversa por voz
• Se não for sobre fitness: "Sou especialista em fitness, como posso te ajudar?"

💪 ESPECIALIDADES:
• Treinos personalizados
• Nutrição esportiva
• Emagrecimento saudável
• Hipertrofia muscular
• Condicionamento físico
• Motivação e bem-estar

Seja natural, motivador e sempre focado em fitness!`;

        if (this.session && this.isConnected) {
            this.session.sendClientContent({
                turns: systemPrompt
            });
        }
    }

    // Enviar mensagem do usuário
    sendMessage(message) {
        if (this.session && this.isConnected) {
            this.session.sendClientContent({
                turns: message
            });
            console.debug('Mensagem enviada:', message);
        } else {
            console.warn('Sessão não conectada. Não é possível enviar mensagem.');
        }
    }

    // Enviar áudio do usuário
    sendAudio(audioData) {
        if (this.session && this.isConnected) {
            this.session.sendClientContent({
                audio: audioData
            });
            console.debug('Áudio enviado');
        } else {
            console.warn('Sessão não conectada. Não é possível enviar áudio.');
        }
    }

    // Fechar conexão
    close() {
        if (this.session) {
            this.session.close();
            this.session = null;
            this.isConnected = false;
            console.debug('Sessão Gemini Live fechada');
        }
    }

    // Verificar se está conectado
    getConnectionStatus() {
        return this.isConnected;
    }
}

// Exemplo de uso:
/*
const geminiChat = new GeminiLiveChat('SUA_API_KEY_AQUI');

geminiChat.setCallbacks({
    onconnecting: () => {
        console.log('Conectando...');
        updateConnectionStatus('connecting');
    },
    onopen: () => {
        console.log('Conectado!');
        updateConnectionStatus('connected');
        startListening();
    },
    onmessage: (message) => {
        if (message.text) {
            addToTranscript(message.text, 'ai');
        }
        if (message.audio) {
            playAudioResponse(message.audio);
        }
    },
    onerror: (error) => {
        console.error('Erro:', error);
        updateConnectionStatus('disconnected');
    },
    onclose: (event) => {
        console.log('Desconectado:', event.reason);
        updateConnectionStatus('disconnected');
    },
    onlistening: () => {
        startListening();
    },
    onspeaking: () => {
        startSpeaking();
    }
});

// Conectar
await geminiChat.connect();

// Enviar mensagem
geminiChat.sendMessage('Olá, preciso de ajuda com treino');

// Fechar quando terminar
geminiChat.close();
*/

export default GeminiLiveChat; 