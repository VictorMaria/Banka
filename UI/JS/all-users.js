const userToken = localStorage.getItem('token');
const urlToReach = `https://hibanka.herokuapp.com/api/v1/users`;
const usersDiv = document.querySelector('.all-users');



const getAllUsers = async () => {
    if (!userToken) {
        location.href = '../UI/pages/sign-in.html';
    } else {
        try {
            const response = await fetch(urlToReach, { method: 'GET', headers: { 'Content-type': 'application/json',
                                                                              'x-access-token': userToken  
                                                                            }});
            const jsonResponse = await response.json();    
            if (jsonResponse.status === 200){
                usersDiv.innerHTML = '';
                jsonResponse.data.map(oneUser => {
                    usersDiv.innerHTML += `<div class = 'user'><br>
                                            <a  href = 'one-user.html?id=${oneUser.id}'>
                                            <em>Email/Username</em><br>
                                            <strong>${oneUser.email}</strong><br><br>
                                            <em>Full Name</em><br>
                                            <strong>${oneUser.first_name} ${oneUser.last_name}</strong><br><br>
                                            </a><br>
                                            </div>`;                                              
                })
            } else if (jsonResponse.status === 404){
                usersDiv.innerHTML = `<div class = 'error'><h4>${jsonResponse.error}</h4></div>`;
            }  else if (jsonResponse.status === 403) {
                location.href = '../pages/sign-in.html'
            }                                                             
        
        } catch (error) {
            usersDiv.innerHTML = `<div class = 'error'><h4>Connection error, please try again</h4></div>`;
        }
    }
}

getAllUsers();
