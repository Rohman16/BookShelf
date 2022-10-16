function clearValue(obj) {
  obj.value = "";
  obj.style.background = "white";
}

function returnFormat(obj) {
  obj.style.background = "#4b9fd1ff";
}

// format data buku
const formData = document.getElementById("dataBuku");

let bookList = [];
formData.addEventListener("submit", () => {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let years = document.getElementById("years").value;
  const myBook = new Object();
  const status = document.getElementById("status");
  let myStatus = status.options[status.selectedIndex].text;
  document.querySelector(".warning").innerHTML = "";
  // checkFormInput(title, author, years);
  if (checkFormInput(title, author, years) == 3) {
    myBook.id = +new Date();
    myBook.title = title;
    myBook.author = author;
    myBook.year = years;
    myBook.isComplete = () => {
      if (myStatus == "Read") {
        return true;
      } else {
        return false;
      }
    };
    bookList.push(myBook);

    document.querySelector(".line1").innerHTML = checkListBuku(
      bookList[bookList.length - 1]
    );

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("years").value = "";
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

function showBookDetail() {}
