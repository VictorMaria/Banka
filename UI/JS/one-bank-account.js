const pageURL = window.location.href;
const url = new URL(pageURL);
const accountNumber = url.searchParams.get('ac');
const userToken = localStorage.getItem('token');
const urlToReach = `https://hibanka.herokuapp.com/api/v1/accounts/${accountNumber}`;
const transactionsURL = `${urlToReach}/transactions`;
const creditURL = `http://hibanka.herokuapp.com/api/v1/transactions/${accountNumber}/credit`;
const debitURL = `http://hibanka.herokuapp.com/api/v1/transactions/${accountNumber}/debit`;
const detailsButton = document.getElementById('details');
const transactButton = document.getElementById('transact');
const historyButton = document.getElementById('history');
const manageButton = document.getElementById('manage');
const displayDiv = document.querySelector('.display');
const mainBodyDiv = document.querySelector('.main-body');

// getBankDetails is called on a specific bank account page is loaded
const getBankDetails = async () => {
    displayDiv.innerHTML = `<img src = '../images/fading.gif'>`
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
                displayDiv.innerHTML = `<div class = 'main-body'>
                                     <br><em>${bankAccount.type} Account Number</em><br>
                                     <strong>${bankAccount.accountNumber}</strong><br><br>
                                     <em>Account Name</em><br>
                                     <strong>${bankAccount.firstName} ${bankAccount.lastName}</strong><br><br>
                                     <em>Balance</em><br>
                                     <strong>N${bankAccount.balance}</strong><br><br>
                                     <em>Email</em><br>
                                     <strong>${bankAccount.email}</strong><br><br>
                                     </div>
                                     `;
            } else if (jsonResponse.status === 404){
                displayDiv.innerHTML = `<div class = 'main-body'><strong>${jsonResponse.error}</strong></div>`;
            }  else if (jsonResponse.status === 403) {
                location.href = '../pages/sign-in.html'
            }                                                             
        
        } catch (error) {
            displayDiv.innerHTML = `<div class = 'main-body'>
                                    <strong>Connection error, please try again</strong>
                                    <div>`;
        }
    }
} 

// getHistory is called when the history tab is clicked
const getHistory = async () => {
    displayDiv.innerHTML = `<img src = '../images/fading.gif'>`;
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
                displayDiv.innerHTML = `<div class = 'main-body'><strong>${jsonResponse.error}</strong></div>`;
            } else if (jsonResponse.status === 404){
                displayDiv.innerHTML = `<div class = 'main-body'><strong>${jsonResponse.error}</strong></div>`;
            }
             else if (jsonResponse.status === 403) {
                location.href = '../pages/sign-in.html'
            }                                                             
        
        } catch (error) {
            displayDiv.innerHTML = `<div class = 'info'><strong>Connection error, please try again</strong></div>`;
        }
    }
}

// transact loads form for a new transaction
const transact = () => {
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {    
        displayDiv.innerHTML = `<div class = 'new-transaction' id = 'new-transaction'>
                                <br>
                                <h2 id = 'h2-text'>New Transaction</h2>
                                <input id = 'amount' type = 'text' placeholder = 'Amount'><br><br>
                                <input id = 'description' type = 'text' placeholder = 'Description'><br><br>
                                <select id = 'options' name = 'transaction type'>
                                <option value = 'Select Transaction Type'>Select Transaction Type</option>
                                <option value = 'Credit'>Credit</option>
                                <option value = 'Debit'>Debit</option>
                                </select><br><br>
                                <p id = 'response-tag'></p>
                                <div class = 'submit-div'>
                                <button class = 'submit' onclick = 'showModal()'>Finish</button>
                                </div>
                                <br></div>`;
    }
}

// showModal is called when the finish button on the form is clicked and the user input are valid
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close')
const noButton = document.getElementById('no');
const yesButton = document.getElementById('yes');


const showModal = () => {
    const amount = document.getElementById('amount').value;
    const options = document.getElementById('options');
    const description = document.getElementById('description').value;
    const selectedOption = options.value;
    const responseTag = document.getElementById('response-tag');
    const amountPattern = /^[0-9]+$/;
    responseTag.innerHTML = '';
    if (!amount.match(amountPattern)){
        responseTag.innerHTML = `<strong>Amount must be a number</strong>`;
    }
    else if (!amount || amount < 50 ) {
        responseTag.innerHTML = `<strong>Amount must be up to N50</strong>`;
    } else if (!description) {
        responseTag.innerHTML = `<strong>A description is needed</strong>`
    } else if (selectedOption === 'Select Transaction Type') {
        responseTag.innerHTML = `<strong>Select a transaction type</strong>`
    }  else {
        modal.style.display = 'block';
    }
}

const closeModal = () => {
  modal.style.display = 'none';
}

// finishtransaction is called if the user clicks Yes on the modal box
const finishTransaction = () => {
    modal.style.display = 'none';
    const transactionAmount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const options = document.getElementById('options');
    const selectedOption = options.value;
    const data = JSON.stringify({
        amount: transactionAmount,
        remark: description,
    });

    if (selectedOption === 'Credit') {
        creditAccount(data);
    } else {
        debitAccount(data);
    }
}

const creditAccount = async (transactionDetails) => {
    const responseTag = document.getElementById('response-tag');
    displayDiv.innerHTML = `<div class = 'main-body'><img src = '../images/coins.gif'></div>`;
    try {
        const response = await fetch (creditURL, {  
                                                    method: 'POST', 
                                                    body: transactionDetails, 
                                                    headers: { 
                                                        'Content-type': 'application/json',
                                                        'x-access-token': userToken  
                                                            }
                                                    });
        const jsonResponse = await response.json();
        if (response.status === 200){
            const transaction = jsonResponse.data;
            displayDiv.innerHTML = `<h1>Successful</h1>`
            displayDiv.innerHTML += `<div class = 'main-body'><br>
                                    <em>Account <strong>${transaction.accountNumber}</strong></em>
                                    has been successfully credited with
                                    <strong>${transaction.amount}</strong><br>
                                    <button id = 'thanks' onclick = 'getBankDetails();styleDetailsButton()'>Thanks</button><br>
                                    </div>`;
        } else if (jsonResponse.status === 403) {
            location.href = '../pages/sign-in.html'
        } else if (jsonResponse.status === 404){
            displayDiv.innerHTML = `<div class = 'main-body'><strong>${jsonResponse.error}</strong></div>`;
        } else {
            responseTag.innerHTML = `<strong>${jsonResponse.error}</strong>`;
        }
    } catch (error) {
        responseTag.innerHTML = `<strong>Connection error, please try again</strong>`;
    }
}
const debitAccount = async (transactionDetails) => {
    const responseTag = document.getElementById('response-tag');
    displayDiv.innerHTML = `<div class = 'main-body'><img src = '../images/coins.gif'></div>`;
    try {
        const response = await fetch (debitURL, {  
                                                    method: 'POST', 
                                                    body: transactionDetails, 
                                                    headers: { 
                                                        'Content-type': 'application/json',
                                                        'x-access-token': userToken  
                                                            }
                                                    });
        const jsonResponse = await response.json();
        if (response.status === 200){
            const transaction = jsonResponse.data;
            displayDiv.innerHTML = `<h1>Successful</h1>`;
            displayDiv.innerHTML += `<div class = 'main-body'><br>
                                    <em>Account <strong>${transaction.accountNumber}</strong></em>
                                    has been successfully debited with
                                    <strong>${transaction.amount}</strong><br>
                                    <button id = 'thanks' onclick = 'getBankDetails();styleDetailsButton()'>Thanks</button><br>
                                    </div>`;
        } else if(jsonResponse.error === 'Insufficient Funds'){
            displayDiv.innerHTML = `<h1 id = 'unsuccessful'>Unsuccessful</h1>`;
            displayDiv.innerHTML += `<div class = 'new-transaction' id = 'new-transaction'>
                                    <br>
                                    <h2 id = 'h2-text'>New Transaction</h2>
                                    <input id = 'amount' type = 'text' placeholder = 'Amount'><br><br>
                                    <input id = 'description' type = 'text' placeholder = 'Description'><br><br>
                                    <select id = 'options' name = 'transaction type'>
                                    <option value = 'Select Transaction Type'>Select Transaction Type</option>
                                    <option value = 'Credit'>Credit</option>
                                    <option value = 'Debit'>Debit</option>
                                    </select><br><br>
                                    <p id = 'response-tag'><strong>${jsonResponse.error}</strong></p>
                                    <div class = 'submit-div'>
                                    <button class = 'submit' onclick = 'showModal()'>Finish</button>
                                    </div>
                                    <br></div>`
        } else if (jsonResponse.status === 403) {
            location.href = '../pages/sign-in.html'
        } else if (jsonResponse.status === 404){
            displayDiv.innerHTML = `<div class = 'main-body'><strong>${jsonResponse.error}</strong></div>`;
        }else {
            responseTag.innerHTML = `<strong>${jsonResponse.error}</strong>`;
        }
    } catch (error) {
        responseTag.innerHTML = `<strong>Connection error, please try again</strong>`;
    }
}

closeButton.addEventListener('click', closeModal);
noButton.addEventListener('click', closeModal);
yesButton.addEventListener('click', finishTransaction);

// manageAccount is called when manage tab button is clicked
const manageAccount = async () => {
    displayDiv.innerHTML = `<img src = '../images/fading.gif'>`
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
                displayDiv.innerHTML = `<div class = 'main-body'>
                                        <h2>Account Status: ${bankAccount.status}</h2>
                                        <button onclick = 'showStatusModal()' id = 'update-status'>Update Status</button>
                                        <h2>Delete Account</h2>
                                        <button id = 'delete' onclick = 'showDeleteModal()'>Delete</button><br><br>
                                        </div>
                                     `;
            } else if (jsonResponse.status === 404){
                displayDiv.innerHTML = `<div class = 'main-body'><strong>${jsonResponse.error}</strong></div>`;
            }  else if (jsonResponse.status === 403) {
                location.href = '../pages/sign-in.html'
            }                                                             
        
        } catch (error) {
            displayDiv.innerHTML = `<div class = 'main-body'>
                                    <strong>Connection error, please try again</strong>
                                    <div>`;
        }
    }
} 

const statusModal = document.querySelector('.status-modal');

const showStatusModal = () => {
    statusModal.style.display = 'block';
}

const closeStatusModal = () => {
    statusModal.style.display = 'none';
}

// changeStatus is called when Yes is clicked on the modal for Status
const changeStatus = async () => {
    statusModal.style.display = 'none';
    displayDiv.innerHTML = `<img src = '../images/fading.gif'>`
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {
        try {
            const response = await fetch(urlToReach, { method: 'PATCH', headers: { 'Content-type': 'application/json',
                                                                              'x-access-token': userToken  
                                                                            }});
            const jsonResponse = await response.json();    
            if (jsonResponse.status === 200){
                displayDiv.innerHTML = `<div class = 'main-body'><br>
                                        <em><strong>Bank Account ${accountNumber}</strong></em><br>
                                        <strong>${jsonResponse.data.message}</strong><br>
                                        <button id = 'thanks' onclick = 'manageAccount();styleManageButton()'>Thanks</button>
                                        <br>
                                        </div>
                                     `;
            } else if (jsonResponse.status === 404){
                displayDiv.innerHTML = `<div class = 'main-body'><strong>${jsonResponse.error}</strong></div>`;
            }  else if (jsonResponse.status === 403) {
                location.href = '../pages/sign-in.html'
            }                                                             
        
        } catch (error) {
            displayDiv.innerHTML = `<div class = 'main-body'>
                                    <strong>Connection error, please try again</strong>
                                    <div>`;
        }
    }
}

const closeStatusModalbutton = document.querySelector('.close-status');
const noStatusButton = document.getElementById('status-no');
const yesStatusButton = document.getElementById('status-yes');

noStatusButton.addEventListener('click', closeStatusModal);
closeStatusModalbutton.addEventListener('click', closeStatusModal);
yesStatusButton.addEventListener('click', changeStatus);

const deleteModal = document.querySelector('.delete-modal');

const showDeleteModal = () => {
    deleteModal.style.display = 'block';
}

const closeDeleteModal = () => {
    deleteModal.style.display = 'none';
}

const deleteAccount = async () => {
    deleteModal.style.display = 'none';
    displayDiv.innerHTML = `<img src = '../images/fading.gif'>`
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {
        try {
            const response = await fetch(urlToReach, { method: 'DELETE', headers: { 'Content-type': 'application/json',
                                                                              'x-access-token': userToken  
                                                                            }});
            const jsonResponse = await response.json();    
            if (jsonResponse.status === 200){
                displayDiv.innerHTML = `<div class = 'main-body'>
                                        <strong>${jsonResponse.message}</strong>
                                        </div>
                                        `;
            } else if (jsonResponse.status === 404){
                displayDiv.innerHTML = `<div class = 'main-body'><strong>${jsonResponse.error}</strong></div>`;
            }  else if (jsonResponse.status === 403) {
                location.href = '../pages/sign-in.html'
            }                                                             
        
        } catch (error) {
            displayDiv.innerHTML = `<div class = 'main-body'>
                                    <strong>Connection error, please try again</strong>  
                                    </div>`;
        }
    }
}

const closeDeleteModalbutton = document.querySelector('.close-delete');
const noDeleteButton = document.getElementById('delete-no');
const yesDeleteButton = document.getElementById('delete-yes');

closeDeleteModalbutton.addEventListener('click', closeDeleteModal);
noDeleteButton.addEventListener('click', closeDeleteModal);
yesDeleteButton.addEventListener('click', deleteAccount);



const styleDetailsButton = () => {
    detailsButton.style.background = '#ddd';
	detailsButton.style.color = '#de4f4f';
    detailsButton.style.borderLeft = '5px solid #de4f4f';
    
    transactButton.style.background = 'white';
	transactButton.style.color = 'black';
    transactButton.style.border = 'white';

    historyButton.style.background = 'white';
	historyButton.style.color = 'black';
    historyButton.style.border = 'white';

    manageButton.style.background = 'white';
	manageButton.style.color = 'black';
    manageButton.style.border = 'white';
    
}

const styleTransactButton = () => {
    detailsButton.style.background = 'white';
	detailsButton.style.color = 'black';
    detailsButton.style.borderLeft = 'white';
    
    transactButton.style.background = '#ddd';
	transactButton.style.color = '#de4f4f';
    transactButton.style.borderLeft = '5px solid #de4f4f';

    historyButton.style.background = 'white';
	historyButton.style.color = 'black';
    historyButton.style.border = 'white';

    manageButton.style.background = 'white';
	manageButton.style.color = 'black';
    manageButton.style.border = 'white';
}

const styleHistoryButton = () => {
    detailsButton.style.background = 'white';
	detailsButton.style.color = 'black';
    detailsButton.style.borderLeft = 'white';
    
    transactButton.style.background = 'white';
	transactButton.style.color = 'black';
    transactButton.style.border = 'white';

    historyButton.style.background = '#ddd';
	historyButton.style.color = '#de4f4f';
    historyButton.style.borderLeft = '5px solid #de4f4f';

    manageButton.style.background = 'white';
	manageButton.style.color = 'black';
    manageButton.style.border = 'white';
}

const styleManageButton = () => {
    detailsButton.style.background = 'white';
	detailsButton.style.color = 'black';
    detailsButton.style.borderLeft = 'white';
    
    transactButton.style.background = 'white';
	transactButton.style.color = 'black';
    transactButton.style.border = 'white';

    historyButton.style.background = 'white';
	historyButton.style.color = 'black';
    historyButton.style.border = 'white';

    manageButton.style.background = '#ddd';
	manageButton.style.color = '#de4f4f';
    manageButton.style.borderLeft = '5px solid #de4f4f';
}

getBankDetails();

detailsButton.addEventListener('click', getBankDetails);
detailsButton.addEventListener('click', styleDetailsButton);


transactButton.addEventListener('click', transact);
transactButton.addEventListener('click', styleTransactButton);

historyButton.addEventListener('click', getHistory);
historyButton.addEventListener('click', styleHistoryButton);

manageButton.addEventListener('click', manageAccount);
manageButton.addEventListener('click', styleManageButton);
