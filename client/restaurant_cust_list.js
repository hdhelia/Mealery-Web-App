// This is the js to render the cards in restaurant_cust_list.html

window.addEventListener("load", async function(){
    const rest_id = localStorage.rest_id; //*********IMP REMEMBER TO CHANGE THIS

    // fake rest_id = 123 for testing in milestone 1
    const custListEndpoint = "/restaurant/123/cust_list" ;
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
        img.src = customer.img;
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
        addr.innerHTML = customer.add;
        const email = document.createElement("p");
        email.classList.add("card-text");
        email.innerHTML = customer.email;
        const ph = document.createElement("p");
        ph.classList.add("card-text");
        ph.innerHTML = customer.ph;

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