const User =
require("../models/User");

exports.register = async(

req,
res

)=>{

try{

const{

name,
email,
role,
password

}

=

req.body;

if(

!name||

!email||

!role||

!password

){

return res
.status(400)
.json({

message:

"Fill all fields"

});

}

const existingUser=

await User.findOne({

email

});

if(existingUser){

return res
.status(400)
.json({

message:

"Email already exists"

});

}

const random=

Math.floor(
1000+
Math.random()*9000
);

const customId=

name
.slice(
0,
2
)
.toUpperCase()

+

random;

const user=

new User({

customId,

name,

email,

role,

password

});

await user.save();

res
.status(201)
.json({

message:

"Register Successful"

});

}

catch(error){

console.log(error);

res
.status(500)
.json({

message:

"Registration Failed"

});

}

};

exports.login = async(

req,
res

)=>{

try{

const{

email,
password

}

=

req.body;

const user=

await User.findOne({

email

});

if(

!user||

user.password!==password

){

return res
.status(401)
.json({

message:

"Invalid Credentials"

});

}

res
.status(200)
.json({

message:

"Login Successful"

});

}

catch(error){

res
.status(500)
.json({

message:

"Login Failed"

});

}

};

exports.getUsers = async(

req,
res

)=>{

try{

const users=

await User.find();

res.json(

users

);

}

catch{

res
.status(500)
.json({

message:

"Cannot Load Users"

});

}

};

exports.updateUser = async(

req,
res

)=>{

try{

await User.findByIdAndUpdate(

req.params.id,

req.body

);

res.json({

message:

"Updated"

});

}

catch{

res
.status(500)
.json({

message:

"Update Failed"

});

}

};

exports.deleteUser = async(

req,
res

)=>{

try{

await User.findByIdAndDelete(

req.params.id

);

res.json({

message:

"Deleted"

});

}

catch{

res
.status(500)
.json({

message:

"Delete Failed"

});

}

};
