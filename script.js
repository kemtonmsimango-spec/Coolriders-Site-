document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu ---
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Fleet Data & Carousel ---
    const fleetData = [
        { name: "6 Seater Vechicle", features: ["6 Seats", "Cold Aircon", "Spacious Legroom"], image: "images/mob.png" },
        { name: "4 Seater Vechicle", features: ["4 Seats", "Cold Aircon", "Leather Interior"], image: "images/polo.png" },
        
    ];

    const fleetTrack = document.getElementById('fleetTrack');
    const fleetInfo = document.getElementById('fleetInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentFleetIndex = 0;

    function renderFleet() {
        if (!fleetTrack || !fleetInfo) return;
        
        // Render Track Slides
        fleetTrack.innerHTML = fleetData.map(item => `
            <div class="fleet-slide">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/600x400?text=${item.name}'">
            </div>
        `).join('');

        updateFleetDisplay();
    }

    function updateFleetDisplay() {
        fleetTrack.style.transform = `translateX(-${currentFleetIndex * 100}%)`;
        const item = fleetData[currentFleetIndex];
        fleetInfo.innerHTML = `
            <h4>${item.name}</h4>
            <div class="fleet-features">
                ${item.features.map(f => `<span class="feature-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> ${f}</span>`).join('')}
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
    }

    // --- Hotel Slider ---
    const hotelTrack = document.getElementById('hotelSliderTrack');
    let hotelIndex = 0;
    const hotelSlides = document.querySelectorAll('.hotel-slide');

    function autoSlideHotels() {
        if (!hotelTrack || hotelSlides.length === 0) return;
        hotelIndex = (hotelIndex + 1) % hotelSlides.length;
        hotelTrack.style.transform = `translateX(-${hotelIndex * 100}%)`;
    }
    setInterval(autoSlideHotels, 4000);

    // --- Testimonials System ---
    const reviews = [
        { name: "Sarah Jenkins", rating: 5, text: "Consistently good. We are swallows and we have been using Cool riders service for several years. They are quick to respond and always on time and I always feel completely safe. They have collected our children and our friends many many times. I can highly recommend them. Not only are they professional but they are really nice people who you can completely trust. This is a business that is going to go places, watch this space !" },
        { name: "Mark Thorne", rating: 5, text: "Not gonna lie, I was expecting something average but this was actually proper service. Respect." }
		
    ];

    const reviewTrack = document.getElementById('reviewTrack');
    let reviewIndex = 0;

    function renderReview() {
        if (!reviewTrack || reviews.length === 0) return;
        const r = reviews[reviewIndex];
        const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
        
        reviewTrack.innerHTML = `
            <div class="review-card">
                <div class="stars">${stars}</div>
                <p class="review-text">"${r.text}"</p>
                <p class="review-author">- ${r.name}</p>
            </div>
        `;
        reviewIndex = (reviewIndex + 1) % reviews.length;
    }

    setInterval(renderReview, 5000);
    renderReview();

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reviewName').value;
            const rating = parseInt(document.getElementById('reviewRating').value);
            const text = document.getElementById('reviewText').value;

            reviews.push({ name, rating, text });
            alert("Thank you for your review!");
            reviewForm.reset();
        });
    }

    // --- Reveal Animation Observer ---
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

    // Initialize
    renderFleet();
});
