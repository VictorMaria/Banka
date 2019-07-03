const userToken = localStorage.getItem('token');
const urlToReach = `https://hibanka.herokuapp.com/api/v1/transactions`;
const transactionsDiv = document.querySelector('.transactions');
const coinDiv = document.querySelector('.coin-div');

const getAllTransactions = async () => {
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {
        try {
            const response = await fetch(urlToReach, { method: 'GET', headers: { 'Content-type': 'application/json',
                                                                              'x-access-token': userToken  
                                                                            }});
            const jsonResponse = await response.json(); 
            if (jsonResponse.status === 200){
                coinDiv.style.display = 'none';   
                transactionsDiv.innerHTML = `<tr>
                                                <th>S/No</th>
                                                <th>Date</th>
                                                <th>Account No</th>
                                                <th>Action</th>
                                             </tr>`          
                jsonResponse.data.map(transaction => {
                    transactionsDiv.innerHTML += `<tr>
                                                    <td>${transaction.transaction_id}</td>
                                                    <td>${transaction.transaction_date.slice(0, 19)}</td>
                                                    <td>${transaction.account_number}</td>
                                                    <td>
                                                        <button onclick = "location.href = 'one-transaction.html?tId=${transaction.transaction_id}.html'">More</button></td>
                                                </tr>`;                                              
                })
            }  else if (jsonResponse.status === 403) {
                location.href = '../pages/sign-in.html'
            }                                                             
        
        } catch (error) {
            coinDiv.style.display = 'none';
            const errorDiv = document.querySelector('.error');
            errorDiv.innerHTML = `<h4>Connection error, please try again</h4>`;
        }
    }
}

getAllTransactions();