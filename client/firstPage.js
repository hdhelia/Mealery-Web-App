window.onload  = async function(){

    const urlOfPage = document.URL;

    if(urlOfPage.match(/customer/)){
        // Personal Page
        document.getElementById('welcomeUserMessage').style.display = "inline";
        document.getElementById('logout').style.display = "inline";
    }else{
        document.getElementById('signIn').style.display = "inline";
        document.getElementById('logIn').style.display = "inline";
    }

    const getRestaurantImages = await fetch('/restaurants');
    if (getRestaurantImages.ok){
        const restaurantJSON = await getRestaurantImages.json();
        document.getElementById('res1').src = (restaurantJSON[0]['image']);
        document.getElementById('res2').src = (restaurantJSON[1]['image']);
        document.getElementById('res3').src = (restaurantJSON[2]['image']);

        const storefrontEndPoint = '/storefront/';
        document.getElementById('res1Link').href = (storefrontEndPoint + restaurantJSON[0]['id']);
        document.getElementById('res2Link').href = (storefrontEndPoint + restaurantJSON[1]['id']);
        document.getElementById('res3Link').href = (storefrontEndPoint + restaurantJSON[2]['id']);

    }else{
        console.log(getRestaurantImages.error);
    }

};