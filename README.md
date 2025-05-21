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

## Tecnologias Utilizadas

- HTML5 com estrutura semântica
- CSS3 avançado (variáveis CSS, flexbox, animações, media queries)
- JavaScript vanilla (sem dependências externas)
- Intersection Observer API para animações de scroll
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

## Como Usar

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` em seu navegador para visualizar o site

Para desenvolvimento:
- Edite o arquivo `index.html` para alterar a estrutura do site
- Modifique `styles.css` para alterar os estilos
- Atualize `script.js` para adicionar ou modificar interações

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

## Complementos e Melhorias

- Criar e adicionar um favicon real
- Adicionar fotos de equipe reais
- Integrar com um backend para processamento de formulários
- Adicionar área de login de membros
- Criar página de blog
- Implementar galeria de fotos
- Adicionar animações mais avançadas
- Integrar com APIs de redes sociais 