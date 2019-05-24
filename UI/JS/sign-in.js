const signInButton = document.getElementById('sign-in-btn');
const urlToReach = 'https://hibanka.herokuapp.com/api/v1/auth/signin';
const responseTag = document.getElementById('response-tag');

const validator = () => {
    responseTag.innerHTML = '';
    const emailEntered = document.getElementById('email').value;
    const passwordEntered = document.getElementById('password').value;

    const emailPattern = /^[a-zA-Z._]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    
    if (!emailEntered.match(emailPattern) || !emailEntered) {
        setTimeout(() => {    
            responseTag.innerHTML = 'Please check your email address';
        }, 100)
    }
    else if (!passwordEntered) {
        setTimeout(() => {
            responseTag.innerHTML = 'Please enter your password';
        }, 100)    
    }
    else {
        signIn();
        responseTag.innerHTML = `<img src = '../images/chased.gif'>`
    }
}

const signIn = async () => {
    const emailEntered = document.getElementById('email').value;
    const passwordEntered = document.getElementById('password').value;

    const data = JSON.stringify({
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
            if(jsonResponse.data.type === 'admin'){
                location.href = 'profile-admin-view.html'
            } else if (jsonResponse.data.type === 'staff'){
                location.href = 'profile-staff-view.html'
            } else {
                location.href = 'profile.html'
            }
        } 
        else {
            responseTag.innerHTML = jsonResponse.error;
        }
    } catch (error) {
        responseTag.innerHTML = 'Connection error, please try again';
    }
};

signInButton.addEventListener('click', validator);