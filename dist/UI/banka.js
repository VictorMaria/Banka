'use strict';

// Frontend code for Admin view of a user account
var manage = function manage() {
	var display = document.getElementById('display');

	var basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = 'white';
	basicInfoButton.style.color = 'black';
	basicInfoButton.style.border = 'white';

	var manageButton = document.getElementById('manage');
	manageButton.style.background = '#ddd';
	manageButton.style.color = '#de4f4f';
	manageButton.style.borderLeft = '5px solid #de4f4f';

	display.innerHTML = '<h1>John Kamali</h1>\n\t                    <div class = \'topic\'><h2>Manage Account</h2></div>\n\t\t\t\t\t\t<div id = \'main-body\'>\n\t\t\t\t\t\t<h2>Activate Account</h2>\n\t\t\t\t\t\t<button onclick = \'activate()\' id = \'activate\'>Activate</button>\n\t\t\t\t\t\t<h2>Delete Account</h2>\n\t\t\t\t\t\t<button id = \'delete\'>Delete</button><br><br>\n\t\t\t\t\t\t</div>';
};

var basicInfo = function basicInfo() {
	var display = document.getElementById('display');

	var basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = '#ddd';
	basicInfoButton.style.color = '#de4f4f';
	basicInfoButton.style.borderLeft = '5px solid #de4f4f';

	var manageButton = document.getElementById('manage');
	manageButton.style.background = 'white';
	manageButton.style.color = 'black';
	manageButton.style.border = 'white';
	display.innerHTML = '<h1>John Kamali</h1>\n\t\t\t\t\t\t<div class = \'topic\'><h2>Basic Information</h2></div>\n\t\t\t\t\t\t<div class = \'main-body\'>\n\t\t\t\t\t\t<p>Firstname</p>\n\t\t\t\t\t\t<p><strong>John</strong></p>\n\t\t\t\t\t\t<p>Lastname</p>\n\t\t\t\t\t\t<p><strong>Kamali</strong></p>\n\t\t\t\t\t\t<p><strong>jkamali@mail.com</strong></p>\n\t\t\t\t\t\t<p><strong>Active</strong><p>\n\t\t\t\t\t\t</div>';
};

var activate = function activate() {
	var button = document.getElementById('activate');
	if (button.innerHTML === 'Activate') {
		button.innerHTML = 'Deactivate';
		button.style.backgroundColor = 'black';
	} else {
		button.innerHTML = 'Activate';
		button.style.backgroundColor = '#de4f4f';
	}
};

// Frontend Code for bank accounts in staff view
var basicBankAccountInfo = function basicBankAccountInfo() {
	var display = document.getElementById('display');

	var basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = '#ddd';
	basicInfoButton.style.color = '#de4f4f';
	basicInfoButton.style.borderLeft = '5px solid #de4f4f';

	var manageButton = document.getElementById('manage-bank-account');
	manageButton.style.background = 'white';
	manageButton.style.color = 'black';
	manageButton.style.border = 'white';

	var transactionHistory = document.getElementById('transaction-history');

	transactionHistory.style.background = 'white';
	transactionHistory.style.color = 'black';
	transactionHistory.style.border = 'white';
	display.innerHTML = '<h1>John Kamali</h1>\n\t\t\t\t\t\t<div class = \'topic\'><h2>Basic Information</h2></div>\n\t\t\t\t\t\t<div class = \'main-body\'>\n\t\t\t\t\t\t\t<p>Savings Account Number<br><strong>20190300001</strong><br><br>\n\t\t\t\t\t\t\t\tBalance<br>\n\t\t\t\t\t\t\t\t<strong>N2, 400, 000</strong><br><br>\n\t\t\t\t\t\t\t\tFirstname<br>\n\t\t\t\t\t\t\t\t<strong>John</strong><br><br>\n\t\t\t\t\t\t\t\tLastname<br>\n\t\t\t\t\t\t\t\t<strong>Kamali</strong><br><br>\n\t\t\t\t\t\t\t\tEmail<br>\n\t\t\t\t\t\t\t\t<strong>jkamali@mail.com</strong><br><br>\n\t\t\t\t\t\t\t\tStatus<br>\t\n\t\t\t\t\t\t\t\t<strong>Active</strong>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>';
};
var transactionHistory = function transactionHistory() {
	var display = document.getElementById('display');

	var basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = 'white';
	basicInfoButton.style.color = 'black';
	basicInfoButton.style.border = 'white';

	var manageButton = document.getElementById('manage-bank-account');
	manageButton.style.background = 'white';
	manageButton.style.color = 'black';
	manageButton.style.border = 'white';

	var transactionHistory = document.getElementById('transaction-history');
	transactionHistory.style.background = '#ddd';
	transactionHistory.style.color = '#de4f4f';
	transactionHistory.style.borderLeft = '5px solid #de4f4f';

	display.innerHTML = '<p><h1>John Kamali</h1>\n\t                    <div class = \'topic\'><h2>Transaction History</h2></div>\n\t\t\t\t\t\t\t<div class = \'history-body\'>\n\t\t\t\t\t\t\t\t<div class = \'transaction\'>\n\t\t\t\t\t\t\t\t\t<p><strong>25 March, 2019  12:30</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Credit N600, 000</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>March Salary</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Balance N2, 400, 000</strong><br>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t</div><br>\n\t\t\t\t\t\t\t\t<div class = \'transaction\'>\n\t\t\t\t\t\t\t\t\t<p><strong>25 February, 2019  12:30</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Credit N600, 000</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Febrary Salary</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Balance N1, 800, 000</strong>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t</div><br>\n\t\t\t\t\t\t\t\t<div class = \'transaction\'>\n\t\t\t\t\t\t\t\t\t<p><strong>25 January, 2019  12:20</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Credit N600, 000</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>January Salary</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Balance N1, 200, 000</strong>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t</div><br>\n\t\t\t\t\t\t\t\t<div class = \'transaction\'>\n\t\t\t\t\t\t\t\t\t<p><strong>20 December, 2018  12:30</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Credit N600, 000</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>December Salary</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Balance N600, 000 </strong>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t</div><br>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>';
};

var manageBankAccount = function manageBankAccount() {

	var display = document.getElementById('display');
	var basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = 'white';
	basicInfoButton.style.color = 'black';
	basicInfoButton.style.border = 'white';

	var transactionHistory = document.getElementById('transaction-history');
	transactionHistory.style.background = 'white';
	transactionHistory.style.color = 'black';
	transactionHistory.style.border = 'white';

	var manageButton = document.getElementById('manage-bank-account');
	manageButton.style.background = '#ddd';
	manageButton.style.color = '#de4f4f';
	manageButton.style.borderLeft = '5px solid #de4f4f';

	display.innerHTML = '<h1>John Kamali</h1>\n\t                    <div class = \'topic\'><h2>Manage Account</h2></div>\n\t\t\t\t\t\t<div id = \'main-body\'>\n\t\t\t\t\t\t<h2>Activate Account</h2>\n\t\t\t\t\t\t<button onclick = \'activate()\' id = \'activate\'>Activate</button>\n\t\t\t\t\t\t<h2>Delete Account</h2>\n\t\t\t\t\t\t<button id = \'delete\'>Delete</button><br><br>\n\t\t\t\t\t\t</div>';
};

// Frontend code for Profile 
var myBasicInfo = function myBasicInfo() {
	var display = document.getElementById('display');

	var basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = '#ddd';
	basicInfoButton.style.color = '#de4f4f';
	basicInfoButton.style.borderLeft = '5px solid #de4f4f';

	var bankingInfo = document.getElementById('banking-info');
	bankingInfo.style.background = 'white';
	bankingInfo.style.color = 'black';
	bankingInfo.style.border = 'white';

	var transactionHistory = document.getElementById('transaction-history');
	transactionHistory.style.background = 'white';
	transactionHistory.style.color = 'black';
	transactionHistory.style.border = 'white';

	display.innerHTML = '<h1>John Kamali</h1>\n\t\t\t\t\t\t<div class = \'topic\'><h2>Basic Information</h2></div>\n\t\t\t\t\t\t<div class = \'main-body\'>\n\t\t\t\t\t\t<p>Firstname<br>\n\t\t\t\t\t\t\t<strong>John</strong><br>\n\t\t\t\t\t\t\tLastname<br>\n\t\t\t\t\t\t\t<strong>Kamali</strong><br>\n\t\t\t\t\t\t\tEmail<br>\n\t\t\t\t\t\t\t<strong>jkamali@mail.com</strong><br>\n\t\t\t\t\t\t\t</div>';
};

var myBankingInfo = function myBankingInfo() {
	var display = document.getElementById('display');

	var basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = 'white';
	basicInfoButton.style.color = 'black';
	basicInfoButton.style.border = 'white';

	var bankingInfo = document.getElementById('banking-info');
	bankingInfo.style.background = '#ddd';
	bankingInfo.style.color = '#de4f4f';
	bankingInfo.style.borderLeft = '5px solid #de4f4f';

	var transactionHistory = document.getElementById('transaction-history');
	transactionHistory.style.background = 'white';
	transactionHistory.style.color = 'black';
	transactionHistory.style.border = 'white';

	display.innerHTML = '<h1>John Kamali</h1>\n\t\t\t\t\t\t<div class = \'topic\'><h2>Banking Information</h2></div>\n\t\t\t\t\t\t<div class = \'main-body\'>\n\t\t\t\t\t\t\tSavings Account Number<br>\n\t\t\t\t\t\t\t<strong>20190300001</strong><br>\n\t\t\t\t\t\t\tBalance<br>\n\t\t\t\t\t\t\t<strong>N2, 400, 000</strong><br>\n\t\t\t\t\t\t\tStatus<br>\n\t\t\t\t\t\t\t<strong>Active</strong><p>\n\t\t\t\t\t\t</div>';
};

var myTransactionHistory = function myTransactionHistory() {
	var display = document.getElementById('display');
	var basicInfoButton = document.getElementById('basic-info');
	basicInfoButton.style.background = 'white';
	basicInfoButton.style.color = 'black';
	basicInfoButton.style.border = 'white';

	var bankingInfo = document.getElementById('banking-info');
	bankingInfo.style.background = 'white';
	bankingInfo.style.color = 'black';
	bankingInfo.style.border = 'white';

	var transactionHistory = document.getElementById('transaction-history');
	transactionHistory.style.background = '#ddd';
	transactionHistory.style.color = '#de4f4f';
	transactionHistory.style.borderLeft = '5px solid #de4f4f';

	display.innerHTML = '<p><h1>John Kamali</h1>\n\t\t\t\t\t\tSavings Account 20190300001<p>\n\t\t\t\t\t\t<div class = \'topic\'><h2>Transaction History</h2></div>\n\t\t\t\t\t\t<div class = \'history-body\'>\n\t\t\t\t\t\t\t\t<div class = \'transaction\'>\n\t\t\t\t\t\t\t\t\t<p><strong>25 March, 2019  12:30</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Credit N600, 000</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>March Salary</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Balance N2, 400, 000</strong>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t</div><br>\n\t\t\t\t\t\t\t\t<div class = \'transaction\'>\n\t\t\t\t\t\t\t\t\t<p><strong>25 February, 2019  12:30</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Credit N600, 000</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Febrary Salary</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Balance N1, 800, 000</strong>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t</div><br>\n\t\t\t\t\t\t\t\t<div class = \'transaction\'>\n\t\t\t\t\t\t\t\t\t<p><strong>25 January, 2019  12:20</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Credit N600, 000</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>January Salary</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Balance N1, 200, 000</strong>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t</div><br>\n\t\t\t\t\t\t\t\t<div class = \'transaction\'>\n\t\t\t\t\t\t\t\t\t<p><strong>20 December, 2018  12:30</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Credit N600, 000</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>December Salary</strong><br>\n\t\t\t\t\t\t\t\t\t\t<strong>Balance N600, 000 </strong>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t</div><br>\n\t\t\t\t\t\t</div>';
};

// Frontend code for new transaction
var finish = function finish() {
	var wrapperDiv = document.getElementById('wrapper');
	var options = document.getElementById('options');
	var selectedOption = options.value;

	if (selectedOption === 'Select Transaction Type') {
		alert('Please Select Transaction Type');
	} else if (selectedOption === 'Credit') {
		wrapperDiv.innerHTML = '<div class = \'message-board\'>\n\t\t\t\t\t\t\t\t\t\t<h4>Credit Transaction Successful</h4>\n\t\t\t\t\t\t\t\t\t\t<button id = \'okay\' onclick = "location.href = \'transactions.html\'">Okay</button><br><br>\n\t\t\t\t\t\t\t\t\t\t<div>';
	} else {
		wrapperDiv.innerHTML = '<div class = \'message-board\'>\n\t\t\t\t\t\t\t\t\t   <h4>Debit Transaction Successful</h4>\n\t\t\t\t\t\t\t\t\t   <button id = \'okay\' onclick = "location.href = \'transactions.html\'">Okay</button><br><br>\n\t\t                               <div>';
	}
};

var create = function create() {
	var wrapperDiv = document.getElementById('wrapper');
	var options = document.getElementById('options');
	var selectedOption = options.value;

	if (selectedOption === 'Select User Type') {
		alert('Please Select User Type');
	} else if (selectedOption === 'Staff') {
		wrapperDiv.innerHTML = '<div class = \'message-board\'>\n\t\t\t\t\t\t\t\t\t\t<h4>New Staff Created</h4>\n\t\t\t\t\t\t\t\t\t\t<button id = \'okay\' onclick = "location.href = \'user-accounts.html\'">Okay</button><br><br>\n\t\t\t\t\t\t\t\t\t\t<div>';
	} else {
		wrapperDiv.innerHTML = '<div class = \'message-board\'>\n\t\t\t\t\t\t\t\t\t   <h4>New Admin Created</h4>\n\t\t\t\t\t\t\t\t\t   <button id = \'okay\' onclick = "location.href = \'user-accounts.html\'">Okay</button><br><br>\n\t\t                               <div>';
	}
};