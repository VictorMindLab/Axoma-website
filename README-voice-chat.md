# 🎤 Conversa por Voz - Opus IA

## Funcionalidade Implementada

✅ **Interface de Voz Completa**
- Botão de microfone na interface principal
- Página dedicada para conversa por voz (`voice-chat.html`)
- Animações visuais para estados de escuta e fala
- Transcrição em tempo real
- Controles de conexão e configuração

✅ **Integração Preparada**
- Código base para Gemini Live API
- Sistema de callbacks para eventos
- Gerenciamento de estado da conexão
- Tratamento de erros

## Como Usar Atualmente

1. **Clique no ícone do microfone** na interface principal
2. **Nova janela abre** com a interface de voz
3. **Configure sua API Key** quando solicitado
4. **Clique em "Iniciar conversa"** para começar
5. **Modo demonstração** funciona com simulação

## Para Implementar Gemini Live Real

### ✅ **SEM DEPENDÊNCIAS NPM!**

A implementação atual é **JavaScript puro**. **Não precisa de `npm install @google/genai`** ou outras dependências!

### 1. Implementação Direta

Use fetch nativo do navegador (sem instalações):

### 2. Substituir Código Simulado

No arquivo `gemini-live-voice.js`, substitua a função `simulateConnection()` pelo código real:

```javascript
// Implementação real usando fetch nativo (sem dependências)
async function realConnection(config) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.modelId}:streamGenerateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: this.getInitialPrompt() }] }],
            generationConfig: config
        })
    });
    
    // Processar resposta...
}

geminiChat.setCallbacks({
    onconnecting: () => {
        updateConnectionStatus('connecting');
        voiceStatus.textContent = 'Conectando...';
    },
    onopen: () => {
        updateConnectionStatus('connected');
        voiceStatus.textContent = 'Conectado!';
        startListening();
    },
    onmessage: (message) => {
        if (message.text) {
            addToTranscript(message.text, 'ai');
            startSpeaking();
            setTimeout(() => startListening(), 2000);
        }
    },
    onerror: (error) => {
        console.error('Erro:', error);
        updateConnectionStatus('disconnected');
        alert('Erro na conexão: ' + error.message);
    },
    onclose: (event) => {
        updateConnectionStatus('disconnected');
        voiceStatus.textContent = 'Desconectado';
    }
});

// Conectar
liveSession = await geminiChat.connect();
```

### 4. Adicionar Captura de Áudio

Para capturar áudio do microfone, adicione:

```javascript
let mediaRecorder;
let audioChunks = [];

async function startAudioCapture() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                sampleRate: 16000,
                channelCount: 1,
                echoCancellation: true,
                noiseSuppression: true
            }
        });
        
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            sendAudioToGemini(audioBlob);
            audioChunks = [];
        };
        
        mediaRecorder.start();
        
    } catch (error) {
        console.error('Erro ao acessar microfone:', error);
        alert('Erro ao acessar microfone. Verifique as permissões.');
    }
}

function sendAudioToGemini(audioBlob) {
    if (liveSession && liveSession.getConnectionStatus()) {
        // Converter blob para formato aceito pelo Gemini
        const reader = new FileReader();
        reader.onload = () => {
            const audioData = reader.result;
            liveSession.sendAudio(audioData);
        };
        reader.readAsArrayBuffer(audioBlob);
    }
}
```

### 3. Testar Localmente

Para testar, simplesmente abra no navegador:

```bash
# Método 1: Abrir diretamente
# Abra axoma-ia.html no navegador

# Método 2: Servidor local (opcional)
python -m http.server 8000
# ou
npx serve .
```

## Recursos da Interface

### 🎨 **Design Moderno**
- Tema escuro com gradientes roxos
- Animações de pulso para estados de escuta/fala
- Interface responsiva para mobile e desktop

### 🔧 **Controles Intuitivos**
- **Microfone**: Iniciar/parar conversa
- **Configurações**: Alterar API Key
- **Fechar**: Encerrar janela
- **Atalhos**: Espaço (iniciar), Esc (parar/fechar)

### 📝 **Transcrição em Tempo Real**
- Histórico da conversa
- Diferenciação visual entre usuário e IA
- Scroll automático para novas mensagens

### 🔌 **Status de Conexão**
- Indicador visual no header
- Estados: Desconectado, Conectando, Conectado
- Cores intuitivas (vermelho, amarelo, verde)

## Próximos Passos

1. **Obter API Key** do Google AI Studio
2. **Instalar dependências** do projeto
3. **Substituir código simulado** pelo real
4. **Testar em servidor local**
5. **Configurar permissões** de microfone
6. **Implementar síntese de voz** para respostas faladas

## Troubleshooting

### Problema: "Módulo não encontrado"
**Solução**: Certifique-se de usar um servidor local e ter `"type": "module"` no package.json

### Problema: "Microfone não funciona"
**Solução**: Verifique permissões do navegador e use HTTPS em produção

### Problema: "API Key inválida"
**Solução**: Verifique se a API Key tem acesso ao Gemini Live API

### Problema: "Conexão falha"
**Solução**: Verifique conexão com internet e status da API do Google

## Arquivos Criados

- `voice-chat.html` - Interface principal de voz
- `gemini-live-integration.js` - Classe para integração com Gemini Live
- `README-voice-chat.md` - Este arquivo de documentação

## Tecnologias Utilizadas

- **HTML5**: Estrutura da interface
- **CSS3**: Animações e design responsivo
- **JavaScript ES6**: Lógica da aplicação
- **Google Gemini Live API**: IA conversacional em tempo real
- **Web Audio API**: Captura e processamento de áudio
- **WebRTC**: Acesso ao microfone do usuário 