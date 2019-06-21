const userToken = localStorage.getItem('token');
const urlToReach = `https://hibanka.herokuapp.com/api/v1/accounts`;
const accountsDiv = document.querySelector('.all-bank-accounts');
//const footer = document.querySelector('.footer');


const getAllBankAccounts = async () => {
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {
        try {
            const response = await fetch(urlToReach, { method: 'GET', headers: { 'Content-type': 'application/json',
                                                                              'x-access-token': userToken  
                                                                            }});
            const jsonResponse = await response.json();    
            if (jsonResponse.status === 200){
                accountsDiv.innerHTML = '';
                jsonResponse.data.map(bankAccount => {
                    accountsDiv.innerHTML += `<div class = 'bank-account'><br>
                                            <a  href = 'one-bank-account.html?ac=${bankAccount.account_number}'>
                                            <em>Account No.</em><br>
                                            <strong>${bankAccount.account_number}</strong><br><br>
                                            <em>Account Name</em><br>
                                            <strong>${bankAccount.first_name} ${bankAccount.last_name}</strong><br><br>
                                            </a><br>
                                            </div>`;                                              
                })
            } else if (jsonResponse.status === 404){
                accountsDiv.innerHTML = jsonResponse.error;
            }  else if (jsonResponse.status === 403) {
                location.href = '../pages/sign-in.html'
            }                                                             
        
        } catch (error) {
            accountsDiv.innerHTML = `<div class = 'error'><h4>Connection error, please try again</h4></div>`;
        }
    }
}

getAllBankAccounts();
