import { DEFAULT_DISPLAY_VALUE } from "../config.js";
export const state = {
  tempInput: "",
  tempFrom: "",
  tempTo: "",
  result: "",
};

export const storeTempData = function (from, to, value) {
  state.tempFrom = from;
  state.tempTo = to;
  state.tempInput = value;
};

const celsiusToFahrenheit = function () {
  state.result = `${((9 / 5) * +state.tempInput + 32).toFixed(2)} °F`;
};
const celsiusToKelvin = function () {
  state.result = `${(+state.tempInput + 273.15).toFixed(2)} K`;
};

const fahrenheitToCelsius = function () {
  state.result = `${((5 / 9) * (+state.tempInput - 32)).toFixed(2)} °C`;
};

const fahrenheitToKelvin = function () {
  state.result = `${((5 / 9) * (+state.tempInput - 32) + 273.15).toFixed(2)} K`;
};

const kelvinToCelsius = function () {
  state.result = `${(+state.tempInput - 273.15).toFixed(2)} °C`;
};

const kelvinToFahrenheit = function () {
  state.result = `${((9 / 5) * (+state.tempInput - 273.15) + 32).toFixed(
    2
  )} °F`;
};

export const calculateTempResult = function () {
  if (state.tempFrom === "celsius")
    state.tempTo === "fahrenheit" ? celsiusToFahrenheit() : celsiusToKelvin();

  if (state.tempFrom === "fahrenheit")
    state.tempTo === "celsius" ? fahrenheitToCelsius() : fahrenheitToKelvin();

  if (state.tempFrom === "kelvin")
    state.tempTo === "celsius" ? kelvinToCelsius() : kelvinToFahrenheit();
};

export const checkInvalidInput = function () {
  if (
    !state.tempFrom ||
    !state.tempTo ||
    !state.tempInput ||
    state.tempFrom === state.tempTo
  )
    return true;
};

export const clearTempData = function () {
  state.tempInput = state.tempFrom = state.tempTo = "";
  state.result = DEFAULT_DISPLAY_VALUE;
};
