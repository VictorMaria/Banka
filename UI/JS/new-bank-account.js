const userToken = localStorage.getItem('token');
const urlToReach = `https://hibanka.herokuapp.com/api/v1/accounts`;
const createAccountButton = document.getElementById('submit');
const responseTag = document.getElementById('response-tag');
const wrapperDiv = document.querySelector('.wrapper');

const collectDetails = () => {
    responseTag.innerHTML = '';
    const openingBalanceEntered = document.getElementById('openingBalance').value;
    const options = document.getElementById('options');
    const selectedOption = options.value;
    const openingBalancePattern = /^[0-9]*$/;
    const openingBalancePatternTwo = /^[0-9]+\.[0-9]{2}$/;
    if(openingBalanceEntered && !openingBalanceEntered.match(openingBalancePattern) &&
     !openingBalanceEntered.match(openingBalancePatternTwo)) {
        responseTag.innerHTML = `<strong>Amount must be valid</strong>`;
    } else if (openingBalanceEntered && openingBalanceEntered < 50) {
        responseTag.innerHTML = `<strong>Amount must not be less than N50</strong>`;
    } else if (selectedOption === 'Savings'){
        const accountDetails = {
            openingBalance: openingBalanceEntered,
            type: 'savings',
        };
        pruneDetails(accountDetails);
    } else if (selectedOption === 'Current'){
        const accountDetails = {
            openingBalance: openingBalanceEntered,
            type: 'current',
        };
        pruneDetails(accountDetails);
    }
}

const pruneDetails = (detailsToBePruned) => {
    if (!detailsToBePruned.openingBalance){
        const accountType = detailsToBePruned.type;
        const prunedDetails = JSON.stringify({
            type: accountType,
        })
        createBankAccount(prunedDetails);
    } else {
        const prunedDetails = JSON.stringify(detailsToBePruned)
        createBankAccount(prunedDetails);
    }
}

const createBankAccount = async (details) => {
    wrapperDiv.innerHTML = `<div class = 'main-body'><img src = ../images/coins.gif></div>`;
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {
        try {
            const response = await fetch (urlToReach, {  
                                                    method: 'POST', 
                                                    body: details, 
                                                    headers: { 
                                                        'Content-type': 'application/json',
                                                        'x-access-token': userToken  
                                                            }
                                                    });
            const jsonResponse = await response.json();    
            if (jsonResponse.status === 201){
                const newAccount = jsonResponse.data;
                wrapperDiv.innerHTML = `<div class = 'main-body'>
                                            <h1>Congrats! </h1>
                                            <h3>Your Bank Account is Live and Ready</h3>
                                            <em>Your account number is</em>
                                            <em><strong>${newAccount.accountNumber}</strong></em><br><br>
                                            <em><strong>${newAccount.type} Account</strong></em><br><br>
                                            <em>Opening Balance</em>
                                            <em><strong>${newAccount.openingBalance}</strong></em><br><br>
                                            <em>Balance</em>
                                            <em><strong>${newAccount.balance}</strong></em><br><br>
                                            <h2>Personal Details</h2>
                                            <em>Firstname: <strong>${newAccount.firstName}</strong></em><br><br>
                                            <em>Lastname: <strong>${newAccount.lastName}</strong></em><br><br>
                                            <em>Email: <strong>${newAccount.email}</strong></em><br><br>
                                            <br>
                                            <div class = 'submit-div'>
                                            <button id = 'redirect' onclick = 'backToProfile()'>Back To Profile</button>
                                            </div><br>
                                        </div>`;
            }  else if (jsonResponse.status === 403) {
                location.href = '../pages/sign-in.html'
            }                                                             
        
        } catch (error) {
            wrapperDiv.innerHTML = `<div class = 'main-body'><h4>Connection error, please try again</h4></div>`;
        }
    }
};

createAccountButton.addEventListener('click', collectDetails);

const redirectButton = document.getElementById('redirect');
const user = JSON.parse(localStorage.getItem('userDetails'));
const type = user.type;

const backToProfile = () =>  {
    if(type === 'admin'){
                location.href = 'profile-admin-view.html'
            } else if (type === 'staff'){
                location.href = 'profile-staff-view.html'
            } else {
                location.href = 'profile.html'
            }
};



