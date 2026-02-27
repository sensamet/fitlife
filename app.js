// =========================================
// FitLife — Gym & Beslenme Sitesi
// app.js — Interaktif Özellikler
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------
    // 1. Navbar Scroll Efekti
    // -----------------------------------------
    const header = document.getElementById('site-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // -----------------------------------------
    // 2. Mobile Menü Toggle
    // -----------------------------------------
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Menü linke tıklayınca kapat
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // -----------------------------------------
    // 3. Kas Grubu Filtreleme
    // -----------------------------------------
    const muscleButtons = document.querySelectorAll('.muscle-btn');
    const exerciseCards = document.querySelectorAll('.exercise-card');

    muscleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktif butonu güncelle
            muscleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const group = btn.getAttribute('data-group');

            exerciseCards.forEach(card => {
                if (group === 'all' || card.getAttribute('data-group') === group) {
                    card.classList.remove('hidden');
                    // Animasyonlu gösterim
                    card.style.animation = 'fadeInUp 0.4s ease-out forwards';
                } else {
                    card.classList.add('hidden');
                    card.style.animation = '';
                }
            });
        });
    });

    // -----------------------------------------
    // 4. Beslenme Tab Geçişleri
    // -----------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Tüm tabları deaktif et
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Tıklanan tabı aktif yap
            btn.classList.add('active');
            const tabId = 'tab-' + btn.getAttribute('data-tab');
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // -----------------------------------------
    // 5. Scroll Fade-In Animasyonları
    // -----------------------------------------
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // -----------------------------------------
    // 6. Smooth Scroll (Nav Links)
    // -----------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
