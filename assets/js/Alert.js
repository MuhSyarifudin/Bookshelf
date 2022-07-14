class Alert {
  #theme;
  #message;
  #alertContainer = document.getElementById("alert-container");
  #closeButton;
  constructor(theme, message) {
    this.#theme = theme;
    this.#message = message;
    this.#init();
    this.#closeButton = this.#alertContainer?.querySelector("button.close");
    this.#closeButton?.addEventListener("click", () => this.hide());
  }
  #init() {
    if (this.#alertContainer) {
      this.#alertContainer.innerHTML = `
      <div class="alert alert-${
        this.#theme
      } alert-dismissible fade show mt-2 mb-0" role="alert">
        ${this.#message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      `;
    }
  }
  launch() {
    if (this.#alertContainer) {
      this.#alertContainer.classList.remove("hidden");
    }
  }
  hide() {
    if (this.#alertContainer) {
      this.#alertContainer.classList.add("hidden");
    }
  }
}
export default Alert;
