// Frontend code for Admin view of a user account
const display = document.getElementById('display');
const manage = () => {
	
	const basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = 'white';
	basicInfoButton.style.color = 'black';
	basicInfoButton.style.border = 'white';
	
	const manageButton = document.getElementById('manage');
	manageButton.style.background = '#ddd';
	manageButton.style.color = '#de4f4f';
	manageButton.style.borderLeft = '5px solid #de4f4f';
	
	display.innerHTML = `<h1>John Kamali</h1>
	                    <div class = 'topic'><h2>Manage Account</h2></div>
						<div id = 'main-body'>
						<h2>Activate Account</h2>
						<button onclick = 'activate()' id = 'activate'>Activate</button>
						<h2>Delete Account</h2>
						<button id = 'delete'>Delete</button><br><br>
						</div>`;
	}
	
const basicInfo = () => {
	
	const basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = '#ddd';
	basicInfoButton.style.color = '#de4f4f';
	basicInfoButton.style.borderLeft = '5px solid #de4f4f';
	
	const manageButton = document.getElementById('manage');
	manageButton.style.background = 'white';
	manageButton.style.color = 'black';
	manageButton.style.border = 'white';
	display.innerHTML = `<h1>John Kamali</h1>
						<div class = 'topic'><h2>Basic Information</h2></div>
						<div class = 'main-body'>
						<p>Firstname</p>
						<p><strong>John</strong></p>
						<p>Lastname</p>
						<p><strong>Kamali</strong></p>
						<p>Email</p>
						<p><strong>jkamali@mail.com</strong></p>
						<p>Status</p>
						<p><strong>Active</strong><p>
						</div>`;
}	

const activate = () => {
	const button = document.getElementById('activate');
	if (button.innerHTML === 'Activate'){
		button.innerHTML = 'Deactivate';
		button.style.backgroundColor = 'black';
	} else {
		button.innerHTML = 'Activate';
		button.style.backgroundColor = '#de4f4f';
	}
}

// Frontend Code for bank accounts in staff view
const basicBankAccountInfo = () => {
	
	const basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = '#ddd';
	basicInfoButton.style.color = '#de4f4f';
	basicInfoButton.style.borderLeft = '5px solid #de4f4f';

	const manageButton = document.getElementById('manage-bank-account');
	manageButton.style.background = 'white';
	manageButton.style.color = 'black';
	manageButton.style.border = 'white';
	
	const transactionHistory = document.getElementById('transaction-history');
	
	transactionHistory.style.background = 'white';
	transactionHistory.style.color = 'black';
	transactionHistory.style.border = 'white';
	display.innerHTML = `<h1>John Kamali</h1>
						<div class = 'topic'><h2>Basic Information</h2></div>
						<div class = 'main-body'>
							<p>Savings Account Number<br><strong>20190300001</strong><br><br>
								Balance<br>
								<strong>N2, 400, 000</strong><br><br>
								Firstname<br>
								<strong>John</strong><br><br>
								Lastname<br>
								<strong>Kamali</strong><br><br>
								Email<br>
								<strong>jkamali@mail.com</strong><br><br>
								Status<br>	
								<strong>Active</strong>
							</p>
						</div>`;
}	
const transactionHistory = () => {
	
	const basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = 'white';
	basicInfoButton.style.color = 'black';
	basicInfoButton.style.border = 'white';

	const manageButton = document.getElementById('manage-bank-account');
	manageButton.style.background = 'white';
	manageButton.style.color = 'black';
	manageButton.style.border = 'white';
	
	
	const transactionHistory = document.getElementById('transaction-history');
	transactionHistory.style.background = '#ddd';
	transactionHistory.style.color = '#de4f4f';
	transactionHistory.style.borderLeft = '5px solid #de4f4f';
	
	display.innerHTML = `<p><h1>John Kamali</h1>
						<strong id = 'strong'>Savings Account 20190300001</strong>	
	                    <div class = 'topic'><h2>Transaction History</h2></div>
							<div class = 'history-body'>
								<div class = 'transaction-profile-view'>
									<p><strong>25 March, 2019  12:30</strong><br>
										<strong>Credit N600, 000</strong><br>
										<strong>March Salary</strong><br>
										<strong>N2, 400, 000</strong><br>
									</p>
								</div><br>
								<div class = 'transaction-profile-view'>
									<p><strong>25 February, 2019  12:30</strong><br>
										<strong>Credit N600, 000</strong><br>
										<strong>Febrary Salary</strong><br>
										<strong>Balance N1, 800, 000</strong>
									</p>
								</div><br>
								<div class = 'transaction-profile-view'>
									<p><strong>25 January, 2019  12:20</strong><br>
										<strong>Credit N600, 000</strong><br>
										<strong>January Salary</strong><br>
										<strong>Balance N1, 200, 000</strong>
									</p>
								</div><br>
								<div class = 'transaction-profile-view'>
									<p><strong>20 December, 2018  12:30</strong><br>
										<strong>Credit N600, 000</strong><br>
										<strong>December Salary</strong><br>
										<strong>Balance N600, 000 </strong>
									</p>
								</div><br>
							</div>
						</div>`;
}

const manageBankAccount = () => {
	
	const basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = 'white';
	basicInfoButton.style.color = 'black';
	basicInfoButton.style.border = 'white';

	const transactionHistory = document.getElementById('transaction-history');
	transactionHistory.style.background = 'white';
	transactionHistory.style.color = 'black';
	transactionHistory.style.border = 'white';
	
	const manageButton = document.getElementById('manage-bank-account');
	manageButton.style.background = '#ddd';
	manageButton.style.color = '#de4f4f';
	manageButton.style.borderLeft = '5px solid #de4f4f';
	
	display.innerHTML = `<h1>John Kamali</h1>
	                    <div class = 'topic'><h2>Manage Account</h2></div>
						<div id = 'main-body'>
						<h2>Activate Account</h2>
						<button onclick = 'activate()' id = 'activate'>Activate</button>
						<h2>Delete Account</h2>
						<button id = 'delete'>Delete</button><br><br>
						</div>`;

}

// Frontend code for Profile 
const myBasicInfo = () => {
	
	const basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = '#ddd';
	basicInfoButton.style.color = '#de4f4f';
	basicInfoButton.style.borderLeft = '5px solid #de4f4f';
	
	const bankingInfo = document.getElementById('banking-info');
	bankingInfo.style.background = 'white';
	bankingInfo.style.color = 'black';
	bankingInfo.style.border = 'white';

	const transactionHistory = document.getElementById('transaction-history');
	transactionHistory.style.background = 'white';
	transactionHistory.style.color = 'black';
	transactionHistory.style.border = 'white';

	display.innerHTML = `<h1>John Kamali</h1>
						<div class = 'topic'><h2>Basic Information</h2></div>
						<div class = 'main-body'>
						<p>Firstname<br>
							<strong>John</strong><br>
							Lastname<br>
							<strong>Kamali</strong><br>
							Email<br>
							<strong>jkamali@mail.com</strong><br>
							</div>`;
}

const myBankingInfo = () => {
	
	const basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = 'white';
	basicInfoButton.style.color = 'black';
	basicInfoButton.style.border = 'white';

	const bankingInfo = document.getElementById('banking-info');
	bankingInfo.style.background = '#ddd';
	bankingInfo.style.color = '#de4f4f';
	bankingInfo.style.borderLeft = '5px solid #de4f4f';

	const transactionHistory = document.getElementById('transaction-history');
	transactionHistory.style.background = 'white';
	transactionHistory.style.color = 'black';
	transactionHistory.style.border = 'white';

	display.innerHTML = `<h1>John Kamali</h1>
						<div class = 'topic'><h2>Banking Information</h2></div>
						<div class = 'main-body'>
							Savings Account Number<br>
							<strong>20190300001</strong><br>
							Balance<br>
							<strong>N2, 400, 000</strong><br>
							Status<br>
							<strong>Active</strong><p>
						</div>`

}

const myTransactionHistory = () => {

	const basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = 'white';
	basicInfoButton.style.color = 'black';
	basicInfoButton.style.border = 'white';

	const bankingInfo = document.getElementById('banking-info');
	bankingInfo.style.background = 'white';
	bankingInfo.style.color = 'black';
	bankingInfo.style.border = 'white';

	const transactionHistory = document.getElementById('transaction-history');
	transactionHistory.style.background = '#ddd';
	transactionHistory.style.color = '#de4f4f';
	transactionHistory.style.borderLeft = '5px solid #de4f4f';

	display.innerHTML = `<h1>John Kamali</h1>
						<strong id = 'strong'>Savings Account 20190300001</strong>
						<div class = 'topic'><h2>Transaction History</h2></div>
						<div class = 'history-body'>
								<div class = 'transaction-profile-view'>
									<p><strong>25 March, 2019  12:30</strong><br>
										<strong>Credit N600, 000</strong><br>
										<strong>March Salary</strong><br>
										<strong>Balance N2, 400, 000</strong>
									</p>
								</div><br>
								<div class = 'transaction-profile-view'>
									<p><strong>25 February, 2019  12:30</strong><br>
										<strong>Credit N600, 000</strong><br>
										<strong>Febrary Salary</strong><br>
										<strong>Balance N1, 800, 000</strong>
									</p>
								</div><br>
								<div class = 'transaction-profile-view'>
									<p><strong>25 January, 2019  12:20</strong><br>
										<strong>Credit N600, 000</strong><br>
										<strong>January Salary</strong><br>
										<strong>Balance N1, 200, 000</strong>
									</p>
								</div><br>
								<div class = 'transaction-profile-view'>
									<p><strong>20 December, 2018  12:30</strong><br>
										<strong>Credit N600, 000</strong><br>
										<strong>December Salary</strong><br>
										<strong>Balance N600, 000 </strong>
									</p>
								</div><br>
						</div>`;
}

// Frontend code for new transaction
const wrapperDiv = document.getElementById('wrapper');
const finish = () => {
	const options = document.getElementById('options');
	const selectedOption = options.value;

	if (selectedOption === 'Select Transaction Type')
		{
			alert('Please Select Transaction type');
	} else if (selectedOption === 'Credit'){
		wrapperDiv.innerHTML = `<div class = 'message-board'>
										<h4>Credit Transaction Successful</h4>
										<button id = 'okay' onclick = "location.href = 'transactions.html'">Okay</button><br><br>
										<div>`;
	} else {
		wrapperDiv.innerHTML = `<div class = 'message-board'>
									   <h4>Debit Transaction Successful</h4>
									   <button id = 'okay' onclick = "location.href = 'transactions.html'">Okay</button><br><br>
		                               <div>`;
	}
}

const create = () => {
	const options = document.getElementById('options');
	const selectedOption = options.value;

	if (selectedOption === 'Select User Type')
		{
			alert('Please Select User type');
	} else if (selectedOption === 'Staff'){
		wrapperDiv.innerHTML = `<div class = 'message-board'>
										<h4>New Staff Created</h4>
										<button id = 'okay' onclick = "location.href = 'user-accounts.html'">Okay</button><br><br>
										<div>`;
	} else {
		wrapperDiv.innerHTML = `<div class = 'message-board'>
									   <h4>New Admin Created</h4>
									   <button id = 'okay' onclick = "location.href = 'user-accounts.html'">Okay</button><br><br>
		                               <div>`;
	}
}

