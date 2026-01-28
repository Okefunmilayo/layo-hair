/* ===== LAYO HAIR - Booking JavaScript ===== */
/* Mobile-First WebApp */

// ===== SERVICE DATA (Matching Original LAYO HAIR) =====
const SERVICES = [
    {
        id: 'short-boho',
        name: 'Short Boho Braids',
        price: 180,
        duration: '4-5 hours',
        image: '/assets/images/styles/short-boho-braids/Bob%20Boho%20Braids.jpg'
    },
    {
        id: 'fulani',
        name: 'Fulani Braids',
        price: 200,
        duration: '5-6 hours',
        image: '/assets/images/styles/fulani-braids/download%20(6).jpg'
    },
    {
        id: 'double-cornrows',
        name: 'Double Cornrows',
        price: 120,
        duration: '2-3 hours',
        image: '/assets/images/styles/double-cornrows/download%20(10).jpg'
    },
    {
        id: 'island-twists',
        name: 'Island Twists',
        price: 180,
        duration: '4-5 hours',
        image: '/assets/images/styles/island-twists/download%20(14).jpg'
    },
    {
        id: 'invisible-locs',
        name: 'Invisible Locs',
        price: 220,
        duration: '5-6 hours',
        image: '/assets/images/styles/invisible-locs/download%20(24).jpg'
    },
    {
        id: 'lemonade',
        name: 'Lemonade Braids',
        price: 180,
        duration: '4-5 hours',
        image: '/assets/images/styles/lemonade-braids/download%20(46).jpg'
    },
    {
        id: 'french-curls',
        name: 'French Curls',
        price: 200,
        duration: '5-6 hours',
        image: '/assets/images/styles/french-curls/download%20(34).jpg'
    },
    {
        id: 'knotless',
        name: 'Knotless Braids',
        price: 200,
        duration: '5-7 hours',
        image: '/assets/images/styles/knotless-braids/download%20(37).jpg'
    },
    {
        id: 'bantu-knots',
        name: 'Bantu Knots',
        price: 100,
        duration: '1.5-2 hours',
        image: '/assets/images/styles/bantu-knots/download%20(26).jpg'
    },
    {
        id: 'half-cornrows',
        name: 'Half Cornrows',
        price: 150,
        duration: '3-4 hours',
        image: '/assets/images/styles/half-cornrows/download%20(30).jpg'
    },
    {
        id: 'stitch',
        name: 'Stitch Braids',
        price: 160,
        duration: '3-4 hours',
        image: '/assets/images/styles/stitch-braids/download%20(54).jpg'
    },
    {
        id: 'all-back',
        name: 'All Back Cornrows',
        price: 100,
        duration: '1.5-2 hours',
        image: '/assets/images/styles/all-back-cornrows/download%20(58).jpg'
    }
];

// Available time slots
const TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

// ===== BOOKING STATE =====
const BookingState = {
    currentStep: 1,
    selectedServices: [],
    selectedDate: null,
    selectedTime: null,
    customer: {
        name: '',
        phone: '',
        email: '',
        notes: '',
        firstTime: false
    },
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear()
};

// ===== DOM ELEMENTS =====
const elements = {
    serviceGrid: document.getElementById('service-grid'),
    calendarTitle: document.getElementById('calendar-title'),
    calendarDays: document.getElementById('calendar-days'),
    timeSlots: document.getElementById('time-slots'),
    timeNote: document.getElementById('time-note'),
    nextBtn: document.getElementById('next-btn'),
    backBtn: document.getElementById('back-btn'),
    selectedCount: document.getElementById('selected-count'),
    selectedTotal: document.getElementById('selected-total'),
    bookingFooter: document.getElementById('booking-footer'),
    bookingForm: document.getElementById('booking-form'),
    steps: document.querySelectorAll('.booking-step'),
    progressSteps: document.querySelectorAll('.progress-step'),
    connectors: document.querySelectorAll('.step-connector')
};

// ===== INITIALIZE =====
function initBooking() {
    renderServices();
    renderCalendar();
    setupEventListeners();
    checkUrlParams();
    loadSavedState();
}

// ===== RENDER SERVICES =====
function renderServices() {
    elements.serviceGrid.innerHTML = SERVICES.map(service => `
        <div class="service-card" data-id="${service.id}" data-price="${service.price}">
            <div class="service-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
            <div class="service-card-image">
                <img src="${service.image}" alt="${service.name}" loading="lazy">
            </div>
            <div class="service-card-content">
                <h3>${service.name}</h3>
                <span class="price">$${service.price}</span>
                <span class="duration">${service.duration}</span>
            </div>
        </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => toggleService(card.dataset.id));
    });
}

// ===== SERVICE SELECTION =====
function toggleService(serviceId) {
    const index = BookingState.selectedServices.indexOf(serviceId);

    if (index === -1) {
        BookingState.selectedServices.push(serviceId);
    } else {
        BookingState.selectedServices.splice(index, 1);
    }

    updateServiceUI();
    updateFooterSummary();
    saveState();
}

function updateServiceUI() {
    document.querySelectorAll('.service-card').forEach(card => {
        const isSelected = BookingState.selectedServices.includes(card.dataset.id);
        card.classList.toggle('selected', isSelected);
    });
}

// ===== CALENDAR =====
function renderCalendar() {
    const { currentMonth, currentYear } = BookingState;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Update title
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    elements.calendarTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Get first day and last day of month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    // Build calendar HTML
    let html = '';

    // Previous month days
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month disabled">${prevMonthLastDay - i}</div>`;
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dateStr = formatDateStr(date);
        const isToday = date.getTime() === today.getTime();
        const isPast = date < today;
        const isSunday = date.getDay() === 0; // Closed on Sundays
        const isSelected = BookingState.selectedDate === dateStr;

        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (isPast || isSunday) classes += ' disabled';
        if (isSelected) classes += ' selected';

        html += `<div class="${classes}" data-date="${dateStr}">${day}</div>`;
    }

    // Next month days
    const remainingDays = 42 - (startingDay + totalDays);
    for (let i = 1; i <= remainingDays; i++) {
        html += `<div class="calendar-day other-month disabled">${i}</div>`;
    }

    elements.calendarDays.innerHTML = html;

    // Add click handlers
    document.querySelectorAll('.calendar-day:not(.disabled)').forEach(day => {
        day.addEventListener('click', () => selectDate(day.dataset.date));
    });
}

function selectDate(dateStr) {
    BookingState.selectedDate = dateStr;
    BookingState.selectedTime = null;

    // Update calendar UI
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.toggle('selected', day.dataset.date === dateStr);
    });

    // Render time slots
    renderTimeSlots();
    updateFooterSummary();
    saveState();
}

function changeMonth(delta) {
    BookingState.currentMonth += delta;

    if (BookingState.currentMonth > 11) {
        BookingState.currentMonth = 0;
        BookingState.currentYear++;
    } else if (BookingState.currentMonth < 0) {
        BookingState.currentMonth = 11;
        BookingState.currentYear--;
    }

    renderCalendar();
}

// ===== TIME SLOTS =====
function renderTimeSlots() {
    if (!BookingState.selectedDate) {
        elements.timeNote.textContent = 'Select a date to see available times';
        elements.timeSlots.innerHTML = '';
        return;
    }

    elements.timeNote.textContent = '';

    // Simulate some taken slots (random for demo)
    const takenSlots = ['10:00', '11:30', '14:00', '15:30'];

    elements.timeSlots.innerHTML = TIME_SLOTS.map(time => {
        const isTaken = takenSlots.includes(time);
        const isSelected = BookingState.selectedTime === time;

        let classes = 'time-slot';
        if (isTaken) classes += ' disabled';
        if (isSelected) classes += ' selected';

        return `<div class="${classes}" data-time="${time}">${formatTime(time)}</div>`;
    }).join('');

    // Add click handlers
    document.querySelectorAll('.time-slot:not(.disabled)').forEach(slot => {
        slot.addEventListener('click', () => selectTime(slot.dataset.time));
    });
}

function selectTime(time) {
    BookingState.selectedTime = time;

    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.toggle('selected', slot.dataset.time === time);
    });

    updateFooterSummary();
    saveState();
}

// ===== STEP NAVIGATION =====
function goToStep(step) {
    BookingState.currentStep = step;

    // Update step visibility
    elements.steps.forEach(s => {
        s.classList.toggle('active', s.id === `step-${step}` || s.id === 'step-confirm' && step === 'confirm');
    });

    // Update progress indicators
    elements.progressSteps.forEach((p, i) => {
        const stepNum = i + 1;
        p.classList.toggle('active', stepNum === step);
        p.classList.toggle('completed', stepNum < step);
    });

    elements.connectors.forEach((c, i) => {
        c.classList.toggle('completed', i + 1 < step);
    });

    // Update back button visibility
    elements.backBtn.classList.toggle('hidden', step === 1 || step === 'confirm');

    // Update footer visibility
    elements.bookingFooter.classList.toggle('hidden', step === 'confirm');

    // Update next button text
    if (step === 3) {
        elements.nextBtn.innerHTML = `
            Confirm Booking
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
        `;
    } else {
        elements.nextBtn.innerHTML = `
            Continue
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        `;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    updateFooterSummary();
}

function nextStep() {
    const { currentStep } = BookingState;

    if (currentStep === 1 && BookingState.selectedServices.length === 0) {
        App.showToast('Please select at least one service', 'warning');
        return;
    }

    if (currentStep === 2 && (!BookingState.selectedDate || !BookingState.selectedTime)) {
        App.showToast('Please select a date and time', 'warning');
        return;
    }

    if (currentStep === 3) {
        if (validateForm()) {
            submitBooking();
        }
        return;
    }

    goToStep(currentStep + 1);
}

function prevStep() {
    if (BookingState.currentStep > 1) {
        goToStep(BookingState.currentStep - 1);
    }
}

// ===== FORM HANDLING =====
function validateForm() {
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();

    if (!name) {
        App.showToast('Please enter your name', 'error');
        document.getElementById('customer-name').focus();
        return false;
    }

    if (!phone) {
        App.showToast('Please enter your phone number', 'error');
        document.getElementById('customer-phone').focus();
        return false;
    }

    // Basic phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        App.showToast('Please enter a valid phone number', 'error');
        document.getElementById('customer-phone').focus();
        return false;
    }

    BookingState.customer = {
        name,
        phone,
        email: document.getElementById('customer-email').value.trim(),
        notes: document.getElementById('customer-notes').value.trim(),
        firstTime: document.getElementById('first-time').checked
    };

    return true;
}

function submitBooking() {
    App.showLoading();

    // Simulate API call
    setTimeout(() => {
        App.hideLoading();
        showConfirmation();
        clearSavedState();
    }, 1500);
}

function showConfirmation() {
    const services = BookingState.selectedServices.map(id =>
        SERVICES.find(s => s.id === id)
    );

    const serviceNames = services.map(s => s.name).join(', ');
    const total = services.reduce((sum, s) => sum + s.price, 0);

    // Update confirmation details
    document.getElementById('confirm-service').textContent = serviceNames;
    document.getElementById('confirm-date').textContent = formatDateLong(BookingState.selectedDate);
    document.getElementById('confirm-time').textContent = formatTime(BookingState.selectedTime);
    document.getElementById('confirm-total').textContent = `$${total}`;

    // Update WhatsApp link
    const message = encodeURIComponent(
        `Hi LAYO HAIR! I just booked an appointment:\n\n` +
        `Service: ${serviceNames}\n` +
        `Date: ${formatDateLong(BookingState.selectedDate)}\n` +
        `Time: ${formatTime(BookingState.selectedTime)}\n` +
        `Name: ${BookingState.customer.name}\n\n` +
        `Looking forward to seeing you!`
    );
    document.getElementById('whatsapp-btn').href = `https://wa.me/1234567890?text=${message}`;

    goToStep('confirm');
}

// ===== FOOTER SUMMARY =====
function updateFooterSummary() {
    const { selectedServices, selectedDate, selectedTime, currentStep } = BookingState;

    const count = selectedServices.length;
    const services = selectedServices.map(id => SERVICES.find(s => s.id === id));
    const total = services.reduce((sum, s) => sum + s.price, 0);

    elements.selectedCount.textContent = count === 1 ? '1 service' : `${count} services`;
    elements.selectedTotal.textContent = `$${total}`;

    // Enable/disable next button
    let canProceed = false;

    if (currentStep === 1) {
        canProceed = count > 0;
    } else if (currentStep === 2) {
        canProceed = selectedDate && selectedTime;
    } else if (currentStep === 3) {
        canProceed = true; // Form validation happens on submit
    }

    elements.nextBtn.disabled = !canProceed;
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation buttons
    elements.nextBtn.addEventListener('click', nextStep);
    elements.backBtn.addEventListener('click', prevStep);

    // Calendar navigation
    document.querySelector('.calendar-prev').addEventListener('click', () => changeMonth(-1));
    document.querySelector('.calendar-next').addEventListener('click', () => changeMonth(1));

    // Form inputs - live save
    if (elements.bookingForm) {
        elements.bookingForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', saveState);
        });
    }

    // Handle back navigation
    window.addEventListener('popstate', () => {
        if (BookingState.currentStep > 1) {
            prevStep();
        }
    });
}

// ===== URL PARAMS =====
function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const styleParam = params.get('style');

    if (styleParam && SERVICES.find(s => s.id === styleParam)) {
        BookingState.selectedServices = [styleParam];
        updateServiceUI();
        updateFooterSummary();
    }
}

// ===== STATE PERSISTENCE =====
function saveState() {
    const state = {
        ...BookingState,
        customer: {
            name: document.getElementById('customer-name')?.value || '',
            phone: document.getElementById('customer-phone')?.value || '',
            email: document.getElementById('customer-email')?.value || '',
            notes: document.getElementById('customer-notes')?.value || '',
            firstTime: document.getElementById('first-time')?.checked || false
        }
    };
    sessionStorage.setItem('layoBooking', JSON.stringify(state));
}

function loadSavedState() {
    const saved = sessionStorage.getItem('layoBooking');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            Object.assign(BookingState, state);

            // Restore UI
            updateServiceUI();
            if (state.selectedDate) {
                renderCalendar();
                renderTimeSlots();
            }

            // Restore form
            if (state.customer) {
                const nameInput = document.getElementById('customer-name');
                const phoneInput = document.getElementById('customer-phone');
                const emailInput = document.getElementById('customer-email');
                const notesInput = document.getElementById('customer-notes');
                const firstTimeInput = document.getElementById('first-time');

                if (nameInput) nameInput.value = state.customer.name || '';
                if (phoneInput) phoneInput.value = state.customer.phone || '';
                if (emailInput) emailInput.value = state.customer.email || '';
                if (notesInput) notesInput.value = state.customer.notes || '';
                if (firstTimeInput) firstTimeInput.checked = state.customer.firstTime || false;
            }

            updateFooterSummary();
        } catch (e) {
            console.error('Failed to load saved state:', e);
        }
    }
}

function clearSavedState() {
    sessionStorage.removeItem('layoBooking');
}

// ===== UTILITIES =====
function formatDateStr(date) {
    return date.toISOString().split('T')[0];
}

function formatDateLong(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

// ===== INITIALIZE ON DOM READY =====
document.addEventListener('DOMContentLoaded', initBooking);
