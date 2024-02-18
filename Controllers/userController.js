
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    console.log("inside userController: reister function");
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    try {
        const existingUser = await users.findOne({ email: email });
        console.log("Existing USer");
        console.log(existingUser)
        if (existingUser) {
            res.status(406).json('Account already exist, please login')
        }
        else {
            const newUser = new users({
                username: username,
                email: email,
                password: password,
                github: "",
                linkedin: "",
                profile: ""
            })
            await newUser.save()
            res.status(200).json("registration request receivedm successfully")
        }


    } catch (err) {
        res.status(401).json('Register request failed due to ', err)
    }

}

exports.login = async (req, res) => {
    console.log("inside login conroller function")
    const { email, password } = req.body;
    console.log(email);
    console.log(password)
    try {
        const existingUser = await users.findOne({ email: email, password: password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, 'supersecretkey12345')
            console.log(token)
            res.status(200).json({
                existingUser,
                token
            })
        }
        else {
            res.status(406).json("Invalid email id or password")
        }

    } catch (err) {
        res.status(401).json("Login request faild due to", err)
    }
}