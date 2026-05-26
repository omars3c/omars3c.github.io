/* Security Wiki - minimal interactivity */
document.addEventListener('DOMContentLoaded', () => {

    /* --- Language switch (EN / RU) with persistence --- */
    const buttons = document.querySelectorAll('.lang-switch [data-setlang]');

    function setLang(lang) {
        document.body.dataset.lang = lang;
        document.documentElement.lang = lang;
        try {
            localStorage.setItem('wiki-lang', lang);
        } catch (e) { /* ignore */ }
        buttons.forEach(b => b.classList.toggle('active', b.dataset.setlang === lang));
    }

    buttons.forEach(b => b.addEventListener('click', () => setLang(b.dataset.setlang)));

    let saved = null;
    try {
        saved = localStorage.getItem('wiki-lang');
    } catch (e) { /* ignore */ }
    setLang(saved === 'ru' || saved === 'en' ? saved : 'en');

    /* --- Table of contents show/hide toggle (Wikipedia-style) --- */
    const toc = document.getElementById('toc');
    const toggle = document.getElementById('toc-toggle');

    if (toc && toggle) {
        toggle.addEventListener('click', () => {
            const collapsed = toc.classList.toggle('collapsed');
            toggle.textContent = collapsed ? '[show]' : '[hide]';
            toggle.setAttribute('aria-expanded', String(!collapsed));
        });
    }
});
