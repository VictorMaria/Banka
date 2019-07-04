const pageURL = window.location.href;
const url = new URL(pageURL);
const transactionId = url.searchParams.get('tId');
const userToken = localStorage.getItem('token');
const urlToReach = `https://hibanka.herokuapp.com/api/v1/transactions/${transactionId}`;
const wrapperDiv = document.querySelector('.wrapper');

const getTransactionDetails = async () => {
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {
        try {
            const response = await fetch(urlToReach, { method: 'GET', headers: { 'Content-type': 'application/json',
                                                                              'x-access-token': userToken  
                                                                            }});
            const jsonResponse = await response.json();
            const transaction = jsonResponse.data    
            if (jsonResponse.status === 200){
                wrapperDiv.innerHTML = `<div class = 'transaction'>
                                        <br>
                                        <strong>${transaction.transactionDate}</strong><br><br>
                                        <em>TransactionId</em><br>
                                        <strong>${transaction.transactionId}</strong><br><br>
                                        <em>Account Number</em><br>
                                        <strong>${transaction.accountNumber}</strong><br><br>
                                        <em>Amount</em><br>
                                        <strong>${transaction.transactionType} ${transaction.amount}</strong><br><br>
                                        <em>Balance</em><br>
                                        <strong>${transaction.amount}</strong><br><br>
                                       </div>`;
            } else if (jsonResponse.status === 404){
                wrapperDiv.innerHTML = `<div class = 'transaction'>
                                        <br>
                                        <strong>${jsonResponse.error}</strong> 
                                        <br><br> 
                                        </div>`;
            }  else if (jsonResponse.status === 403) {
                location.href = '../pages/sign-in.html'
            }                                                             
        
        } catch (error) {
            wrapperDiv.innerHTML = `<div class = 'transaction'>
                                    <br>
                                    <strong>Connection error, please try again</strong>
                                    <br><br>
                                <div>`;
        }
    }
}

getTransactionDetails();