/**
 * Sikola Indonesia - Navbar Search Logic
 * Handles redirection based on user keywords in the navbar search.
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('navbarSearch');
    const searchBtn = document.getElementById('navbarSearchBtn');

    if (!searchInput || !searchBtn) return;

    function handleSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;

        // Keyword Mapping
        const routes = {
            'artikel': 'artikel.html',
            'ebook': 'artikel.html',
            'modul': 'artikel.html',
            'berita': 'berita.html',
            'event': 'berita.html',
            'seminar': 'berita.html',
            'workshop': 'berita.html',
            'lomba': 'info lomba.html',
            'info lomba': 'info lomba.html',
            'kompetisi': 'info lomba.html',
            'testimoni': 'testimoni.html',
            'juara': 'testimoni.html',
            'ecommerce': 'ecommerce.html',
            'e-commerce': 'ecommerce.html',
            'mentor': 'ecommerce.html',
            'jasa': 'ecommerce.html',
            'tentang': 'index.html#tentang',
            'about': 'index.html#tentang',
            'kontak': 'index.html#kontak',
            'contact': 'index.html#kontak',
            'beranda': 'index.html',
            'home': 'index.html'
        };

        // Check for direct matches
        if (routes[query]) {
            window.location.href = routes[query];
            return;
        }

        // Fuzzy match (contains keyword)
        const matchedKey = Object.keys(routes).find(key => query.includes(key));
        if (matchedKey) {
            window.location.href = routes[matchedKey];
        } else {
            // Default behavior if no match: search in artikel.html (if applicable) or show alert
            alert('Halaman tidak ditemukan. Coba kata kunci lain (contoh: artikel, berita, lomba).');
        }
    }

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleSearch();
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });

    // Mobile Menu Toggle Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link (useful for hash links on the same page)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});
