import BookStore from "./BookStore.js";
import Alert from "./Alert.js";
import Search from "./Search.js";
class Modal {
  #modalContainer = document.getElementById("modal-container");
  #form;
  #cancelButton;
  #titleField;
  #authorField;
  #yearField;
  #finishedReadCheckbox;
  #name;
  #id;
  constructor(name, id) {
    this.#name = name;
    this.#id = id;
    this.#init();
    this.#cancelButton = this.#modalContainer.querySelector("input#batal");
    this.#form = this.#modalContainer.querySelector("form");
    this.#titleField = this.#modalContainer.querySelector("#book-name");
    this.#authorField = this.#modalContainer.querySelector("#author");
    this.#yearField = this.#modalContainer.querySelector("#year-book");
    this.#finishedReadCheckbox = this.#modalContainer.querySelector(
      "#finished-read-checkbox"
    );
  }
  #init() {
    switch (this.#name) {
      case "AddBook":
        this.#initAddBookModal();
        break;
      case "EditBook":
        this.#initEditBookModal();
        break;
      case "DeleteConfirmation":
        this.#initDeleteConfirmation();
        break;
      case "MarkConfirmation":
        this.#initMarkConfirmationModal();
    }
  }
  launch() {
    this.#modalContainer?.classList.remove("hidden");
    this.#hideEventHandler();
    this.#autofocusHandler();
    this.#formSubmitEventHandler();
  }
  hide() {
    this.#modalContainer?.classList.add("hidden");
  }
  #hideEventHandler() {
    this.#modalContainer?.addEventListener("click", (e) => {
      if (e.target === this.#modalContainer) {
        this.hide();
      }
    });
    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.hide();
      }
    });
    this.#cancelButton?.addEventListener("click", () => this.hide());
  }
  #autofocusHandler() {
    switch (this.name) {
      case "AddBook":
        this.#titleField?.focus();
        break;
      case "EditBook":
        this.#titleField?.focus();
        break;
    }
  }
  #formSubmitEventHandler() {
    this.#form?.addEventListener("submit", (e) => {
      switch (this.#name) {
        case "AddBook":
          this.#addBookModalActionHandler();
          break;
        case "EditBook":
          this.#editBookModalActionHandler();
          break;
        case "DeleteConfirmation":
          this.#deleteConfirmationModalActionHandler();
          break;
        case "MarkConfirmation":
          this.#markConfirmationModalActionHandler();
      }
      e.preventDefault();
      Search.renderSearchedBooks();
      this.hide();
    });
  }
  #initEditBookModal() {
    if (this.#id) {
      const currentBook = BookStore.findById(this.#id).data;
      this.#modalContainer.innerHTML = `
    <div class="add-book modal-content">
      <h1 class="title">Tambah Buku</h1>
      <form>
        <div class="form-group modal-form">
          <label for="title-field">Judul</label>
          <input type="text" id="book-name" class="form-control" placeholder="Masukan judul buku" value="${
            currentBook.title
          }" required autofocus>
        </div>
        <div class="form-group modal-form">
          <label for="author-field">Penulis</label>
          <input type="text" id="author" class="form-control" placeholder="Masukan penulis buku" value="${
            currentBook.author
          }" required>
        </div>
        <div class="form-group modal-form">
          <label for="year-field">Tahun Terbit</label>
          <input type="number" id="year-book" class="form-control" placeholder="Masukan tahun terbit buku" value="${
            currentBook.year
          }" required>
        </div>
        <div class="form-group modal-form">
          <label>
            <input type="checkbox" name="finished-read" id="finished-read-checkbox" ${
              currentBook.isComplete ? "checked" : ""
            }>
          </label>
          <label for="finished-read-checkbox" class="checkbox-label">Selesai Dibaca</label>
        </div>
        <input class="btn btn-secondary" id="batal" type="button" value="Batal">
        <input class="btn btn-primary" type="submit" value="Simpan">
        </form>
    </div>
            `;
    }
  }
  #initAddBookModal() {
    this.#modalContainer.innerHTML = `
    <div class="modal-content">
            <h4 class="mb-4">Tambah Buku</h4>
            <div class="">
              <form action="" id="modal-form">
                <div class="form-group modal-form">
                  <label for="book-name">Judul :</label>
                  <input
                    type="text"
                    class="form-control"
                    id="book-name"
                    placeholder="Masukan nama buku...."
                  />
                </div>
                <div class="form-group modal-form">
                  <label for="author">Penulis :</label>
                  <input
                    type="text"
                    class="form-control"
                    id="author"
                    placeholder="Masukan nama pengarang buku...."
                  />
                </div>
                <div class="form-group modal-form">
                  <label for="year-book">Tahun Terbit :</label>
                  <input
                    type="number"
                    class="form-control"
                    id="year-book"
                    placeholder="Masukan tahun terbit buku...."
                  />
                </div>
                <div class="form-group modal-form">
                  <label>
                    <input
                      type="checkbox"
                      name="finished-read"
                      id="finished-read-checkbox"
                    />
                  </label>
                  <label for="finished-read-checkbox"> Selesai Dibaca</label>
                </div>
                <div class="form-group modal-form">
                  <input
                    type="submit"
                    class="btn btn-primary btn-modal"
                    value="Simpan"
                  />
                </div>

                <div class="form-group modal-form">
                  <input
                    type="button"
                    class="btn btn-secondary btn-modal"
                    value="Batal"
                    id="batal"
                  />
                </div>
              </form>
    `;
  }
  #initDeleteConfirmation() {
    if (this.#id) {
      const bookTitle = BookStore.findById(this.#id).data.title;
      this.#modalContainer.innerHTML = `
      <div class="delete-confirmation modal-content">
        <h1 class="message">Apakah anda yakin ingin menghapus buku ${bookTitle}?</h1>
        <form>
          <input class="btn btn-secondary" type="button" id="batal" value="Batal">
          <input class="btn btn-danger" type="submit" value="Yakin">
        </form>
      </div>`;
    }
  }
  #initMarkConfirmationModal() {
    if (this.#id) {
      const book = BookStore.findById(this.#id).data;
      this.#modalContainer.innerHTML = `
                <div class="mark-confirmation modal-content">
                <h1 class="message">Apakah anda yakin ingin memindahkan buku ${
                  book.title
                } ke rak ${
        book.isComplete ? "Belum Selesai Dibaca" : "Selesai Dibaca"
      }?</h1>
                <form>
                  <input class="btn btn-secondary" type="button" id="batal" value="Batal">
                  <input class="btn btn-primary" type="submit" value="Yakin">
                </form>
              </div>`;
    }
  }
  #addBookModalActionHandler() {
    try {
      if (
        this.#titleField &&
        this.#authorField &&
        this.#yearField &&
        this.#finishedReadCheckbox
      ) {
        const newBook = {
          id: +new Date(),
          title: this.#titleField.value,
          author: this.#authorField.value,
          year: parseInt(this.#yearField.value),
          isComplete: this.#finishedReadCheckbox.checked,
        };
        const response = BookStore.add(newBook);
        const successAlert = new Alert("success", response);
        successAlert.launch();
      } else {
        throw Error("Fields null or undefined, check again");
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorAlert = new Alert("danger", error.message);
        errorAlert.launch();
      }
    }
  }
  #editBookModalActionHandler() {
    try {
      if (
        this.#titleField &&
        this.#authorField &&
        this.#yearField &&
        this.#finishedReadCheckbox
      ) {
        const newBook = {
          id: +new Date(),
          title: this.#titleField.value,
          author: this.#authorField.value,
          year: parseInt(this.#yearField.value),
          isComplete: this.#finishedReadCheckbox.checked,
        };
        if (this.#id) {
          const response = BookStore.update(this.#id, newBook);
          const successAlert = new Alert("success", response);
          successAlert.launch();
        }
      } else {
        throw Error("Fields null or undefined, check again");
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorAlert = new Alert("danger", error.message);
        errorAlert.launch();
      }
    }
  }
  #deleteConfirmationModalActionHandler() {
    try {
      if (this.#id) {
        const response = BookStore.delete(this.#id);
        const successAlert = new Alert("success", response);
        successAlert.launch();
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorAlert = new Alert("danger", error.message);
        errorAlert.launch();
      }
    }
  }
  #markConfirmationModalActionHandler() {
    try {
      if (this.#id) {
        const bookisComplete = BookStore.findById(this.#id).data.isComplete;
        const response = bookisComplete
          ? BookStore.moveBookToUnfinishedShelf(this.#id)
          : BookStore.moveBookToFinishedShelf(this.#id);
        const successAlert = new Alert("success", response);
        successAlert.launch();
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorAlert = new Alert("danger", error.message);
        errorAlert.launch();
      }
    }
  }
}
export default Modal;
