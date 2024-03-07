class MenuView {
  #header = document.querySelector(".header");
  #calcModeList = document.querySelector(".calc-mode-list");
  #calcModes = document.querySelectorAll(".calc-mode-link");
  #calcKeypad = document.querySelectorAll(".keypad");
  #displayPrimary = document.querySelector(".display--main");
  #displaySecondary = document.querySelector(".display--secondary");

  addHandlerSwitchCalcModes(handler) {
    this.#calcModeList.addEventListener("click", (e) => {
      e.preventDefault();
      // Event delegation
      const calcModeLink = e.target.closest(".calc-mode-link");

      if (!calcModeLink) return;

      this.#switchActiveMenuLink(calcModeLink);

      this.#switchActiveKeypad(calcModeLink);
      this.#clearDisplay();

      handler(+calcModeLink.dataset.displayNum);
    });
  }

  #switchActiveMenuLink(activeLink) {
    // 1. Remove active class from all calc mode links
    this.#calcModes.forEach((mode) =>
      mode.classList.remove("current-mode-active")
    );
    // 2. Add active class to the clicked link
    activeLink.classList.add("current-mode-active");
  }

  #switchActiveKeypad(activeLink) {
    this.#calcKeypad.forEach((display, i) => {
      // 1. Hide all calc mode displays first
      display.classList.add("hidden");

      // 2. Unhide the calc mode display selected
      if (+activeLink.dataset.displayNum === i) {
        display.classList.remove("hidden");
      }
    });
  }

  closeMenuWindow() {
    this.#header.classList.remove("menu-open");
  }

  #clearDisplay() {
    this.#displayPrimary.textContent = "";
    this.#displaySecondary.textContent = "";
  }
}

export default new MenuView();
