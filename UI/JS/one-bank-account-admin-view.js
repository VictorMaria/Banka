const pageURL = window.location.href;
const url = new URL(pageURL);
const accountNumber = url.searchParams.get('ac');
const userToken = localStorage.getItem('token');
const urlToReach = `https://hibanka.herokuapp.com/api/v1/accounts/${accountNumber}`;
const transactionsURL = `${urlToReach}/transactions`;
const creditURL = `http://hibanka.herokuapp.com/api/v1/transactions/${accountNumber}/credit`;
const debitURL = `http://hibanka.herokuapp.com/api/v1/transactions/${accountNumber}/debit`;
const detailsButton = document.getElementById('details');
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

historyButton.addEventListener('click', getHistory);
historyButton.addEventListener('click', styleHistoryButton);

manageButton.addEventListener('click', manageAccount);
manageButton.addEventListener('click', styleManageButton);
