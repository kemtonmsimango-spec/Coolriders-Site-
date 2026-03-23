document.addEventListener('DOMContentLoaded', () => {
    
    // --- Data ---
    const fleetData = [
        {
            name: "Honda Mobilio",
            type: "Six seater comfortable shuttle",
            img: "images/mob.png",
            features: ["Air con", "Privacy glass", "Comfy seats", "Luggage"]
        },
        {
            name: "Polo Vivo Sedan",
            type: "Sedan four seater",
            img: "images/polo.png",
            features: ["Air con", "Leather seats", "Privacy glass"]
        }
    ];

    const defaultReviews = [
        { name: "Sarah M.", rating: 5, text: "I struggled finding Uber so I called CoolRiders and they arrived within 15 minutes." },
        { name: "David K.", rating: 5, text: "Best transport in Hermanus. Clean cars and very polite driver." }
    ];

    // --- Components ---
    const fleetTrack = document.getElementById('fleetTrack');
    const fleetInfo = document.getElementById('fleetInfo');
    const reviewTrack = document.getElementById('reviewTrack');
    const reviewForm = document.getElementById('reviewForm');
    
    // --- Fleet Slider Logic ---
    let currentSlide = 0;
    let autoPlay;
    
    function renderFleet() {
        fleetTrack.innerHTML = "";

        fleetData.forEach((car) => {
            const slide = document.createElement("div");
            slide.className = "fleet-slide";

            const img = document.createElement("img");
            img.alt = car.name;
            // Handle cross-environment paths safely
            img.src = new URL(car.img, document.baseURI).href;

            const placeholder = document.createElement("div");
            placeholder.className = "placeholder-img";
            placeholder.innerHTML = `
                <div>
                    <p>Image Unavailable</p>
                    <small>${car.name}</small>
                </div>
            `;

            // Clean image loading using CSS classes instead of inline styles
            img.onload = () => img.classList.add('img-loaded');
            img.onerror = () => img.classList.add('img-error'); 

            slide.appendChild(img);
            slide.appendChild(placeholder);
            fleetTrack.appendChild(slide);
        });

        updateFleetInfo(0);
        startAutoPlay();
    }

    function updateFleetInfo(index) {
        const car = fleetData[index];
        
        const featureIcons = car.features.map(f => {
            let iconPath = '';
            if(f.includes("Air")) iconPath = '<path d="M9.5 9.5L14.5 14.5M14.5 9.5L9.5 14.5M3 12h18"/>';
            else if(f.includes("Luggage")) iconPath = '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M16 2v4M8 2v4"/>';
            else iconPath = '<circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>';
            
            return `
                <div class="feature-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${iconPath}
                    </svg>
                    <span>${f}</span>
                </div>
            `;
        }).join('');

        fleetInfo.innerHTML = `
            <h4>${car.name}</h4>
            <p style="color:var(--accent-glow); font-size:0.9rem; margin-bottom:0.5rem">${car.type}</p>
            <div class="fleet-features">${featureIcons}</div>
        `;
    }

    function moveSlider(index) {
        // Prevent out of bounds, loop back
        if (index < 0) {
            currentSlide = fleetData.length - 1;
        } else if (index >= fleetData.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }

        // Dynamically calculate width based on container to avoid resize glitches
        const containerWidth = fleetTrack.parentElement.clientWidth;
        fleetTrack.style.transform = `translateX(-${currentSlide * containerWidth}px)`;
        
        updateFleetInfo(currentSlide);
    }

    // Auto Play Management
    function startAutoPlay() {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => {
            moveSlider(currentSlide + 1);
        }, 5000);
    }

    // Recalculate slider position if device is rotated or resized
    window.addEventListener('resize', () => {
        fleetTrack.style.transition = 'none'; // Disable transition temporarily for instant snap
        moveSlider(currentSlide);
        setTimeout(() => fleetTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)', 50);
    });

    // Manual Controls
    document.getElementById('nextBtn').addEventListener('click', () => {
        startAutoPlay(); // Reset timer on manual interaction
        moveSlider(currentSlide + 1);
    });
    
    document.getElementById('prevBtn').addEventListener('click', () => {
        startAutoPlay();
        moveSlider(currentSlide - 1);
    });

    // Touch/Swipe Support
    let startX = 0;
    fleetTrack.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        clearInterval(autoPlay); // Pause while dragging
    }, {passive: true});
    
    fleetTrack.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) moveSlider(currentSlide + 1);
        else if (endX - startX > 50) moveSlider(currentSlide - 1);
        startAutoPlay(); // Resume
    });

    // Initialize Slider
    renderFleet();

    // --- Testimonials Logic ---
    function loadReviews() {
        const stored = localStorage.getItem('coolRidersReviews');
        const reviews = stored ? JSON.parse(stored) : defaultReviews;
        renderReview(reviews[0]);
        
        let rIndex = 0;
        setInterval(() => {
            rIndex = (rIndex + 1) % reviews.length;
            renderReview(reviews[rIndex]);
        }, 6000);
    }

    function renderReview(review) {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        
        const html = `
            <div class="review-card">
                <div class="stars">${stars}</div>
                <p class="review-text">"${review.text}"</p>
                <p class="review-author">- ${review.name}</p>
            </div>
        `;
        
        reviewTrack.style.opacity = 0;
        setTimeout(() => {
            reviewTrack.innerHTML = html;
            reviewTrack.style.opacity = 1;
        }, 300);
    }

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reviewName').value;
        const rating = parseInt(document.getElementById('reviewRating').value);
        const text = document.getElementById('reviewText').value;

        const newReview = { name, rating, text };
        
        let reviews = localStorage.getItem('coolRidersReviews') 
            ? JSON.parse(localStorage.getItem('coolRidersReviews')) 
            : [...defaultReviews];
            
        reviews.unshift(newReview);
        localStorage.setItem('coolRidersReviews', JSON.stringify(reviews));
        
        alert('Thank you for your review!');
        reviewForm.reset();
        renderReview(newReview);
    });

    loadReviews();

    // --- Mobile Menu Logic ---
    const menuBtn = document.querySelector('.mobile-toggle');
    const menu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-btn');
    
    function toggleMenu() {
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
        
        // Update ARIA attribute for accessibility
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
        menuBtn.setAttribute('aria-expanded', !isExpanded);
    }

    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Scroll Reveal Animation ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });
});
