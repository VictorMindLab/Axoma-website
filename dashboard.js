// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Update current date
    updateCurrentDate();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize notifications
    initializeNotifications();
    
    // Initialize quick actions
    initializeQuickActions();
    
    // Initialize logout functionality
    initializeLogout();
    
    // Initialize responsive sidebar
    initializeResponsiveSidebar();
    
    // Initialize workout interactions
    initializeWorkoutInteractions();
    
    // Initialize schedule interactions
    initializeScheduleInteractions();
    
    // Initialize stats animations
    initializeStatsAnimations();
    
    // Initialize real-time updates
    initializeRealTimeUpdates();
});

// Initialize theme functionality
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('dashboard-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update icon based on current theme
    updateThemeIcon(savedTheme, themeIcon);
    
    // Add click event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('dashboard-theme', newTheme);
        
        // Update icon
        updateThemeIcon(newTheme, themeIcon);
        
        // Add visual feedback
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
}

// Update theme icon
function updateThemeIcon(theme, iconElement) {
    if (theme === 'dark') {
        iconElement.className = 'fas fa-sun';
    } else {
        iconElement.className = 'fas fa-moon';
    }
}

// Update current date display
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = now.toLocaleDateString('pt-BR', options);
    }
}

// Initialize navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item a');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(nav => {
                nav.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // Get the target section
            const target = this.getAttribute('href').substring(1);
            
            // Handle navigation based on target
            switch(target) {
                case 'dashboard':
                    showDashboard();
                    break;
                case 'treinos':
                    showTreinosPage();
                    break;
                case 'progresso':
                    showProgressoPage();
                    break;
                case 'nutricao':
                    showNutricaoPage();
                    break;
                case 'ia':
                    // Redirect to dedicated IA page
                    window.location.href = 'axoma-ia.html';
                    break;
                case 'configuracoes':
                    showConfiguracoesPage();
                    break;
            }
            
            // Update header title
            updateHeaderTitle(target);
        });
    });
}

// Initialize notification functionality
function initializeNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // Toggle notification panel (to be implemented)
            console.log('Notifications clicked');
            
            // Example: Show notification dropdown
            showNotificationDropdown();
        });
    }
}

// Show notification dropdown (placeholder)
function showNotificationDropdown() {
    // Create notification dropdown if it doesn't exist
    let dropdown = document.querySelector('.notification-dropdown');
    
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'notification-dropdown';
        dropdown.innerHTML = `
            <div class="notification-header">
                <h3>Notificações</h3>
                <button class="close-notifications">&times;</button>
            </div>
            <div class="notification-list">
                <div class="notification-item">
                    <div class="notification-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <div class="notification-content">
                        <h4>Meta Atingida!</h4>
                        <p>Você completou sua meta de treino semanal</p>
                        <span class="notification-time">2 horas atrás</span>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon">
                        <i class="fas fa-brain"></i>
                    </div>
                    <div class="notification-content">
                        <h4>Nova Recomendação IA</h4>
                        <p>Axoma IA sugere ajustes no seu plano de treino</p>
                        <span class="notification-time">5 horas atrás</span>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon">
                        <i class="fas fa-calendar"></i>
                    </div>
                    <div class="notification-content">
                        <h4>Treino Agendado</h4>
                        <p>Lembrete: Treino de pernas às 18:00</p>
                        <span class="notification-time">1 dia atrás</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles for notification dropdown
        const style = document.createElement('style');
        style.textContent = `
            .notification-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                width: 320px;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-lg);
                z-index: 1000;
                max-height: 400px;
                overflow-y: auto;
            }
            
            .notification-header {
                padding: 16px 20px;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .notification-header h3 {
                font-size: 16px;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0;
            }
            
            .close-notifications {
                background: none;
                border: none;
                font-size: 20px;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 4px;
            }
            
            .notification-item {
                padding: 16px 20px;
                border-bottom: 1px solid var(--border-color-light);
                display: flex;
                gap: 12px;
                transition: var(--transition);
            }
            
            .notification-item:hover {
                background-color: var(--bg-tertiary);
            }
            
            .notification-item:last-child {
                border-bottom: none;
            }
            
            .notification-icon {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background-color: var(--primary-color);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                flex-shrink: 0;
            }
            
            .notification-content h4 {
                font-size: 14px;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 4px 0;
            }
            
            .notification-content p {
                font-size: 13px;
                color: var(--text-secondary);
                margin: 0 0 4px 0;
                line-height: 1.4;
            }
            
            .notification-time {
                font-size: 12px;
                color: var(--text-tertiary);
            }
        `;
        document.head.appendChild(style);
        
        // Position relative to notification button
        const notificationBtn = document.querySelector('.notification-btn');
        notificationBtn.style.position = 'relative';
        notificationBtn.appendChild(dropdown);
        
        // Close functionality
        dropdown.querySelector('.close-notifications').addEventListener('click', function() {
            dropdown.remove();
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!notificationBtn.contains(e.target)) {
                dropdown.remove();
            }
        });
    }
}

// Initialize quick actions
function initializeQuickActions() {
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const actionText = this.querySelector('span').textContent;
            console.log(`Quick action clicked: ${actionText}`);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle different actions
            switch(actionText) {
                case 'Iniciar Treino':
                    handleStartWorkout();
                    break;
                case 'Novo Plano':
                    handleNewPlan();
                    break;
                case 'Ver Relatório':
                    handleViewReport();
                    break;
                case 'Consultar IA':
                    handleConsultAI();
                    break;
            }
        });
    });
}

// Quick action handlers
function handleStartWorkout() {
    showWorkoutSelector();
}

function handleNewPlan() {
    showPlanCreator();
}

function handleViewReport() {
    showReportModal();
}

function handleConsultAI() {
    showAIConsultModal();
}

// Show workout selector modal
function showWorkoutSelector() {
    const modal = createModal('Iniciar Treino', `
        <div class="workout-selector">
            <h3>Escolha seu treino:</h3>
            <div class="workout-options">
                <div class="workout-option" data-workout="forca">
                    <i class="fas fa-dumbbell"></i>
                    <span>Treino de Força</span>
                    <p>45-60 min • Intermediário</p>
                </div>
                <div class="workout-option" data-workout="cardio">
                    <i class="fas fa-running"></i>
                    <span>Cardio HIIT</span>
                    <p>30-40 min • Intenso</p>
                </div>
                <div class="workout-option" data-workout="yoga">
                    <i class="fas fa-heart"></i>
                    <span>Yoga & Flexibilidade</span>
                    <p>25-35 min • Relaxante</p>
                </div>
                <div class="workout-option" data-workout="funcional">
                    <i class="fas fa-fire"></i>
                    <span>Treino Funcional</span>
                    <p>40-50 min • Avançado</p>
                </div>
            </div>
        </div>
    `);
    
    // Add click handlers for workout options
    modal.querySelectorAll('.workout-option').forEach(option => {
        option.addEventListener('click', function() {
            const workoutType = this.dataset.workout;
            const workoutName = this.querySelector('span').textContent;
            startSelectedWorkout(workoutType, workoutName);
            closeModal();
        });
    });
}

// Show plan creator modal
function showPlanCreator() {
    const modal = createModal('Criar Novo Plano', `
        <div class="plan-creator">
            <form id="plan-form">
                <div class="form-group">
                    <label for="plan-name">Nome do Plano:</label>
                    <input type="text" id="plan-name" placeholder="Ex: Plano de Verão 2025" required>
                </div>
                <div class="form-group">
                    <label for="plan-goal">Objetivo:</label>
                    <select id="plan-goal" required>
                        <option value="">Selecione um objetivo</option>
                        <option value="perda-peso">Perda de Peso</option>
                        <option value="ganho-massa">Ganho de Massa</option>
                        <option value="resistencia">Resistência</option>
                        <option value="flexibilidade">Flexibilidade</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="plan-duration">Duração (semanas):</label>
                    <input type="number" id="plan-duration" min="1" max="52" value="8" required>
                </div>
                <div class="form-group">
                    <label for="plan-frequency">Frequência semanal:</label>
                    <select id="plan-frequency" required>
                        <option value="3">3x por semana</option>
                        <option value="4">4x por semana</option>
                        <option value="5">5x por semana</option>
                        <option value="6">6x por semana</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" onclick="closeModal()" class="btn-secondary">Cancelar</button>
                    <button type="submit" class="btn-primary">Criar Plano</button>
                </div>
            </form>
        </div>
    `);
    
    // Handle form submission
    modal.querySelector('#plan-form').addEventListener('submit', function(e) {
        e.preventDefault();
        createNewPlan();
    });
}

// Show report modal
function showReportModal() {
    const modal = createModal('Relatório de Progresso', `
        <div class="report-content">
            <div class="report-stats">
                <div class="report-stat">
                    <h4>Esta Semana</h4>
                    <div class="stat-value">5 treinos</div>
                    <div class="stat-change positive">+25% vs semana anterior</div>
                </div>
                <div class="report-stat">
                    <h4>Calorias Queimadas</h4>
                    <div class="stat-value">3,247 cal</div>
                    <div class="stat-change positive">+12% vs semana anterior</div>
                </div>
                <div class="report-stat">
                    <h4>Tempo Total</h4>
                    <div class="stat-value">4h 35min</div>
                    <div class="stat-change positive">+18% vs semana anterior</div>
                </div>
            </div>
            <div class="report-chart">
                <h4>Progresso dos Últimos 7 Dias</h4>
                <div class="chart-placeholder">
                    <div class="chart-bar" style="height: 60%"></div>
                    <div class="chart-bar" style="height: 80%"></div>
                    <div class="chart-bar" style="height: 45%"></div>
                    <div class="chart-bar" style="height: 90%"></div>
                    <div class="chart-bar" style="height: 70%"></div>
                    <div class="chart-bar" style="height: 85%"></div>
                    <div class="chart-bar" style="height: 95%"></div>
                </div>
            </div>
        </div>
    `);
}

// Show AI consultation modal
function showAIConsultModal() {
    const modal = createModal('Consultar Axoma IA', `
        <div class="ai-consult">
            <div class="ai-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <h3>Como posso ajudar você hoje?</h3>
            <div class="ai-suggestions">
                <button class="ai-suggestion" data-question="Como melhorar meu treino?">
                    Como melhorar meu treino?
                </button>
                <button class="ai-suggestion" data-question="Sugestões de nutrição">
                    Sugestões de nutrição
                </button>
                <button class="ai-suggestion" data-question="Análise do meu progresso">
                    Análise do meu progresso
                </button>
                <button class="ai-suggestion" data-question="Exercícios para dor nas costas">
                    Exercícios para dor nas costas
                </button>
            </div>
            <div class="ai-chat">
                <div class="chat-input">
                    <input type="text" placeholder="Digite sua pergunta..." id="ai-input">
                    <button onclick="sendAIMessage()" class="btn-send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `);
    
    // Add click handlers for AI suggestions
    modal.querySelectorAll('.ai-suggestion').forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.dataset.question;
            simulateAIResponse(question);
        });
    });
    
    // Handle enter key in input
    modal.querySelector('#ai-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendAIMessage();
        }
    });
}

// Initialize logout functionality
function initializeLogout() {
    const logoutBtn = document.querySelector('.logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja sair?')) {
                // Redirect to login page
                window.location.href = 'login.html';
            }
        });
    }
}

// Initialize responsive sidebar
function initializeResponsiveSidebar() {
    // Add mobile menu button if screen is small
    if (window.innerWidth <= 768) {
        addMobileMenuButton();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            addMobileMenuButton();
        } else {
            removeMobileMenuButton();
        }
    });
}

// Add mobile menu button
function addMobileMenuButton() {
    let mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileBtn) {
        mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-btn {
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 1001;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: var(--border-radius-sm);
                padding: 12px;
                font-size: 16px;
                cursor: pointer;
                box-shadow: var(--shadow-md);
                transition: var(--transition);
            }
            
            .mobile-menu-btn:hover {
                background: var(--primary-dark);
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(mobileBtn);
        
        // Toggle sidebar
        mobileBtn.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('open');
        });
    }
}

// Remove mobile menu button
function removeMobileMenuButton() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.remove();
    }
}

// Initialize workout interactions
function initializeWorkoutInteractions() {
    const workoutItems = document.querySelectorAll('.workout-item');
    
    workoutItems.forEach(item => {
        item.addEventListener('click', function() {
            const workoutName = this.querySelector('h4').textContent;
            const workoutDetails = this.querySelector('p').textContent;
            
            showWorkoutModal(workoutName, workoutDetails);
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Initialize schedule interactions
function initializeScheduleInteractions() {
    const scheduleActions = document.querySelectorAll('.schedule-action');
    
    scheduleActions.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const scheduleItem = this.closest('.schedule-item');
            const workoutName = scheduleItem.querySelector('h4').textContent;
            const time = scheduleItem.querySelector('.time').textContent;
            const date = scheduleItem.querySelector('.date').textContent;
            
            if (this.querySelector('.fa-play')) {
                startWorkout(workoutName, time, date);
            } else {
                editSchedule(workoutName, time, date);
            }
        });
    });
    
    // Schedule item click
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach(item => {
        item.addEventListener('click', function() {
            const workoutName = this.querySelector('h4').textContent;
            const details = this.querySelector('p').textContent;
            const time = this.querySelector('.time').textContent;
            const date = this.querySelector('.date').textContent;
            
            showScheduleDetails(workoutName, details, time, date);
        });
    });
}

// Initialize stats animations
function initializeStatsAnimations() {
    const statNumbers = document.querySelectorAll('.stat-info h3');
    const statCards = document.querySelectorAll('.stat-card');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        animateNumber(stat, finalValue);
    });
    
    // Add click functionality to stat cards
    statCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const statType = this.querySelector('.stat-info p').textContent;
            showStatDetails(statType, index);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize real-time updates
function initializeRealTimeUpdates() {
    // Update time every minute
    setInterval(updateCurrentDate, 60000);
    
    // Simulate real-time stats updates
    setInterval(updateStats, 30000);
    
    // Update notification badge
    setInterval(updateNotificationBadge, 45000);
}

// Utility function to format numbers
function formatNumber(num) {
    return new Intl.NumberFormat('pt-BR').format(num);
}

// Utility function to format time
function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
        return `${hours}h ${mins}min`;
    }
    return `${mins} min`;
}

// Create modal function
function createModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    // Add modal styles
    addModalStyles();
    
    // Close on overlay click
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    return modalOverlay.querySelector('.modal-content');
}

// Close modal function
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Add modal styles
function addModalStyles() {
    if (document.querySelector('#modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        
        .modal-container {
            background: var(--bg-secondary);
            border-radius: var(--border-radius-lg);
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: var(--shadow-xl);
            border: 1px solid var(--border-color);
            animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
            from {
                transform: translateY(-50px) scale(0.9);
                opacity: 0;
            }
            to {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
        }
        
        .modal-header {
            padding: 24px 32px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h2 {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 8px;
            border-radius: var(--border-radius-sm);
            transition: var(--transition);
            font-size: 18px;
        }
        
        .modal-close:hover {
            background: var(--bg-tertiary);
            color: var(--text-primary);
        }
        
        .modal-content {
            padding: 32px;
        }
        
        .workout-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
            margin-top: 20px;
        }
        
        .workout-option {
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-sm);
            padding: 20px;
            cursor: pointer;
            transition: var(--transition);
            text-align: center;
        }
        
        .workout-option:hover {
            background: var(--primary-gradient);
            color: white;
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
        }
        
        .workout-option i {
            font-size: 32px;
            margin-bottom: 12px;
            color: var(--primary-color);
        }
        
        .workout-option:hover i {
            color: white;
        }
        
        .workout-option span {
            display: block;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 8px;
        }
        
        .workout-option p {
            font-size: 14px;
            color: var(--text-secondary);
            margin: 0;
        }
        
        .workout-option:hover p {
            color: rgba(255, 255, 255, 0.8);
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 8px;
        }
        
        .form-group input,
        .form-group select {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-sm);
            background: var(--bg-tertiary);
            color: var(--text-primary);
            font-size: 14px;
            transition: var(--transition);
        }
        
        .form-group input:focus,
        .form-group select:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .form-actions {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 32px;
        }
        
        .btn-primary,
        .btn-secondary {
            padding: 12px 24px;
            border-radius: var(--border-radius-sm);
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            border: none;
        }
        
        .btn-primary {
            background: var(--primary-gradient);
            color: white;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        .btn-secondary {
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: 1px solid var(--border-color);
        }
        
        .btn-secondary:hover {
            background: var(--bg-primary);
        }
        
        .report-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 32px;
        }
        
        .report-stat {
            background: var(--bg-tertiary);
            padding: 20px;
            border-radius: var(--border-radius-sm);
            text-align: center;
        }
        
        .report-stat h4 {
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 8px;
        }
        
        .stat-value {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 4px;
        }
        
        .stat-change {
            font-size: 12px;
            font-weight: 600;
        }
        
        .stat-change.positive {
            color: var(--success-color);
        }
        
        .chart-placeholder {
            display: flex;
            align-items: end;
            gap: 8px;
            height: 200px;
            padding: 20px;
            background: var(--bg-tertiary);
            border-radius: var(--border-radius-sm);
        }
        
        .chart-bar {
            flex: 1;
            background: var(--primary-gradient);
            border-radius: 4px 4px 0 0;
            min-height: 20px;
            transition: var(--transition);
        }
        
        .chart-bar:hover {
            opacity: 0.8;
        }
        
        .ai-consult {
            text-align: center;
        }
        
        .ai-avatar {
            width: 80px;
            height: 80px;
            background: var(--primary-gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 32px;
            color: white;
            box-shadow: var(--shadow-lg);
        }
        
        .ai-suggestions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
            margin: 24px 0;
        }
        
        .ai-suggestion {
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-sm);
            padding: 12px 16px;
            cursor: pointer;
            transition: var(--transition);
            font-size: 14px;
            color: var(--text-primary);
        }
        
        .ai-suggestion:hover {
            background: var(--primary-color);
            color: white;
            transform: translateY(-2px);
        }
        
        .chat-input {
            display: flex;
            gap: 12px;
            margin-top: 24px;
        }
        
        .chat-input input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-sm);
            background: var(--bg-tertiary);
            color: var(--text-primary);
        }
        
        .btn-send {
            background: var(--primary-gradient);
            color: white;
            border: none;
            border-radius: var(--border-radius-sm);
            padding: 12px 16px;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .btn-send:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
    `;
    document.head.appendChild(style);
}

// Workout functions
function startSelectedWorkout(workoutType, workoutName) {
    showNotification(`Iniciando ${workoutName}!`, 'success');
    // Here you would integrate with actual workout tracking
    console.log(`Starting workout: ${workoutType} - ${workoutName}`);
}

function startWorkout(workoutName, time, date) {
    showNotification(`Iniciando ${workoutName} agendado para ${time}!`, 'success');
    console.log(`Starting scheduled workout: ${workoutName} at ${time} on ${date}`);
}

function editSchedule(workoutName, time, date) {
    showNotification(`Editando agendamento: ${workoutName}`, 'info');
    console.log(`Editing schedule: ${workoutName} at ${time} on ${date}`);
}

function showWorkoutModal(workoutName, details) {
    const modal = createModal(`Detalhes: ${workoutName}`, `
        <div class="workout-details-modal">
            <h3>${workoutName}</h3>
            <p>${details}</p>
            <div class="workout-actions">
                <button class="btn-primary" onclick="repeatWorkout('${workoutName}')">
                    <i class="fas fa-redo"></i> Repetir Treino
                </button>
                <button class="btn-secondary" onclick="viewWorkoutHistory('${workoutName}')">
                    <i class="fas fa-history"></i> Ver Histórico
                </button>
            </div>
        </div>
    `);
}

function showScheduleDetails(workoutName, details, time, date) {
    const modal = createModal(`Agendamento: ${workoutName}`, `
        <div class="schedule-details-modal">
            <h3>${workoutName}</h3>
            <p><strong>Horário:</strong> ${time} - ${date}</p>
            <p><strong>Detalhes:</strong> ${details}</p>
            <div class="schedule-actions">
                <button class="btn-primary" onclick="startWorkout('${workoutName}', '${time}', '${date}')">
                    <i class="fas fa-play"></i> Iniciar Agora
                </button>
                <button class="btn-secondary" onclick="editSchedule('${workoutName}', '${time}', '${date}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
            </div>
        </div>
    `);
}

// Animation functions
function animateNumber(element, finalValue) {
    const isPercentage = finalValue.includes('%');
    const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
    let currentValue = 0;
    const increment = numericValue / 50;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        element.textContent = isPercentage ? 
            Math.floor(currentValue) + '%' : 
            Math.floor(currentValue).toLocaleString('pt-BR');
    }, 30);
}

// Update functions
function updateStats() {
    // Simulate real-time stats updates
    const stats = document.querySelectorAll('.stat-info h3');
    stats.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        const variation = Math.floor(Math.random() * 10) - 5; // -5 to +5
        const newValue = Math.max(0, currentValue + variation);
        
        if (stat.textContent.includes('%')) {
            stat.textContent = Math.min(100, newValue) + '%';
        } else if (stat.textContent.includes('min')) {
            stat.textContent = newValue + ' min';
        } else {
            stat.textContent = newValue.toLocaleString('pt-BR');
        }
    });
}

function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        const currentCount = parseInt(badge.textContent);
        const newCount = Math.max(0, currentCount + Math.floor(Math.random() * 3) - 1);
        badge.textContent = newCount;
        
        if (newCount === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
        }
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles if not exists
    addNotificationStyles();
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function addNotificationStyles() {
    if (document.querySelector('#notification-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-sm);
            padding: 16px 20px;
            box-shadow: var(--shadow-lg);
            z-index: 10001;
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 300px;
            animation: slideInRight 0.3s ease-out;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-success {
            border-left: 4px solid var(--success-color);
        }
        
        .notification-error {
            border-left: 4px solid var(--danger-color);
        }
        
        .notification-warning {
            border-left: 4px solid var(--warning-color);
        }
        
        .notification-info {
            border-left: 4px solid var(--primary-color);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
        }
        
        .notification-content i {
            font-size: 16px;
            color: var(--primary-color);
        }
        
        .notification-success .notification-content i {
            color: var(--success-color);
        }
        
        .notification-error .notification-content i {
            color: var(--danger-color);
        }
        
        .notification-warning .notification-content i {
            color: var(--warning-color);
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: var(--transition);
        }
        
        .notification-close:hover {
            background: var(--bg-tertiary);
            color: var(--text-primary);
        }
    `;
    document.head.appendChild(style);
}

// AI functions
function sendAIMessage() {
    const input = document.querySelector('#ai-input');
    const message = input.value.trim();
    
    if (message) {
        simulateAIResponse(message);
        input.value = '';
    }
}

function simulateAIResponse(question) {
    const responses = {
        'Como melhorar meu treino?': 'Com base no seu histórico, recomendo aumentar a intensidade dos exercícios cardiovasculares em 15% e incluir mais exercícios compostos como agachamentos e deadlifts.',
        'Sugestões de nutrição': 'Para seus objetivos atuais, sugiro aumentar a ingestão de proteínas para 1.8g por kg de peso corporal e incluir mais vegetais verdes nas refeições.',
        'Análise do meu progresso': 'Seu progresso está excelente! Você aumentou sua resistência em 23% nas últimas 4 semanas. Continue focando na consistência.',
        'Exercícios para dor nas costas': 'Recomendo exercícios de fortalecimento do core como prancha, bird dog e alongamentos para flexores do quadril. Sempre consulte um profissional.'
    };
    
    const response = responses[question] || 'Interessante pergunta! Com base nos seus dados, vou analisar e fornecer uma recomendação personalizada. Isso pode levar alguns segundos...';
    
    showNotification(`IA Axoma: ${response}`, 'info');
    closeModal();
}

// Plan creation
function createNewPlan() {
    const formData = {
        name: document.querySelector('#plan-name').value,
        goal: document.querySelector('#plan-goal').value,
        duration: document.querySelector('#plan-duration').value,
        frequency: document.querySelector('#plan-frequency').value
    };
    
    showNotification(`Plano "${formData.name}" criado com sucesso!`, 'success');
    console.log('New plan created:', formData);
    closeModal();
}

// Helper functions
function repeatWorkout(workoutName) {
    showNotification(`Repetindo treino: ${workoutName}`, 'success');
    closeModal();
}

function viewWorkoutHistory(workoutName) {
    showNotification(`Abrindo histórico de: ${workoutName}`, 'info');
    closeModal();
}

// AI Insight Details
function showAIInsightDetails() {
    const modal = createModal('Análise Detalhada da IA', `
        <div class="ai-insight-details">
            <div class="insight-header">
                <div class="ai-avatar-small">
                    <i class="fas fa-brain"></i>
                </div>
                <div>
                    <h3>Recomendação Personalizada</h3>
                    <p class="insight-date">Baseado em dados dos últimos 30 dias</p>
                </div>
            </div>
            
            <div class="insight-analysis">
                <h4>📊 Análise dos Seus Dados</h4>
                <ul class="analysis-points">
                    <li><strong>Frequência de Treino:</strong> 4.2x por semana (acima da média)</li>
                    <li><strong>Intensidade Cardio:</strong> 65% da capacidade máxima</li>
                    <li><strong>Queima de Calorias:</strong> 1,247 cal/dia (meta: 1,400 cal)</li>
                    <li><strong>Tempo de Recuperação:</strong> 18h entre treinos</li>
                </ul>
            </div>
            
            <div class="insight-recommendation">
                <h4>💡 Recomendações Específicas</h4>
                <div class="recommendation-cards">
                    <div class="rec-card">
                        <i class="fas fa-running"></i>
                        <h5>Cardio Intenso</h5>
                        <p>Aumente para 75-80% da capacidade máxima por 2-3 sessões semanais</p>
                    </div>
                    <div class="rec-card">
                        <i class="fas fa-dumbbell"></i>
                        <h5>Força Complementar</h5>
                        <p>Adicione exercícios compostos para maximizar queima calórica</p>
                    </div>
                    <div class="rec-card">
                        <i class="fas fa-clock"></i>
                        <h5>Timing Otimizado</h5>
                        <p>Treinos de 45-50min são ideais para seus objetivos</p>
                    </div>
                </div>
            </div>
            
            <div class="insight-actions">
                <button class="btn-primary" onclick="applyRecommendations()">
                    <i class="fas fa-check"></i> Aplicar Recomendações
                </button>
                <button class="btn-secondary" onclick="scheduleAIConsult()">
                    <i class="fas fa-calendar"></i> Agendar Consulta IA
                </button>
            </div>
        </div>
    `);
    
    // Add specific styles for insight details
    addInsightDetailStyles();
}

// Apply AI recommendations
function applyRecommendations() {
    showNotification('Recomendações aplicadas ao seu plano de treino!', 'success');
    closeModal();
}

// Schedule AI consultation
function scheduleAIConsult() {
    showNotification('Consulta com IA agendada para amanhã às 10:00', 'info');
    closeModal();
}

// Add styles for insight details
function addInsightDetailStyles() {
    if (document.querySelector('#insight-detail-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'insight-detail-styles';
    style.textContent = `
        .insight-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border-color);
        }
        
        .ai-avatar-small {
            width: 48px;
            height: 48px;
            background: var(--primary-gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
        }
        
        .insight-date {
            color: var(--text-secondary);
            font-size: 14px;
            margin: 0;
        }
        
        .insight-analysis,
        .insight-recommendation {
            margin-bottom: 24px;
        }
        
        .insight-analysis h4,
        .insight-recommendation h4 {
            color: var(--text-primary);
            margin-bottom: 16px;
            font-size: 18px;
        }
        
        .analysis-points {
            list-style: none;
            padding: 0;
        }
        
        .analysis-points li {
            padding: 8px 0;
            border-bottom: 1px solid var(--border-color-light);
            color: var(--text-secondary);
        }
        
        .analysis-points li:last-child {
            border-bottom: none;
        }
        
        .recommendation-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
        }
        
        .rec-card {
            background: var(--bg-tertiary);
            padding: 20px;
            border-radius: var(--border-radius-sm);
            text-align: center;
            border: 1px solid var(--border-color);
            transition: var(--transition);
        }
        
        .rec-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-md);
        }
        
        .rec-card i {
            font-size: 24px;
            color: var(--primary-color);
            margin-bottom: 12px;
        }
        
        .rec-card h5 {
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 8px;
        }
        
        .rec-card p {
            font-size: 14px;
            color: var(--text-secondary);
            line-height: 1.4;
            margin: 0;
        }
        
        .insight-actions {
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-top: 32px;
        }
    `;
    document.head.appendChild(style);
}

// Navigation functions for sidebar
function showDashboard() {
    showNotification('Voltando ao Dashboard', 'info');
    // Reset to dashboard view
    location.reload();
}

function showTreinosPage() {
    const modal = createModal('Meus Treinos', `
        <div class="treinos-page">
            <div class="treinos-header">
                <div class="treinos-stats">
                    <div class="treino-stat">
                        <h4>Total de Treinos</h4>
                        <span class="stat-number">127</span>
                    </div>
                    <div class="treino-stat">
                        <h4>Esta Semana</h4>
                        <span class="stat-number">5</span>
                    </div>
                    <div class="treino-stat">
                        <h4>Tempo Total</h4>
                        <span class="stat-number">89h</span>
                    </div>
                </div>
            </div>
            
            <div class="treinos-categories">
                <h3>Categorias de Treino</h3>
                <div class="category-grid">
                    <div class="category-card" onclick="openTreinoCategory('forca')">
                        <i class="fas fa-dumbbell"></i>
                        <h4>Força</h4>
                        <p>45 treinos realizados</p>
                    </div>
                    <div class="category-card" onclick="openTreinoCategory('cardio')">
                        <i class="fas fa-running"></i>
                        <h4>Cardio</h4>
                        <p>32 treinos realizados</p>
                    </div>
                    <div class="category-card" onclick="openTreinoCategory('flexibilidade')">
                        <i class="fas fa-heart"></i>
                        <h4>Flexibilidade</h4>
                        <p>28 treinos realizados</p>
                    </div>
                    <div class="category-card" onclick="openTreinoCategory('funcional')">
                        <i class="fas fa-fire"></i>
                        <h4>Funcional</h4>
                        <p>22 treinos realizados</p>
                    </div>
                </div>
            </div>
            
            <div class="treinos-recentes">
                <h3>Histórico Recente</h3>
                <div class="treino-history">
                    <div class="history-item">
                        <div class="history-date">Hoje</div>
                        <div class="history-workout">Treino de Força - Superiores</div>
                        <div class="history-duration">50 min</div>
                        <div class="history-calories">320 cal</div>
                    </div>
                    <div class="history-item">
                        <div class="history-date">Ontem</div>
                        <div class="history-workout">Cardio HIIT</div>
                        <div class="history-duration">30 min</div>
                        <div class="history-calories">280 cal</div>
                    </div>
                    <div class="history-item">
                        <div class="history-date">2 dias atrás</div>
                        <div class="history-workout">Yoga & Flexibilidade</div>
                        <div class="history-duration">25 min</div>
                        <div class="history-calories">120 cal</div>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    addTreinosPageStyles();
}

function showProgressoPage() {
    const modal = createModal('Meu Progresso', `
        <div class="progresso-page">
            <div class="progresso-overview">
                <h3>Visão Geral do Progresso</h3>
                <div class="progress-metrics">
                    <div class="metric-card">
                        <h4>Peso Atual</h4>
                        <span class="metric-value">75.2 kg</span>
                        <span class="metric-change negative">-2.3 kg este mês</span>
                    </div>
                    <div class="metric-card">
                        <h4>IMC</h4>
                        <span class="metric-value">23.1</span>
                        <span class="metric-change positive">Saudável</span>
                    </div>
                    <div class="metric-card">
                        <h4>% Gordura</h4>
                        <span class="metric-value">15.8%</span>
                        <span class="metric-change negative">-1.2% este mês</span>
                    </div>
                </div>
            </div>
            
            <div class="progresso-charts">
                <h3>Gráficos de Evolução</h3>
                <div class="chart-container">
                    <div class="chart-header">
                        <h4>Peso nos Últimos 3 Meses</h4>
                    </div>
                    <div class="chart-placeholder">
                        <div class="chart-line">
                            <div class="chart-point" style="left: 10%; bottom: 60%"></div>
                            <div class="chart-point" style="left: 25%; bottom: 55%"></div>
                            <div class="chart-point" style="left: 40%; bottom: 50%"></div>
                            <div class="chart-point" style="left: 55%; bottom: 45%"></div>
                            <div class="chart-point" style="left: 70%; bottom: 40%"></div>
                            <div class="chart-point" style="left: 85%; bottom: 35%"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="progresso-metas">
                <h3>Metas e Conquistas</h3>
                <div class="metas-grid">
                    <div class="meta-card completed">
                        <i class="fas fa-trophy"></i>
                        <h4>10 Treinos Consecutivos</h4>
                        <p>Completado em 15/01/2025</p>
                    </div>
                    <div class="meta-card in-progress">
                        <i class="fas fa-target"></i>
                        <h4>Perder 5kg</h4>
                        <p>Progresso: 2.3kg / 5kg</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 46%"></div>
                        </div>
                    </div>
                    <div class="meta-card pending">
                        <i class="fas fa-medal"></i>
                        <h4>30 Dias de Treino</h4>
                        <p>Faltam 18 dias</p>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    addProgressoPageStyles();
}

function showNutricaoPage() {
    const modal = createModal('Nutrição', `
        <div class="nutricao-page">
            <div class="nutricao-hoje">
                <h3>Nutrição de Hoje</h3>
                <div class="calorias-overview">
                    <div class="calorias-circle">
                        <div class="circle-progress" data-percent="75">
                            <span class="calories-consumed">1,847</span>
                            <span class="calories-total">/ 2,200 cal</span>
                        </div>
                    </div>
                    <div class="macros-breakdown">
                        <div class="macro">
                            <span class="macro-name">Proteínas</span>
                            <div class="macro-bar">
                                <div class="macro-fill protein" style="width: 80%"></div>
                            </div>
                            <span class="macro-value">120g / 150g</span>
                        </div>
                        <div class="macro">
                            <span class="macro-name">Carboidratos</span>
                            <div class="macro-bar">
                                <div class="macro-fill carbs" style="width: 65%"></div>
                            </div>
                            <span class="macro-value">180g / 275g</span>
                        </div>
                        <div class="macro">
                            <span class="macro-name">Gorduras</span>
                            <div class="macro-bar">
                                <div class="macro-fill fats" style="width: 90%"></div>
                            </div>
                            <span class="macro-value">72g / 80g</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="refeicoes-hoje">
                <h3>Refeições de Hoje</h3>
                <div class="refeicoes-list">
                    <div class="refeicao-item">
                        <div class="refeicao-time">08:00</div>
                        <div class="refeicao-details">
                            <h4>Café da Manhã</h4>
                            <p>Aveia com frutas, ovos mexidos</p>
                            <span class="refeicao-calories">420 cal</span>
                        </div>
                    </div>
                    <div class="refeicao-item">
                        <div class="refeicao-time">12:30</div>
                        <div class="refeicao-details">
                            <h4>Almoço</h4>
                            <p>Frango grelhado, arroz integral, salada</p>
                            <span class="refeicao-calories">650 cal</span>
                        </div>
                    </div>
                    <div class="refeicao-item">
                        <div class="refeicao-time">15:00</div>
                        <div class="refeicao-details">
                            <h4>Lanche</h4>
                            <p>Iogurte grego com granola</p>
                            <span class="refeicao-calories">280 cal</span>
                        </div>
                    </div>
                </div>
                
                <button class="btn-primary" onclick="adicionarRefeicao()">
                    <i class="fas fa-plus"></i> Adicionar Refeição
                </button>
            </div>
        </div>
    `);
    
    addNutricaoPageStyles();
}

function showIAPage() {
    const modal = createModal('Axoma IA - Seu Assistente Pessoal', `
        <div class="ia-page">
            <div class="ia-header">
                <div class="ia-avatar-large">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="ia-intro">
                    <h3>Olá, João! Como posso ajudar hoje?</h3>
                    <p>Estou aqui para otimizar seus treinos, nutrição e progresso</p>
                </div>
            </div>
            
            <div class="ia-features">
                <h3>Recursos Disponíveis</h3>
                <div class="features-grid">
                    <div class="feature-card" onclick="openIAFeature('analise')">
                        <i class="fas fa-chart-line"></i>
                        <h4>Análise de Progresso</h4>
                        <p>Análise detalhada do seu desempenho</p>
                    </div>
                    <div class="feature-card" onclick="openIAFeature('plano')">
                        <i class="fas fa-calendar-alt"></i>
                        <h4>Plano Personalizado</h4>
                        <p>Criação de treinos sob medida</p>
                    </div>
                    <div class="feature-card" onclick="openIAFeature('nutricao')">
                        <i class="fas fa-apple-alt"></i>
                        <h4>Orientação Nutricional</h4>
                        <p>Sugestões de alimentação</p>
                    </div>
                    <div class="feature-card" onclick="openIAFeature('motivacao')">
                        <i class="fas fa-heart"></i>
                        <h4>Coach Motivacional</h4>
                        <p>Dicas para manter o foco</p>
                    </div>
                </div>
            </div>
            
            <div class="ia-chat-section">
                <h3>Conversar com a IA</h3>
                <div class="chat-container">
                    <div class="chat-messages" id="ia-chat-messages">
                        <div class="message ia-message">
                            <div class="message-avatar">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="message-content">
                                <p>Olá! Analisei seus dados e tenho algumas sugestões para otimizar seus resultados. O que gostaria de saber?</p>
                            </div>
                        </div>
                    </div>
                    <div class="chat-input-container">
                        <input type="text" id="ia-chat-input" placeholder="Digite sua pergunta...">
                        <button onclick="sendIAChatMessage()" class="btn-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    addIAPageStyles();
}

function showConfiguracoesPage() {
    const modal = createModal('Configurações', `
        <div class="config-page">
            <div class="config-sections">
                <div class="config-section">
                    <h3>Perfil</h3>
                    <div class="config-group">
                        <label>Nome Completo</label>
                        <input type="text" value="João Silva" class="config-input">
                    </div>
                    <div class="config-group">
                        <label>Email</label>
                        <input type="email" value="joao@email.com" class="config-input">
                    </div>
                    <div class="config-group">
                        <label>Telefone</label>
                        <input type="tel" value="(11) 99999-9999" class="config-input">
                    </div>
                </div>
                
                <div class="config-section">
                    <h3>Dados Físicos</h3>
                    <div class="config-row">
                        <div class="config-group">
                            <label>Altura (cm)</label>
                            <input type="number" value="175" class="config-input">
                        </div>
                        <div class="config-group">
                            <label>Peso (kg)</label>
                            <input type="number" value="75.2" class="config-input">
                        </div>
                    </div>
                    <div class="config-group">
                        <label>Data de Nascimento</label>
                        <input type="date" value="1990-05-15" class="config-input">
                    </div>
                </div>
                
                <div class="config-section">
                    <h3>Preferências</h3>
                    <div class="config-group">
                        <label>Tema</label>
                        <select class="config-input">
                            <option value="dark">Escuro</option>
                            <option value="light">Claro</option>
                            <option value="auto">Automático</option>
                        </select>
                    </div>
                    <div class="config-group">
                        <label>Notificações</label>
                        <div class="toggle-switch">
                            <input type="checkbox" id="notifications" checked>
                            <label for="notifications" class="toggle-label"></label>
                        </div>
                    </div>
                    <div class="config-group">
                        <label>Lembrete de Treino</label>
                        <div class="toggle-switch">
                            <input type="checkbox" id="workout-reminder" checked>
                            <label for="workout-reminder" class="toggle-label"></label>
                        </div>
                    </div>
                </div>
                
                <div class="config-actions">
                    <button class="btn-primary" onclick="salvarConfiguracoes()">
                        <i class="fas fa-save"></i> Salvar Alterações
                    </button>
                    <button class="btn-secondary" onclick="resetarConfiguracoes()">
                        <i class="fas fa-undo"></i> Resetar
                    </button>
                </div>
            </div>
        </div>
    `);
    
    addConfigPageStyles();
}

function updateHeaderTitle(section) {
    const headerTitle = document.querySelector('.header-left h1');
    const headerSubtitle = document.querySelector('.header-left p');
    
    const titles = {
        'dashboard': {
            title: 'Bem-vindo de volta, João!',
            subtitle: 'Vamos continuar sua jornada fitness hoje'
        },
        'treinos': {
            title: 'Meus Treinos',
            subtitle: 'Gerencie e acompanhe seus exercícios'
        },
        'progresso': {
            title: 'Meu Progresso',
            subtitle: 'Acompanhe sua evolução e conquistas'
        },
        'nutricao': {
            title: 'Nutrição',
            subtitle: 'Controle sua alimentação e macros'
        },
        'ia': {
            title: 'Axoma IA',
            subtitle: 'Seu assistente pessoal de fitness'
        },
        'configuracoes': {
            title: 'Configurações',
            subtitle: 'Personalize sua experiência'
        }
    };
    
    if (titles[section]) {
        headerTitle.textContent = titles[section].title;
        headerSubtitle.textContent = titles[section].subtitle;
    }
}

// Helper functions for new pages
function openTreinoCategory(category) {
    const categories = {
        'forca': 'Treinos de Força',
        'cardio': 'Treinos de Cardio',
        'flexibilidade': 'Treinos de Flexibilidade',
        'funcional': 'Treinos Funcionais'
    };
    
    showNotification(`Abrindo ${categories[category]}`, 'info');
    closeModal();
}

function openIAFeature(feature) {
    const features = {
        'analise': 'Análise de Progresso',
        'plano': 'Plano Personalizado',
        'nutricao': 'Orientação Nutricional',
        'motivacao': 'Coach Motivacional'
    };
    
    showNotification(`Acessando: ${features[feature]}`, 'info');
    
    // Simulate AI feature opening
    setTimeout(() => {
        showNotification(`${features[feature]} carregado com sucesso!`, 'success');
    }, 1500);
}

function sendIAChatMessage() {
    const input = document.getElementById('ia-chat-input');
    const message = input.value.trim();
    
    if (message) {
        // Add user message to chat
        addChatMessage(message, 'user');
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const responses = [
                'Baseado nos seus dados, recomendo aumentar a intensidade dos treinos de cardio.',
                'Sua evolução está ótima! Continue focando na consistência.',
                'Sugiro incluir mais proteínas na sua dieta para otimizar a recuperação.',
                'Que tal experimentar treinos funcionais para variar sua rotina?'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addChatMessage(randomResponse, 'ia');
        }, 1000);
    }
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('ia-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function adicionarRefeicao() {
    const modal = createModal('Adicionar Refeição', `
        <div class="add-meal-form">
            <div class="form-group">
                <label>Tipo de Refeição</label>
                <select class="config-input">
                    <option value="cafe">Café da Manhã</option>
                    <option value="almoco">Almoço</option>
                    <option value="lanche">Lanche</option>
                    <option value="jantar">Jantar</option>
                    <option value="ceia">Ceia</option>
                </select>
            </div>
            <div class="form-group">
                <label>Horário</label>
                <input type="time" class="config-input" value="12:00">
            </div>
            <div class="form-group">
                <label>Descrição</label>
                <textarea class="config-input" placeholder="Descreva os alimentos..."></textarea>
            </div>
            <div class="form-group">
                <label>Calorias Estimadas</label>
                <input type="number" class="config-input" placeholder="Ex: 350">
            </div>
            <div class="form-actions">
                <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button class="btn-primary" onclick="salvarRefeicao()">Salvar</button>
            </div>
        </div>
    `);
}

function salvarRefeicao() {
    showNotification('Refeição adicionada com sucesso!', 'success');
    closeModal();
}

function salvarConfiguracoes() {
    showNotification('Configurações salvas com sucesso!', 'success');
    closeModal();
}

function resetarConfiguracoes() {
    if (confirm('Tem certeza que deseja resetar todas as configurações?')) {
        showNotification('Configurações resetadas para o padrão', 'info');
    }
}

// Add styles for new pages
function addTreinosPageStyles() {
    if (document.querySelector('#treinos-page-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'treinos-page-styles';
    style.textContent = `
        .treinos-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }
        
        .treino-stat {
            background: var(--bg-tertiary);
            padding: 20px;
            border-radius: var(--border-radius-sm);
            text-align: center;
        }
        
        .treino-stat h4 {
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 8px;
        }
        
        .stat-number {
            font-size: 24px;
            font-weight: 700;
            color: var(--primary-color);
        }
        
        .category-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }
        
        .category-card {
            background: var(--bg-tertiary);
            padding: 24px;
            border-radius: var(--border-radius-sm);
            text-align: center;
            cursor: pointer;
            transition: var(--transition);
            border: 1px solid var(--border-color);
        }
        
        .category-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
        }
        
        .category-card i {
            font-size: 32px;
            color: var(--primary-color);
            margin-bottom: 12px;
        }
        
        .category-card:hover i {
            color: white;
        }
        
        .treino-history {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .history-item {
            display: grid;
            grid-template-columns: 80px 1fr 80px 80px;
            gap: 16px;
            padding: 16px;
            background: var(--bg-tertiary);
            border-radius: var(--border-radius-sm);
            align-items: center;
        }
        
        .history-date {
            font-size: 12px;
            color: var(--text-secondary);
            font-weight: 600;
        }
        
        .history-workout {
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .history-duration,
        .history-calories {
            font-size: 14px;
            color: var(--text-secondary);
            text-align: center;
        }
    `;
    document.head.appendChild(style);
}

function addProgressoPageStyles() {
    if (document.querySelector('#progresso-page-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'progresso-page-styles';
    style.textContent = `
        .progress-metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 32px;
        }
        
        .metric-card {
            background: var(--bg-tertiary);
            padding: 24px;
            border-radius: var(--border-radius-sm);
            text-align: center;
        }
        
        .metric-card h4 {
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 8px;
        }
        
        .metric-value {
            font-size: 28px;
            font-weight: 700;
            color: var(--text-primary);
            display: block;
            margin-bottom: 4px;
        }
        
        .metric-change {
            font-size: 12px;
            font-weight: 600;
        }
        
        .metric-change.positive {
            color: var(--success-color);
        }
        
        .metric-change.negative {
            color: var(--primary-color);
        }
        
        .chart-container {
            background: var(--bg-tertiary);
            padding: 24px;
            border-radius: var(--border-radius-sm);
            margin-bottom: 32px;
        }
        
        .chart-placeholder {
            height: 200px;
            background: var(--bg-primary);
            border-radius: var(--border-radius-sm);
            position: relative;
            margin-top: 16px;
        }
        
        .chart-point {
            position: absolute;
            width: 8px;
            height: 8px;
            background: var(--primary-color);
            border-radius: 50%;
            transform: translate(-50%, 50%);
        }
        
        .metas-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        
        .meta-card {
            background: var(--bg-tertiary);
            padding: 24px;
            border-radius: var(--border-radius-sm);
            border-left: 4px solid var(--border-color);
        }
        
        .meta-card.completed {
            border-left-color: var(--success-color);
        }
        
        .meta-card.in-progress {
            border-left-color: var(--primary-color);
        }
        
        .meta-card.pending {
            border-left-color: var(--text-secondary);
        }
        
        .meta-card i {
            font-size: 24px;
            margin-bottom: 12px;
        }
        
        .meta-card.completed i {
            color: var(--success-color);
        }
        
        .meta-card.in-progress i {
            color: var(--primary-color);
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: var(--bg-primary);
            border-radius: 4px;
            margin-top: 8px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: var(--primary-gradient);
            border-radius: 4px;
            transition: width 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

function addNutricaoPageStyles() {
    if (document.querySelector('#nutricao-page-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'nutricao-page-styles';
    style.textContent = `
        .calorias-overview {
            display: grid;
            grid-template-columns: 200px 1fr;
            gap: 32px;
            margin-bottom: 32px;
            align-items: center;
        }
        
        .calorias-circle {
            position: relative;
            width: 150px;
            height: 150px;
            margin: 0 auto;
        }
        
        .circle-progress {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: conic-gradient(var(--primary-color) 0deg 270deg, var(--bg-tertiary) 270deg 360deg);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        
        .circle-progress::before {
            content: '';
            position: absolute;
            width: 80%;
            height: 80%;
            background: var(--bg-secondary);
            border-radius: 50%;
        }
        
        .calories-consumed,
        .calories-total {
            position: relative;
            z-index: 1;
            text-align: center;
        }
        
        .calories-consumed {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-primary);
        }
        
        .calories-total {
            font-size: 14px;
            color: var(--text-secondary);
        }
        
        .macros-breakdown {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        
        .macro {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .macro-name {
            min-width: 100px;
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .macro-bar {
            flex: 1;
            height: 8px;
            background: var(--bg-tertiary);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .macro-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s ease;
        }
        
        .macro-fill.protein {
            background: #ff6b6b;
        }
        
        .macro-fill.carbs {
            background: #4ecdc4;
        }
        
        .macro-fill.fats {
            background: #ffe66d;
        }
        
        .macro-value {
            min-width: 80px;
            font-size: 14px;
            color: var(--text-secondary);
            text-align: right;
        }
        
        .refeicoes-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 24px;
        }
        
        .refeicao-item {
            display: grid;
            grid-template-columns: 60px 1fr 80px;
            gap: 16px;
            padding: 16px;
            background: var(--bg-tertiary);
            border-radius: var(--border-radius-sm);
            align-items: center;
        }
        
        .refeicao-time {
            font-weight: 600;
            color: var(--primary-color);
            font-size: 14px;
        }
        
        .refeicao-details h4 {
            font-size: 16px;
            color: var(--text-primary);
            margin-bottom: 4px;
        }
        
        .refeicao-details p {
            font-size: 14px;
            color: var(--text-secondary);
            margin: 0;
        }
        
        .refeicao-calories {
            font-size: 14px;
            color: var(--text-secondary);
            text-align: right;
        }
    `;
    document.head.appendChild(style);
}

function addIAPageStyles() {
    if (document.querySelector('#ia-page-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'ia-page-styles';
    style.textContent = `
        .ia-header {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 32px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border-color);
        }
        
        .ia-avatar-large {
            width: 80px;
            height: 80px;
            background: var(--primary-gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            color: white;
            box-shadow: var(--shadow-lg);
        }
        
        .ia-intro h3 {
            font-size: 24px;
            color: var(--text-primary);
            margin-bottom: 8px;
        }
        
        .ia-intro p {
            color: var(--text-secondary);
            margin: 0;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }
        
        .feature-card {
            background: var(--bg-tertiary);
            padding: 24px;
            border-radius: var(--border-radius-sm);
            text-align: center;
            cursor: pointer;
            transition: var(--transition);
            border: 1px solid var(--border-color);
        }
        
        .feature-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
            background: var(--primary-gradient);
            color: white;
        }
        
        .feature-card i {
            font-size: 32px;
            color: var(--primary-color);
            margin-bottom: 12px;
        }
        
        .feature-card:hover i {
            color: white;
        }
        
        .chat-container {
            background: var(--bg-tertiary);
            border-radius: var(--border-radius-sm);
            overflow: hidden;
        }
        
        .chat-messages {
            height: 300px;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        
        .message {
            display: flex;
            gap: 12px;
            align-items: flex-start;
        }
        
        .user-message {
            flex-direction: row-reverse;
        }
        
        .message-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            flex-shrink: 0;
        }
        
        .ia-message .message-avatar {
            background: var(--primary-gradient);
            color: white;
        }
        
        .user-message .message-avatar {
            background: var(--bg-primary);
            color: var(--text-primary);
        }
        
        .message-content {
            background: var(--bg-primary);
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 70%;
        }
        
        .user-message .message-content {
            background: var(--primary-color);
            color: white;
        }
        
        .chat-input-container {
            display: flex;
            padding: 16px;
            border-top: 1px solid var(--border-color);
            gap: 12px;
        }
        
        .chat-input-container input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-sm);
            background: var(--bg-primary);
            color: var(--text-primary);
        }
    `;
    document.head.appendChild(style);
}

function addConfigPageStyles() {
    if (document.querySelector('#config-page-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'config-page-styles';
    style.textContent = `
        .config-sections {
            display: flex;
            flex-direction: column;
            gap: 32px;
        }
        
        .config-section {
            background: var(--bg-tertiary);
            padding: 24px;
            border-radius: var(--border-radius-sm);
        }
        
        .config-section h3 {
            color: var(--text-primary);
            margin-bottom: 20px;
            font-size: 18px;
        }
        
        .config-group {
            margin-bottom: 20px;
        }
        
        .config-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
        
        .config-group label {
            display: block;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .config-input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-sm);
            background: var(--bg-primary);
            color: var(--text-primary);
            font-size: 14px;
            transition: var(--transition);
        }
        
        .config-input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }
        
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .toggle-label {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 24px;
            transition: var(--transition);
        }
        
        .toggle-label:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 2px;
            bottom: 2px;
            background-color: var(--text-secondary);
            border-radius: 50%;
            transition: var(--transition);
        }
        
        .toggle-switch input:checked + .toggle-label {
            background-color: var(--primary-color);
            border-color: var(--primary-color);
        }
        
        .toggle-switch input:checked + .toggle-label:before {
            transform: translateX(26px);
            background-color: white;
        }
        
        .config-actions {
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-top: 32px;
        }
    `;
    document.head.appendChild(style);
}

// Show detailed statistics
function showStatDetails(statType, index) {
    const statDetails = {
        'Calorias queimadas hoje': {
            title: 'Calorias Queimadas Hoje',
            current: '1,247 cal',
            goal: '1,400 cal',
            percentage: 89,
            details: [
                'Treino de Força: 420 cal',
                'Caminhada: 180 cal',
                'Atividades diárias: 647 cal'
            ],
            tips: 'Para atingir sua meta, faça mais 15 minutos de cardio ou uma caminhada rápida.'
        },
        'Tempo de treino': {
            title: 'Tempo de Treino',
            current: '45 min',
            goal: '60 min',
            percentage: 75,
            details: [
                'Aquecimento: 5 min',
                'Exercícios principais: 35 min',
                'Alongamento: 5 min'
            ],
            tips: 'Adicione 15 minutos de exercícios complementares para otimizar seus resultados.'
        },
        'Dias consecutivos': {
            title: 'Sequência de Treinos',
            current: '12 dias',
            goal: '30 dias',
            percentage: 40,
            details: [
                'Maior sequência: 18 dias',
                'Média mensal: 22 dias',
                'Próxima meta: 15 dias'
            ],
            tips: 'Você está indo muito bem! Continue assim para bater seu recorde pessoal.'
        },
        'Meta semanal': {
            title: 'Progresso da Meta Semanal',
            current: '85%',
            goal: '100%',
            percentage: 85,
            details: [
                'Treinos realizados: 5/6',
                'Calorias queimadas: 6,235/7,000',
                'Tempo total: 4h 15min/5h'
            ],
            tips: 'Falta apenas 1 treino para completar sua meta semanal!'
        }
    };
    
    const detail = statDetails[statType];
    if (!detail) return;
    
    const modal = createModal(detail.title, `
        <div class="stat-detail-modal">
            <div class="stat-overview">
                <div class="stat-circle">
                    <div class="circle-progress-stat" data-percent="${detail.percentage}">
                        <span class="stat-current">${detail.current}</span>
                        <span class="stat-goal">Meta: ${detail.goal}</span>
                    </div>
                </div>
                <div class="stat-info-detail">
                    <h3>${detail.percentage}% da meta</h3>
                    <p>Progresso atual</p>
                </div>
            </div>
            
            <div class="stat-breakdown">
                <h4>Detalhamento</h4>
                <ul class="breakdown-list">
                    ${detail.details.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="stat-tips">
                <h4>💡 Dica Personalizada</h4>
                <p>${detail.tips}</p>
            </div>
            
            <div class="stat-actions">
                <button class="btn-primary" onclick="setNewGoal('${statType}')">
                    <i class="fas fa-target"></i> Ajustar Meta
                </button>
                <button class="btn-secondary" onclick="viewHistory('${statType}')">
                    <i class="fas fa-history"></i> Ver Histórico
                </button>
            </div>
        </div>
    `);
    
    addStatDetailStyles();
}

// Set new goal for a stat
function setNewGoal(statType) {
    showNotification(`Abrindo configuração de meta para: ${statType}`, 'info');
    closeModal();
}

// View history for a stat
function viewHistory(statType) {
    showNotification(`Abrindo histórico de: ${statType}`, 'info');
    closeModal();
}

// Add styles for stat details modal
function addStatDetailStyles() {
    if (document.querySelector('#stat-detail-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'stat-detail-styles';
    style.textContent = `
        .stat-overview {
            display: grid;
            grid-template-columns: 200px 1fr;
            gap: 32px;
            margin-bottom: 32px;
            align-items: center;
        }
        
        .stat-circle {
            position: relative;
            width: 150px;
            height: 150px;
            margin: 0 auto;
        }
        
        .circle-progress-stat {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: conic-gradient(var(--primary-color) 0deg 306deg, var(--bg-tertiary) 306deg 360deg);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        
        .circle-progress-stat::before {
            content: '';
            position: absolute;
            width: 80%;
            height: 80%;
            background: var(--bg-secondary);
            border-radius: 50%;
        }
        
        .stat-current,
        .stat-goal {
            position: relative;
            z-index: 1;
            text-align: center;
        }
        
        .stat-current {
            font-size: 20px;
            font-weight: 700;
            color: var(--text-primary);
        }
        
        .stat-goal {
            font-size: 12px;
            color: var(--text-secondary);
        }
        
        .stat-info-detail h3 {
            font-size: 32px;
            color: var(--primary-color);
            margin-bottom: 8px;
        }
        
        .stat-info-detail p {
            color: var(--text-secondary);
            margin: 0;
        }
        
        .stat-breakdown {
            margin-bottom: 24px;
        }
        
        .stat-breakdown h4 {
            color: var(--text-primary);
            margin-bottom: 16px;
        }
        
        .breakdown-list {
            list-style: none;
            padding: 0;
        }
        
        .breakdown-list li {
            padding: 8px 0;
            border-bottom: 1px solid var(--border-color-light);
            color: var(--text-secondary);
            display: flex;
            justify-content: space-between;
        }
        
        .breakdown-list li:last-child {
            border-bottom: none;
        }
        
        .stat-tips {
            background: var(--bg-tertiary);
            padding: 20px;
            border-radius: var(--border-radius-sm);
            margin-bottom: 24px;
        }
        
        .stat-tips h4 {
            color: var(--text-primary);
            margin-bottom: 12px;
        }
        
        .stat-tips p {
            color: var(--text-secondary);
            margin: 0;
            line-height: 1.5;
        }
        
        .stat-actions {
            display: flex;
            gap: 12px;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);
} 