const greetings = document.getElementById('greetings');

const populateWelcomePage = () => {
  const user = JSON.parse(localStorage.getItem('userDetails'));
  greetings.innerHTML = `Welcome ${user.firstName}, glad to have you here.`;
}

window.addEventListener('load', populateWelcomePage);