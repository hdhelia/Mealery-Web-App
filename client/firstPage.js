window.onload  = async function(){

    const urlOfPage = document.URL;

    if(urlOfPage.match(/customer/)){
        // Personal Page
        const tokens = urlOfPage.split('/');
        const idFromUrl = Number.parseInt(tokens[tokens.length - 1]);
        const userMessage = await fetch('/userInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ id : idFromUrl })
        });

        if(userMessage.ok){
            const messageToDisplay = await userMessage.json();
            document.getElementById('welcomeUserMessage').innerText = ('Hello ' + messageToDisplay['name'].split(' ')[0] + ',');
        }else{
            console.log(userMessage.error);
        }

        document.getElementById('welcomeUserMessage').style.display = "inline";
        document.getElementById('logout').style.display = "inline";

        //make cart button visible
        document.getElementById('cart-button').style.display = 'inline';
    }else{
        //make cart button invisible
        document.getElementById('cart-button').style.display = 'none';

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

    const userReview = await fetch('/customers');
    if(userReview.ok){
        const review = await userReview.json();
        document.getElementById('userReview1').innerText = review['review'];
        document.getElementById('userReview2').innerText = review['review'];
        document.getElementById('userReview3').innerText = review['review'];
    }else{
        console.log(userReview.error);
    }


};