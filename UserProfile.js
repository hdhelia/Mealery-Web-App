// This is the js to render the data in UserProfile.html

window.addEventListener("load", async function(){
    const cust_id = localStorage.cust_id //*********IMP REMEMBER TO CHANGE THIS

    // fake rest_id = 123 for testing in milestone 1
    const profileEndpoint = "/customer/123/profile" ;
    const response = await fetch(profileEndpoint);
    if (!response.ok) {
        console.log(response.error);
        return;
    }

    const profile = await response.json();

    document.getElementById("inputName").value = profile.name;
    document.getElementById("inputAdd").value = profile.add;
    document.getElementById("inputPhone").value = profile.ph;

    document.getElementById("inputEmail").value = profile.email;
    document.getElementById("inputPass").value = profile.pass;

    document.getElementById("cardNumber").value = profile.cardnum;
    document.getElementById("cvv").value = profile.cvv;
    document.getElementById("zip-code").value = profile.zip;
    document.getElementById("exp-date").value = profile.exp;
    document.getElementById("card-name").value = profile.card_name;
});

document.getElementById("save").addEventListener("click", async () => {
    const name = document.getElementById("inputName").value;
    const addr = document.getElementById("inputAdd").value;
    const ph = document.getElementById("inputPhone").value;

    const email = document.getElementById("inputEmail").value;
    const pass = document.getElementById("inputPass").value;

    const cardnum = document.getElementById("cardNumber").value;
    const cvv = document.getElementById("cvv").value;
    const zip = document.getElementById("zip-code").value;
    const exp = document.getElementById("exp-date").value;
    const card_name = document.getElementById("card-name").value;

    await fetch("/customer/123/profile/update", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            add: addr,
            ph: ph,
            email: email,
            pass: pass,
            cardnum: cardnum,
            cvv: cvv,
            zip: zip,
            exp: exp,
            card_name: card_name
        })
      });
});