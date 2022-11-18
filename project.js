const BOOKLIST = "data-buku";

function clearValue(obj) {
  obj.value = "";
  obj.style.background = "white";
}

function returnFormat(obj) {
  obj.style.background = "#4b9fd1ff";
}

let bookList = [];
document.addEventListener("DOMContentLoaded", () => {
  const myStorage = localStorage.getItem("data-buku");
  if (myStorage !== null) {
    loadBookList();
  }
});

const formData = document.getElementById("dataBuku");

formData.addEventListener("submit", (event) => {
  deleteElement();
  const existingBooksNum = bookList.length;
  const id = +new Date();
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let years = document.getElementById("years").value;
  let status = document.getElementById("check-btn").checked;

  document.querySelector(".warning").innerHTML = "";

  if (checkFormInput(title, author, years) == 3) {
    const myBook = createBookTemp(id, title, author, years, status);

    bookList.push(myBook);
    SaveMyBook(bookList);

    const newBooksNum = bookList.length;

    if (addSuccesfull(existingBooksNum, newBooksNum)) {
      const { id, title, author, year, isComplete } =
        bookList[bookList.length - 1];
      const notif = document.createElement("div");
      notif.setAttribute("id", "notif-succes");
      const headTitle = document.createElement("h2");
      headTitle.innerText = `New Book is succesfully Added`;
      //This paRT HAS NOT SUCCEEDED YET
      const bookDetail = document.createElement("div");
      bookDetail.setAttribute("id", "book-detail");
      const bookId = document.createElement("p");
      bookId.innerText = `id Number : ${id}`;
      const bookTittle = document.createElement("h3");
      bookTittle.innerText = title;
      const bookAuthor = document.createElement("p");
      bookAuthor.innerText = `Author : ${author}`;
      const bookYear = document.createElement("p");
      bookYear.innerText = `Issued : ${year}`;
      const bookStatus = document.createElement("p");
      bookStatus.innerText = `Status Read : ${isComplete}`;
      bookDetail.append(bookTittle, bookId, bookAuthor, bookYear, bookStatus);
      notif.append(headTitle, bookDetail);
      document.body.append(notif);
    }
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("years").value = "";
    document.getElementById("check-btn").checked = false;
  } else {
    const inputs = document.querySelectorAll("#title,#author,#years");
    const emptyData = showEmptyInput(inputs);
    document.querySelector(
      ".warning"
    ).innerHTML = `Data ${emptyData} masih kosong, <br>tolong lengkapi data buku`;
  }
  event.preventDefault();
});

// ===================================================================================
function checkListBuku(obj) {
  if (obj.id !== "") {
    return `Buku id : ${obj.id} sudah ditambahkan`;
  } else {
    return "Buku gagal ditambahkan";
  }
}

// ===================================================================================

function checkFormInput(a, b, c) {
  const allInput = [a, b, c];
  let cnt = 0;
  for (inpt of allInput) {
    if (inpt !== "") {
      cnt++;
    }
  }
  return cnt;
}

// ===================================================================================

function showEmptyInput(arry) {
  let txt = "";
  for (inp of arry) {
    if (inp.value == "") {
      txt += inp.id + ",";
    }
  }
  return txt;
}

function createBookTemp(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function SaveMyBook(bks) {
  const book = JSON.stringify(bks);
  localStorage.setItem(BOOKLIST, book);
}

function findMyBook(bookId) {
  for (const indx in bookList) {
    if (bookList[indx].id == bookId) {
      return indx;
    }
  }
  return -1;
}

function loadBookList() {
  const myStorage = localStorage.getItem("data-buku");
  const data = JSON.parse(myStorage);
  for (const bk of data) {
    bookList.push(bk);
  }
  if (bookList.length > 0) {
    console.log(`Buku sudah diload`);
  }
  return bookList;
}

function addSuccesfull(a, b) {
  const result = a - b;
  if (result == -1) {
    return true;
  }
}

// function addBookToDisplay() {
//   const readDisplay = document.createElement("div");
//   notif.setAttribute("id", "read-display");
//   const unReadDisplay = document.createElement("div");
//   notif.setAttribute("id", "un-read-display");
// }

function createDisplay(myObj) {
  const { id, title, author, year, isComplete } = myObj;
  const bookDetail = document.createElement("div");
  bookDetail.setAttribute("id", "book-detail");
  const bookId = document.createElement("p");
  bookId.innerHTML = `id Number : <b>${id}</b>`;
  const bookTittle = document.createElement("h3");
  bookTittle.innerHTML = title;
  const bookAuthor = document.createElement("p");
  bookAuthor.innerHTML = `Author : <b>${author}</b>`;
  const bookYear = document.createElement("p");
  bookYear.innerHTML = `Issued : <b>${year}</b>`;
  const bookStatus = document.createElement("p");
  bookStatus.innerHTML = `Status Read : <b>${isComplete}</b>`;
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("id", "button-contnr");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn-delete");
  deleteButton.addEventListener("click", () => {
    deleteBook(id);
  });
  const readButton = document.createElement("button");
  readButton.classList.add("btn-read");
  readButton.addEventListener("click", () => {
    moveTounRead(id);
  });
  const unreadButton = document.createElement("button");
  unreadButton.classList.add("btn-unread");
  unreadButton.addEventListener("click", () => {
    moveToRead(id);
  });
  if (isComplete) {
    buttonContainer.append(readButton, deleteButton);
  } else {
    buttonContainer.append(unreadButton, deleteButton);
  }
  bookDetail.append(
    bookTittle,
    bookId,
    bookAuthor,
    bookYear,
    bookStatus,
    buttonContainer
  );
  return bookDetail;
}

function displayBook() {
  deleteElement();
  const readBook = document.createElement("div");
  readBook.setAttribute("id", "read-book");
  const readBookHeader = document.createElement("h2");
  readBookHeader.innerHTML = "Read";
  readBook.append(readBookHeader);
  const unReadBook = document.createElement("div");
  unReadBook.setAttribute("id", "unRead-book");
  const unReadBookHeader = document.createElement("h2");
  unReadBookHeader.innerHTML = "Un-Read";
  unReadBook.append(unReadBookHeader);
  for (const book of bookList) {
    if (book.isComplete) {
      readBook.append(createDisplay(book));
    } else {
      unReadBook.append(createDisplay(book));
    }
  }
  document.body.append(readBook, unReadBook);
}

function deleteBook(id) {
  const index = findMyBook(id);
  bookList.splice(index, 1);
  SaveMyBook(bookList);
  displayBook();
}

function moveToRead(id) {
  const index = findMyBook(id);
  bookList[index].isComplete = true;
  displayBook();
  SaveMyBook(bookList);
}

function moveTounRead(id) {
  const index = findMyBook(id);
  bookList[index].isComplete = false;
  displayBook();
  SaveMyBook(bookList);
}

function deleteElement() {
  const elm = document.querySelectorAll(
    "#notif-succes,#read-book,#unRead-book,.search-resl"
  );
  for (const myElm of elm) {
    if (myElm !== null) {
      myElm.remove();
    }
  }
}

const cari = document.querySelector("#search-form");
cari.addEventListener("submit", (event) => {
  deleteElement();
  const word = document.getElementById("cariBuku").value;
  const srch = word.toLowerCase();
  const searchResult = document.createElement("div");
  searchResult.classList.add("search-resl");
  const searchHeader = document.createElement("h2");
  searchHeader.innerHTML = "Search Result";
  const searchItems = document.createElement("div");
  for (const bk of bookList) {
    const book = checkObjectBook(srch, bk);
    if (book > 0) {
      searchItems.append(createDisplay(bk));
    }
  }
  searchResult.append(searchHeader, searchItems);
  document.body.append(searchResult);
  event.preventDefault();
});

function checkObjectBook(str, obj) {
  let count = 0;
  for (const elm in obj) {
    let words = String(obj[elm]);
    const newElm = words.toLowerCase();
    if (newElm.includes(str)) {
      count++;
    }
  }
  return count;
}
