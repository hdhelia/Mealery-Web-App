window.onload  = function(){

    const urlOfPage = document.URL;

    console.log(urlOfPage);
    if(urlOfPage.match(/customer/)){
        // Personal Page
        console.log('User page.');
    }else{
        console.log('Not logged in yet Page.')
    }


};