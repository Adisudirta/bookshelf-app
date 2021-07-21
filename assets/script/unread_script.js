document.addEventListener('DOMContentLoaded', function(){
    if(isStorageExist()){
        loadDataFromStorage(false);
        showBooks(false);

        const searchForm = document.querySelector('#unread form');
        searchForm.addEventListener('submit', function(event){
            event.preventDefault();
            const searchTxt = document.querySelector('#unread form input').value;
            searchBook(searchTxt, false);
        });
    }
}); 