# Axoma Fitness Website

Este é um site responsivo para a academia Axoma, uma réplica exata do protótipo criado em Framer.

## Visão Geral

O site inclui as seguintes seções:
- Header com navegação e menu móvel responsivo
- Hero section com animação paralaxe e call-to-action
- Seção Sobre Nós com equipe e fotos
- Recursos destacados com imagens e animações
- Planos de preços com efeitos hover
- Formulário de contato funcional
- Footer completo com múltiplas colunas
- **🤖 Axoma IA**: Sistema de IA conversacional integrado com OpenRouter

## Tecnologias Utilizadas

- HTML5 com estrutura semântica
- CSS3 avançado (variáveis CSS, flexbox, animações, media queries)
- JavaScript vanilla (sem dependências externas)
- Intersection Observer API para animações de scroll
- **OpenRouter API**: Integração com múltiplos modelos de IA (Claude, GPT-4, Gemini)
- Fontes do Google (Montserrat)
- Font Awesome para ícones
- Imagens do Unsplash

## Recursos Especiais

- **Design Totalmente Responsivo**: Se adapta perfeitamente a todos os tamanhos de tela
- **Animações em Scroll**: Elementos aparecem suavemente enquanto o usuário rola a página
- **Menu Mobile**: Menu de hambúrguer funcional para dispositivos móveis
- **Efeitos Paralaxe**: Efeito sutil de paralaxe no hero section
- **Validação de Formulário**: Formulário de contato com validação básica de entrada
- **Efeitos Hover**: Interações visuais nos botões, cartões e links
- **🧠 Sistema de IA Inteligente**: Chat conversacional com agentes especializados

## 🤖 Sistema Axoma IA

### Características da IA

- **Agentes Especializados**: Training, Privacy, Tools e Knowledge agents
- **Múltiplos Modelos**: Suporte a Claude 3.5 Sonnet, GPT-4 Turbo, Gemini Pro
- **Respostas Personalizadas**: Prompts especializados para fitness e bem-estar
- **Fallback Inteligente**: Sistema funciona mesmo sem API configurada
- **Interface Moderna**: Chat responsivo com indicadores de status

### Modelos de IA Disponíveis

| Agente | Modelo Padrão | Especialidade |
|--------|---------------|---------------|
| Training Agent | Claude 3.5 Sonnet | Treinos e exercícios |
| Privacy Agent | GPT-4 Turbo | Segurança e privacidade |
| Tools Agent | Gemini Pro 1.5 | Navegação e ferramentas |
| Knowledge Agent | Claude 3.5 Sonnet | Conhecimento geral fitness |

### Configuração da IA

1. **Obter API Key do OpenRouter**:
   - Crie conta em [openrouter.ai](https://openrouter.ai/)
   - Gere uma API Key
   - Adicione créditos à conta

2. **Configurar no Projeto**:
   ```javascript
   // Em openrouter-config.js
   this.apiKey = 'sk-or-v1-sua-api-key-aqui';
   ```

3. **Testar Integração**:
   - Abra `test-openrouter.html` para testes
   - Use `axoma-ia.html` para experiência completa

📖 **Guia Completo**: Consulte `OPENROUTER_SETUP.md` para instruções detalhadas.

## Como Usar

### Site Principal
1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` em seu navegador para visualizar o site

### Sistema de IA
1. Configure a API do OpenRouter (opcional - funciona em modo demo)
2. Acesse `axoma-ia.html` para usar a IA
3. Use `test-openrouter.html` para testar a integração

Para desenvolvimento:
- Edite o arquivo `index.html` para alterar a estrutura do site
- Modifique `styles.css` para alterar os estilos
- Atualize `script.js` para adicionar ou modificar interações
- Configure `openrouter-config.js` para personalizar a IA

## Arquivos do Sistema de IA

| Arquivo | Descrição |
|---------|-----------|
| `axoma-ia.html` | Interface principal da IA |
| `axoma-ia.js` | Lógica do sistema de IA |
| `openrouter-config.js` | Configuração da API OpenRouter |
| `test-openrouter.html` | Página de testes da API |
| `OPENROUTER_SETUP.md` | Guia de configuração completo |

## Personalização

### Cores

As cores principais do site são definidas como variáveis CSS no início do arquivo `styles.css`. Você pode facilmente alterar o esquema de cores modificando esses valores:

```css
:root {
    --primary-color: #3a0ca3;
    --secondary-color: #4361ee;
    --accent-color: #4cc9f0;
    --dark-color: #2b2d42;
    --light-color: #f8f9fa;
    --text-color: #2b2d42;
    --light-text: #f8f9fa;
}
```

### Personalização da IA

#### Modelos de IA
```javascript
// Em openrouter-config.js
this.agentModels = {
    'training': 'anthropic/claude-3.5-sonnet',
    'privacy': 'openai/gpt-4-turbo',
    'tools': 'google/gemini-pro-1.5',
    'knowledge': 'anthropic/claude-3.5-sonnet'
};
```

#### Prompts do Sistema
```javascript
this.systemPrompts = {
    'training': 'Personalizar prompt para treinos...',
    'privacy': 'Personalizar prompt para privacidade...'
};
```

### Imagens

As imagens de destaque nas seções de recursos e equipe estão utilizando links do Unsplash. Para substituir por suas próprias imagens:

1. Para fotos da equipe: Edite os atributos `style="background-image: url('...')"` no HTML
2. Para as seções de recursos: Modifique os URLs no arquivo CSS:

```css
.feature-img.strength {
    background-image: url('caminho/para/sua/imagem.jpg');
}

.feature-img.pilates {
    background-image: url('caminho/para/sua/imagem.jpg');
}
```

### Conteúdo

Todo o conteúdo do site está no arquivo `index.html`. Você pode modificar textos, links e outros elementos diretamente nesse arquivo.

## Responsividade

O site é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Desktop (acima de 1200px)
- Laptop (992px - 1200px)
- Tablet (768px - 992px)
- Mobile (abaixo de 768px)
- Mobile pequeno (abaixo de 576px)

## 💰 Custos da IA (OpenRouter)

Para uso moderado (100-200 interações/dia):
- **Claude 3.5 Sonnet**: ~$2-3/mês
- **GPT-4 Turbo**: ~$5-8/mês
- **Gemini Pro**: ~$0.50-1/mês
- **Uso Misto**: ~$2-5/mês

## 🔒 Segurança

- ✅ API Keys não commitadas no repositório
- ✅ Suporte a variáveis de ambiente
- ✅ Fallback para modo demo
- ✅ Validação de entrada do usuário

## Complementos e Melhorias

### Implementado ✅
- Sistema de IA conversacional com OpenRouter
- Múltiplos agentes especializados
- Interface de chat responsiva
- Sistema de fallback inteligente

### Próximas Melhorias 🚧
- Criar e adicionar um favicon real
- Adicionar fotos de equipe reais
- Integrar com um backend para processamento de formulários
- Adicionar área de login de membros
- Criar página de blog
- Implementar galeria de fotos
- Adicionar animações mais avançadas
- Integrar com APIs de redes sociais
- **Melhorar sistema de IA com memória de conversas**
- **Adicionar suporte a voz/áudio**
- **Integrar análise de dados de treino**

## 🆘 Suporte

### Problemas Gerais
- Verifique o console do navegador (F12)
- Teste em um servidor local (Live Server)

### Problemas da IA
- Consulte `OPENROUTER_SETUP.md`
- Use `test-openrouter.html` para diagnóstico
- Verifique logs no console

---

**🎯 Resultado**: Um site de academia moderno com sistema de IA integrado, pronto para uso profissional! 