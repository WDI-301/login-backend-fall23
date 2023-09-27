const User = require('../model/User')

module.exports = {
    login: async (req, res) => {
        if (req.body.password === 'abc') {
            res.send({
                username: req.body.username,
                password: req.body.password
              })
        } else {
            res.send({ username: "Bad Password" })
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

            // create new User 
            let newUser = new User({
                username: req.body.username,
                password: req.body.password
            })

            //encrypt password
            
            //save newUser to the database
            let savedUser = await newUser.save()

            res.status(200).json({
                userObj: savedUser,
                message: "Successfully Registered"
            })

        }
        catch (error) {
            res.status(error.status).json(error.message)
        }
    }
}