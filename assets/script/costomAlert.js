//function untuk menampilkan pesan alert
function costomAlert(massage){
    const myAlert = document.querySelector('.containerAlert');
    const txtContainer = document.querySelector('.mainAlert p');
    txtContainer.innerText = massage;
    myAlert.removeAttribute('style');
}

//function untuk close pesan alert
function closeAlert(){
    const myAlert = document.querySelector('.containerAlert');
    myAlert.setAttribute('style', 'visibility: hidden;');
}