class ColorThemeView {
  #header = document.querySelector(".header");
  #menuBtn = document.querySelector(".btn--menu");
  #overlay = document.querySelector(".overlay");
  #brightnessBtn = document.querySelector(".btn--brightness-mode");
  #bodyEl = document.body;
  #brightnessIcons = document.querySelectorAll(".brightness-icon");
  #calcKeypad = document.querySelectorAll(".keypad");
  #calcContainer = document.querySelector(".container");
  #menuIcon = document.querySelector(".menu-icon");
  #keypadBtnNormal = document.querySelectorAll(".btn--keypad-normal");
  #keypadBtnSpecial = document.querySelectorAll(".btn--keypad-special");
  #conversionDropDown = document.querySelectorAll(".conversion-select");
  #conversionInput = document.querySelectorAll(".conversion-input");
  #currencyHeader = document.querySelector(".currency-header");

  listenForToggleMenu() {
    // Open and Close menu/nav window
    this.#menuBtn.addEventListener("click", () =>
      this.#toggleCssClass(this.#header, "menu-open")
    );
    this.#overlay.addEventListener("click", () =>
      this.#header.classList.remove("menu-open")
    );
  }

  listenForToggleBrightness() {
    // Toggle/Switch brightness mode
    this.#brightnessBtn.addEventListener("click", () => {
      this.#toggleCssClass(this.#brightnessIcons, "brightness-icon--active");

      this.#toggleCssClass(this.#bodyEl, "lightFontColor");

      this.#toggleCssClass(this.#calcContainer, "darkBgColor");

      this.#toggleCssClass(this.#menuIcon, "lightFontColor");
      this.#toggleCssClass(this.#calcKeypad, "lightBgColor");

      this.#toggleCssClass(this.#keypadBtnNormal, "darkBgColor");
      this.#toggleCssClass(
        this.#keypadBtnSpecial,
        "grayBgColor",
        "darkFontColor",
        "darkBorder"
      );

      this.#toggleCssClass(
        this.#conversionDropDown,
        "grayBgColor",
        "darkFontColor"
      );
      this.#toggleCssClass(this.#conversionInput, "grayBgColor");
      this.#toggleCssClass(this.#currencyHeader, "darkFontColor");
    });
  }

  #toggleCssClass(el, ...classes) {
    if (!el.length) {
      classes.forEach((style) => el.classList.toggle(style));
      return;
    } else {
      el.forEach((domObj) =>
        classes.forEach((style) => domObj.classList.toggle(style))
      );
    }
  }
}

export default new ColorThemeView();
