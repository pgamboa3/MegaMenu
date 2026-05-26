document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".nav-item.dropdown.mega-dropdown");

  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector(".nav-link.dropdown-toggle");
    const menu = dropdown.querySelector(".collapse");

    // Build attributes dynamically based on menu ID
    const attrs = {
      "data-bs-toggle": "collapse",
      "data-bs-target": `#${menu.id}`,
      "aria-controls": menu.id
    };

    function setBehavior() {
      const isMobile = window.innerWidth < 992;

      Object.entries(attrs).forEach(([key, value]) => {
        if (isMobile) {
          link.setAttribute(key, value);
        } else {
          link.removeAttribute(key);
        }
      });

      if (isMobile) {
        menu.classList.add("collapse");
      } else {
        menu.classList.remove("collapse", "show");
      }
    }

    // Highlight stays until submenu is closed
    function updateHighlight() {
      if (menu.classList.contains("show")) {
        link.classList.add("nav-active");
      } else {
        link.classList.remove("nav-active");
      }
    }

    menu.addEventListener("shown.bs.collapse", updateHighlight);
    menu.addEventListener("hidden.bs.collapse", updateHighlight);

    // Reset only when crossing breakpoints
    let lastMode = window.innerWidth >= 992 ? "desktop" : "mobile";

    function resetStates() {
      link.classList.remove("nav-active");
      if (menu.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(menu);
        if (bsCollapse) bsCollapse.hide();
      }
      document.activeElement.blur();
    }

    window.addEventListener("resize", function () {
      const currentMode = window.innerWidth >= 992 ? "desktop" : "mobile";
      if (currentMode !== lastMode) {
        resetStates();
        lastMode = currentMode;
      }
      setBehavior();
    });

    // Initial run
    setBehavior();
  });
});

// Navbar extras relocation
let wrapper; // keep reference globally

function adjustNav() {
  const toggler = document.querySelector('.navbar-toggler');
  const brand = document.querySelector('.navbar-brand');
  const extras = document.getElementById('navExtras');
  const mobile = document.querySelector('.header-wrapper .navbar .container-fluid');
  const desktop = document.querySelector('.header-search .container');

  if (innerWidth < 992) {
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.flexGrow = 1;
      mobile.insertBefore(wrapper, mobile.querySelector('.navbar-collapse'));
    }
    wrapper.append(toggler, brand, extras);
  } else {
    if (wrapper) {
      wrapper.remove();
      wrapper = null; // clear reference
    }
    desktop.appendChild(brand);
    desktop.appendChild(extras);
    mobile.insertBefore(toggler, mobile.querySelector('.navbar-collapse'));
  }
}

['load','resize'].forEach(e => addEventListener(e, adjustNav));



document.addEventListener("DOMContentLoaded", () => {
  const slides = [
    { type: "full", src: "img/banner-full.jpeg" },
    { type: "split", left: "img/banner-left.jpeg", right: "img/banner-right.jpeg" },
    { type: "full", src: "img/banner-another.jpeg" }
  ];

  const container = document.getElementById("bannerSlides");
  const mobileQuery = window.matchMedia("(max-width: 991px)");

  function buildCarousel() {
    container.innerHTML = "";
    slides.forEach((s, i) => {
      if (s.type === "full") {
        container.innerHTML += `
          <div class="carousel-item ${i === 0 ? "active" : ""}">
            <img src="${s.src}" class="d-block w-100" alt="">
          </div>`;
      } else {
        if (mobileQuery.matches) {
          ["left", "right"].forEach((side, j) => {
            container.innerHTML += `
              <div class="carousel-item ${i === 0 && j === 0 ? "active" : ""}">
                <img src="${s[side]}" class="d-block w-100" alt="">
              </div>`;
          });
        } else {
          container.innerHTML += `
            <div class="carousel-item ${i === 0 ? "active" : ""}">
              <div class="banner-split">
                <div class="banner-half"><img src="${s.left}" alt=""></div>
                <div class="banner-half"><img src="${s.right}" alt=""></div>
              </div>
            </div>`;
        }
      }
    });
  }

  // Build once
  buildCarousel();

  // Rebuild only when breakpoint changes
  mobileQuery.addEventListener("change", buildCarousel);
});


