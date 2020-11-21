// This is the javascript to render data supported componenents in the front end


/**
 * Code to fill out the day selector drop down correctly using some date library
 */

const numToDay = {
    0 : "Sunday",
    1:"Monday",
    2:"Tuesday",
    3:"Wednesday",
    4:"Thursday",
    5:"Friday",
    6:"Saturday"

};

const d = new Date();
const todayNumber = d.getDay();

const select = document.getElementById("day-dropdown");

async function renderMealCards(){
    let selectedDay = document.getElementById("day-dropdown").value;
    selectedDay = selectedDay === "Today" ? numToDay[todayNumber] : selectedDay;

    const rest_id = localStorage.rest_id; //*********IMP REMEMBER TO CHANGE THIS

    // test rest_id = 2
    const ordersListEndpoint = "/restaurant/2/orders" ;
    const response = await fetch(ordersListEndpoint);
    if (!response.ok) {
        console.log(response.error);
        return;
    }

    const ordersList = await response.json();

    /**
     * This is what the ordersList json will look like:
     * {
     *  "Monday": { img: "path_to_image", title: "Meal Sample", desc: "sample_desc", time:"Breakfast"}
     *  "Tuesday": {...}
     *   .
     *   .
     *   .
     *   .
     *   .
     * }
     * It'll have keys for all days regardless of if the restaurant does not have any orders on any particular day
     */

     const currOrdersList = ordersList[selectedDay];
     if(currOrdersList){
        for(const meal of currOrdersList){
            const row = document.createElement("div");
            let classes = ["row", "content"];
            row.classList.add(...classes);
            
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
            img.src = meal.img;
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
            p.innerHTML = meal.desc;
            rowDesc.appendChild(p);

            colTitleDesc.appendChild(rowTitle);
            colTitleDesc.appendChild(rowDesc);

            rowCard.appendChild(colImg);
            rowCard.appendChild(colTitleDesc);

            card.appendChild(rowCard);

            row.appendChild(card);

            if(meal.time === "Breakfast"){
                document.getElementById("breakfast-meals-list").appendChild(row);
            }
            else if(meal.time === "Lunch"){
                document.getElementById("lunch-meals-list").appendChild(row);
            }
            else if(meal.time === "Dinner"){
                document.getElementById("dinner-meals-list").appendChild(row);
            }
        }
     }
     else{
        document.getElementById("breakfast-meals-list").innerHTML = "";
        document.getElementById("lunch-meals-list").innerHTML = "";
        document.getElementById("dinner-meals-list").innerHTML = "";
     }
}

window.addEventListener("load", async function (){

    let selectedDay;
    const todayOption = document.createElement("option");
    todayOption.innerHTML = "Today";
    todayOption.selected = true;
    select.appendChild(todayOption);

    
    
    let nextDayOption;
    //add days after today till Saturday to the day-dropdown
    for(let i = todayNumber+1; i <= 6; i++){
        nextDayOption = document.createElement("option");
        nextDayOption.innerHTML = numToDay[i];
        select.appendChild(nextDayOption);
    }

    //add days after Saturday till before today
    for(let i = 0; i < todayNumber; i++){
        nextDayOption = document.createElement("option");
        nextDayOption.innerHTML = numToDay[i];
        select.appendChild(nextDayOption);
    }

    renderMealCards();
    
});

select.addEventListener("change", async function(){
    renderMealCards();
});

