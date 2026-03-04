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
    
    // Duplicate data for infinite loop illusion
    const loopData = [...fleetData, ...fleetData]; 
    
  function renderFleet() {
    fleetTrack.innerHTML = "";

    loopData.forEach((car) => {
        const slide = document.createElement("div");
        slide.className = "fleet-slide";

        // Create IMG
        const img = document.createElement("img");
        img.alt = car.name;

        // GitHub Pages safe path resolution
        img.src = new URL(car.img, document.baseURI).href;

        // Placeholder
        const placeholder = document.createElement("div");
        placeholder.className = "placeholder-img";
        placeholder.innerHTML = `
            <div>
                <p>Insert vehicle image here</p>
                <small>${car.name}</small>
            </div>
        `;

        // When image loads: SHOW image, HIDE placeholder (force with !important)
        img.onload = () => {
            img.style.setProperty("display", "block", "important");
            img.style.setProperty("width", "100%", "important");
            img.style.setProperty("height", "100%", "important");
            img.style.setProperty("object-fit", "cover", "important");

            placeholder.style.setProperty("display", "none", "important");
        };

        // If image fails: HIDE image, SHOW placeholder
        img.onerror = () => {
            img.style.setProperty("display", "none", "important");
            placeholder.style.setProperty("display", "flex", "important");
            console.log("Image failed to load:", img.src);
        };

        // Default state before load
        img.style.setProperty("display", "block", "important");

        slide.appendChild(img);
        slide.appendChild(placeholder);
        fleetTrack.appendChild(slide);
    });

    updateFleetInfo(0);
}

    function updateFleetInfo(index) {
        // Modulo to handle the "infinite" indexes
        const dataIndex = index % fleetData.length;
        const car = fleetData[dataIndex];
        
        // Generate SVG icons based on features string
        const featureIcons = car.features.map(f => {
            let iconPath = '';
            if(f.includes("Air")) iconPath = '<path d="M9.5 9.5L14.5 14.5M14.5 9.5L9.5 14.5M3 12h18"/>'; // rough air icon
            else if(f.includes("Luggage")) iconPath = '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M16 2v4M8 2v4"/>';
            else iconPath = '<circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>'; // generic check
            
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
        const slideWidth = fleetTrack.clientWidth;
        fleetTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        fleetTrack.style.transform = `translateX(-${index * slideWidth}px)`;
        currentSlide = index;
        updateFleetInfo(index);

        // Reset for infinite loop illusion
        if (index >= loopData.length - 1) {
            setTimeout(() => {
                fleetTrack.style.transition = 'none';
                currentSlide = 0; // jump back to start (which is identical to end)
                fleetTrack.style.transform = `translateX(0px)`;
            }, 500);
        }
    }

    // Auto Loop
    let autoPlay = setInterval(() => {
        moveSlider(currentSlide + 1);
    }, 4000);

    // Manual Controls
    document.getElementById('nextBtn').addEventListener('click', () => {
        clearInterval(autoPlay);
        moveSlider(currentSlide + 1);
    });
    
    document.getElementById('prevBtn').addEventListener('click', () => {
        clearInterval(autoPlay);
        if (currentSlide > 0) moveSlider(currentSlide - 1);
    });

    // Touch/Swipe Support
    let startX = 0;
    fleetTrack.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    fleetTrack.addEventListener('touchend', e => {
        clearInterval(autoPlay);
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) moveSlider(currentSlide + 1);
        if (endX - startX > 50 && currentSlide > 0) moveSlider(currentSlide - 1);
    });

    // --- Testimonials Logic ---
    function loadReviews() {
        const stored = localStorage.getItem('coolRidersReviews');
        const reviews = stored ? JSON.parse(stored) : defaultReviews;
        renderReview(reviews[0]);
        
        let rIndex = 0;
        setInterval(() => {
            rIndex = (rIndex + 1) % reviews.length;
            renderReview(reviews[rIndex]);
        }, 5000);
    }

    function renderReview(review) {
        // Create stars string
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        
        const html = `
            <div class="review-card">
                <div class="stars">${stars}</div>
                <p class="review-text">"${review.text}"</p>
                <p class="review-author">- ${review.name}</p>
            </div>
        `;
        
        // Simple fade transition
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
        
        // Get existing or default
        let reviews = localStorage.getItem('coolRidersReviews') 
            ? JSON.parse(localStorage.getItem('coolRidersReviews')) 
            : [...defaultReviews];
            
        reviews.unshift(newReview); // Add to top
        localStorage.setItem('coolRidersReviews', JSON.stringify(reviews));
        
        alert('Thank you for your review!');
        reviewForm.reset();
        
        // Force render new review immediately
        renderReview(newReview);
    });

    // --- Mobile Menu ---
    const menuBtn = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        // Animate hamburger
        const spans = menuBtn.querySelectorAll('span');
        if(menu.classList.contains('active')){
            spans[0].style.transform = "rotate(45deg) translate(5px, 6px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
        } else {
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        }
    });

    // Close menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            // reset hamburger
            const spans = menuBtn.querySelectorAll('span');
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        });
    });

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });

    // Initialize
    renderFleet();
    loadReviews();

});

