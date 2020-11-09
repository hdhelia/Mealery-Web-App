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

}

const d = new Date()
const todayNumber = d.getDay();

window.addEventListener("load", async function (){

    const select = document.getElementById("day-dropdown");
    const todayOption = document.createElement("option")
    todayOption.innerHTML = "Today"
    todayOption.selected = true
    select.appendChild(todayOption)

    let nextDayOption;
    //add days after today till Saturday to the day-dropdown
    for(let i = todayNumber+1; i <= 6; i++){
        nextDayOption = document.createElement("option")
        nextDayOption.innerHTML = numToDay[i];
        select.appendChild(nextDayOption)
    }

    //add days after Saturday till before today
    for(let i = 0; i < todayNumber; i++){
        nextDayOption = document.createElement("option")
        nextDayOption.innerHTML = numToDay[i];
        select.appendChild(nextDayOption)
    }

    

    //const rest_id = 123 //*********IMP REMEMBER TO CHANGE THIS
    // const ordersListEndpoint = `/restaurant/${rest_id}/orders/${day}` 
    //const response = await fetch(ordersListEndpoint);
    // if (!response.ok) {
    //     console.log(response.error);
    //     return;
    // }

    // ordersList = await response.json();
})