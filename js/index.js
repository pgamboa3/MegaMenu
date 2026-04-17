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


