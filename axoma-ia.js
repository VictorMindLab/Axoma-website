// Axoma IA JavaScript - Versão Simplificada
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the interface
    initializeInterface();
});

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
}

// Handle send button
function handleSend() {
    const input = document.getElementById('main-input');
    const message = input.value.trim();
    
    if (message) {
        console.log('Enviando:', message);
        input.value = '';
        openChatInterface(message);
    }
}

// Handle agent selection
function selectAgent(agentType) {
    console.log('Agente selecionado:', agentType);
    
    const agentMessages = {
        'training': 'Olá! Sou o Training Agent. Como posso ajudar com seus treinos hoje?',
        'privacy': 'Olá! Sou o Privacy Agent. Vou garantir que seus dados estejam seguros.',
        'tools': 'Olá! Sou o Tools Agent. Que ferramenta você gostaria de usar?',
        'knowledge': 'Olá! Sou o Knowledge Agent. Que conhecimento você busca?'
    };
    
    openChatInterface(agentMessages[agentType]);
}

// Open chat interface
function openChatInterface(initialMessage) {
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
    
    chatOverlay.innerHTML = `
        <div class="chat-modal" style="
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            width: 100%;
            max-width: 600px;
            height: 500px;
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
                <h3 style="color: var(--text-primary); margin: 0;">Chat com Axoma IA</h3>
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
            ">
                <div class="ai-message" style="
                    background: var(--bg-tertiary);
                    padding: 12px 16px;
                    border-radius: 12px;
                    max-width: 80%;
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                ">
                    ${initialMessage}
                </div>
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
                ">
                <button onclick="sendChatMessage()" style="
                    background: var(--accent-color);
                    color: #000;
                    border: none;
                    border-radius: 8px;
                    padding: 8px 16px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.2s ease;
                " onmouseover="this.style.background='var(--accent-hover)'" onmouseout="this.style.background='var(--accent-color)'">Enviar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatOverlay);
    
    // Focus on input
    setTimeout(() => {
        const input = document.getElementById('chat-modal-input');
        if (input) input.focus();
    }, 100);
    
    // Add enter key listener
    const input = document.getElementById('chat-modal-input');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
}

// Close chat modal
function closeChatModal() {
    const overlay = document.querySelector('.chat-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Send chat message
function sendChatMessage() {
    const input = document.getElementById('chat-modal-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    const messagesContainer = document.querySelector('.chat-messages');
    const userMessage = document.createElement('div');
    userMessage.style.cssText = `
        background: var(--accent-color);
        color: #000;
        padding: 12px 16px;
        border-radius: 12px;
        max-width: 80%;
        align-self: flex-end;
        margin-left: auto;
    `;
    userMessage.textContent = message;
    messagesContainer.appendChild(userMessage);
    
    // Clear input
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = generateResponse(message);
        const aiMessage = document.createElement('div');
        aiMessage.style.cssText = `
            background: var(--bg-tertiary);
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 80%;
            color: var(--text-primary);
            border: 1px solid var(--border-color);
        `;
        aiMessage.textContent = aiResponse;
        messagesContainer.appendChild(aiMessage);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Generate AI response
function generateResponse(message) {
    const responses = [
        'Entendi sua pergunta! Com base nos seus dados de treino, posso sugerir algumas melhorias.',
        'Ótima questão! Vou analisar seu histórico e dar uma recomendação personalizada.',
        'Interessante! Baseado no seu perfil, tenho algumas sugestões que podem ajudar.',
        'Perfeito! Vou usar minha base de conhecimento para te dar a melhor resposta.',
        'Excelente pergunta! Deixe-me processar seus dados e criar uma resposta personalizada.'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
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