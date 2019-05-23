const signUpButton = document.getElementById('sign-up-btn');
const urlToReach = 'http://hibanka.herokuapp.com/api/v1/auth/signup';
const responseTag = document.getElementById('response-tag');

const validator = () => {
    responseTag.innerHTML = '';
    const firstnameEntered = document.getElementById('firstname').value;
    const lastnameEntered = document.getElementById('lastname').value;
    const emailEntered = document.getElementById('email').value;
    const passwordEntered = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const namePattern = /^[a-zA-Z]+$/;
    const emailPattern = /^[a-zA-Z._]+@[a-zA-Z]+\.[a-zA-Z]+$/
    
    if (!firstnameEntered.match(namePattern) || !firstnameEntered || firstnameEntered.length < 2) {
        setTimeout(() => {
            responseTag.innerHTML = 'Your First Name must be letters';
        }, 100);    
    }
    else if (!lastnameEntered.match(namePattern) || !lastnameEntered || lastnameEntered.length < 2) {
        setTimeout(() => {
            responseTag.innerHTML = 'Your Last Name must be letters';
        }, 100);
    }
    else if (!emailEntered.match(emailPattern) || !emailEntered) {
        setTimeout(() => {    
            responseTag.innerHTML = 'Please check your email address';
        }, 100)
    }
    else if (!passwordEntered || passwordEntered.length < 6) {
        setTimeout(() => {
            responseTag.innerHTML = 'Your password must be at least 6 characters';
        }, 100)    
    }
    else if (passwordEntered !== confirmPassword){
        setTimeout(() => {
            responseTag.innerHTML = 'Please ensure your passwords match';
        }, 100);
    }
    else {
        signUp();
        responseTag.innerHTML = `<img src = '../images/chased.gif'>`
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
            responseTag.innerHTML = '';
            const user = localStorage.setItem('userDetails', JSON.stringify(jsonResponse.data))
            const token = localStorage.setItem('token', jsonResponse.data.token);
            location.href = 'welcome.html'
        } 
        else {
            responseTag.innerHTML = jsonResponse.error;
        }
    } catch (error) {
        responseTag.innerHTML = 'Connection error, please try again';
    }
};

signUpButton.addEventListener('click', validator);