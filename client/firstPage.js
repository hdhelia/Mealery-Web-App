window.onload  = function(){

    document.getElementById('sign_up_button').addEventListener('click', async () => {
        const nameInput = document.getElementById('name_label_signUp').value;
        const emailInput = document.getElementById('email_label_signUp').value;
        const passwordInput = document.getElementById('password_label_signUp').value;
        const typeInput = document.getElementById('type_signUp').value;
        const typeInitial = typeInput === 'Customer' ? 'C' : 'R';

        const signUpCheckEndpoint = '/signup'
        const response = await fetch(signUpCheckEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ name : nameInput, type : typeInitial, email : emailInput, password : passwordInput})
        });

        if(!response.ok){
            window.alert('Could not sign up.');
        }

    });


};