// click button to send WA message
document.getElementById('whatsappForm').addEventListener('submit', function(event){
    event.preventDefault();
    const phoneNumber = "6281246764183";
    const name = document.getElementById('userName').value.trim();
    const inquiry = document.getElementById('inquiryType').value;
    const rawMessage = `Halo, nama saya ${name}. Saya ingin ${inquiry} perumahan Putri Garden Residence 2.`;
    const encodedMessage = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
});


// Toggle menu for hamburger icon
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
}

// Type 36 Carousel Logic (5 images)
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const currentSlideSpan = document.getElementById('current-slide');
const totalSlides = slides.length;

function updateCarousel() {
    slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
    });
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
    });
    if (currentSlideSpan) currentSlideSpan.textContent = currentSlide + 1;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

if (totalSlides > 0) {
    let carouselTimer = setInterval(nextSlide, 4500);
    const container = document.getElementById('carousel-container');
    if (container) {
        container.addEventListener('mouseenter', () => clearInterval(carouselTimer));
        container.addEventListener('mouseleave', () => carouselTimer = setInterval(nextSlide, 4500));
    }
}

// About Me Carousel Logic
let currentAbout = 0;
const aboutSlides = document.querySelectorAll('.about-slide');
const totalAbout = aboutSlides.length;

function updateAboutCarousel() {
    aboutSlides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentAbout);
    });
}

function nextAboutSlide() {
    currentAbout = (currentAbout + 1) % totalAbout;
    updateAboutCarousel();
}

function prevAboutSlide() {
    currentAbout = (currentAbout - 1 + totalAbout) % totalAbout;
    updateAboutCarousel();
}

if (totalAbout > 0) {
    setInterval(nextAboutSlide, 5000);
}

// KPR FLPP Accordion Logic
function toggleAccordion(button) {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(acc => {
        acc.classList.remove('active');
    });

    // If it wasn't active before, open it
    if (!isActive) {
        item.classList.add('active');
    }
}

// Modal Controls
function openModal() {
    const modal = document.getElementById('siteplan-modal');
    if (modal) modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('siteplan-modal');
    if (modal) modal.classList.remove('active');
}

window.addEventListener('click', (e) => {
    const modal = document.getElementById('siteplan-modal');
    if (e.target === modal) {
        closeModal();
    }
});

const modalBody = document.querySelector('.modal-body');
const img = modalBody.querySelector('img');

let scale = 1;
let pointX = 0;
let pointY = 0;
let startX = 0;
let startY = 0;
let isDragging = false;

// Update image transform position and scale
function setTransform() {
    img.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
}

// 1. Drag to Pan
modalBody.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - pointX;
    startY = e.clientY - pointY;
    modalBody.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    pointX = e.clientX - startX;
    pointY = e.clientY - startY;
    setTransform();
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    modalBody.style.cursor = 'grab';
});

// 2. Scroll Wheel to Zoom (Zooms smoothly into where your mouse is pointing)
modalBody.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    const xs = (e.clientX - pointX) / scale;
    const ys = (e.clientY - pointY) / scale;
    
    const zoomIntensity = 0.1;
    if (e.deltaY < 0) {
        scale *= (1 + zoomIntensity); // Zoom in
    } else {
        scale /= (1 + zoomIntensity); // Zoom out
    }

    // Limit min and max zoom levels
    scale = Math.max(1, Math.min(scale, 4)); // Min size 1x, Max size 4x

    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;

    // Reset position if zoomed all the way out
    if (scale === 1) {
        pointX = 0;
        pointY = 0;
    }

    setTransform();
}, { passive: false });