import { DEFAULT_DISPLAY_VALUE } from "../config.js";

export const state = {
  calculation: DEFAULT_DISPLAY_VALUE,
  history: "",
  symbols: ["+", "-", ["*", "/"], "."],
  // prettier-ignore
  calcInputs: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", " + ", " - ", " * ", " / "],
  activeCalcMode: 0,
};

export const hasDuplicateSymbolsAndOctal = function (input) {
  // Avoid consecutive symbols (e.g. 23 + - or 1 + + 2);
  const lastChar = state.calculation.trim().slice(-1);
  if (
    state.symbols.flat().includes(lastChar) &&
    state.symbols.flat().includes(input.trim())
  )
    return true;
};

export const storeInputData = function (input) {
  // check if the key pressed in the keyboard is invalid
  if (!state.calcInputs.includes(input)) return;

  // If valid:
  // Avoid 0 at the beginning of the input (e.g. 0123) unless the next input is '.' (e.g. 0.1)
  if (input !== "." && state.calculation === DEFAULT_DISPLAY_VALUE)
    state.calculation = "";

  state.calculation += input;
};

export const calculateInput = function () {
  const firstChar = state.calculation.trim().slice(0, 1);
  const lastChar = state.calculation.trim().slice(-1);

  // Check if the input is valid enough to be evaluated, if not, 'syntax error'
  if (
    state.symbols[2].includes(firstChar) ||
    state.symbols.flat().includes(lastChar) ||
    state.calculation.trim().endsWith("/ 0")
  )
    return "SYNTAX ERROR";

  // If valid, calculate.
  state.history = state.calculation;
  state.calculation = `${eval(state.calculation)}`;
  return state.calculation;
};

export const resetCalculation = function () {
  state.calculation = "0";
  state.history = "";
};

export const removeLastCharacter = function () {
  state.calculation = state.calculation.trim().slice(0, -1);
  if (!state.calculation) state.calculation = "0";
};

export const negateSign = function () {
  // Only negate sign the calculation is a monomial
  if (state.calculation.split(" ").length === 1)
    state.calculation = `${+state.calculation * -1}`;
};

export const setCurrentCalcMode = function (activeCalcMode) {
  state.activeCalcMode = activeCalcMode;
};
