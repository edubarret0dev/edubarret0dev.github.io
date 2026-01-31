// Enhanced site.js - Centralized utilities and theme management
(function () {
  'use strict';

  // === Theme Management ===
  function setupTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    function setTheme(theme) {
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(theme);
      localStorage.setItem('theme', theme);
      themeToggle.textContent = theme === 'theme-dark' ? '🌙 Tema Claro' : '☀️ Tema Escuro';
      themeToggle.setAttribute('aria-label', `Mudar para ${theme === 'theme-dark' ? 'tema claro' : 'tema escuro'}`);
    }

    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'theme-dark' : 'theme-light');
    setTheme(initialTheme);

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
      setTheme(currentTheme === 'theme-dark' ? 'theme-light' : 'theme-dark');
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'theme-dark' : 'theme-light');
      }
    });
  }

  // === Markdown Loading ===
  async function loadMarkdown(selector, mdPath) {
    const container = document.querySelector(selector);
    if (!container) return;

    try {
      container.innerHTML = '<div class="loading">Carregando conteúdo...</div>';

      const response = await fetch(mdPath);
      if (!response.ok) throw new Error(`Failed to load ${mdPath}`);

      const markdown = await response.text();

      if (typeof marked !== 'undefined') {
        container.innerHTML = `<div class="markdown-content fade-in">${marked.parse(markdown)}</div>`;
      } else {
        container.innerHTML = `<div class="markdown-content fade-in"><pre>${markdown}</pre></div>`;
      }
    } catch (error) {
      console.error('Error loading markdown:', error);
      container.innerHTML = `<div class="error">Erro ao carregar conteúdo. Por favor, tente novamente.</div>`;
    }
  }

  // === Template Inclusion ===
  async function includeHTML(selector, path) {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Failed to load ${path}`);

      const html = await response.text();
      document.querySelectorAll(selector).forEach(el => {
        el.innerHTML = html;
      });
    } catch (error) {
      console.warn('Template loading error:', error);
    }
  }

  // === Smooth Scroll ===
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // === Active Menu Highlighting ===
  function highlightActiveMenu() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // === Dynamic Sidebar ===
  function setupSidebar() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) return;

    const sidebarHTML = `
      <aside class="sidebar" style="flex:0 0 360px;">
        <a href="/index.html" aria-label="Voltar para o início">
            <img src="/images/avatar.webp" alt="Foto de Eduardo Barreto" class="sidebar-avatar" loading="lazy">
        </a>
        <h2 class="sidebar-name">Eduardo Barreto</h2>
        <p class="sidebar-bio">Desenvolvedor | Engenheiro | DevOps</p>
        
        <nav class="sidebar-menu">
          <a href="/index.html">Início</a>
          <a href="/pages/projetos.html">Projetos</a>
          <a href="/pages/artigos.html">Artigos</a>
          <a href="/pages/servicos.html">Serviços</a>
          <a href="/pages/downloads.html">Downloads</a>
        </nav>

        <div style="margin-top: auto; width: 100%;">
            <ul class="sidebar-info">
            <li><i class="fa fa-map-marker"></i> Brasil</li>
            <li><i class="fa fa-envelope"></i> edubarret0dev@gmail.com</li>
            <li><i class="fa fa-link"></i> <a href="https://github.com/edubarret0dev" target="_blank">github.com/edubarret0dev</a></li>
            </ul>

            <div class="sidebar-achievements" style="display:flex;gap:1rem;justify-content:center;margin:1rem 0;">
            <span class="badge badge-blue"><i class="fa fa-trophy"></i> Destaque</span>
            <span class="badge badge-purple"><i class="fa fa-star"></i> Pro</span>
            </div>

            <ul class="sidebar-social">
            <li><a href="mailto:edubarret0dev@gmail.com" target="_blank" title="Email"><i class="fa fa-envelope"></i></a></li>
            <li><a href="https://x.com/eduBarret0" target="_blank" title="X"><i class="fa fa-times"></i></a></li>
            <li><a href="https://www.instagram.com/engedubarreto/?hl=pt-br" target="_blank" title="Instagram"><i class="fa fa-instagram"></i></a></li>
            <li><a href="https://www.facebook.com/eduardo.barreto.9277583" target="_blank" title="Facebook"><i class="fa fa-facebook"></i></a></li>
            <li><a href="https://www.youtube.com/channel/UCKlvq21jNbikjJzZiufVNwQ?view_as=subscriber" target="_blank" title="Youtube"><i class="fa fa-youtube"></i></a></li>
            <li><a href="https://www.linkedin.com/in/eduardo-barreto-244575b4/" target="_blank" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
            </ul>
        </div>

        <button id="theme-toggle" aria-label="Alternar tema">🌙 Mudar tema</button>
      </aside>
    `;

    sidebarContainer.innerHTML = sidebarHTML;

    // Re-initialize theme toggle since we just added it to DOM
    setupTheme();
    // Re-initialize active menu highlight
    highlightActiveMenu();
  }

  // === Initialize on DOM Ready ===
  document.addEventListener('DOMContentLoaded', function () {
    // Setup Sidebar first (creates DOM elements)
    setupSidebar();

    // Setup theme toggle (if sidebar exists, setupTheme is called inside setupSidebar, but calling here for safety if sidebar is static)
    if (!document.getElementById('sidebar-container')) {
      setupTheme();
    }

    // Include templates (if using)
    includeHTML('[data-include="header"]', '/templates/header.html');
    includeHTML('[data-include="footer"]', '/templates/footer.html');

    // Load markdown if specified
    const mdAttribute = document.body.getAttribute('data-md');
    if (mdAttribute) {
      loadMarkdown('#content', mdAttribute);
    }

    // Setup smooth scrolling
    setupSmoothScroll();

    // Highlight active menu item (called in setupSidebar, but good to ensure)
    highlightActiveMenu();

    // Add fade-in animation to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.classList.add('fade-in');
    }
  });

  // === Expose utilities globally (if needed) ===
  window.siteUtils = {
    loadMarkdown,
    includeHTML
  };

})();
