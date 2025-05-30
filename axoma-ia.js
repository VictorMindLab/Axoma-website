// Axoma IA JavaScript - Versão com OpenRouter API
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the interface
    initializeInterface();
});

// Variáveis globais para controle do chat
let currentAgentType = 'default';
let conversationHistory = [];
let isProcessing = false;

// Initialize interface
function initializeInterface() {
    console.log('Axoma IA Interface Loaded');
    
    // Add event listeners for sidebar items
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Add hover effects to agent cards
    const agentCards = document.querySelectorAll('.agent-card');
    agentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });

    // Verificar se a API está configurada
    checkAPIConfiguration();
}

// Verificar configuração da API
function checkAPIConfiguration() {
    if (window.openRouterAPI && !window.openRouterAPI.isConfigured()) {
        console.warn('API do OpenRouter não configurada. Usando respostas simuladas.');
        showConfigurationWarning();
    }
}

// Mostrar aviso de configuração
function showConfigurationWarning() {
    const warning = document.createElement('div');
    warning.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        z-index: 10001;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    warning.innerHTML = `
        <strong>⚠️ API não configurada</strong><br>
        Configure sua API Key do OpenRouter em openrouter-config.js
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: white;
            float: right;
            cursor: pointer;
            font-size: 16px;
            margin-left: 10px;
        ">&times;</button>
    `;
    document.body.appendChild(warning);
    
    // Auto remove after 10 seconds
    setTimeout(() => {
        if (warning.parentElement) {
            warning.remove();
        }
    }, 10000);
}

// Handle send button
function handleSend() {
    const input = document.getElementById('main-input');
    const message = input.value.trim();
    
    if (message) {
        console.log('Enviando:', message);
        input.value = '';
        openChatInterface(null, message);
    }
}

// Handle agent selection
function selectAgent(agentType) {
    console.log('Agente selecionado:', agentType);
    currentAgentType = agentType;
    conversationHistory = []; // Reset conversation when switching agents
    
    const agentMessages = {
        'training': 'Olá! Sou o Training Agent da Axoma. Como posso ajudar com seus treinos hoje? Posso analisar sua rotina atual, sugerir novos exercícios ou ajudar com progressão de cargas.',
        'privacy': 'Olá! Sou o Privacy Agent da Axoma. Estou aqui para garantir que seus dados estejam seguros. Como posso ajudar com questões de privacidade e segurança?',
        'tools': 'Olá! Sou o Tools Agent da Axoma. Que ferramenta da plataforma você gostaria de usar ou precisa de ajuda para navegar?',
        'knowledge': 'Olá! Sou o Knowledge Agent da Axoma. Tenho conhecimento vasto sobre fitness, saúde e bem-estar. Que informação você está buscando?'
    };
    
    openChatInterface(agentMessages[agentType]);
}

// Open chat interface
function openChatInterface(initialMessage, userMessage = null) {
    // Create chat overlay
    const chatOverlay = document.createElement('div');
    chatOverlay.className = 'chat-overlay';
    chatOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    const agentTitle = currentAgentType !== 'default' ? 
        `Chat com ${currentAgentType.charAt(0).toUpperCase() + currentAgentType.slice(1)} Agent` : 
        'Chat com Axoma IA';
    
    chatOverlay.innerHTML = `
        <div class="chat-modal" style="
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            width: 100%;
            max-width: 700px;
            height: 600px;
            display: flex;
            flex-direction: column;
        ">
            <div class="chat-header" style="
                padding: 16px 20px;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                align-items: center;
                justify-content: space-between;
            ">
                <div>
                    <h3 style="color: var(--text-primary); margin: 0; font-size: 18px;">${agentTitle}</h3>
                    <p style="color: var(--text-secondary); margin: 4px 0 0 0; font-size: 12px;" id="api-status">
                        ${window.openRouterAPI?.isConfigured() ? '🟢 API Conectada' : '🟡 Modo Simulação'}
                    </p>
                </div>
                <button onclick="closeChatModal()" style="
                    background: transparent;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-size: 18px;
                    padding: 4px 8px;
                    border-radius: 4px;
                    transition: all 0.2s ease;
                " onmouseover="this.style.background='var(--bg-tertiary)'" onmouseout="this.style.background='transparent'">&times;</button>
            </div>
            <div class="chat-messages" style="
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 16px;
            " id="chat-messages-container">
                ${initialMessage ? `
                <div class="ai-message" style="
                    background: var(--bg-tertiary);
                    padding: 12px 16px;
                    border-radius: 12px;
                    max-width: 80%;
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                ">
                    ${initialMessage}
                </div>` : ''}
            </div>
            <div class="chat-input-area" style="
                padding: 16px 20px;
                border-top: 1px solid var(--border-color);
                display: flex;
                gap: 12px;
            ">
                <input type="text" id="chat-modal-input" placeholder="Digite sua mensagem..." style="
                    flex: 1;
                    background: var(--bg-tertiary);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    padding: 8px 12px;
                    color: var(--text-primary);
                    outline: none;
                    font-family: inherit;
                " ${isProcessing ? 'disabled' : ''}>
                <button onclick="sendChatMessage()" id="send-button" style="
                    background: var(--accent-color);
                    color: #000;
                    border: none;
                    border-radius: 8px;
                    padding: 8px 16px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.2s ease;
                    min-width: 70px;
                " onmouseover="this.style.background='var(--accent-hover)'" onmouseout="this.style.background='var(--accent-color)'" ${isProcessing ? 'disabled' : ''}>
                    ${isProcessing ? '...' : 'Enviar'}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatOverlay);
    
    // Focus on input
    setTimeout(() => {
        const input = document.getElementById('chat-modal-input');
        if (input && !isProcessing) input.focus();
    }, 100);
    
    // Add enter key listener
    const input = document.getElementById('chat-modal-input');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !isProcessing) {
                sendChatMessage();
            }
        });
    }

    // Se há uma mensagem do usuário, envie automaticamente
    if (userMessage) {
        setTimeout(() => {
            const input = document.getElementById('chat-modal-input');
            if (input) {
                input.value = userMessage;
                sendChatMessage();
            }
        }, 500);
    }
}

// Close chat modal
function closeChatModal() {
    const overlay = document.querySelector('.chat-overlay');
    if (overlay) {
        overlay.remove();
    }
    isProcessing = false;
    conversationHistory = [];
}

// Send chat message
async function sendChatMessage() {
    const input = document.getElementById('chat-modal-input');
    const message = input.value.trim();
    
    if (!message || isProcessing) return;
    
    isProcessing = true;
    updateUIProcessingState(true);
    
    // Add user message
    const messagesContainer = document.getElementById('chat-messages-container');
    const userMessage = document.createElement('div');
    userMessage.style.cssText = `
        background: var(--accent-color);
        color: #000;
        padding: 12px 16px;
        border-radius: 12px;
        max-width: 80%;
        align-self: flex-end;
        margin-left: auto;
        word-wrap: break-word;
    `;
    userMessage.textContent = message;
    messagesContainer.appendChild(userMessage);
    
    // Add to conversation history
    conversationHistory.push({ role: 'user', content: message });
    
    // Clear input
    input.value = '';
    
    // Add loading indicator
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'loading-message';
    loadingMessage.style.cssText = `
        background: var(--bg-tertiary);
        padding: 12px 16px;
        border-radius: 12px;
        max-width: 80%;
        color: var(--text-primary);
        border: 1px solid var(--border-color);
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    loadingMessage.innerHTML = `
        <div style="
            width: 16px;
            height: 16px;
            border: 2px solid var(--border-color);
            border-top: 2px solid var(--accent-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        Processando...
    `;
    messagesContainer.appendChild(loadingMessage);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    try {
        // Get AI response
        const aiResponse = await generateAIResponse(message);
        
        // Remove loading message
        loadingMessage.remove();
        
        // Add AI response
        const aiMessage = document.createElement('div');
        aiMessage.style.cssText = `
            background: var(--bg-tertiary);
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 80%;
            color: var(--text-primary);
            border: 1px solid var(--border-color);
            white-space: pre-wrap;
            word-wrap: break-word;
        `;
        aiMessage.textContent = aiResponse;
        messagesContainer.appendChild(aiMessage);
        
        // Add to conversation history
        conversationHistory.push({ role: 'assistant', content: aiResponse });
        
    } catch (error) {
        console.error('Erro ao obter resposta da IA:', error);
        
        // Remove loading message
        loadingMessage.remove();
        
        // Add error message
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
            background: #ff6b6b;
            color: white;
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 80%;
        `;
        errorMessage.textContent = 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.';
        messagesContainer.appendChild(errorMessage);
    }
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    isProcessing = false;
    updateUIProcessingState(false);
}

// Update UI processing state
function updateUIProcessingState(processing) {
    const input = document.getElementById('chat-modal-input');
    const button = document.getElementById('send-button');
    
    if (input) {
        input.disabled = processing;
        input.placeholder = processing ? 'Processando...' : 'Digite sua mensagem...';
    }
    
    if (button) {
        button.disabled = processing;
        button.textContent = processing ? '...' : 'Enviar';
    }
}

// Generate AI response using OpenRouter API
async function generateAIResponse(message) {
    // Check if OpenRouter is available and configured
    if (window.openRouterAPI && window.openRouterAPI.isConfigured()) {
        try {
            const response = await window.openRouterAPI.makeAPICall(
                conversationHistory, 
                currentAgentType,
                {
                    maxTokens: 1000,
                    temperature: 0.7,
                    topP: 0.9
                }
            );
            
            if (response.success) {
                return response.message;
            } else {
                console.error('Erro da API OpenRouter:', response.error);
                return response.fallbackMessage;
            }
        } catch (error) {
            console.error('Erro ao chamar OpenRouter API:', error);
            return getFallbackResponse(currentAgentType);
        }
    } else {
        // Fallback to simulated responses
        return getFallbackResponse(currentAgentType);
    }
}

// Fallback response when API is not available
function getFallbackResponse(agentType) {
    const responses = {
        'training': [
            'Com base na sua pergunta sobre treinos, sugiro focar na progressão gradual de cargas e manter consistência.',
            'Para otimizar seus resultados, é importante combinar exercícios compostos com isolados específicos.',
            'Lembre-se: o descanso é tão importante quanto o treino. Permita recuperação adequada entre as sessões.',
            'Considere variar sua rotina a cada 6-8 semanas para evitar platôs e manter o progresso.'
        ],
        'privacy': [
            'Sua privacidade é nossa prioridade. Todos os dados são criptografados e protegidos.',
            'Recomendo revisar suas configurações de privacidade regularmente e manter senhas fortes.',
            'Nunca compartilhamos seus dados pessoais com terceiros sem seu consentimento explícito.',
            'Para maior segurança, ative a autenticação de dois fatores quando disponível.'
        ],
        'tools': [
            'Nossa plataforma oferece várias ferramentas. Qual funcionalidade específica você gostaria de explorar?',
            'Posso ajudar você a navegar pelos recursos disponíveis. Há alguma tarefa específica que deseja realizar?',
            'Se encontrar dificuldades técnicas, tente recarregar a página ou limpar o cache do navegador.',
            'Para melhor experiência, recomendo usar a versão mais recente do seu navegador.'
        ],
        'knowledge': [
            'Baseado em evidências científicas, posso fornecer informações sobre fitness, nutrição e bem-estar.',
            'A combinação de exercícios regulares, alimentação balanceada e sono adequado é fundamental para a saúde.',
            'Cada pessoa é única. Recomendo sempre consultar profissionais qualificados para orientações personalizadas.',
            'A constância é mais importante que a intensidade. Pequenos passos diários levam a grandes resultados.'
        ],
        'default': [
            'Entendi sua pergunta! Com base nos seus dados, posso sugerir algumas melhorias.',
            'Ótima questão! Vou analisar e dar uma recomendação personalizada.',
            'Interessante! Baseado no seu perfil, tenho algumas sugestões que podem ajudar.',
            'Perfeito! Vou usar minha base de conhecimento para te dar a melhor resposta.'
        ]
    };
    
    const agentResponses = responses[agentType] || responses['default'];
    return agentResponses[Math.floor(Math.random() * agentResponses.length)];
}

// Mobile sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Export functions for global access
window.handleSend = handleSend;
window.selectAgent = selectAgent;
window.openChatInterface = openChatInterface;
window.closeChatModal = closeChatModal;
window.sendChatMessage = sendChatMessage;
window.toggleSidebar = toggleSidebar; 