document.addEventListener("DOMContentLoaded", () => {
  // Элементы DOM
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  // Конфигурация слайдера
  const config = {
    totalSlides: slides.length,
    slideWidth: 61.355, // в vw
    gap: 2.604, // в vw
    transitionDuration: 600,
  };

  let currentIndex = 0; // Начинаем с первого слайда
  let isAnimating = false;

  // Инициализация слайдера
  function initSlider() {
    // Устанавливаем первый слайд активным
    slides[0].classList.add("active");

    // Прокручиваем к первому слайду
    goToSlide(currentIndex, false);

    // Адаптация к изменению размера окна
    window.addEventListener("resize", () => {
      goToSlide(currentIndex);
    });
  }

  // Переход к конкретному слайду
  function goToSlide(index, smooth = true) {
    if (isAnimating) return;
    if (index < 0) index = 0;
    if (index >= config.totalSlides) index = config.totalSlides - 1;

    isAnimating = true;
    currentIndex = index;

    // Обновляем активный класс для слайдов
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    // Рассчитываем позицию прокрутки
    const slideWidthVW = config.slideWidth;
    const gapVW = config.gap;
    const viewportWidth = window.innerWidth;

    // Конвертируем vw в пиксели
    const slideWidthPx = (slideWidthVW / 100) * viewportWidth;
    const gapPx = (gapVW / 100) * viewportWidth;

    // Позиция для центрирования текущего слайда
    const scrollPosition =
      currentIndex * (slideWidthPx + gapPx) -
      (slider.clientWidth / 2 - slideWidthPx / 2);

    // Прокрутка с возможностью отключения плавности для начальной позиции
    slider.scrollTo({
      left: scrollPosition,
      behavior: smooth ? "smooth" : "auto",
    });

    // Сбрасываем флаг анимации после завершения
    setTimeout(() => {
      isAnimating = false;
    }, config.transitionDuration);
  }

  // Обработчики событий
  prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

  // Автоматическое определение центрального слайда при скролле
  slider.addEventListener("scroll", () => {
    if (isAnimating) return;

    const viewportWidth = window.innerWidth;
    const slideWidthPx = (config.slideWidth / 100) * viewportWidth;
    const gapPx = (config.gap / 100) * viewportWidth;

    const scrollPosition = slider.scrollLeft + slider.clientWidth / 2;
    const newIndex = Math.round(scrollPosition / (slideWidthPx + gapPx));

    if (
      newIndex >= 0 &&
      newIndex < config.totalSlides &&
      newIndex !== currentIndex
    ) {
      currentIndex = newIndex;
      updateActiveState();
    }
  });

  // Обновление активного состояния без анимации прокрутки
  function updateActiveState() {
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }

  // Инициализация
  initSlider();
});
