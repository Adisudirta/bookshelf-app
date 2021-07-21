const LIST_ALREADY_READ = document.getElementById('listAlreadyRead');
const LIST_UNREAD = document.getElementById('listUnread');
const SEARCH_ALREADY_READ = document.getElementById('searchAlreadyRead');
const SEARCH_UNREAD = document.getElementById('searchUnread');
const BOOK_ITEMID = 'bookId';

// function untuk membuat element info buku 
function createBookInfo(title, author, year){
    const textTitle = document.createElement('h2');
    textTitle.innerText = title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = `Author : ${author}`;

    const textYear = document.createElement('p');
    textYear.innerText = `Year : ${year}`;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner')
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow')
    container.append(textContainer);

    return container;
}

//function untuk melakukan searching pada judul buku dengan regular expresion
function searchTitle(name, input) {
    var matched = 0;
    if (name.match(new RegExp("\\b" + input + ".*", "i"))) matched = 1;
    return matched;
}

//function untuk hide search result
function hideSearchResult(readInfo){
    if(readInfo){
        const elementSearch = SEARCH_ALREADY_READ.getElementsByClassName('item');
        for(el of elementSearch){
            LIST_ALREADY_READ.append(el);
        }
        SEARCH_ALREADY_READ.setAttribute('hidden', '');
    }else{
        const elementSearch = SEARCH_UNREAD.getElementsByClassName('item');
        for(el of elementSearch){
            LIST_UNREAD.append(el);
        }
        SEARCH_UNREAD.setAttribute('hidden', '');
    }
}

//function untuk searching buku
function searchBook(searchTxt, readInfo){
    if(readInfo){
        let result = arrAlreadyRead.filter(function(value){
            return searchTitle(value.title, searchTxt);
        });
        
        if(result.length != 0){
            SEARCH_ALREADY_READ.removeAttribute('hidden');
            const elementHtml = LIST_ALREADY_READ.getElementsByClassName('item');
            const elementSearch = SEARCH_ALREADY_READ.getElementsByClassName('item');

            for(el of elementSearch){
                LIST_ALREADY_READ.append(el);
            }

            for(obj of result){
                for(el of elementHtml){
                    if(obj.id == el[BOOK_ITEMID]){
                        SEARCH_ALREADY_READ.append(el);
                    }
                }
            }
        }else{
            costomAlert('The book you were looking for was not found!');
        }
    }else{
        let result = arrUnread.filter(function(value){
            return searchTitle(value.title, searchTxt);
        });

        if(result.length != 0){
            SEARCH_UNREAD.removeAttribute('hidden');
            const elementHtml = LIST_UNREAD.getElementsByClassName('item');
            const elementSearch = SEARCH_UNREAD.getElementsByClassName('item');

            for(el of elementSearch){
                LIST_UNREAD.append(el);
            }

            for(obj of result){
                for(el of elementHtml){
                    if(obj.id == el[BOOK_ITEMID]){
                        SEARCH_UNREAD.append(el);
                    }
                }
            }
            
        }else{
            costomAlert('The book you were looking for was not found!');
        }
    }
}

//function untuk membentuk button
function createBtn(classElement, txt, eventBtn, funcBtn){
    const btn = document.createElement('button');
    btn.classList.add(classElement)
    btn.innerText = txt;
    btn.setAttribute(eventBtn, funcBtn);

    return btn;
}

// function untuk menampilkan keseluruhan buku
function showBooks(readInfo){
    if(readInfo){
        for(book of arrAlreadyRead){
            const newBooks = createBookInfo(
                book.title,
                book.author,
                book.year,
            );
            
            const moveBtn = createBtn('moveBtn', 'Move To Unread', 'onclick', 'moveToUnread(event)');
            const containerBtn = document.createElement('div');
            const deleteBtn = createBtn('deleteBtn', 'Delete Book', 'onclick', 'deleteBook(event, true)');
            containerBtn.classList.add('innerBtn');
            containerBtn.append(moveBtn, deleteBtn);
            newBooks.append(containerBtn);

            newBooks[BOOK_ITEMID] = book.id;
            LIST_ALREADY_READ.append(newBooks);
        }
    }else{
        for(book of arrUnread){
            const newBooks = createBookInfo(
                book.title,
                book.author,
                book.year,
            );

            const moveBtn = createBtn('moveBtn', 'Move To Already Read', 'onclick', 'moveToAlreadyRead(event)');
            const deleteBtn = createBtn('deleteBtn', 'Delete Book', 'onclick', 'deleteBook(event, false)');
            const containerBtn = document.createElement('div');
            containerBtn.classList.add('innerBtn');
            containerBtn.append(moveBtn, deleteBtn);
            newBooks.append(containerBtn);

            newBooks[BOOK_ITEMID] = book.id;
            LIST_UNREAD.append(newBooks);
        }
    }
}

