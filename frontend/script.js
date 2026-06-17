async function register(){

try{

const name=
document.getElementById("name").value.trim();

const email=
document.getElementById("email").value.trim();

const role=
document.getElementById("role").value;

const password=
document.getElementById("password").value;

const message=
document.getElementById("message");

message.style.display="none";

const namePattern=
/^[A-Za-z ]+$/;

if(name===""){

message.style.display="block";
message.innerHTML="Enter Name";

return;

}

if(!namePattern.test(name)){

message.style.display="block";
message.innerHTML="Name should contain alphabets only";

return;

}

if(name.length<3){

message.style.display="block";
message.innerHTML="Minimum 3 letters";

return;

}

const emailPattern=
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){

message.style.display="block";
message.innerHTML="Enter valid email";

return;

}

if(role===""){

message.style.display="block";
message.innerHTML="Select Role";

return;

}

const passwordPattern=
/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

if(!passwordPattern.test(password)){

message.style.display="block";
message.innerHTML="Password requirements not satisfied";

return;

}

const response=

await fetch(

"http://localhost:5000/api/users/register",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:

JSON.stringify({

name,
email,
role,
password

})

}

);

const data=
await response.json();

if(response.ok){

message.style.display="block";

message.style.color="#00ff7f";

message.innerHTML=

"✔ Registration Successful";

setTimeout(

()=>{

window.location=
"login.html";

},

1500

);

}

else{

message.style.display="block";

message.style.color="red";

message.innerHTML=

data.message;

}

}

catch(error){

document
.getElementById(
"message"
)
.style
.display=
"block";

document
.getElementById(
"message"
)
.innerHTML=

"Registration Failed";

}

}

async function login(){

const email=
document.getElementById("email").value;

const password=
document.getElementById("password").value;

const message=
document.getElementById("message");

message.style.display="none";

const response=

await fetch(

"http://localhost:5000/api/users/login",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:

JSON.stringify({

email,
password

})

}

);

const data=
await response.json();

if(response.ok){

message.style.display="block";

message.style.color="#00ff7f";

message.innerHTML=

"✔ Login Successful";

setTimeout(

()=>{

window.location=
"dashboard.html";

},

1500

);

}

else{

message.style.display="block";

message.style.color="red";

message.innerHTML=

data.message;

}

}

async function loadUsers(){

try{

const response=

await fetch(

"http://localhost:5000/api/users"

);

const users=

await response.json();

const table=

document.getElementById(

"users"

);



table.innerHTML=`

<table class="user-table">

<thead>

<tr>

<th>ID</th>

<th>Name</th>

<th>Email</th>

<th>Role</th>

<th>Actions</th>

</tr>

</thead>

<tbody id="tbody">

</tbody>

</table>

`;



const tbody=

document.getElementById(

"tbody"

);



users.forEach(

(user)=>{

const displayId=

user.customId

||

(

user.name
.substring(0,2)
.toUpperCase()

+

Math.floor(
1000+
Math.random()*9000
)

);



tbody.innerHTML+=`

<tr>

<td>${displayId}</td>

<td>${user.name}</td>

<td>${user.email}</td>

<td>${user.role}</td>

<td>

<button onclick="editUser('${user._id}')">

Edit

</button>

<button onclick="deleteUser('${user._id}')">

Delete

</button>

</td>

</tr>

`;

}

);

}

catch(error){

console.log(error);

}

}



let editId=null;

function editUser(id){

editId=id;

document
.getElementById(
"editBox"
)
.style
.display=
"block";

}

function closeEdit(){

document
.getElementById(
"editBox"
)
.style
.display=
"none";

document
.getElementById(
"editName"
)
.value=
"";

}

async function saveEdit(){

const newName=

document
.getElementById(
"editName"
)
.value
.trim();

if(!newName)
return;

await fetch(

`http://localhost:5000/api/users/${editId}`,

{

method:"PUT",

headers:{

"Content-Type":

"application/json"

},

body:

JSON.stringify({

name:newName

})

}

);

closeEdit();

loadUsers();

}



async function deleteUser(id){

await fetch(

"http://localhost:5000/api/users/"+id,

{

method:"DELETE"

}

);

loadUsers();

}

function logout(){

window.location=
"login.html";

}

function checkPassword(){

const password=

document
.getElementById(
"password"
)
.value;

document
.getElementById(
"passwordRules"
)
.style
.display=
"block";

document
.getElementById(
"length"
)
.innerHTML=

password.length>=8

&&

password.length<=16

?

"✅ 8–16 characters"

:

"❌ 8–16 characters";

document
.getElementById(
"upper"
)
.innerHTML=

/[A-Z]/.test(password)

?

"✅ One Uppercase"

:

"❌ One Uppercase";

document
.getElementById(
"special"
)
.innerHTML=

/[!@#$%^&*]/.test(password)

?

"✅ One Special"

:

"❌ One Special";

}
