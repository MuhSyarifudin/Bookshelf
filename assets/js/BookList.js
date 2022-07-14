import Modal from "./Modal.js";
class BookList {
  #books;
  #noBookMessage;
  #bookListElement = document.getElementById("book-list");
  constructor(books, noBookMessage) {
    this.#books = books;
    this.#noBookMessage = noBookMessage;
  }
  render() {
    if (this.#bookListElement) {
      if (this.#books.length > 0) {
        this.#bookListElement.classList.remove("no-book");
        const list = this.#books
          .map((book) => {
            return `
   <li class="book-list-item mt-1" data-id="${book.id}">
    <div class="card">
        <div class="card-body">
          <h5>${book.title}</h5>
          <p class="m-0">Penulis : <span>${book.author}</span></p>
          <p class="m-0">Tahun terbit : <span>${book.year}</span></p>
          <div class="row ml-1 mt-2">
            <button class="btn btn-danger delete-button"><i class="far fa-trash-alt"></i></button>
            <button class="btn btn-primary edit-button">
              <i class="far fa-edit"></i>
            </button>
            <button class="btn btn-success mark-button">
              ${
                book.isComplete
                  ? "Tandai Belum Selesai Dibaca"
                  : "Tandai Selesai Dibaca"
              }
            </button>
          </div>
        </div>
      </div>
    </li>
          `;
          })
          .join("");
        this.#bookListElement.innerHTML = list;
        this.#actionHandler();
      } else {
        this.#bookListElement.classList.add("no-book");
        this.#bookListElement.innerHTML = `
          <p class="message">${this.#noBookMessage}</p>
        `;
      }
    }
  }
  #actionHandler() {
    const bookListItems =
      this.#bookListElement?.querySelectorAll(".book-list-item");
    if (bookListItems) {
      for (const bookListItem of bookListItems) {
        const bookId = parseInt(`${bookListItem.getAttribute("data-id")}`);
        const editButton = bookListItem.querySelector(".edit-button");
        const deleteButton = bookListItem.querySelector(".delete-button");
        const markButton = bookListItem.querySelector(".mark-button");
        deleteButton?.addEventListener("click", () => {
          const deleteConfirmationModal = new Modal(
            "DeleteConfirmation",
            bookId
          );
          deleteConfirmationModal.launch();
        });
        markButton?.addEventListener("click", () => {
          const markConfirmationModal = new Modal("MarkConfirmation", bookId);
          markConfirmationModal.launch();
        });
        editButton?.addEventListener("click", () => {
          const editBookModal = new Modal("EditBook", bookId);
          editBookModal.launch();
        });
      }
    }
  }
}
export default BookList;
