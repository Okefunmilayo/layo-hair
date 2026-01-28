/* ===== LAYO HAIR - Styles Gallery JavaScript ===== */
/* Mobile-First WebApp */

// ===== STYLES DATA (Matching Original LAYO HAIR) =====
const STYLE_CATEGORIES = {
    braids: ['short-boho', 'knotless', 'lemonade', 'french-curls'],
    cornrows: ['fulani', 'double-cornrows', 'half-cornrows', 'stitch', 'all-back'],
    twists: ['island-twists'],
    locs: ['invisible-locs', 'bantu-knots']
};

const STYLES_DATA = [
    {
        id: 'short-boho',
        name: 'Short Boho Braids',
        category: 'braids',
        price: 180,
        duration: '4-5 hours',
        description: 'Short Boho Braids are the perfect blend of edgy and effortless! This trendy style features shoulder-length knotless braids with beautiful bohemian curly ends that give you that carefree, goddess-like appearance.',
        images: [
            '/assets/images/styles/short-boho-braids/Bob%20Boho%20Braids.jpg',
            '/assets/images/styles/short-boho-braids/boho%20braids%20short%20bob.jpg',
            '/assets/images/styles/short-boho-braids/Boho%20knotless%20bob.jpg',
            '/assets/images/styles/short-boho-braids/short%20boho%20braids.jpg'
        ],
        popular: true
    },
    {
        id: 'fulani',
        name: 'Fulani Braids',
        category: 'cornrows',
        price: 200,
        duration: '5-6 hours',
        description: 'Fulani Braids are a timeless and culturally rich hairstyle that originated from the Fulani people of West Africa. This stunning style features a unique pattern of cornrows braided towards the center or sides, often adorned with beautiful beads.',
        images: [
            '/assets/images/styles/fulani-braids/download%20(6).jpg',
            '/assets/images/styles/fulani-braids/download%20(7).jpg',
            '/assets/images/styles/fulani-braids/download%20(8).jpg',
            '/assets/images/styles/fulani-braids/download%20(9).jpg'
        ],
        popular: true
    },
    {
        id: 'double-cornrows',
        name: 'Double Cornrows',
        category: 'cornrows',
        price: 120,
        duration: '2-3 hours',
        description: 'Double Cornrows are a classic and bold hairstyle that features two large cornrow braids running from the front to the back of the head. This timeless style is perfect for those who want a sleek, athletic, yet stylish look.',
        images: [
            '/assets/images/styles/double-cornrows/download%20(10).jpg',
            '/assets/images/styles/double-cornrows/download%20(11).jpg',
            '/assets/images/styles/double-cornrows/download%20(12).jpg',
            '/assets/images/styles/double-cornrows/download%20(13).jpg'
        ],
        popular: false
    },
    {
        id: 'island-twists',
        name: 'Island Twists',
        category: 'twists',
        price: 180,
        duration: '4-5 hours',
        description: 'Island Twists bring tropical vibes to your look! These beautiful twisted braids create a stunning texture that is both protective and stylish. Perfect for vacation or everyday glamour.',
        images: [
            '/assets/images/styles/island-twists/download%20(14).jpg',
            '/assets/images/styles/island-twists/download%20(15).jpg',
            '/assets/images/styles/island-twists/download%20(16).jpg',
            '/assets/images/styles/island-twists/download%20(17).jpg'
        ],
        popular: false
    },
    {
        id: 'invisible-locs',
        name: 'Invisible Locs',
        category: 'locs',
        price: 220,
        duration: '5-6 hours',
        description: 'Invisible Locs offer a seamless, natural-looking loc style without the long-term commitment. These faux locs are lightweight, versatile, and perfect for those wanting to try the loc look.',
        images: [
            '/assets/images/styles/invisible-locs/download%20(24).jpg',
            '/assets/images/styles/invisible-locs/download%20(25).jpg',
            '/assets/images/styles/invisible-locs/Invisible locs.jpg',
            '/assets/images/styles/invisible-locs/Red invisible locs.jpg'
        ],
        popular: true
    },
    {
        id: 'lemonade',
        name: 'Lemonade Braids',
        category: 'braids',
        price: 180,
        duration: '4-5 hours',
        description: 'Lemonade Braids, made famous by Beyoncé, are side-swept cornrows that exude glamour and sophistication. These stunning braids flow elegantly to one side, creating a red-carpet worthy look.',
        images: [
            '/assets/images/styles/lemonade-braids/download%20(46).jpg',
            '/assets/images/styles/lemonade-braids/download%20(47).jpg',
            '/assets/images/styles/lemonade-braids/download%20(48).jpg',
            '/assets/images/styles/lemonade-braids/Lemonade braids.jpg'
        ],
        popular: true
    },
    {
        id: 'french-curls',
        name: 'French Curls',
        category: 'braids',
        price: 200,
        duration: '5-6 hours',
        description: 'French Curls are soft, romantic, and absolutely stunning! This style features knotless braids with beautiful bouncy curls at the ends, giving you a glamorous and feminine look.',
        images: [
            '/assets/images/styles/french-curls/download%20(34).jpg',
            '/assets/images/styles/french-curls/download%20(35).jpg',
            '/assets/images/styles/french-curls/download%20(36).jpg',
            '/assets/images/styles/french-curls/French curl braids.jpg'
        ],
        popular: false
    },
    {
        id: 'knotless',
        name: 'Knotless Braids',
        category: 'braids',
        price: 200,
        duration: '5-7 hours',
        description: 'Knotless Braids are the go-to protective style for those seeking comfort without compromising on style. Unlike traditional box braids, knotless braids start flat at the root using a feed-in technique.',
        images: [
            '/assets/images/styles/knotless-braids/download%20(37).jpg',
            '/assets/images/styles/knotless-braids/download%20(38).jpg',
            '/assets/images/styles/knotless-braids/download%20(39).jpg',
            '/assets/images/styles/knotless-braids/medium%20knotless%20braids.jpg'
        ],
        popular: true
    },
    {
        id: 'bantu-knots',
        name: 'Bantu Knots',
        category: 'locs',
        price: 100,
        duration: '1.5-2 hours',
        description: 'Bantu Knots are an iconic African hairstyle that has been worn for centuries. These beautiful coiled knots create a stunning crown-like appearance and can also be unraveled for gorgeous curls.',
        images: [
            '/assets/images/styles/bantu-knots/download%20(26).jpg',
            '/assets/images/styles/bantu-knots/download%20(27).jpg',
            '/assets/images/styles/bantu-knots/download%20(28).jpg',
            '/assets/images/styles/bantu-knots/download%20(29).jpg'
        ],
        popular: false
    },
    {
        id: 'half-cornrows',
        name: 'Half Cornrows',
        category: 'cornrows',
        price: 150,
        duration: '3-4 hours',
        description: 'Half Cornrows give you the best of both worlds! This versatile style features cornrows on the top half of your head while leaving the rest of your hair free-flowing or styled differently.',
        images: [
            '/assets/images/styles/half-cornrows/download%20(30).jpg',
            '/assets/images/styles/half-cornrows/download%20(31).jpg',
            '/assets/images/styles/half-cornrows/download%20(32).jpg',
            '/assets/images/styles/half-cornrows/download%20(33).jpg'
        ],
        popular: false
    },
    {
        id: 'stitch',
        name: 'Stitch Braids',
        category: 'cornrows',
        price: 160,
        duration: '3-4 hours',
        description: 'Stitch Braids are a modern twist on classic cornrows, featuring intricate patterns with visible parts that create a stunning "stitched" effect. Perfect for those who love detailed, artistic braiding.',
        images: [
            '/assets/images/styles/stitch-braids/download%20(47).jpg',
            '/assets/images/styles/stitch-braids/download%20(54).jpg',
            '/assets/images/styles/stitch-braids/download%20(55).jpg',
            '/assets/images/styles/stitch-braids/download%20(56).jpg'
        ],
        popular: false
    },
    {
        id: 'all-back',
        name: 'All Back Cornrows',
        category: 'cornrows',
        price: 100,
        duration: '1.5-2 hours',
        description: 'All Back Cornrows are a sleek and timeless classic! This straightforward yet elegant style features cornrows braided straight back from the forehead. Clean, neat, and always in style.',
        images: [
            '/assets/images/styles/all-back-cornrows/download%20(58).jpg',
            '/assets/images/styles/all-back-cornrows/download%20(59).jpg',
            '/assets/images/styles/all-back-cornrows/download%20(60).jpg',
            '/assets/images/styles/all-back-cornrows/Freestyle cornrows.jpg'
        ],
        popular: false
    }
];

// ===== STATE =====
let currentFilter = 'all';

// ===== DOM ELEMENTS =====
const stylesGrid = document.getElementById('styles-grid');
const filterChips = document.querySelectorAll('.filter-chip');

// ===== INITIALIZE =====
function initStylesPage() {
    renderStyles();
    setupFilterListeners();
}

// ===== RENDER STYLES =====
function renderStyles(category = 'all') {
    const filteredStyles = category === 'all'
        ? STYLES_DATA
        : STYLES_DATA.filter(style => {
            const categoryStyles = STYLE_CATEGORIES[category];
            return categoryStyles && categoryStyles.includes(style.id);
        });

    if (filteredStyles.length === 0) {
        stylesGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                    </svg>
                </div>
                <h3>No styles found</h3>
                <p>Try selecting a different category</p>
            </div>
        `;
        return;
    }

    stylesGrid.innerHTML = filteredStyles.map(style => `
        <div class="style-gallery-card" data-style-id="${style.id}">
            <div class="style-card-thumb">
                ${style.popular ? '<span class="badge badge-gold style-card-badge">Popular</span>' : ''}
                <img src="${style.images[0]}" alt="${style.name}" loading="lazy">
            </div>
            <div class="style-card-info">
                <h3>${style.name}</h3>
                <div class="style-card-meta">
                    <span class="style-card-price">From $${style.price}</span>
                    <span class="style-card-count">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                        </svg>
                        ${style.images.length}
                    </span>
                </div>
            </div>
        </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.style-gallery-card').forEach(card => {
        card.addEventListener('click', () => openStyleSheet(card.dataset.styleId));
    });
}

// ===== FILTER =====
function setupFilterListeners() {
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active state
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            // Filter styles
            currentFilter = chip.dataset.category;
            renderStyles(currentFilter);
        });
    });
}

// ===== STYLE DETAIL SHEET =====
function openStyleSheet(styleId) {
    const style = STYLES_DATA.find(s => s.id === styleId);
    if (!style) return;

    // Update sheet content
    document.getElementById('sheet-title').textContent = style.name;
    document.getElementById('sheet-price').textContent = `From $${style.price}`;
    document.getElementById('sheet-duration').textContent = style.duration;
    document.getElementById('sheet-description').textContent = style.description;

    // Update gallery
    document.getElementById('sheet-gallery').innerHTML = style.images.map(img => `
        <div class="sheet-gallery-item">
            <img src="${img}" alt="${style.name}" loading="lazy">
        </div>
    `).join('');

    // Update book button
    document.getElementById('sheet-book-btn').href = `book.html?style=${style.id}`;

    // Open sheet
    App.openBottomSheet('style-sheet');
}

// ===== INITIALIZE ON DOM READY =====
document.addEventListener('DOMContentLoaded', initStylesPage);
