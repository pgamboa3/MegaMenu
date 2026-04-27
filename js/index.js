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
    wrapper.append(toggler, extras);
  } else {
    if (wrapper) {
      wrapper.remove();
      wrapper = null; // clear reference
    }
    desktop.appendChild(extras);
    mobile.insertBefore(toggler, mobile.querySelector('.navbar-collapse'));
  }
}

['load','resize'].forEach(e => addEventListener(e, adjustNav));
