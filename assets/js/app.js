/* ===== LAYO HAIR - Main App JavaScript ===== */
/* Mobile-First WebApp */

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/v2/sw.js')
            .then((registration) => {
                console.log('SW registered:', registration.scope);

                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New content is available, show update prompt
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch((error) => {
                console.log('SW registration failed:', error);
            });
    });
}

// ===== APP STATE =====
const App = {
    isOnline: navigator.onLine,

    init() {
        this.setupEventListeners();
        this.setupNetworkListeners();
        this.setupScrollEffects();
        this.initializeActiveNav();
    },

    setupEventListeners() {
        // Mobile menu toggle (if needed)
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', this.toggleMobileMenu);
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Handle back button for modals/sheets
        window.addEventListener('popstate', this.handleBackButton);
    },

    setupNetworkListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.showToast('You\'re back online!', 'success');
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showToast('You\'re offline. Some features may be limited.', 'warning');
        });
    },

    setupScrollEffects() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 10;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add shadow on scroll
            if (currentScroll > 0) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // Hide/show header on scroll (optional, disabled by default)
            // if (currentScroll > lastScroll && currentScroll > 100) {
            //     header.classList.add('header-hidden');
            // } else {
            //     header.classList.remove('header-hidden');
            // }

            lastScroll = currentScroll;
        }, { passive: true });
    },

    initializeActiveNav() {
        // Get current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        // Update bottom nav active state
        document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update desktop nav active state
        document.querySelectorAll('.desktop-nav .nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    toggleMobileMenu() {
        document.body.classList.toggle('menu-open');
    },

    handleBackButton(e) {
        // Close any open modals/sheets
        const activeSheet = document.querySelector('.bottom-sheet.active');
        const activeModal = document.querySelector('.modal-backdrop.active');

        if (activeSheet) {
            e.preventDefault();
            App.closeBottomSheet(activeSheet.id);
        }

        if (activeModal) {
            e.preventDefault();
            App.closeModal();
        }
    },

    // ===== TOAST NOTIFICATIONS =====
    showToast(message, type = 'info', duration = 4000) {
        // Create toast container if doesn't exist
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-message">${message}</span>
            <button class="toast-close" aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;

        // Add close handler
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.removeToast(toast);
        });

        // Add to container
        container.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);
    },

    removeToast(toast) {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    },

    // ===== BOTTOM SHEET =====
    openBottomSheet(sheetId) {
        const sheet = document.getElementById(sheetId);
        const backdrop = document.querySelector('.modal-backdrop');

        if (sheet && backdrop) {
            backdrop.classList.add('active');
            sheet.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Push state for back button handling
            history.pushState({ sheet: sheetId }, '');

            // Close on backdrop click
            backdrop.addEventListener('click', () => {
                this.closeBottomSheet(sheetId);
            });
        }
    },

    closeBottomSheet(sheetId) {
        const sheet = document.getElementById(sheetId);
        const backdrop = document.querySelector('.modal-backdrop');

        if (sheet && backdrop) {
            sheet.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    // ===== MODAL =====
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        const backdrop = document.querySelector('.modal-backdrop');

        if (modal && backdrop) {
            backdrop.classList.add('active');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            history.pushState({ modal: modalId }, '');
        }
    },

    closeModal() {
        const modals = document.querySelectorAll('.modal.active');
        const backdrop = document.querySelector('.modal-backdrop');

        modals.forEach(modal => modal.classList.remove('active'));
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
    },

    // ===== LOADING =====
    showLoading() {
        let overlay = document.querySelector('.loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'loading-overlay';
            overlay.innerHTML = '<div class="spinner"></div>';
            document.body.appendChild(overlay);
        }
        overlay.style.display = 'flex';
    },

    hideLoading() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    },

    // ===== UTILITIES =====
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    formatTime(time) {
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).format(date);
    },

    // Debounce utility
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle utility
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Show update notification
function showUpdateNotification() {
    App.showToast('A new version is available. Refresh to update.', 'info', 10000);
}

// Add slide out animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-20px); opacity: 0; }
    }
    .header-scrolled {
        box-shadow: var(--shadow-md);
    }
    .header-hidden {
        transform: translateY(-100%);
    }
    .toast-close {
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        padding: var(--space-1);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .toast-close:hover {
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for use in other scripts
window.App = App;
