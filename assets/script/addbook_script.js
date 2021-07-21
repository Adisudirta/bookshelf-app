document.addEventListener('DOMContentLoaded', function(){
    const bookForm = document.getElementById('bookForm');

    bookForm.addEventListener('submit', function(event){
        event.preventDefault();
        addBook();
    });

    if(isStorageExist()){
        loadDataFromStorage(true);
        loadDataFromStorage(false);
    }
});