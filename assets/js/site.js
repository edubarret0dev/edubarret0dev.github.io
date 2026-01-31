// Central site utilities: include templates, load markdown, theme toggle
(function(){
  function includeHTML(selector, path){
    fetch(path).then(r => { if(!r.ok) throw new Error('Failed to load '+path); return r.text(); })
      .then(html => {
        document.querySelectorAll(selector).forEach(el => el.innerHTML = html);
      }).catch(err => console.warn(err));
  }

  function loadMarkdownInto(selector, mdPath){
    fetch(mdPath).then(r => { if(!r.ok) throw new Error('Failed to load '+mdPath); return r.text(); })
      .then(text => {
        const container = document.querySelector(selector);
        if(!container) return;
        container.innerHTML = window.marked ? window.marked.parse(text) : text;
      }).catch(err => console.warn(err));
  }

  function setupTheme(){
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if(saved === 'dark') root.classList.add('dark');

    document.addEventListener('click', function(e){
      const t = e.target.closest('[data-theme-toggle], #theme-toggle');
      if(!t) return;
      if(root.classList.toggle('dark')) localStorage.setItem('theme','dark'); else localStorage.setItem('theme','light');
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    // include header & footer (use absolute paths so pages work from any folder)
    includeHTML('[data-include="header"]', '/templates/header.html');
    includeHTML('[data-include="footer"]', '/templates/footer.html');

    // load markdown if body[data-md] is present
    const md = document.body && document.body.getAttribute('data-md');
    if(md) loadMarkdownInto('#content', md);

    setupTheme();
  });
})();
