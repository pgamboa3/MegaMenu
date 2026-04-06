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


