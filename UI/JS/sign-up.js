const signUpButton = document.getElementById('sign-up-btn');
const urlToReach = 'http://hibanka.herokuapp.com/api/v1/auth/signup';
const errorMessage = document.getElementById('error-message');

const validator = () => {
    errorMessage.innerHTML = '';
    const firstnameEntered = document.getElementById('firstname').value;
    const lastnameEntered = document.getElementById('lastname').value;
    const emailEntered = document.getElementById('email').value;
    const passwordEntered = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const namePattern = /^[a-zA-Z]+$/;
    const emailPattern = /^[a-zA-Z._]+@[a-zA-Z]+\.[a-zA-Z]+$/
    
    if (!firstnameEntered.match(namePattern) || !firstnameEntered || firstnameEntered.length < 2) {
        setTimeout(() => {
            errorMessage.innerHTML = 'Your First Name must be letters';
        }, 100);    
    }
    else if (!lastnameEntered.match(namePattern) || !lastnameEntered || lastnameEntered.length < 2) {
        setTimeout(() => {
            errorMessage.innerHTML = 'Your Last Name must be letters';
        }, 100);
    }
    else if (!emailEntered.match(emailPattern) || !emailEntered) {
        setTimeout(() => {    
            errorMessage.innerHTML = 'Please check your email address';
        }, 100)
    }
    else if (!passwordEntered || passwordEntered.length < 6) {
        setTimeout(() => {
            errorMessage.innerHTML = 'Your password must be at least 6 characters';
        }, 100)    
    }
    else if (passwordEntered !== confirmPassword){
        setTimeout(() => {
            errorMessage.innerHTML = 'Please ensure your passwords match';
        }, 100);
    }
    else {
        signUp();
        errorMessage.innerHTML = `<img src = '../images/chased.gif'>`
    }
}

const signUp = async () => {
    const firstnameEntered = document.getElementById('firstname').value;
    const lastnameEntered = document.getElementById('lastname').value;
    const emailEntered = document.getElementById('email').value;
    const passwordEntered = document.getElementById('password').value;

    const data = JSON.stringify({
        firstName: firstnameEntered,
        lastName: lastnameEntered,
        email: emailEntered,
        password: passwordEntered,
    })
    try {
        const response = await fetch (urlToReach, {  method: 'POST', body: data, headers: { 'Content-type': 'application/json' }});
        const jsonResponse = await response.json();
        if (response.status === 200){
            const user = localStorage.setItem('userDetails', JSON.stringify(jsonResponse.data))
            const token = localStorage.setItem('token', jsonResponse.data.token);
            console.log(localStorage.getItem('token'));
        } 
        else {
            errorMessage.innerHTML = jsonResponse.error;
        }
    } catch (error) {
        errorMessage.innerHTML = 'Connection error, please try again';
    }
};

signUpButton.addEventListener('click', validator);