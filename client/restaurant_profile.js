// This is the js to render the data in restaurant_profile.html

//extracting rest_id from the url
const url = document.URL;
const rest_id = url.substring(url.lastIndexOf('/')+1);

window.addEventListener("load", async function(){

    const profileEndpoint = `/restaurant/${rest_id}/profile` ;
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

    try{
        await fetch(`/restaurant/${rest_id}/profile-general/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                desc: desc,
                add: addr,
                ph: ph,
            })
          });
    }
    catch(error){
        console.log("Error ocurred: ",error);
    }
    
});

document.getElementById("save2").addEventListener("click", async function(){
    const email = document.getElementById("inputEmail").value;
    // const pass = document.getElementById("inputPass").value;

    try{
        await fetch(`/restaurant/${rest_id}/profile-account/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                // pass: pass
            })
          });
    }
    catch(error){
        console.log(error);
    }
    
})

document.getElementById("home-link").href = `/restaurant/home/${rest_id}`;
document.getElementById("cust-list-link").href = `/restaurant/cust_list/${rest_id}`;
document.getElementById("profile-link").href = `/restaurant/profile/${rest_id}`;