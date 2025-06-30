document.addEventListener("DOMContentLoaded", () => {
  const element = document.getElementById("rotating_circle");
  let rotation = 0;
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const scrollDelta = window.scrollY - lastScrollY;
    rotation += scrollDelta * 0.2;

    element.style.transform = `rotate(${rotation}deg)`;
    lastScrollY = window.scrollY;
  });
});
