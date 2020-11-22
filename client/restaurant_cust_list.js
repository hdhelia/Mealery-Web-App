// This is the js to render the cards in restaurant_cust_list.html

window.addEventListener("load", async function(){
    const rest_id = localStorage.rest_id; //*********IMP REMEMBER TO CHANGE THIS

    // test rest_id = 2
    const custListEndpoint = "/restaurant/2/cust_list" ;
    const response = await fetch(custListEndpoint);
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
        addr.innerHTML = customer.addr;
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

document.getElementById("home-link").href = "/restaurant/2";
document.getElementById("cust-list-link").href = "/restaurant/cust_list/2";
document.getElementById("profile-link").href = "/restaurant/profile/2";