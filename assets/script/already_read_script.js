document.addEventListener('DOMContentLoaded', function(){
    if(isStorageExist()){
        loadDataFromStorage(true);
        showBooks(true);

        const searchForm = document.querySelector('#alreadyRead form');
        searchForm.addEventListener('submit', function(event){
            event.preventDefault();
            const searchTxt = document.querySelector('#alreadyRead form input').value;
            searchBook(searchTxt, true);
        });
    }
}); 