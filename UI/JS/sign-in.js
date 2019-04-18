const signIn = () => {
    const email = document.getElementById('email').value;
    if(email === 'john.kamali@outlook.com'){
        location.href = '../pages/profile-admin-view.html'
    } else if (email === 'fatima.kamali@outlook.com' ){
        location.href ='../pages/profile-staff-view.html'
    } else {
        location.href = '../pages/profile.html'
    }
}