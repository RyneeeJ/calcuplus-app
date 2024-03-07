import "core-js/actual";
import "core-js/stable";
import "regenerator-runtime/runtime";

import { DEFAULT_DISPLAY_VALUE } from "./config.js";
import * as stdModel from "./Models/stdModel.js";
import * as tempModel from "./Models/tempModel.js";
import * as curModel from "./Models/curModel.js";
import colorThemeView from "./Views/colorThemeView.js";
import standardCalcView from "./Views/standardCalcView.js";
import temperatureView from "./Views/temperatureView.js";
import currencyView from "./Views/currencyView.js";
import menuView from "./Views/menuView.js";

// https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD

////////////////////////////////////////
// DEFAULT / GENERAL SETTINGS
////////////////////////////////////////
const controlCalcModes = function (activeCalcMode) {
  stdModel.setCurrentCalcMode(activeCalcMode);

  standardCalcView.updateActiveCalcModeNum(stdModel.state.activeCalcMode);

  stdModel.resetCalculation();

  standardCalcView.renderResult(stdModel.state.calculation);

  menuView.closeMenuWindow();
};

const defaultInit = function () {
  colorThemeView.listenForToggleMenu();
  colorThemeView.listenForToggleBrightness();
  menuView.addHandlerSwitchCalcModes(controlCalcModes);
  standardCalcView.renderResult(DEFAULT_DISPLAY_VALUE);
};

defaultInit();

////////////////////////////////////////
// STANDARD CALCULATOR
////////////////////////////////////////

const controlInputData = function (input) {
  if (stdModel.hasDuplicateSymbolsAndOctal(input)) return;
  // store the data in the model

  stdModel.storeInputData(input);
  standardCalcView.renderResult(stdModel.state.calculation);
};

const controlDisplayResult = function () {
  // Display 0 if enter is pressed and no data input yet
  // Calculate math expression
  const result = stdModel.calculateInput();
  // Display results
  standardCalcView.renderLastData(stdModel.state.history);
  standardCalcView.renderResult(result);
};

const controlClearData = function () {
  stdModel.resetCalculation();
  standardCalcView.renderResult(stdModel.state.calculation);
};

const controlRemoveLastInput = function () {
  stdModel.removeLastCharacter();

  standardCalcView.renderResult(stdModel.state.calculation);
};

const controlNegateValue = function () {
  stdModel.negateSign();
  standardCalcView.renderResult(stdModel.state.calculation);
};

const initStandard = function () {
  standardCalcView.addHandlerInputData(controlInputData);
  standardCalcView.addHandlerCalculateResult(controlDisplayResult);
  standardCalcView.addHandlerClearAllData(controlClearData);
  standardCalcView.addHandlerBackspace(controlRemoveLastInput);
  standardCalcView.addHandlerNegateValue(controlNegateValue);
};

initStandard();

////////////////////////////////////////
// TEMPERATURE CONVERTER
////////////////////////////////////////

const controlTempConversion = function (from, to, value) {
  tempModel.storeTempData(from, to, value);

  if (tempModel.checkInvalidInput())
    return temperatureView.renderErrorMessage();

  tempModel.calculateTempResult();
  temperatureView.renderResult(tempModel.state.result);
};

const controlResetTemp = function () {
  tempModel.clearTempData();
  temperatureView.renderResult(tempModel.state.result);
  temperatureView.clearTempForm();
};

const initTemp = function () {
  temperatureView.addHandlerConvert(controlTempConversion);
  temperatureView.addHandlerResetConversion(controlResetTemp);
};

initTemp();

////////////////////////////////////////
// CURRENCY CONVERTER
////////////////////////////////////////

const controlCurrConversion = async function (from, to, value) {
  try {
    curModel.storeCurData(from, to, value);
    await curModel.getJSON();
    curModel.convertCurrency();
    currencyView.renderResult(curModel.state.result);
  } catch (err) {
    currencyView.renderErrorMessage();
  }
};

const controlResetCur = function () {
  curModel.clearCurData();
  currencyView.renderResult(curModel.state.result);
  currencyView.clearTempForm();
};

const initCurr = function () {
  currencyView.addHandlerConvert(controlCurrConversion);
  currencyView.addHandlerResetConversion(controlResetCur);
};

initCurr();
