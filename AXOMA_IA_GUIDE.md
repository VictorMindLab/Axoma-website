# 🤖 Axoma IA - Guia de Uso

## 📋 Visão Geral

A **Axoma IA** agora possui uma página dedicada para interação com o assistente de fitness! Ao clicar na seção "Axoma IA" no sidebar do dashboard, você será redirecionado para uma experiência completa de chat com a IA.

## 🚀 Como Acessar

1. **No Dashboard**: Clique na opção "Axoma IA" no menu lateral (ícone de cérebro)
2. **Redirecionamento Automático**: Você será levado para `axoma-ia.html`
3. **Botão Voltar**: Use o botão "Voltar" no cabeçalho para retornar ao dashboard

## ✨ Funcionalidades da Página IA

### 🎨 Interface Moderna
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Tema Claro/Escuro**: Alternância de tema com persistência local
- **Animações Suaves**: Transições e efeitos visuais elegantes

### 💬 Chat Inteligente
- **Respostas Contextuais**: A IA responde baseada em palavras-chave
- **Indicador de Digitação**: Mostra quando a IA está "pensando"
- **Timestamps**: Horário de cada mensagem
- **Auto-scroll**: Rolagem automática para novas mensagens

### 🎯 Recursos Laterais
- **Recursos Disponíveis**: 
  - Análise de Progresso
  - Plano Personalizado
  - Orientação Nutricional
  - Coach Motivacional
  - Sugestões de Exercícios

- **Perguntas Rápidas**: Botões com perguntas pré-definidas
- **Estatísticas da Sessão**: Contador de mensagens, tempo e recomendações

### ⌨️ Atalhos de Teclado
- **Enter**: Enviar mensagem
- **Shift + Enter**: Nova linha
- **Ctrl + L**: Limpar chat

### 🎭 Emojis e Ações
- **Botões de Emoji**: Adicione emojis fitness rapidamente (💪🏃‍♂️🥗📊)
- **Limpar Chat**: Botão para resetar a conversa

## 🧠 Inteligência da IA

### 📚 Base de Conhecimento
A IA responde a diversos tópicos:

#### 🏋️ Treinos
- Planejamento de exercícios
- Técnicas e progressão
- Treinos para iniciantes
- Exercícios em casa vs academia

#### 🥗 Nutrição
- Orientações alimentares
- Cálculo de macros
- Hidratação
- Timing de refeições

#### 📈 Progresso
- Acompanhamento de métricas
- Motivação e disciplina
- Recuperação e descanso

#### 🏥 Saúde
- Prevenção de lesões
- Qualidade do sono
- Gerenciamento de stress

### 🎯 Exemplos de Perguntas
```
"Como melhorar meu treino?"
"Sugestões de nutrição para ganho de massa"
"Exercícios para iniciantes"
"Como manter a motivação?"
"Treino em casa sem equipamentos"
"Quantas proteínas devo consumir?"
```

## 🛠️ Arquivos Técnicos

### 📁 Estrutura
```
axoma-ia.html       # Página principal da IA
axoma-ia.js         # Lógica e funcionalidades
dashboard.js        # Modificado para redirecionamento
```

### 🔧 Modificações no Dashboard
```javascript
// No dashboard.js, linha ~108
case 'ia':
    // Redirect to dedicated IA page
    window.location.href = 'axoma-ia.html';
    break;
```

## 🎨 Personalização

### 🌙 Temas
- **Tema Escuro**: Padrão, cores suaves para os olhos
- **Tema Claro**: Alternativa clara e moderna
- **Persistência**: Tema salvo no localStorage

### 📱 Responsividade
- **Desktop**: Layout de duas colunas (sidebar + chat)
- **Mobile**: Layout empilhado, sidebar abaixo do chat
- **Adaptativo**: Ajusta automaticamente ao tamanho da tela

## 🚀 Próximos Passos

### 🔮 Melhorias Futuras
1. **Integração com Backend**: Conectar com API real de IA
2. **Histórico de Conversas**: Salvar conversas anteriores
3. **Análise de Dados**: Integrar com dados reais do usuário
4. **Notificações Push**: Lembretes e sugestões proativas
5. **Comandos de Voz**: Interação por voz
6. **Exportar Conversas**: Salvar recomendações em PDF

### 🔗 Integrações Possíveis
- **OpenAI GPT**: Para respostas mais avançadas
- **Dados de Wearables**: Integração com smartwatches
- **Calendário**: Agendamento automático de treinos
- **Nutrição**: Integração com apps de contagem calórica

## 🎯 Benefícios para o Usuário

### ✅ Experiência Melhorada
- **Foco Total**: Página dedicada sem distrações
- **Interação Natural**: Chat fluido e intuitivo
- **Respostas Rápidas**: Sugestões pré-definidas
- **Acessibilidade**: Interface clara e navegável

### 📊 Acompanhamento
- **Estatísticas**: Métricas da sessão de chat
- **Progresso**: Contador de recomendações recebidas
- **Tempo**: Acompanhamento do tempo de conversa

## 🔧 Como Implementar

1. **Copie os Arquivos**: `axoma-ia.html` e `axoma-ia.js`
2. **Modifique o Dashboard**: Atualize `dashboard.js` com o redirecionamento
3. **Teste a Navegação**: Verifique se o link funciona corretamente
4. **Personalize**: Ajuste cores, textos e funcionalidades conforme necessário

---

**🎉 Pronto!** Agora você tem uma experiência completa de IA integrada ao seu sistema Axoma. A navegação é intuitiva e a experiência do usuário foi significativamente melhorada com esta página dedicada. 