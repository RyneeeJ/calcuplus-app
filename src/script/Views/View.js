export class View {
  _displayPrimary = document.querySelector(".display--main");
  _displaySecondary = document.querySelector(".display--secondary");

  renderResult(result) {
    this._displayPrimary.textContent = result;
  }
}

export class ConverterView extends View {
  _errorMessage = "INVALID INPUT";
  addHandlerConvert(handler) {
    this._convertBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const from = this._from.value;
      const to = this._to.value;
      const inputValue = this._inputValue.value;

      handler(from, to, inputValue);
    });
  }

  addHandlerResetConversion(handler) {
    this._resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  clearTempForm() {
    this._conversionForm.reset();
  }

  renderErrorMessage(message = this._errorMessage) {
    this._displayPrimary.textContent = message;
  }
}
