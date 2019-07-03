const pageURL = window.location.href;
const url = new URL(pageURL);
const id = url.searchParams.get('id');
const urlToReach = `https://hibanka.herokuapp.com/api/v1/users/${id}`;
const staffUrl = `${urlToReach}/staff`;
const adminUrl = `${urlToReach}/admin`;
const userToken = localStorage.getItem('token');
const detailsButton = document.getElementById('details');
const manageButton = document.getElementById('manage');
const displayDiv = document.querySelector('.display');
const mainBodyDiv = document.querySelector('.main-body');

const getUserDetails = async () => {
    displayDiv.innerHTML = `<img src = '../images/fading.gif'>`
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {
        try {
            const response = await fetch(urlToReach, { method: 'GET', headers: { 'Content-type': 'application/json',
                                                                              'x-access-token': userToken  
                                                                            }});
            const jsonResponse = await response.json();
            const userDetails = jsonResponse.data    
            if (jsonResponse.status === 200){
                displayDiv.innerHTML = `<div class = 'main-body'>
                                        <br>
                                        <em>User ID</em>
                                        <strong>${userDetails.id}</strong><br>
                                        <em>Firstname</em>
                                        <strong>${userDetails.firstName}</strong><br><br>
                                        <em>Lastname</em>
                                        <strong>${userDetails.lastName}</strong><br><br>
                                        <em>Admin Status</em>
                                        <strong>${userDetails.isAdmin}</strong><br><br>
                                        <em>Staff Status</em>
                                        <strong>${userDetails.isStaff}</strong><br><br>
                                        <em>Email</em>
                                        <strong>${userDetails.email}</strong><br><br>
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

const manageUserAccount = async () => {
    displayDiv.innerHTML = `<img src = '../images/fading.gif'>`
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {
        try {
            const response = await fetch(urlToReach, { method: 'GET', headers: { 'Content-type': 'application/json',
                                                                              'x-access-token': userToken  
                                                                            }});
            const jsonResponse = await response.json();
            const userDetails = jsonResponse.data    
            if (jsonResponse.status === 200){
                displayDiv.innerHTML = `<div class = 'main-body'>
                                        <h2>Staff Rights: ${userDetails.isStaff}</h2>
                                        <button id = 'staff' onclick = 'showStaffModal()'>Update Rights</button><br><br>
                                        <h2>Admin Rights: ${userDetails.isAdmin}</h2>
                                        <button id = 'admin' onclick = 'showAdminModal()'>Update Rights</button><br><br>
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


const staffModal = document.querySelector('.staff-modal');

const showStaffModal = () => {
    staffModal.style.display = 'block';
}



const closeStaffModal = () => {
    staffModal.style.display = 'none';
}

const adminModal = document.querySelector('.admin-modal');

const showAdminModal = () => {
    adminModal.style.display = 'block';
}

const closeAdminModal = () => {
    adminModal.style.display = 'none';
}

const closeStaffModalbutton = document.querySelector('.close-staff');
const noStaffButton = document.getElementById('staff-no');
const yesStaffButton = document.getElementById('staff-yes');

const closeAdminModalbutton = document.querySelector('.close-admin');
const noAdminButton = document.getElementById('admin-no');
const yesAdminButton = document.getElementById('admin-yes');

const makeUserAStaff = async () => {
    staffModal.style.display = 'none';
    displayDiv.innerHTML = `<img src = '../images/fading.gif'>`
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {
        try {
            const response = await fetch(staffUrl, { method: 'PATCH', headers: { 'Content-type': 'application/json',
                                                                              'x-access-token': userToken  
                                                                            }});
            const jsonResponse = await response.json();
            const userDetails = jsonResponse.data;    
            if (jsonResponse.status === 200){
                displayDiv.innerHTML = `<div class = 'main-body'>
                                        <h2>Staff Rights: ${userDetails.isStaff}</h2>
                                        <button id = 'staff' onclick = 'showStaffModal()'>Update Rights</button><br><br>
                                        <h2>Admin Rights: ${userDetails.isAdmin}</h2>
                                        <button id = 'admin' onclick = 'showAdminModal()'>Update Rights</button><br><br>
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

const makeUserAnAdmin = async () => {
    adminModal.style.display = 'none';
    displayDiv.innerHTML = `<img src = '../images/fading.gif'>`
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {
        try {
            const response = await fetch(adminUrl, { method: 'PATCH', headers: { 'Content-type': 'application/json',
                                                                              'x-access-token': userToken  
                                                                            }});
            const jsonResponse = await response.json();  
            const userDetails = jsonResponse.data;  
            if (jsonResponse.status === 200){
                displayDiv.innerHTML = `<div class = 'main-body'>
                                        <h2>Staff Rights: ${userDetails.isStaff}</h2>
                                        <button id = 'staff' onclick = 'showStaffModal()'>Update Rights</button><br><br>
                                        <h2>Admin Rights: ${userDetails.isAdmin}</h2>
                                        <button id = 'admin' onclick = 'showAdminModal()'>Update Rights</button><br><br>
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


closeStaffModalbutton.addEventListener('click', closeStaffModal);
noStaffButton.addEventListener('click', closeStaffModal);
yesStaffButton.addEventListener('click', makeUserAStaff);

closeAdminModalbutton.addEventListener('click', closeAdminModal);
noAdminButton.addEventListener('click', closeAdminModal);
yesAdminButton.addEventListener('click', makeUserAnAdmin);







const styleDetailsButton = () => {
    detailsButton.style.background = '#ddd';
	detailsButton.style.color = '#de4f4f';
    detailsButton.style.borderLeft = '5px solid #de4f4f';
    
    manageButton.style.background = 'white';
	manageButton.style.color = 'black';
    manageButton.style.border = 'white';
    
}

const styleManageButton = () => {
    detailsButton.style.background = 'white';
	detailsButton.style.color = 'black';
    detailsButton.style.borderLeft = 'white';
    
    manageButton.style.background = '#ddd';
	manageButton.style.color = '#de4f4f';
    manageButton.style.borderLeft = '5px solid #de4f4f';
}

getUserDetails();
detailsButton.addEventListener('click', getUserDetails);
detailsButton.addEventListener('click', styleDetailsButton);

manageButton.addEventListener('click', manageUserAccount);
manageButton.addEventListener('click', styleManageButton);

