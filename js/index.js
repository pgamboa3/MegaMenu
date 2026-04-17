document.addEventListener("DOMContentLoaded", function () {
  const link = document.getElementById("collectionLink");
  const menu = document.getElementById("megaCollapse");
  const attrs = {
    "data-bs-toggle": "collapse",
    "data-bs-target": "#megaCollapse",
    "aria-controls": "megaCollapse"
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

  setBehavior();
  window.addEventListener("resize", setBehavior);
});


document.addEventListener("DOMContentLoaded", function () {
  const collectionLink = document.getElementById("collectionLink");
  const megaCollapse = document.getElementById("megaCollapse");

  function updateHighlight() {
    if (megaCollapse.classList.contains("show")) {
      collectionLink.classList.add("submenu-open");
    } else {
      collectionLink.classList.remove("submenu-open");
    }
  }

  megaCollapse.addEventListener("shown.bs.collapse", updateHighlight);
  megaCollapse.addEventListener("hidden.bs.collapse", updateHighlight);
  document.addEventListener("focusin", updateHighlight);

  // Reset only when crossing breakpoints
  let lastMode = window.innerWidth >= 992 ? "desktop" : "mobile";

  function resetStates() {
    collectionLink.classList.remove("submenu-open");
    if (megaCollapse.classList.contains("show")) {
      const bsCollapse = bootstrap.Collapse.getInstance(megaCollapse);
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
  });
});



function moveNavExtras() {
  const extras = document.getElementById('navExtras');
  const desktopContainer = document.querySelector('.header-search .container');
  const mobileContainer = document.querySelector('.header-wrapper .navbar .container-fluid');

  if (window.innerWidth < 992) {
    // Move to mobile navbar
    if (!mobileContainer.contains(extras)) {
      mobileContainer.insertBefore(extras, mobileContainer.querySelector('.collapse'));
    }
  } else {
    // Move back to desktop header-search
    if (!desktopContainer.contains(extras)) {
      desktopContainer.appendChild(extras);
    }
  }
}

// Run on load and resize
window.addEventListener('load', moveNavExtras);
window.addEventListener('resize', moveNavExtras);