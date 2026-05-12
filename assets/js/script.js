/**
 * Sikola Indonesia - Core Script
 * Handles Navbar Search, Mobile Menu, and Custom Dropdowns.
 */

document.addEventListener('DOMContentLoaded', () => {
    /* --- Navbar Search Logic --- */
    const searchInput = document.getElementById('navbarSearch');
    const searchBtn = document.getElementById('navbarSearchBtn');

    if (searchInput && searchBtn) {
        function handleSearch() {
            const query = searchInput.value.toLowerCase().trim();
            if (!query) return;

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

            if (routes[query]) {
                window.location.href = routes[query];
                return;
            }

            const matchedKey = Object.keys(routes).find(key => query.includes(key));
            if (matchedKey) {
                window.location.href = routes[matchedKey];
            } else {
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
    }

    /* --- Mobile Menu & Dropdown Logic --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a:not(.dropbtn)').forEach(link => {
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

        // Dropdown mobile toggle
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const dropbtn = dropdown.querySelector('.dropbtn');
            if (dropbtn) {
                dropbtn.addEventListener('click', (e) => {
                    if (window.innerWidth <= 1024) {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
    }

    /* --- Global Filter Dropdown Logic (Custom UI Components) --- */
    const filterDropdowns = document.querySelectorAll('.filter-dropdown');
    filterDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.filter-dropdown-trigger');
        const menu = dropdown.querySelector('.filter-dropdown-menu');
        const items = dropdown.querySelectorAll('.filter-dropdown-item');
        const hiddenSelect = dropdown.parentElement.querySelector('.filter-select');
        const triggerText = trigger ? trigger.querySelector('.trigger-text') : null;

        if (!trigger || !menu) return;

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.filter-dropdown-menu').forEach(m => {
                if(m !== menu) m.classList.remove('active');
            });
            menu.classList.toggle('active');
        });

        items.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.dataset.value;
                const text = item.textContent;

                items.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                if (triggerText) triggerText.textContent = text;
                menu.classList.remove('active');

                if (hiddenSelect) {
                    hiddenSelect.value = value;
                    hiddenSelect.dispatchEvent(new Event('change'));
                }
            });
        });

        if (hiddenSelect) {
            hiddenSelect.addEventListener('change', () => {
                const val = hiddenSelect.value;
                const matchingItem = Array.from(items).find(i => i.dataset.value === val);
                if (matchingItem) {
                    items.forEach(i => i.classList.remove('selected'));
                    matchingItem.classList.add('selected');
                    if (triggerText) triggerText.textContent = matchingItem.textContent;
                }
            });
        }
    });

    window.addEventListener('click', () => {
        document.querySelectorAll('.filter-dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
        });
    });

    /* --- Index Page Search Handler --- */
    const indexSearchBtn = document.getElementById('indexSearchBtn');
    if (indexSearchBtn) {
        indexSearchBtn.addEventListener('click', () => {
            const query = document.getElementById('indexSearch').value;
            const kategoriSelect = document.querySelector('.hero-content select[name="kategori"]');
            const kategori = kategoriSelect ? kategoriSelect.value : '';
            
            let url = 'artikel.html?';
            if (query) url += 'q=' + encodeURIComponent(query) + '&';
            if (kategori) url += 'category=' + encodeURIComponent(kategori);
            
            window.location.href = url;
        });
    }

    /* --- Logika Pemutar Musik Latar --- */
    const musicTrackUrl = 'music/CJR __ Lebih Baik (lirik) [A1QCCTfXjFw].mp3';
    
    const musicHTML = `
        <div id="musicToggle" class="music-toggle" title="Putar Musik Latar">
            <i class="fas fa-volume-mute"></i>
        </div>
        <audio id="bgMusic" loop preload="auto">
            <source src="${musicTrackUrl}" type="audio/mpeg">
        </audio>
    `;
    document.body.insertAdjacentHTML('beforeend', musicHTML);

    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) bgMusic.volume = 0.5;

    let isPlaying = localStorage.getItem('musicPlaying') === 'true';

    // Fungsi untuk memulihkan posisi lagu
    function restoreTime() {
        const savedTime = localStorage.getItem('musicTime');
        if (savedTime && bgMusic && isPlaying) {
            bgMusic.currentTime = parseFloat(savedTime);
        }
    }

    // Coba pulihkan saat metadata siap
    if (bgMusic) {
        bgMusic.addEventListener('loadedmetadata', restoreTime);
        restoreTime(); 
    }

    function updateMusicUI() {
        const musicIcon = musicToggle.querySelector('i');
        if (isPlaying) {
            musicToggle.classList.add('playing');
            musicIcon.className = 'fas fa-volume-up';
        } else {
            musicToggle.classList.remove('playing');
            musicIcon.className = 'fas fa-volume-mute';
        }
    }

    function togglePlay() {
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Autoplay diblokir browser."));
            isPlaying = true;
        } else {
            bgMusic.pause();
            isPlaying = false;
        }
        localStorage.setItem('musicPlaying', isPlaying);
        updateMusicUI();
    }

    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
    });

    // Simpan posisi lagu setiap detik jika sedang diputar
    setInterval(() => {
        if (bgMusic && !bgMusic.paused) {
            localStorage.setItem('musicTime', bgMusic.currentTime);
        }
    }, 1000);

    // Update UI awal
    updateMusicUI();

    // Upaya putar otomatis segera (mungkin berhasil jika MEI tinggi)
    if (isPlaying && bgMusic) {
        restoreTime();
        bgMusic.play().catch(() => {
            console.log("Autoplay diblokir, menunggu klik pertama.");
        });
    }

    // Fungsi untuk melanjutkan musik (cadangan jika autoplay gagal)
    const resumeMusic = () => {
        if (isPlaying && bgMusic && bgMusic.paused) {
            restoreTime();
            bgMusic.play().catch(e => {});
        }
        document.removeEventListener('click', resumeMusic);
        document.removeEventListener('touchstart', resumeMusic);
    };

    document.addEventListener('click', resumeMusic);
    document.addEventListener('touchstart', resumeMusic);

    /* --- Lightbox Logic --- */
    const createLightbox = () => {
        const lightboxHTML = `
            <div id="sikolaLightbox" class="sikola-lightbox">
                <div class="lightbox-content">
                    <span class="lightbox-close"><i class="fas fa-times"></i></span>
                    <img id="lightboxImg" src="" alt="Lightbox">
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        
        const lightbox = document.getElementById('sikolaLightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        const openLightbox = (src) => {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });

        return { openLightbox };
    };

    const lightboxSystem = createLightbox();

    // Attach to all elements with mentor-img-frame-new or exp-card-img
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.mentor-img-frame-new') || e.target.closest('.exp-card-img');
        if (trigger) {
            const img = trigger.querySelector('img');
            if (img) {
                lightboxSystem.openLightbox(img.src);
            }
        }
    });
});
