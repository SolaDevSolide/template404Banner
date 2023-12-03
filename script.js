document.addEventListener("DOMContentLoaded", function () {

    // Images Animation

    const content = document.querySelector('.content')
    const slider = document.querySelector('.slider');
    let slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let initalSlideCount = slides.length;
    let isCloningRequired = true;

    function getVisibleSlides() {
        return window.innerWidth >= 768 ? 2 : 1;
    }

    function setSlidesWidth() {
        const containerWidth = content.offsetWidth;
        const margin = 10; // Margin between slides
        const visibleSlides = getVisibleSlides();
        const totalMargin = margin * 2 * (visibleSlides);
        const slideWidth = Math.floor((containerWidth - totalMargin) / visibleSlides);

        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
            slide.style.marginRight = `${margin}px`;
            slide.style.marginLeft = `${margin}px`;
        });

        adjustSliderPosition();
    }

    function adjustSliderPosition() {
        const slideWidth = slides[0].offsetWidth;
        const slideMargin = 10 * 2; // Margin for each slide
        const totalSlideWidth = Math.floor(slideWidth + slideMargin); // Total width including margin
        slider.style.transform = `translateX(-${currentSlide * totalSlideWidth}px)`;
    }

    function cloneSlides() {
        for (let i = 0; i < initalSlideCount; i++) {
            const cloneSlide = slides[i].cloneNode(true);
            slider.appendChild(cloneSlide);
        }
        slides = document.querySelectorAll('.slide'); // Update the slides NodeList
    }

    function updateSlideVisibility() {
        slides.forEach((slide, index) => {
            if (index >= currentSlide && index < currentSlide + getVisibleSlides()) {
                slide.classList.remove('hidden');
                slide.classList.add('visible');
            } else {
                slide.classList.remove('visible');
                slide.classList.add('hidden');
            }
        });
    }

    function nextSlide() {
        currentSlide++;

        if ((currentSlide + 1) % initalSlideCount == 0) {
            isCloningRequired = true;
        }

        if (isCloningRequired) {
            cloneSlides();
            isCloningRequired = false;
        }

        adjustSliderPosition();
        updateSlideVisibility(); // Update visibility of slides
    }

    window.addEventListener('resize', () => {
        setSlidesWidth();
        isCloningRequired = true; // Reset flag to clone again if needed
        updateSlideVisibility();
    });

    if (isCloningRequired) {
        cloneSlides();
        isCloningRequired = false;
    }
    setSlidesWidth();
    updateSlideVisibility();
    setInterval(nextSlide, 5000);

    // Text animation

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/";

    let interval = null;

    document.querySelector("h1").onmouseover = event => {  
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
        event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
            if(index < iteration) {
            return event.target.dataset.value[index];
            }
        
            return letters[Math.floor(Math.random() * letters.length)]
        })
        .join("");
        
        if(iteration >= event.target.dataset.value.length){ 
        clearInterval(interval);
        }
        
        iteration += 1 / 3;
    }, 30);
    }
});


function startTextAnimation() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/";

    let interval = null;

    const h1Element = document.querySelector("h1");
    
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
        h1Element.innerText = h1Element.innerText
        .split("")
        .map((letter, index) => {
            if(index < iteration) {
                return h1Element.dataset.value[index];
            }
            
            return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");
        
        if(iteration >= h1Element.dataset.value.length){ 
            clearInterval(interval);
        }
        
        iteration += 1 / 5;
    }, 50);
}

// Call the animation function when the document is ready
document.addEventListener("DOMContentLoaded", startTextAnimation);


// JavaScript function to justify the description text
function justifyDescription() {
    const description = document.querySelector(".description");
    const maxLength = 300; // Set the maximum length for justifying to the left

    if (description.textContent.length > maxLength) {
        description.classList.add("left-justified");
    } else {
        description.classList.remove("left-justified");
    }
}

// Call the justifyDescription function when the document is ready
document.addEventListener("DOMContentLoaded", justifyDescription);