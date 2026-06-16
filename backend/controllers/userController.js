const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {

try {

const { name, email, password } = req.body;

const existingUser =
await User.findOne({ email });

if (existingUser) {

return res.status(400).json({
message: "User already exists"
});

}

const hashedPassword =
await bcrypt.hash(password, 10);

await User.create({

name,
email,
password: hashedPassword

});

res.status(201).json({

message:
"Register successful"

});

}

catch (error) {

res.status(500).json({

message:
error.message

});

}

};





const loginUser = async (req, res) => {

try {

const {

email,
password

}

=

req.body;

const user =
await User.findOne({

email

});

if (!user) {

return res.status(400).json({

message:
"User not found"

});

}

const match =
await bcrypt.compare(

password,

user.password

);

if (!match) {

return res.status(400).json({

message:
"Wrong Password"

});

}

res.status(200).json({

message:
"Login successful"

});

}

catch (error) {

res.status(500).json({

message:
error.message

});

}

};





const getUsers =
async (

req,
res

) => {

const users =
await User.find(

{},

"-password"

);

res.json(
users
);

};





const deleteUser =
async (

req,
res

) => {

await User.findByIdAndDelete(
req.params.id
);

res.json({

message:
"Deleted"

});

};





const updateUser =
async (

req,
res

) => {

const user =
await User.findByIdAndUpdate(

req.params.id,

req.body,

{

new:true

}

);

res.json(
user
);

};





module.exports = {

registerUser,
loginUser,
getUsers,
deleteUser,
updateUser

};