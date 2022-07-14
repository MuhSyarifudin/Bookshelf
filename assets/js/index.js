import Modal from "./Modal.js";
import Search from "./Search.js";
import Shelf from "./Shelf.js";
const finish = document.getElementById("finished-read");
const unfinish = document.getElementById("unfinished-read");
const menus = document.querySelectorAll(".btn-switch");
const addBookButton = document.getElementById("tambah");

window.addEventListener("DOMContentLoaded", () => {
  Search.inputFocusEventHandler();
  Search.inputChangeEventHandler();
  Shelf.changeEventHandler();
  Search.renderSearchedBooks();
});

finish.addEventListener("click", function () {
  menus[0].classList.add("active");
  menus[1].classList.remove("active");
});

unfinish.addEventListener("click", function () {
  menus[0].classList.remove("active");
  menus[1].classList.add("active");
});

addBookButton.addEventListener("click", () => {
  const addBookModal = new Modal("AddBook");
  addBookModal.launch();
});
