// Данные о цветах
const colorData = {
    100: { name: "Лебедь (матовый)", hex: "#F8F8F6" },      // белый
    101: { name: "Байкал (матовый)", hex: "#1B5CB7" },     // синий
    102: { name: "Перец (матовый)", hex: "#C13B3A" },      // красный
    103: { name: "Ваниль (матовый)", hex: "#F6E6B2" },    // светло-жёлтый
    104: { name: "Яблоко (матовый)", hex: "#1BA13A" },    // зелёный
    106: { name: "Сахара (матовый)", hex: "#F3C43C" },    // жёлтый
    107: { name: "Шоколад (матовый)", hex: "#6B2B1B" },   // коричневый
    108: { name: "Керамика (матовый)", hex: "#A44A2A" },  // терракотовый
    109: { name: "Коралл (матовый)", hex: "#F6A06B" },    // оранжевый/коралл
    110: { name: "Серебро (матовый)", hex: "#B7B9B6" },   // серый
    111: { name: "Уголь (матовый)", hex: "#232323" }      // чёрный/графит
};

document.addEventListener('DOMContentLoaded', function() {
    const colorStrip = document.querySelector('.color-strip');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const colorPreview = document.querySelector('.color-preview');
    const colorName = document.querySelector('.color-name');
    const colorCode = document.getElementById('color-code');
    const copyBtn = document.querySelector('.copy-btn');

    // Создаем цветовые блоки
    Object.entries(colorData).forEach(([number, data]) => {
        const colorBlock = document.createElement('div');
        colorBlock.className = 'color-block';
        colorBlock.style.backgroundColor = data.hex;
        colorBlock.setAttribute('data-color-number', number);

        const colorNumber = document.createElement('div');
        colorNumber.className = 'color-number';
        colorNumber.textContent = number;

        colorBlock.appendChild(colorNumber);
        colorStrip.appendChild(colorBlock);
    });

    // Функция обновления деталей цвета
    function updateColorDetails(colorBlock) {
        const number = colorBlock.getAttribute('data-color-number');
        const data = colorData[number];
        
        // Удаляем класс active у всех блоков
        document.querySelectorAll('.color-block').forEach(block => {
            block.classList.remove('active');
        });
        
        // Добавляем класс active выбранному блоку
        colorBlock.classList.add('active');

        // Обновляем детали цвета
        colorPreview.style.backgroundColor = data.hex;
        colorName.textContent = data.name;
        colorCode.textContent = data.hex;
    }

    // Обработчик клика по цветовому блоку
    colorStrip.addEventListener('click', (e) => {
        const colorBlock = e.target.closest('.color-block');
        if (colorBlock) {
            updateColorDetails(colorBlock);
        }
    });

    // Копирование кода цвета
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(colorCode.textContent);
            
            // Визуальный фидбэк
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Скопировано';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Ошибка при копировании:', err);
        }
    });

    // Навигация стрелками
    leftArrow.addEventListener('click', () => {
        colorStrip.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    });

    rightArrow.addEventListener('click', () => {
        colorStrip.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    });

    // Инициализация первого цвета
    const firstColorBlock = colorStrip.querySelector('.color-block');
    if (firstColorBlock) {
        updateColorDetails(firstColorBlock);
    }

    // Показываем/скрываем стрелки в зависимости от прокрутки
    colorStrip.addEventListener('scroll', () => {
        const isAtStart = colorStrip.scrollLeft === 0;
        const isAtEnd = colorStrip.scrollLeft + colorStrip.clientWidth >= colorStrip.scrollWidth;

        leftArrow.style.opacity = isAtStart ? '0.5' : '1';
        rightArrow.style.opacity = isAtEnd ? '0.5' : '1';
    });

    // Слайдер для секции доставки
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const slideWidth = 100; // 100%
    
    // Функция для обновления позиции слайдера
    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        // Обновляем активную точку
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Переход к следующему слайду
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSliderPosition();
    }
    
    // Переход к предыдущему слайду
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSliderPosition();
    }
    
    // Обработчики событий для кнопок
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Обработчики событий для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSliderPosition();
        });
    });
    
    // Автоматическое переключение слайдов
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Останавливаем автопереключение при наведении на слайдер
    const sliderContainer = document.querySelector('.slider-container');
    
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Свайп на мобильных устройствах
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    sliderContainer.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });
    
    sliderContainer.addEventListener('touchend', () => {
        const swipeDistance = touchEndX - touchStartX;
        const minSwipeDistance = 50;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Улучшенная мобильная навигация
        const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileClose = document.querySelector('.mobile-close');
    const body = document.body;

    if (menuToggle && mobileNav && mobileOverlay) {
        // Открытие/закрытие меню
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = menuToggle.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Закрытие меню при клике на кнопку закрытия
        if (mobileClose) {
            mobileClose.addEventListener('click', function(e) {
                e.preventDefault();
                closeMobileMenu();
            });
        }

        // Закрытие меню при клике на оверлей
        mobileOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
        });

        // Закрытие меню при клике на ссылку
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Не закрываем меню для внешних ссылок
                if (this.getAttribute('href').startsWith('#')) {
                    closeMobileMenu();
                }
            });
        });

        // Закрытие меню при нажатии Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuToggle.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Закрытие меню при изменении ориентации экрана
        window.addEventListener('orientationchange', function() {
            setTimeout(() => {
                closeMobileMenu();
            }, 100);
        });

        // Закрытие меню при изменении размера окна
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

        function openMobileMenu() {
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            mobileNav.classList.add('active');
            mobileOverlay.classList.add('active');
            body.classList.add('menu-open');
            
            // Фокус на первое меню для доступности
            const firstLink = mobileNav.querySelector('a');
            if (firstLink) {
                setTimeout(() => {
                    firstLink.focus();
                }, 300);
            }
    }

    function closeMobileMenu() {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Возвращаем фокус на кнопку меню
            menuToggle.focus();
        }

        // Улучшенная обработка свайпов для закрытия меню
        let touchStartX = 0;
        let touchEndX = 0;

        mobileNav.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        mobileNav.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            // Свайп влево закрывает меню
            if (diff > swipeThreshold) {
                closeMobileMenu();
            }
        }

        // Добавляем атрибуты доступности
        menuToggle.setAttribute('aria-controls', 'mobile-nav');
        menuToggle.setAttribute('aria-label', 'Открыть меню');
    }

    // Active menu item
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        let scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Установить активную ссылку при загрузке страницы

    // Обработка сертификатов
    const certificateItems = document.querySelectorAll('.certificate-item');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.document-viewer-close');
    const certificateFullImage = document.querySelector('.certificate-full-image');
    const certificateFullPdf = document.querySelector('.certificate-full-pdf');

    // Открытие модального окна при клике на сертификат
    certificateItems.forEach(item => {
        item.addEventListener('click', () => {
            const pdfSrc = item.getAttribute('data-pdf');
            const imgSrc = item.querySelector('img').src;
            if (pdfSrc) {
                certificateFullPdf.src = pdfSrc;
                certificateFullPdf.style.display = 'block';
                certificateFullImage.style.display = 'none';
            } else {
                certificateFullImage.src = imgSrc;
                certificateFullImage.style.display = 'block';
                certificateFullPdf.style.display = 'none';
            }
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        certificateFullPdf.src = '';
        certificateFullImage.src = '';
        certificateFullPdf.style.display = 'none';
        certificateFullImage.style.display = 'none';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Закрытие по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (modalOverlay && e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Обработка переключения табов в информационном разделе
    const infoTabs = document.querySelectorAll('.info-tab');
    const infoBlocks = document.querySelectorAll('.info-block');

    infoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Убираем активный класс у всех табов
            infoTabs.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс нажатому табу
            tab.classList.add('active');

            // Скрываем все блоки
            infoBlocks.forEach(block => {
                block.style.display = 'none';
            });

            // Показываем нужный блок
            const targetId = tab.getAttribute('data-tab');
            const targetBlock = document.getElementById(targetId);
            if (targetBlock) {
                targetBlock.style.display = 'block';
            }
        });
    });

    // Плавная прокрутка по якорям меню (и футера)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Плавная прокрутка наверх по клику на логотип
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
      logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Параллакс эффект
    const parallaxSections = document.querySelectorAll('.section-parallax');
    
    window.addEventListener('scroll', function() {
        parallaxSections.forEach(section => {
            const distance = window.pageYOffset - section.offsetTop;
            const parallaxBg = section.querySelector('.parallax-bg');
            if (parallaxBg) {
                parallaxBg.style.transform = `translateY(${distance * 0.5}px)`;
            }
        });
    });

    // --- Для любых поверхностей ---
    const surfaceCards = document.querySelectorAll('.surface-static-card');
    const surfaceDescs = document.querySelectorAll('.surface-desc');

    function showSurfaceDesc(surface) {
        surfaceDescs.forEach(desc => {
            desc.style.display = desc.id === 'desc-' + surface ? 'block' : 'none';
        });
        surfaceCards.forEach(card => {
            card.classList.toggle('active', card.dataset.surface === surface);
        });
    }

    // По умолчанию показываем первую (минеральные)
    showSurfaceDesc('mineral');

    surfaceCards.forEach(card => {
        card.addEventListener('click', function() {
            showSurfaceDesc(card.dataset.surface);
        });
    });

    // --- Модальное окно для блога ---
    const blogLinks = document.querySelectorAll('.blog-link');
    const blogModal = document.getElementById('blog-modal');
    const blogModalClose = blogModal ? blogModal.querySelector('.blog-modal-close') : null;
    const blogModalBody = blogModal ? blogModal.querySelector('.blog-modal-body') : null;
    const blogCards = document.querySelectorAll('.blog-card');

    // Сохраняем полные тексты новостей (можно расширить по желанию)
    const blogFullTexts = [
      {
        title: 'Как правильно выбрать краску для фасада',
        date: '15 марта 2024',
        category: 'Советы',
        image: 'images/Painter.jpg',
        content: `<p>Узнайте основные критерии выбора фасадной краски для долговечной и качественной отделки вашего дома.</p>
        <p><b>Полный текст:</b> При выборе фасадной краски важно учитывать тип поверхности, климатические условия, паропроницаемость и стойкость к ультрафиолету. Рекомендуется выбирать краску с высокой адгезией и эластичностью, чтобы покрытие не трескалось и не отслаивалось со временем. Не забывайте о правильной подготовке поверхности и соблюдении технологии нанесения.</p>`
      },
      {
        title: 'Подготовка поверхности перед покраской',
        date: '10 марта 2024',
        category: 'Инструкция',
        image: 'images/Painter.jpg',
        content: `<p>Пошаговое руководство по правильной подготовке поверхности для достижения идеального результата.</p>
        <p><b>Полный текст:</b> Перед покраской необходимо очистить поверхность от пыли, грязи, жира и старых покрытий. Для минеральных оснований рекомендуется использовать грунтовку для улучшения адгезии. Влажные и рыхлые участки следует устранить. Только после подготовки можно приступать к нанесению краски.</p>`
      },
      {
        title: 'Инновации в производстве красок',
        date: '5 марта 2024',
        category: 'Новости',
        image: 'images/Painter.jpg',
        content: `<p>Обзор современных технологий и инноваций в производстве лакокрасочных материалов.</p>
        <p><b>Полный текст:</b> В последние годы появились краски с наночастицами, самоочищающимися свойствами и повышенной экологичностью. Новые технологии позволяют создавать покрытия, устойчивые к агрессивным средам и механическим воздействиям, что значительно увеличивает срок службы фасадов и других поверхностей.</p>`
      }
    ];

    function openBlogModal(index) {
      if (!blogModal || !blogModalBody) return;
      const blog = blogFullTexts[index];
      blogModalBody.innerHTML = `
        <div class="blog-modal-header">
          <span class="blog-modal-category">${blog.category}</span>
          <span class="blog-modal-date">${blog.date}</span>
        </div>
        <h2 class="blog-modal-title">${blog.title}</h2>
        <img src="${blog.image}" alt="${blog.title}" class="blog-modal-img" />
        <div class="blog-modal-content-text">${blog.content}</div>
      `;
      blogModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeBlogModal() {
      if (!blogModal) return;
      blogModal.classList.remove('active');
      document.body.style.overflow = '';
      if (blogModalBody) blogModalBody.innerHTML = '';
    }

    blogLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const index = this.getAttribute('data-blog-index');
        if (index !== null) {
          openBlogModal(Number(index));
        }
      });
    });

    if (blogModalClose) {
      blogModalClose.addEventListener('click', closeBlogModal);
    }
    if (blogModal) {
      blogModal.addEventListener('click', function(e) {
        if (e.target === blogModal) {
          closeBlogModal();
        }
      });
    }
    document.addEventListener('keydown', function(e) {
      if (blogModal && e.key === 'Escape' && blogModal.classList.contains('active')) {
        closeBlogModal();
      }
    });
}); 