const user = JSON.parse(localStorage.getItem('userDetails'));
const userToken = localStorage.getItem('token');
const profileMessage = document.getElementById('profile-msg');
const displayDiv = document.querySelector('.display');
const mainBodyDiv = document.querySelector('.main-body');
const basicInfoBtn = document.getElementById('basic-info');
const AccountsBtn = document.getElementById('banking-info');
const email = user.email;
const urlToReach = `https://hibanka.herokuapp.com/api/v1/self/${email}/accounts`;

const populateProfile = async () => {
    profileMessage.innerHTML = `<em>Hey ${user.firstName}...</em>`;
    mainBodyDiv.innerHTML = `<br><em>First Name</em>   
                             <strong>${user.firstName}</strong><br><br>
                             <em>Last Name</em>
                             <strong>${user.lastName}</strong><br><br>
                             <em>Email</em>
                             <strong>${user.email}</strong><br>
                             `;
}

const getBasicInfo = async () => {
    displayDiv.innerHTML = `<div class = 'main-body'><br><em>First Name</em>   
                             <strong>${user.firstName}</strong><br><br>
                             <em>Last Name</em>
                             <strong>${user.lastName}</strong><br><br>
                             <em>Email</em>
                             <strong>${user.email}</strong><br>
                             <div>
                             `;
}

const getAccounts = async () => {
    displayDiv.innerHTML = `<img src = '../images/fading.gif'>`;
    try {
        const response = await fetch(urlToReach, { method: 'GET', headers: { 'Content-type': 'application/json',
                                                                              'x-access-token': userToken  
                                                                            }});
        const jsonResponse = await response.json();
        if (!jsonResponse.error){
        displayDiv.innerHTML = '';    
        jsonResponse.data.map(bankAccount => {
            displayDiv.innerHTML += `<div class = 'main-body'>
                                    <a  href = 'own-account-admin-view.html?ac=${bankAccount.account_number}'>
                                    <em>Account No.</em><br>
                                    <strong>${bankAccount.account_number}</strong><br><br>
                                    <em>Account Name</em><br>
                                    <strong>${bankAccount.first_name} ${bankAccount.last_name}</strong><br><br>
                                    </a>
                                    </div>`;                                              
        })
    } else if (jsonResponse.status === 200 && jsonResponse.error){
        displayDiv.innerHTML = `<div class = 'main-body'>${jsonResponse.error}</div>`;
    } else if (response.status === 403) {
        location.href = '../pages/sign-in.html'
    }
                                                                            
    } catch (error) {
        mainBodyDiv.innerHTML = 'Connection error, please try again';
    }
}

// Functions for styling tab buttons
const styleBasicInfoButton = () => {
    basicInfoBtn.style.background = '#ddd';
	basicInfoBtn.style.color = '#de4f4f';
    basicInfoBtn.style.borderLeft = '5px solid #de4f4f';
    
    AccountsBtn.style.background = 'white';
	AccountsBtn.style.color = 'black';
	AccountsBtn.style.border = 'white';
}

const styleAccountsButton = () => {
    basicInfoBtn.style.background = 'white';
	basicInfoBtn.style.color = 'black';
	basicInfoBtn.style.border = 'white';

	AccountsBtn.style.background = '#ddd';
	AccountsBtn.style.color = '#de4f4f';
	AccountsBtn.style.borderLeft = '5px solid #de4f4f';
}

basicInfoBtn.addEventListener('click', getBasicInfo);
basicInfoBtn.addEventListener('click', styleBasicInfoButton);
AccountsBtn.addEventListener('click', getAccounts);
AccountsBtn.addEventListener('click', styleAccountsButton);