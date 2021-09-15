let myLibrary = [
    { name: "The Lord of the Rings", author: "Tolkien", status: "read" },
    {
      name: "Alice in Wonderland",
      author: "Lewis Caroll",
      status: "not read",
    },
    { name: "Naruto", author: "Masashi Kishimoto", status: "read" }
];
render(myLibrary);

function Book(name, author, status) {
    this.name = name;
    this.author = author;
    this.status = status;
}

// Function that creates a new book object and adds it to the 
function addBookToLibrary(name, author, status) {
    if (name.length === 0 || author.length === 0) {
        alert("Please fill out all the fields.");
        return;
    } else {
        myLibrary.push(new Book(name, author, status));
    }
}

// Renders the data stored in our list (Eventually will become a database)
function render(data) {
    $table = document.querySelector("#book-table-body");
    $table.innerHTML = "";
    data.forEach(book => {
        const htmlBook = `
            <tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td><button class="status-button">${book.status}</button></td>
                <td><button class="delete">delete</button></td>
            <tr>
        `;
        $table.insertAdjacentHTML("afterbegin", htmlBook);
    });
}

// Adding an event listener to our form
let $form = document.querySelector("#bookForm").addEventListener("submit", (e) => {
    e.preventDefault(); // This prevents the form from refreshing the page, or going somewhere else

    // Accessing the Elements of our Form the moment we fill out the submit button
    let $name = document.querySelector("#name").value;
    let $author = document.querySelector("#author").value;
    let $status = document.querySelector("#status").value;
    addBookToLibrary($name, $author, $status);

    // Clearing out the Form Fields
    document.querySelector("#name").value = "";
    document.querySelector("#author").value = "";

    // Rending the books within the library 
    render(myLibrary);
    // Testing
    console.log(myLibrary);
});


// Utility Functions
function changeStatus(book) {
    if (book === null || book === undefined) {
        console.log("Change status Undefined");
        return;
    }
    if (myLibrary.includes(book)) {
        console.log("TRUE");
        if (myLibrary[myLibrary.indexOf(book)].status === "read") {
            myLibrary[myLibrary.indexOf(book)].status = "not read";
        } else {
            myLibrary[myLibrary.indexOf(book)].status = "read";
        }
    }
}

function findBook(libraryArray, name) {
    if (libraryArray.length === 0 || libraryArray === null) {
        return;
    }
    for ( let book of libraryArray) {
        console.log(book);
        if (book.name == name) {
            return book;
        }
    }
}

function deleteBook(currentBook) {
    var bookIndex = myLibrary.indexOf(currentBook);
    myLibrary.splice(bookIndex, bookIndex + 1);
  }

// Adding an event listener to our table to see when status buttons are clicked
let table = document.querySelector("table");
table.addEventListener("click", (event) => {
    // This gets the name of the book
    const currentTargetTitle = event.target.parentNode.parentNode.childNodes[1];
    if (event.target.classList.contains("status-button")) {
        // This is the status
        console.log(event.target.innerHTML);
        // This is the name of the book
        console.log(currentTargetTitle.innerHTML);

        let book = findBook(myLibrary, currentTargetTitle.innerHTML);
        changeStatus(book);
        render(myLibrary);
    }
    if (event.target.innerHTML == "delete") {
        deleteBook(findBook(myLibrary, currentTargetTitle.innerText));
        render(myLibrary);
    }
});

