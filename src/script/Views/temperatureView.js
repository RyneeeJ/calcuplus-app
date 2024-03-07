import { ConverterView } from "./View.js";
class TemperatureView extends ConverterView {
  _convertBtn = document.querySelector(".btn--convert-temp");
  _resetBtn = document.querySelector(".btn--reset-temp");
  _from = document.querySelector("#temp-from");
  _to = document.querySelector("#temp-to");
  _inputValue = document.querySelector("#initial-temp-value");
  _conversionForm = document.querySelector("#form--temperature");
}

export default new TemperatureView();
