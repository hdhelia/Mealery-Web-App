
function loading(){
    //function to get the restaurant info
    async function getInfo(restaurant_name){
        const resp = await fetch(`/info/${restaurant_name}`);
        if(resp.ok){
            console.log("Fetched restaurant info");
            const restaurant_info = await resp.json();
            render(restaurant_info);
        }
        else{
            console.log("ERROR: Could not retrieve restaurant info!");
        }
    }

    //function to set stars
    function setStars(tag, numberOfStars, size){
        
        const star_str = `<svg width='${size}em' height= '${size}em' viewBox='0 0 16 16' class='bi bi-star-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\'/></svg>`;

        const half_str = `<svg width='${size}em' height='${size}em' viewBox='0 0 16 16' class='bi bi-star-half' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M5.354 5.119L7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.519.519 0 0 1-.146.05c-.341.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.171-.403.59.59 0 0 1 .084-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027c.08 0 .16.018.232.056l3.686 1.894-.694-3.957a.564.564 0 0 1 .163-.505l2.906-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.002 2.223 8 2.226v9.8z'/></svg>`;

        const int_stars = parseInt(numberOfStars, 10);


        let innerContent = "";
        for(let i = 1; i <= int_stars; i++){
            innerContent += star_str;
        }

        //adding the half star if necessary
        if(numberOfStars-int_stars != 0){
            innerContent += half_str;
        }

        tag.innerHTML = innerContent;
    }

   //To be used later with database: const restaurant_name =  window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));
    const restaurant_name = "restaurant";
    const restaurant_info = (async()=>getInfo(restaurant_name))();

    //function to render the page
    function render(restaurant_info){

        console.log(restaurant_info);
        
        //set name
        document.getElementById('name-of-restaurant').innerHTML = restaurant_info.name;


        //set star ratings and reviews link
        const rating = document.getElementById('rating');
        const link = document.createElement('a');
        link.href = "#reviews";
        link.classList.add('link');
        

        
        setStars(link,restaurant_info.stars, 2);
        link.appendChild(document.createElement('br'));
        link.appendChild(document.createElement('br'));
        link.appendChild(document.createTextNode('Reviews'));
        rating.appendChild(link);



        //set decription
        document.getElementById('description').appendChild(document.createTextNode(restaurant_info.description));



        //set image

        const topDecor = document.getElementById('top-decor');

        const restaurantImage = document.createElement('img');
        restaurantImage.src = restaurant_info.image;
        restaurantImage.alt = "This is the Restaurant's image";
        restaurantImage.id = "restaurant-img";
        topDecor.appendChild(restaurantImage);

        //set reviews
        const reviews = document.getElementById('reviews');
        //number of reviews to be shown initially
        const NUM_REVIEWS = 5;

        let offset = 0;

        //count of the reviews
        let count = 0;

        //function that displays 5 more reviews
        function ShowMoreReviews(offset){
            const list = restaurant_info.reviews;
            
            for(let i = offset; i<=offset+5;i++){
                //exceeding the number of reviews
                if(i >= list.length){
                    break;
                }

                element = list[i];

                let classes = ["card", "m-4", "w-50", "review-card"];
                const card = document.createElement('div');
                card.classList.add(...classes);

                const row = document.createElement('div');
                classes = ["row", "mt-1", "mb-3"];
                row.classList.add(...classes);
                card.appendChild(row);

                const image = document.createElement('div');
                classes = ["col-3",  "mt-1", "ml-4", "md-1", "rounded"];
                image.classList.add(...classes);
                row.appendChild(image);

                const img = document.createElement('img');
                img.src = element.image;
                img.alt = "profile picture";
                img.classList.add('user-pic');
                image.appendChild(img);

                const reviewMaterial = document.createElement('div');
                classes = ["col-5", "mt-1"];
                reviewMaterial.classList.add(...classes);
                row.appendChild(reviewMaterial);
                
                const stars = document.createElement('div');
                classes = ["row", "tertiary-color"];
                setStars(stars, element.stars, 1);
                stars.classList.add(...classes);
                reviewMaterial.appendChild(stars);

                const text = document.createElement('div');
                text.classList.add('row');
                text.appendChild(document.createTextNode(element.text));
                reviewMaterial.appendChild(text);

                reviews.appendChild(card);

            }
        }   
        
        restaurant_info.reviews.forEach(element => {
            if(count >= 5){
                return;
            }
            count++;
            let classes = ["card", "m-4", "w-50", "review-card"];
            const card = document.createElement('div');
            card.classList.add(...classes);

            const row = document.createElement('div');
            classes = ["row", "mt-1", "mb-3"];
            row.classList.add(...classes);
            card.appendChild(row);

            const image = document.createElement('div');
            classes = ["col-3",  "mt-1", "ml-4", "md-1", "rounded"];
            image.classList.add(...classes);
            row.appendChild(image);

            const img = document.createElement('img');
            img.src = element.image;
            img.alt = "profile picture";
            img.classList.add('user-pic');
            image.appendChild(img);

            const reviewMaterial = document.createElement('div');
            classes = ["col-5", "mt-1"];
            reviewMaterial.classList.add(...classes);
            row.appendChild(reviewMaterial);
            
            const stars = document.createElement('div');
            classes = ["row", "tertiary-color"];
            setStars(stars, element.stars, 1);
            stars.classList.add(...classes);
            reviewMaterial.appendChild(stars);

            const text = document.createElement('div');
            text.classList.add('row');
            text.appendChild(document.createTextNode(element.text));
            reviewMaterial.appendChild(text);

            reviews.appendChild(card);

        });

        offset+=5;
        
        if(restaurant_info.reviews.length > 5){
            //more reviews link
            moreReviews = document.createElement('a');

            function showMore(){
                ShowMoreReviews(offset);
                offset+=5;
                if(offset >= restaurant_info.reviews.length){
                    document.getElementById('more').remove();
                }

            }

            moreReviews.href = "#more";
            

            moreReviews.classList.add("link");
            moreReviews.id = "more";
            moreReviews.appendChild(document.createTextNode("More Reviews"));
            moreReviews.addEventListener('click',showMore);
            moreReviews.appendChild(document.createElement('br'));
            moreReviews.appendChild(document.createElement('br'));
            reviews.appendChild(moreReviews);
        }

        //menu rendering

        //function to get meal card
        function getMeal(meal){
            let classes = ["row", "content"];
            
            const card = document.createElement("div");
            classes = ["card", "product-card", "w-75"];
            card.classList.add(...classes);
    
            const rowCard = document.createElement("div");
            rowCard.classList.add("row");
    
            const colImg = document.createElement("div");
            colImg.classList.add("col");
            const img = document.createElement("img");
            classes = ["product-img", "rounded"];
            img.classList.add(...classes);
            img.src = meal.image;
            colImg.appendChild(img);
    
            const colTitleDesc = document.createElement("div");
            colTitleDesc.classList.add("col");
    
            const rowTitle = document.createElement("div");
            classes = ["row", "mt-2"];
            rowTitle.classList.add(...classes);
            const title = document.createElement("div");
            title.classList.add("card-title");
            const h5 = document.createElement("h5");
            h5.innerHTML = meal.name;
            title.appendChild(h5);
            rowTitle.appendChild(title);
    
            const rowDesc = document.createElement("div");
            classes = ["row", "md-2"];
            rowDesc.classList.add(...classes);
            const p = document.createElement("p");
            p.innerHTML = meal.description;
            rowDesc.appendChild(p);
    
            colTitleDesc.appendChild(rowTitle);
            colTitleDesc.appendChild(rowDesc);
    
            rowCard.appendChild(colImg);
            rowCard.appendChild(colTitleDesc);
    
            card.appendChild(rowCard);

            //add to cart button
            const addToCart = document.createElement('div');
            addToCart.classList.add('col');

            const button = document.createElement('button');
            classes = ["btn","btn-danger", "mt-5", "add-to-cart"];
            button.classList.add(...classes);
            button.innerHTML = "Add To Cart";
            addToCart.appendChild(button);

            rowCard.appendChild(addToCart);
    
            return card;
        }

        
        //breakfast menu
        breakfastDiv = document.getElementById('breakfast');
        for(const meal of restaurant_info.breakfast){
            breakfastDiv.appendChild(getMeal(meal));
            breakfastDiv.appendChild(document.createElement('br'));
        }

        //lunch menu
        lunchDiv = document.getElementById('lunch');
        for(const meal of restaurant_info.lunch){
            lunchDiv.appendChild(getMeal(meal));
            lunchDiv.appendChild(document.createElement('br'));
        }

        //dinner menu
        dinnerDiv = document.getElementById('dinner');
        for(const meal of restaurant_info.dinner){
            dinnerDiv.appendChild(getMeal(meal));
            dinnerDiv.appendChild(document.createElement('br'));
        }
        
    }   


}

window.addEventListener('load', loading);
