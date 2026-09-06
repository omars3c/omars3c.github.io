/* ============================================================
   Omar Alikhanov - Minimalist Dark Portfolio
   Smooth interactions, Tabs navigation, i18n Language toggle
   Mobile touch optimization
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Language switch (EN / RU) with persistence --- */
    const langButtons = document.querySelectorAll('.lang-switch [data-setlang]');

    function setLang(lang) {
        document.body.dataset.lang = lang;
        document.documentElement.lang = lang;
        try {
            localStorage.setItem('portfolio-lang', lang);
        } catch (e) { /* ignore */ }

        langButtons.forEach(b => {
            b.classList.toggle('active', b.dataset.setlang === lang);
        });
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => setLang(btn.dataset.setlang));
    });

    let savedLang = null;
    try {
        savedLang = localStorage.getItem('portfolio-lang') || localStorage.getItem('wiki-lang');
    } catch (e) { /* ignore */ }

    setLang(savedLang === 'ru' || savedLang === 'en' ? savedLang : 'en');

    /* --- Tabs Navigation (Screenshot aesthetic & Mobile Centering) --- */
    const tabButtons = document.querySelectorAll('.tab-btn[data-tab]');
    const tabPanes = document.querySelectorAll('.tab-content[data-tab-content]');

    function switchTab(tabId) {
        tabButtons.forEach(btn => {
            const isActive = btn.dataset.tab === tabId;
            btn.classList.toggle('active', isActive);
            if (isActive) {
                // Smoothly center the active tab in mobile horizontal scroll view
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });

        tabPanes.forEach(pane => {
            if (pane.dataset.tabContent === tabId) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    /* --- Subtle Card Hover Lighting Effect (Only on devices with pointer hover) --- */
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const cards = document.querySelectorAll('.showcase-card, .compact-card, .story-block');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
});
