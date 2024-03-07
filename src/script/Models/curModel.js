import { API_KEY, API_URL, DEFAULT_DISPLAY_VALUE } from "../config.js";

export const state = {
  curInput: "",
  curFrom: "",
  curTo: "",
  exchangeRate: "",
  result: "",
};

export const storeCurData = function (from, to, value) {
  state.curFrom = from.toUpperCase();
  state.curTo = to.toUpperCase();
  state.curInput = value;
};

export const getJSON = async function () {
  try {
    if (!state.curFrom || !state.curTo || !state.curInput) throw new Error();

    const res = await fetch(
      `${API_URL}${API_KEY}/pair/${state.curFrom}/${state.curTo}`
    );

    if (!res.ok) throw new Error();

    const data = await res.json();

    state.exchangeRate = data.conversion_rate;
  } catch (err) {
    throw err;
  }
};

export const convertCurrency = function () {
  state.result = `${+state.curInput * state.exchangeRate} ${state.curTo}`;
};

export const clearCurData = function () {
  state.curInput = state.curFrom = state.curTo = state.exchangeRate = "";

  state.result = DEFAULT_DISPLAY_VALUE;
};
