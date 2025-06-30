document.addEventListener("DOMContentLoaded", () => {
  const allMonthButtons = document.querySelectorAll(".month-btn");
  const allSections = document.querySelectorAll(".month-section");

  allMonthButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetMonth = button.dataset.month;
      const targetSection = document.getElementById(`${targetMonth}-events`);

      allSections.forEach((section) => {
        section.classList.add("none");
        section.classList.remove("block");
      });

      targetSection.classList.remove("none");
      targetSection.classList.add("block");
    });
  });
  // events
  const registerButtons = document.querySelectorAll(".poster-cover button");
  const notificationElement = document.getElementById("notification");

  registerButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      notificationElement.classList.add("notification-visible");

      setTimeout(() => {
        notificationElement.classList.remove("notification-visible");
      }, 2000);
    });
  });

  notificationElement.addEventListener("click", (e) => {
    if (e.target === notificationElement) {
      notificationElement.classList.remove("notification-visible");
    }
  });
});
