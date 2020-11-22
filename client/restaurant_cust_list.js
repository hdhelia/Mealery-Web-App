// This is the js to render the cards in restaurant_cust_list.html

//extracting rest_id from the url
const url = document.URL;
const rest_id = url.substring(url.lastIndexOf('/')+1);

window.addEventListener("load", async function(){

    let response = await fetch(`/restaurant/${rest_id}/profile`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }

    const profile = await response.json();

    document.getElementById("restaurant-name").innerHTML = profile.name;

    response = await fetch(`/restaurant/${rest_id}/cust_list`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }

    const custList = await response.json();
    const custCardsList = document.getElementById("cust-cards-list");

    for(const customer of custList){
        const card = document.createElement("div");
        let classes = ["card", "mt-3"];
        card.classList.add(...classes);

        const container = document.createElement("div");
        container.classList.add("container");

        const row = document.createElement("div");
        row.classList.add("row");

        const colImg = document.createElement("div");
        colImg.classList.add("col-2");
        const img = document.createElement("img");
        classes = ["rounded", "prof-pic", "mt-3", "ml-4"];
        img.classList.add(...classes);
        img.src = customer.image;
        colImg.appendChild(img);

        const colBody = document.createElement("div");
        colBody.classList.add("col-5");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const name = document.createElement("h5");
        name.classList.add("card-title");
        name.innerHTML = customer.name;
        const addr = document.createElement("p");
        addr.classList.add("card-text");
        addr.innerHTML = customer.address;
        const email = document.createElement("p");
        email.classList.add("card-text");
        email.innerHTML = customer.email;
        const ph = document.createElement("p");
        ph.classList.add("card-text");
        ph.innerHTML = customer.phone_number;

        cardBody.appendChild(name);
        cardBody.appendChild(addr);
        cardBody.appendChild(email);
        cardBody.appendChild(ph);

        colBody.appendChild(cardBody);

        row.appendChild(colImg);
        row.appendChild(colBody);

        container.appendChild(row);

        card.appendChild(container);

        custCardsList.appendChild(card);
    }
});

document.getElementById("home-link").href = `/restaurant/home/${rest_id}`;
document.getElementById("cust-list-link").href = `/restaurant/cust_list/${rest_id}`;
document.getElementById("profile-link").href = `/restaurant/profile/${rest_id}`;