//storage key
const ALREADY_READ_KEY = 'alreadyRead';
const UNREAD_KEY = 'unread';

//array penampung buku
let arrAlreadyRead = [];
let arrUnread = [];

//function untuk mengecek local storage
function isStorageExist() /* boolean */ {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    } 
    return true;
}

//function untuk mengambil data dari local storage
function loadDataFromStorage(readInfo) {
    if(readInfo){
        const serializedData = localStorage.getItem(ALREADY_READ_KEY);
        let data = JSON.parse(serializedData);
        if(data !== null)
            arrAlreadyRead = data;
        document.dispatchEvent(new Event("ondataloaded"));
    }else{
        const serializedData = localStorage.getItem(UNREAD_KEY);
        let data = JSON.parse(serializedData);
        if(data !== null)
            arrUnread = data;
        document.dispatchEvent(new Event("ondataloaded"));
    }
}

//function untuk memperbarui data pada local storage
function updateStorage(readInfo){
    if(isStorageExist()){
        if(readInfo){
            const parsed = JSON.stringify(arrAlreadyRead);
            localStorage.setItem(ALREADY_READ_KEY, parsed);
        }else{
            const parsed = JSON.stringify(arrUnread);
            localStorage.setItem(UNREAD_KEY, parsed);
        }
    }
}

// function untuk mengetahui index pada array yang menampung buku
function findBookIndex(bookId, readInfo) {
    if(readInfo){
        let index = 0;
        for(book of arrAlreadyRead){
            if(book.id == bookId){ return index };
            index++;
        }
    }else{
        let index = 0;
        for(book of arrUnread){
            if(book.id == bookId){ return index };
            index++;
        }
    }

    return -1
}

// function untuk memindahkan buku ke rak Already Read
function moveToAlreadyRead(event){
    if(isStorageExist()){
        loadDataFromStorage(true);
        loadDataFromStorage(false);

        const elementHtml = event.target.parentElement.parentElement;

        const index = findBookIndex(elementHtml[BOOK_ITEMID], false);
        arrAlreadyRead.push(arrUnread[index]);
        arrUnread.splice(index, 1);

        updateStorage(true);
        updateStorage(false);

        elementHtml.remove();

        costomAlert('The book has been transferred successfully!');
    }
}

//function untuk memindahkan buku ke rak Unread
function moveToUnread(event){
    if(isStorageExist()){
        loadDataFromStorage(true);
        loadDataFromStorage(false);

        const elementHtml = event.target.parentElement.parentElement;

        const index = findBookIndex(elementHtml[BOOK_ITEMID], true);
        arrUnread.push(arrAlreadyRead[index]);
        arrAlreadyRead.splice(index, 1);

        updateStorage(true);
        updateStorage(false);

        elementHtml.remove();

        costomAlert('The book has been transferred successfully!');
    }
}

//function untuk menghapus buku
function deleteBook(event, readInfo){
    if(isStorageExist()){
        if(readInfo){
            const elementHtml = event.target.parentElement.parentElement;

            const index = findBookIndex(elementHtml[BOOK_ITEMID], true);
            arrAlreadyRead.splice(index, 1);

            updateStorage(true);

            elementHtml.remove();

            costomAlert('The book has been deleted!');
        }else{
            const elementHtml = event.target.parentElement.parentElement;

            const index = findBookIndex(elementHtml[BOOK_ITEMID], false);
            arrUnread.splice(index, 1);

            updateStorage(false);

            elementHtml.remove();

            costomAlert('The book has been deleted!');
        }
        
    }
}

// function untuk membuat object
function createObj(title, author, year, readInfo){
    let objAlreadyRead = {};
    let objUnread = {};

    if(readInfo){
        objAlreadyRead.id = +new Date();
        objAlreadyRead.title = title;
        objAlreadyRead.author = author;
        objAlreadyRead.year = year;
        objAlreadyRead.isComplate = readInfo;
        return objAlreadyRead;

    }else{
        objUnread.id = +new Date();
        objUnread.title = title;
        objUnread.author = author;
        objUnread.year = year;
        objUnread.isComplate = readInfo;
        return objUnread;

    }
}

//function untuk mengecek checkbox
function alreadyRead(){
    if (isAlreadyRead.checked == 1){
      return true;
    } else {
      return false;
    }
}

//function untuk tambah buku
function addBook(){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;

    const objBook = createObj(title, author, year, alreadyRead());
    console.log(objBook);

    if(objBook.isComplate){
        arrAlreadyRead.push(objBook);
    }else{
        arrUnread.push(objBook);
    }

    updateStorage(objBook.isComplate);
    costomAlert('Book added successfully!');
}