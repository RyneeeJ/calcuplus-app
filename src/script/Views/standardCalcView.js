import { STANDARD_CALC_NUM } from "../config.js";
import { View } from "./View.js";
class StandardCalcView extends View {
  #keypad = document.querySelector(".keypad-standard-container");
  #equalsBtn = document.querySelector("[data-equals]");
  #clearAllBtn = document.querySelector("[data-clear-all]");
  #backspaceBtn = document.querySelector("[data-backspace]");
  #negateBtn = document.querySelector("[data-negate-sign]");
  #activeCalcMode = STANDARD_CALC_NUM;

  addHandlerInputData(handler) {
    this.#keypad.addEventListener("click", (e) => {
      const clicked = e.target.closest("button");
      if (clicked?.hasAttribute("data-input")) handler(clicked.dataset.input);
    });

    window.addEventListener("keydown", (e) => {
      if (this.#activeCalcMode !== STANDARD_CALC_NUM) return;
      let key;
      if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
        key = e.key.padStart(2, " ").padEnd(3, " ");
      } else key = e.key;

      handler(key);
    });
  }

  addHandlerCalculateResult(handler) {
    this.#equalsBtn.addEventListener("click", () => {
      this.#clearDisplay();
      handler();
    });

    window.addEventListener("keydown", (e) => {
      if (this.#activeCalcMode !== STANDARD_CALC_NUM) return;
      if (e.key === "Enter") handler(e.key);
    });
  }

  addHandlerClearAllData(handler) {
    this.#clearAllBtn.addEventListener("click", () => {
      this.#clearDisplay();
      handler();
    });

    window.addEventListener("keydown", (e) => {
      if (this.#activeCalcMode !== STANDARD_CALC_NUM) return;
      if (e.key !== "Delete") return;
      this.#clearDisplay();
      handler(e.key);
    });
  }

  addHandlerBackspace(handler) {
    this.#backspaceBtn.addEventListener("click", () => {
      handler();
    });

    window.addEventListener("keydown", (e) => {
      if (this.#activeCalcMode !== STANDARD_CALC_NUM) return;
      if (e.key === "Backspace") handler(e.key);
    });
  }

  addHandlerNegateValue(handler) {
    this.#negateBtn.addEventListener("click", () => {
      handler();
    });
  }

  #clearDisplay() {
    this._displayPrimary.textContent = "";
    this._displaySecondary.textContent = "";
  }

  updateActiveCalcModeNum(data) {
    this.#activeCalcMode = data;
  }

  renderLastData(data) {
    this._displaySecondary.textContent = data;
  }
}

export default new StandardCalcView();
