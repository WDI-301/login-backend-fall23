const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrpyt = require('bcrypt')
const saltRounds = 10

module.exports = {
    login: async (req, res) => {
        try {
           // check if user exists / get the user from the db
           let foundUser = await User.findOne({username: req.body.username})
           // if no user found throw an error
           if (!foundUser) {
            throw {
                status: 404,
                message: "User Not Found"
            }
           }
        
            // check if password matches
            // if a bad match, throw an error
            let checkedPassword = await bcrpyt.compare(req.body.password, foundUser.password)
            if (!checkedPassword) {
                throw {
                    status: 401,
                    message: "Invalid Password"
                }
            }

            //create jwt token
            let payload = {
                id: foundUser._id,
                username: foundUser.username
            }
            let token = await jwt.sign(payload, process.env.SUPER_SECRET_KEY, { expiresIn: 60*5 })

            // return the found user and the token, response  
            res.status(200).json({
                username: foundUser.username,
                message: "Successful Login",
                token: token
            })
        } 
        catch (error) {
            // throw error messages go here
            res.status(error.status).json({message: error.message})
        }

       

    },
    register: async (req, res) => {
        try {
            // if foundUser exists throw an error
            let foundUser = await User.findOne({username: req.body.username})
            if (foundUser) {
                throw {
                    status: 409,
                    message: "User Exists"
                }
            }
            
            //encrypt password
            let hashedPassword = await bcrpyt.hash(req.body.password, saltRounds)
            // console.log('!@-------hashedPassword-------@!')
            // console.log(hashedPassword)

            // create new User 
            let newUser = new User({
                username: req.body.username,
                password: hashedPassword
            })
            // newUser.password = hashedPassword
                        
            //save newUser to the database
            let savedUser = await newUser.save()

            res.status(200).json({
                username: savedUser.username,
                message: "Successfully Registered"
            })

        }
        catch (error) {
            res.status(error.status).json({message: error.message})
        }
    },
    authtoken: async (req, res) => {
        // get the user from the db by id
        // let foundUser = await User.findOne({_id: req.decode.id})
        let foundUser = await User.findById(req.decoded.id)
        // respond with user info
        
        res.status(200).json({
            username: foundUser.username,
            message: "Successful Token Login!"
        })
    }
}