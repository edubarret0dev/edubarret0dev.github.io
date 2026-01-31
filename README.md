# Eduardo Barreto 

Bem-vindo ao repositório do site pessoal e portfólio profissional de Eduardo Barreto! Este projeto foi desenvolvido para apresentar informações sobre a carreira, projetos, serviços, artigos e downloads de forma organizada e visualmente atraente.

## 🌟 Visão Geral

Este site foi projetado com o objetivo de destacar as habilidades e realizações de Eduardo Barreto, proporcionando uma experiência de navegação intuitiva e moderna. Ele inclui:

- **Página Inicial**: Uma introdução ao perfil profissional.
- **Artigos**: Publicações e insights sobre temas relevantes.
- **Projetos**: Portfólio de projetos realizados.
- **Serviços**: Descrição dos serviços oferecidos.
- **Downloads**: Recursos e materiais disponíveis para download.

## 🛠️ Tecnologias Utilizadas

- **HTML5** e **CSS3**: Para a estrutura e estilização das páginas.
- **JavaScript**: Para funcionalidades interativas, como alternância de temas e renderização de conteúdo Markdown.
- **Sass**: Para organização e manutenção eficiente dos estilos.
- **Font Awesome**: Para ícones modernos e responsivos.
- **Marked.js**: Para renderização de conteúdo Markdown.

## 🚀 Funcionalidades

- **Renderização de Markdown**: O conteúdo das páginas é gerado dinamicamente a partir de arquivos Markdown.
- **Alternância de Tema**: Escolha entre tema claro e escuro, com preferência salva em cookies.
- **Design Responsivo**: Layout adaptável para diferentes dispositivos.

## 📂 Estrutura do Projeto

```
assets/
  css/       # Arquivos CSS e imagens relacionadas
  fonts/     # Fontes utilizadas no projeto
  js/        # Scripts JavaScript
  sass/      # Arquivos Sass organizados por componentes e layouts
content/     # Arquivos Markdown com o conteúdo das páginas
images/      # Imagens utilizadas no site
pages/       # Páginas HTML individuais
templates/   # Templates reutilizáveis (cabeçalho e rodapé)
```

## 🌐 Como Acessar

O site está hospedado no GitHub Pages e pode ser acessado aqui:
[Eduardo Barreto - Portfólio Profissional](https://edubarret0dev.github.io)

## 🔄 Atualizações recentes

- Atualizados os links do GitHub para `github.com/edubarret0dev`.
- Adicionado `images/favicon.svg` e `site.webmanifest` para suporte a ícones/favicons.

## 🖼️ Favicons e compatibilidade

Incluí um favicon SVG em `images/favicon.svg`. Para compatibilidade com navegadores antigos e iOS, é recomendável gerar também PNGs e um `favicon.ico`. Exemplo com ImageMagick:

```bash
# Requer ImageMagick
convert images/favicon.svg -background none -resize 32x32 images/favicon-32.png
convert images/favicon.svg -background none -resize 16x16 images/favicon-16.png
convert images/favicon-32.png images/favicon-16.png images/favicon.ico
```

As tags já adicionadas ao `<head>` dos arquivos HTML:

```html
<link rel="icon" href="/images/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/images/favicon.svg" sizes="any">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0A0A0A">
```

## 📝 Como Contribuir

Contribuições são bem-vindas! Siga os passos abaixo para colaborar:

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature ou correção: `git checkout -b minha-feature`.
3. Commit suas alterações: `git commit -m 'Minha nova feature'`.
4. Faça o push para a branch: `git push origin minha-feature`.
5. Abra um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE.txt` para mais informações.

---

Desenvolvido com 💻 e ☕ por Eduardo Barreto
