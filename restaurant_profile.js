// This is the js to render the data in restaurant_profile.html

window.addEventListener("load", async function(){
    const rest_id = localStorage.rest_id //*********IMP REMEMBER TO CHANGE THIS

    // fake rest_id = 123 for testing in milestone 1
    const profileEndpoint = "/restaurant/123/profile" ;
    const response = await fetch(profileEndpoint);
    if (!response.ok) {
        console.log(response.error);
        return;
    }

    const profile = await response.json();

    document.getElementById("inputName").value = profile.name;
    document.getElementById("inputDesc").value = profile.desc;
    document.getElementById("inputAdd").value = profile.add;
    document.getElementById("inputPhone").value = profile.ph;

    document.getElementById("inputEmail").value = profile.email;
    document.getElementById("inputPass").value = profile.pass;
});

document.getElementById("save").addEventListener("click", async () => {
    const name = document.getElementById("inputName").value;
    const desc = document.getElementById("inputDesc").value;
    const addr = document.getElementById("inputAdd").value;
    const ph = document.getElementById("inputPhone").value;

    const email = document.getElementById("inputEmail").value;
    const pass = document.getElementById("inputPass").value;

    await fetch("/restaurant/123/profile/update", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            desc: desc,
            add: addr,
            ph: ph,
            email: email,
            pass: pass
        })
      });
});

