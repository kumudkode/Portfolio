// Projects page filter functionality
document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  // Custom cursor
  const cursorBlob = document.getElementById("cursor-blob");
  const cursorRing = document.getElementById("cursor-ring");

  if (cursorBlob && cursorRing && window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      cursorBlob.style.left = e.clientX + "px";
      cursorBlob.style.top = e.clientY + "px";

      setTimeout(() => {
        cursorRing.style.left = e.clientX + "px";
        cursorRing.style.top = e.clientY + "px";
      }, 100);
    });

    // Enlarge cursor on hover
    document.querySelectorAll("a, button, .project-card").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorRing.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorBlob.style.transform = "translate(-50%, -50%) scale(1.5)";
      });
      el.addEventListener("mouseleave", () => {
        cursorRing.style.transform = "translate(-50%, -50%) scale(1)";
        cursorBlob.style.transform = "translate(-50%, -50%) scale(1)";
      });
    });
  }

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Filter projects
      projectCards.forEach((card) => {
        if (filter === "all") {
          card.classList.remove("hidden");
        } else {
          const categories = card.getAttribute("data-category");
          if (categories.includes(filter)) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        }
      });
    });
  });
});
