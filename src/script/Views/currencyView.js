import { ConverterView } from "./View.js";

class CurrencyView extends ConverterView {
  _convertBtn = document.querySelector(".btn--convert-cur");
  _resetBtn = document.querySelector(".btn--reset-cur");
  _from = document.querySelector("#cur-from");
  _to = document.querySelector("#cur-to");
  _inputValue = document.querySelector("#initial-cur-value");
  _conversionForm = document.querySelector("#form--currency");
}

export default new CurrencyView();
