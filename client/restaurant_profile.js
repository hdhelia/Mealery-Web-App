// This is the js to render the data in restaurant_profile.html

window.addEventListener("load", async function(){
    const rest_id = localStorage.rest_id; //*********IMP REMEMBER TO CHANGE THIS

    // test rest_id = 2
    const profileEndpoint = "/restaurant/2/profile" ;
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
    // document.getElementById("inputPass").value = profile.pass;
});

document.getElementById("save1").addEventListener("click", async () => {
    const name = document.getElementById("inputName").value;
    const desc = document.getElementById("inputDesc").value;
    const addr = document.getElementById("inputAdd").value;
    const ph = document.getElementById("inputPhone").value;

    await fetch("/restaurant/2/profile-general/update", {
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
            // pass: pass
        })
      });
});

document.getElementById("save2").addEventListener("click", async function(){
    const email = document.getElementById("inputEmail").value;
    // const pass = document.getElementById("inputPass").value;

    await fetch("/restaurant/2/profile-account/update", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            // pass: pass
        })
      });
})

document.getElementById("home-link").href = "/restaurant/2";
document.getElementById("cust-list-link").href = "/restaurant/cust_list/2";
document.getElementById("profile-link").href = "/restaurant/profile/2";