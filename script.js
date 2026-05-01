// --- script.js ---
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // --- 2. Scroll Reveal Animations ---
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

    // --- 3. Fleet Carousel (Home Page) ---
    const fleetData = [
        { name: "6 Seater Vehicle", image: "images/vehicle-1.png", features: ["Spacious Legroom", "Air Conditioned", "Extra Luggage Space"] },
        { name: "4 Seater Vehicle", image: "images/vehicle-2.png", features: ["Comfortable Seating", "Climate Control", "Smooth Ride"] }
    ];

    const fleetTrack = document.getElementById('fleetTrack');
    const fleetInfo = document.getElementById('fleetInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentFleetIndex = 0;

    function renderFleet() {
        if (!fleetTrack || !fleetInfo) return;
        
        fleetTrack.innerHTML = fleetData.map(item => `
            <div class="fleet-slide">
                <img src="${item.image}" alt="${item.name}">
            </div>
        `).join('');

        updateFleetDisplay();
    }

    function updateFleetDisplay() {
        if (!fleetTrack || !fleetInfo) return;
        fleetTrack.style.transform = `translateX(-${currentFleetIndex * 100}%)`;
        const item = fleetData[currentFleetIndex];
        fleetInfo.innerHTML = `
            <h4>${item.name}</h4>
            <div class="fleet-features">
                ${item.features.map(f => `<span class="feature-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-glow)" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> ${f}</span>`).join('')}
            </div>
        `;
    }

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentFleetIndex = (currentFleetIndex + 1) % fleetData.length;
            updateFleetDisplay();
        });
        prevBtn.addEventListener('click', () => {
            currentFleetIndex = (currentFleetIndex - 1 + fleetData.length) % fleetData.length;
            updateFleetDisplay();
        });
        renderFleet();
    }

    // --- 4. Continuous Modern Review Slider (Home Page) ---
    const reviewData = [
        { name: "Mark Holt", initial: "M", color: "#4285F4", time: "2 weeks ago", text: "Foster run a fantastic safe and reliable service. My wife spends 3 months in Hermanus each year. We use Cool Riders everyday." },
        { name: "Louise Holt", initial: "L", color: "#34A853", time: "1 month ago", text: "Consistently good. We have been using Cool riders service for several years. They are quick to respond and always on time." },
        { name: "Delilah Gildenhuys", initial: "D", color: "#FBBC05", time: "3 weeks ago", text: "I have always felt comfortable riding with them. They are always on time and friendly. A brilliant local business." },
        { name: "Francois Swart", initial: "F", color: "#EA4335", time: "2 months ago", text: "Great drive down the coast. The driver knew all the best spots and the car was immaculate. Will use again." },
        { name: "Sarah Jenkins", initial: "S", color: "#8E24AA", time: "4 months ago", text: "Used them for a wine tour. Excellent local knowledge and very professional throughout the day." }
    ];

    const modernReviewTrack = document.getElementById('modernReviewTrack');

    if (modernReviewTrack) {
        // Generate Cards
        const generateCardsHTML = () => reviewData.map(r => `
            <div class="review-card-modern premium-glow">
                <div class="card-header">
                    <div class="reviewer-info">
                        <div class="avatar" style="background:${r.color};">${r.initial}</div>
                        <div class="details">
                            <h5 class="name">
                                ${r.name}
                                <svg class="verified-badge" width="16" height="16" viewBox="0 0 24 24" fill="#0f62fe" stroke="none"><circle cx="12" cy="12" r="10" fill="#0f62fe"/><path d="M9 12l2 2 4-4" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </h5>
                            <span class="time">${r.time}</span>
                        </div>
                    </div>
                    <div class="google-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    </div>
                </div>
                <div class="stars-solid">★★★★★</div>
                <p class="review-text">"${r.text}"</p>
            </div>
        `).join('');

        // Duplicate for seamless loop
        modernReviewTrack.innerHTML = generateCardsHTML() + generateCardsHTML();
    }

    // --- 5. Hotel Image Rotation (Home Page) ---
    const hotelSlides = document.querySelectorAll('.hotel-slide');
    if (hotelSlides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            hotelSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % hotelSlides.length;
            hotelSlides[currentSlide].classList.add('active');
        }, 4000); // Change image every 4 seconds
    }

    // --- 6. FAQ Accordion (About Page) ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if(questionBtn && answer) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if(otherAnswer) otherAnswer.style.maxHeight = null;
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        }
    });

    // --- 7. Wine Tour Planner (Tours Page) ---
    const buildTourBtn = document.getElementById('buildTourBtn');
    if (buildTourBtn) {
        buildTourBtn.addEventListener('click', () => {
            const checkedBoxes = document.querySelectorAll('.wine-pill input:checked');
            const selectedWineries = Array.from(checkedBoxes).map(cb => cb.value);
            
            let message = "Hi Coolriders, I would like to plan a Wine Tour.";
            if (selectedWineries.length > 0) {
                message += ` I am interested in visiting the following estates: ${selectedWineries.join(', ')}.`;
            } else {
                message += " Could you help me plan a custom itinerary?";
            }
            
            message += " Please let me know your availability and rates.";
            
            const whatsappUrl = `https://wa.me/27796753908?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});
