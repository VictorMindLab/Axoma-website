# 🚀 Configuração da API OpenRouter - Axoma IA

Este guia vai te ajudar a conectar sua IA da Axoma com a API do OpenRouter para obter respostas reais e inteligentes.

## 📋 Pré-requisitos

1. Uma conta no [OpenRouter](https://openrouter.ai/)
2. Créditos na conta OpenRouter (você pode começar com $5-10)
3. Acesso aos arquivos do projeto Axoma

## 🔧 Passo a Passo

### 1. Criar Conta no OpenRouter

1. Acesse [openrouter.ai](https://openrouter.ai/)
2. Clique em "Sign Up" e crie sua conta
3. Confirme seu email

### 2. Obter API Key

1. Faça login na sua conta OpenRouter
2. Vá para [Keys](https://openrouter.ai/keys)
3. Clique em "Create Key"
4. Dê um nome para sua chave (ex: "Axoma IA")
5. Copie a API Key gerada (começará com `sk-or-v1-...`)

### 3. Adicionar Créditos

1. Vá para [Account](https://openrouter.ai/account)
2. Clique em "Add Credits"
3. Adicione pelo menos $5 para começar
4. Complete o pagamento

### 4. Configurar no Projeto

#### Opção A: Editar Diretamente o Arquivo

1. Abra o arquivo `openrouter-config.js`
2. Encontre a linha:
   ```javascript
   this.apiKey = process.env.OPENROUTER_API_KEY || 'YOUR_API_KEY_HERE';
   ```
3. Substitua `YOUR_API_KEY_HERE` pela sua API Key:
   ```javascript
   this.apiKey = process.env.OPENROUTER_API_KEY || 'sk-or-sua-chave-aqui';
   ```

#### Opção B: Usar Variável de Ambiente (Mais Seguro)

1. Crie um arquivo `.env` na raiz do projeto:
   ```
   OPENROUTER_API_KEY=sk-or-sua-chave-aqui
   ```
2. Adicione `.env` ao seu `.gitignore` para não committar a chave

### 5. Testar a Configuração

1. Abra `axoma-ia.html` no navegador
2. Interaja com a IA
3. Verifique se aparece "🟢 API Conectada" no cabeçalho do chat
4. Teste algumas perguntas sobre fitness

## 🎯 Modelos Recomendados

O projeto está configurado com os seguintes modelos para cada agente:

- **Training Agent**: `anthropic/claude-3.5-sonnet` - Excelente para fitness
- **Privacy Agent**: `openai/gpt-4-turbo` - Ótimo para explicações técnicas
- **Tools Agent**: `google/gemini-pro-1.5` - Bom para navegação
- **Knowledge Agent**: `anthropic/claude-3.5-sonnet` - Melhor para conhecimento
- **Default**: `anthropic/claude-3.5-sonnet` - Equilibrado

## 💰 Custos Estimados

- **Claude 3.5 Sonnet**: ~$3 por 1M tokens de entrada, ~$15 por 1M tokens de saída
- **GPT-4 Turbo**: ~$10 por 1M tokens de entrada, ~$30 por 1M tokens de saída
- **Gemini Pro**: ~$0.125 por 1M tokens de entrada, ~$0.375 por 1M tokens de saída

Para uso moderado (100-200 interações/dia), espere gastar $2-5 por mês.

## 🛠️ Personalização

### Mudar Modelos

Edite `openrouter-config.js`:

```javascript
this.agentModels = {
    'training': 'anthropic/claude-3.5-sonnet',
    'privacy': 'openai/gpt-4-turbo',
    'tools': 'google/gemini-pro-1.5',
    'knowledge': 'meta-llama/llama-3.1-405b-instruct', // Exemplo de mudança
    'default': 'anthropic/claude-3.5-sonnet'
};
```

### Ajustar Prompts de Sistema

Modifique a seção `systemPrompts` no mesmo arquivo para personalizar o comportamento de cada agente.

### Configurar Parâmetros

Ajuste temperatura, max_tokens, etc. conforme necessário:

```javascript
const response = await window.openRouterAPI.makeAPICall(
    conversationHistory, 
    currentAgentType,
    {
        maxTokens: 1500,      // Mais tokens para respostas maiores
        temperature: 0.8,     // Mais criativo (0.1-1.0)
        topP: 0.95           // Diversidade (0.1-1.0)
    }
);
```

## 🔍 Troubleshooting

### Erro "API Key não configurada"

- Verifique se a API Key está correta no arquivo
- Certifique-se que não há espaços extras
- Confirme que a chave começa com `sk-or-v1-`

### Erro 401 Unauthorized

- API Key inválida ou expirada
- Gere uma nova chave no OpenRouter

### Erro 429 Rate Limit

- Muitas requisições por minuto
- Aguarde alguns segundos entre as mensagens

### Erro 402 Payment Required

- Créditos insuficientes na conta
- Adicione mais créditos no OpenRouter

### Erro de CORS

- Use um servidor local (Live Server, etc.)
- Não abra o arquivo HTML diretamente no navegador

## 📊 Monitoramento

1. Acesse [Usage](https://openrouter.ai/activity) no OpenRouter
2. Monitor seu uso e custos
3. Configure alertas de gasto se necessário

## 🔒 Segurança

- ✅ Nunca commite sua API Key no Git
- ✅ Use variáveis de ambiente em produção
- ✅ Monitore o uso regularmente
- ✅ Revogue chaves antigas se necessário

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs do navegador (F12 → Console)
2. Teste a API Key diretamente no OpenRouter
3. Consulte a [documentação oficial](https://openrouter.ai/docs)

## 🎉 Próximos Passos

Após configurar:

1. Teste todos os agentes (Training, Privacy, Tools, Knowledge)
2. Personalize os prompts conforme seu negócio
3. Configure alertas de custo
4. Monitore a qualidade das respostas
5. Ajuste os modelos conforme necessário

---

**🎯 Resultado Final**: Uma IA verdadeiramente inteligente conectada aos melhores modelos do mercado, personalizada para fitness e bem-estar!

**💡 Dica Pro**: Comece com o Claude 3.5 Sonnet para todos os agentes. É um ótimo equilibrio entre qualidade e custo!

# Configuração do OpenRouter API - DeepSeek R1 Distill Qwen 7B

## 📋 Instruções de Configuração

### 1. Obter API Key do OpenRouter

1. Acesse [OpenRouter.ai](https://openrouter.ai/)
2. Crie uma conta ou faça login
3. Vá para **Settings** > **API Keys**
4. Clique em **Create Key**
5. Copie sua API key (ela começa com `sk-or-...`)

### 2. Configurar a API Key

Abra o arquivo `openrouter-config.js` e substitua:

```javascript
this.apiKey = process.env.OPENROUTER_API_KEY || 'YOUR_API_KEY_HERE';
```

Por:

```javascript
this.apiKey = process.env.OPENROUTER_API_KEY || 'sk-or-sua-chave-aqui';
```

### 3. Modelo Configurado

O sistema está configurado para usar exclusivamente o **DeepSeek R1 Distill Qwen 7B**, um modelo avançado e eficiente para:

- ✅ Análise de treinos e exercícios
- ✅ Orientações nutricionais
- ✅ Planejamento de rotinas
- ✅ Motivação e coaching
- ✅ Respostas rápidas e precisas

### 4. Verificar Configuração

1. Abra o `axoma-ia.html` no navegador
2. Verifique o status no canto superior direito:
   - 🟢 **Verde**: API configurada e funcionando
   - 🔴 **Vermelho**: API key necessária
3. Teste enviando uma mensagem

### 5. Custos e Limites

O DeepSeek R1 Distill Qwen 7B é um modelo eficiente com:
- Custo reduzido por token
- Boa performance em português
- Otimizado para conversas longas
- Especializado em conhecimento geral

### 6. Resolução de Problemas

**Erro de API Key:**
- Verifique se copiou a chave completa
- Confirme que a chave está entre aspas simples
- Recarregue a página após alterar

**Erro de Conexão:**
- Verifique sua conexão com a internet
- Confirme se o OpenRouter está funcionando

**Respostas lentas:**
- Normal para modelos avançados
- O DeepSeek R1 é otimizado para qualidade

### 7. Recursos Disponíveis

- **Chat inteligente** com memória de contexto
- **Múltiplos agentes** especializados
- **Exportação** de conversas
- **Interface responsiva** para mobile
- **Status em tempo real** da API

---

💡 **Dica**: Mantenha sua API key privada e nunca a compartilhe publicamente! 