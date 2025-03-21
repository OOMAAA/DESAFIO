// Versión mejorada sin React
$(document).ready(function() {
    // Slider de Testimonios
    const testimonials = [
        {
            content: "La colaboración con Replantea ha transformado por completo nuestro modelo energético...",
            author: "Elena Martínez",
            position: "Directora de Sostenibilidad, TechCorp",
            image: "assets/img/testimonial-1.jpg"
        },
        // Agregar más testimonios...
    ];

    let currentSlide = 0;
    const $slider = $('#testimonialsSlider');
    const $dotsContainer = $('#paginationDots');
    let autoSlideInterval;

    function createPaginationDots() {
        testimonials.forEach((_, index) => {
            $dotsContainer.append(`<div class="pagination-dot ${index === 0 ? 'active' : ''}"></div>`);
        });
    }

    function updateSlider() {
        $slider.empty();
        
        const testimonial = testimonials[currentSlide];
        const testimonialHTML = `
            <div class="testimonial-item active">
                <div class="testimonial-content">
                    <p>${testimonial.content}</p>
                </div>
                <div class="testimonial-author">
                    <div class="author-image">
                        <img src="${testimonial.image}" alt="${testimonial.author}">
                    </div>
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <span>${testimonial.position}</span>
                    </div>
                </div>
            </div>
        `;
        
        $slider.html(testimonialHTML);
        $('.pagination-dot').removeClass('active');
        $('.pagination-dot').eq(currentSlide).addClass('active');
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            updateSlider();
        }, 5000);
    }

    // Event Listeners
    $('#nextTestimonial').click(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        updateSlider();
        resetAutoSlide();
    });

    $('#prevTestimonial').click(() => {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        updateSlider();
        resetAutoSlide();
    });

    $dotsContainer.on('click', '.pagination-dot', function() {
        currentSlide = $(this).index();
        updateSlider();
        resetAutoSlide();
    });

    $slider.hover(
        () => clearInterval(autoSlideInterval),
        () => startAutoSlide()
    );

    // Inicialización
    createPaginationDots();
    updateSlider();
    startAutoSlide();

    // Efecto Parallax
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        $('.hero-section').css('background-position', `center ${scrolled * 0.5}px`);
    });

    // Animación al hacer scroll
    function animateOnScroll() {
        $('.service-card, .project-card').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }

    $(window).scroll(animateOnScroll);
    animateOnScroll();

    // Validación de formulario en tiempo real
    $('#contactForm input, #contactForm textarea').on('input', function() {
        const $input = $(this);
        if ($input.val().trim() === '') {
            $input.removeClass('valid').addClass('error');
        } else {
            $input.removeClass('error').addClass('valid');
        }
    });

    // Contadores animados
    $('.counter').each(function() {
        const $this = $(this);
        const target = parseInt($this.text());
        
        $({ count: 0 }).animate({ count: target }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
                $this.text(Math.ceil(this.count));
            }
        });
    });
});