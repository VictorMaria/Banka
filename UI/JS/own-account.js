const pageURL = window.location.href;
const url = new URL(pageURL);
const accountNumber = url.searchParams.get('ac');
const userToken = localStorage.getItem('token');
const urlToReach = `https://hibanka.herokuapp.com/api/v1/accounts/${accountNumber}`
const transactionsURL = `${urlToReach}/transactions`;
const infoDiv = document.querySelector('.info');
const displayDiv = document.querySelector('.display');

const getBankAccountDetails = async () => {
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {
        try {
            const response = await fetch(urlToReach, { method: 'GET', headers: { 'Content-type': 'application/json',
                                                                              'x-access-token': userToken  
                                                                            }});
            const jsonResponse = await response.json();
            const bankAccount = jsonResponse.data    
            if (jsonResponse.status === 200){
                infoDiv.innerHTML = `<br><em>${bankAccount.type} Account Number</em><br>
                                     <strong>${bankAccount.accountNumber}</strong><br><br>
                                     <em>Account Name</em><br>
                                     <strong>${bankAccount.firstName} ${bankAccount.lastName}</strong><br><br>
                                     <em>Balance</em><br>
                                     <strong>N${bankAccount.balance}</strong><br><br>
                                     <em>Email</em><br>
                                     <strong>${bankAccount.email}</strong><br><br>
                                     `;
            } else if (jsonResponse.status === 404){
                infoDiv.innerHTML = jsonResponse.error;
            }  else if (jsonResponse.status === 403) {
                location.href = '../pages/sign-in.html'
            }                                                             
        
        } catch (error) {
            infoDiv.innerHTML = 'Connection error, please try again';
        }
    }
}

const getBankAccountHistory = async () => {
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {
        try {
            const response = await fetch(transactionsURL, { method: 'GET', headers: { 'Content-type': 'application/json',
                                                                              'x-access-token': userToken  
                                                                            }});
            const jsonResponse = await response.json();   
            if (!jsonResponse.error){
                displayDiv.innerHTML = `<h1>Transaction History</h1>`;
                jsonResponse.data.map(transaction => {
                    displayDiv.innerHTML += `<div class = 'main-body'><br>
                                            <strong>${transaction.transaction_date.slice(0, 19)}</strong><br>
                                            <em>Amount</em>
                                            <strong>${transaction.transaction_type} N${transaction.amount}</strong><br>
                                            <em>Balance</em>
                                            <strong>N${transaction.account_balance}</strong>
                                            <br>
                                            </div>`;
                })
            } else if (jsonResponse.error && jsonResponse.status === 200) {
                displayDiv.innerHTML = `<div class = 'main-body'>${jsonResponse.error}</div>`;
            } else if (jsonResponse.status === 403) {
                location.href = '../pages/sign-in.html'
            }                                                             
        
        } catch (error) {
            infoDiv.innerHTML = 'Connection error, please try again';
        }
    }
}

getBankAccountDetails();
getBankAccountHistory();