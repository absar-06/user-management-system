async function register(){

try{

const name =
document.getElementById("name")?.value;

const email =
document.getElementById("email")?.value;

const password =
document.getElementById("password")?.value;

const response =
await fetch(

"http://localhost:5000/api/users/register",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:
JSON.stringify({

name,
email,
password

})

}

);

const data =
await response.json();

alert(data.message);

if(response.ok){

window.location =
"login.html";

}

}

catch{

alert(
"Register Failed"
);

}

}

async function login(){

try{

const email =
document.getElementById(
"email"
).value;

const password =
document.getElementById(
"password"
).value;

const response =
await fetch(

"http://localhost:5000/api/users/login",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:
JSON.stringify({

email,
password

})

}

);

const data =
await response.json();

if(response.ok){

alert(
"Login successful"
);

window.location =
"dashboard.html";

}

else{

alert(
data.message
);

}

}

catch{

alert(
"Login Failed"
);

}

}

async function loadUsers(){

try{

const response =
await fetch(

"http://localhost:5000/api/users"

);

const users =
await response.json();

const list =
document.getElementById(
"users"
);

if(!list)
return;

list.innerHTML="";

users.forEach((user)=>{

list.innerHTML +=

`

<div
style="
background:white;
padding:20px;
margin:20px;
border-radius:15px;
">

<p>

${user.name}

 - ${user.email}

</p>

<button
onclick=
"editUser('${user._id}')">

Edit

</button>

<button
onclick=
"deleteUser('${user._id}')">

Delete

</button>

</div>

`;

});

}

catch{

alert(
"Cannot Load Users"
);

}

}

async function editUser(id){

const name =
prompt(
"Enter New Name"
);

if(!name)
return;

await fetch(

`http://localhost:5000/api/users/${id}`,

{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:
JSON.stringify({

name

})

}

);

loadUsers();

}

async function deleteUser(id){

await fetch(

`http://localhost:5000/api/users/${id}`,

{

method:
"DELETE"

}

);

loadUsers();

}

function logout(){

window.location =
"login.html";

}
